import { Router } from "express";
import admin from "firebase-admin";

const router = Router();

// Initialize Firebase Admin if not already initialized
if (admin.apps.length === 0) {
  try {
    const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountJson) {
      let serviceAccount;
      try {
        serviceAccount = JSON.parse(serviceAccountJson);
      } catch (e) {
        try {
          // If the user pasted it with literal \n instead of real newlines or it got scrambled
          // Sometimes the env var parsing in UI strips quotes or adds extra characters.
          // Let's just try evaluating or parsing a cleaned up version.
          const cleaned = serviceAccountJson.trim().replace(/^['"`]/, '').replace(/['"`]$/, '');
          serviceAccount = JSON.parse(cleaned);
        } catch (err2) {
          try {
             const decoded = Buffer.from(serviceAccountJson, 'base64').toString('utf-8');
             serviceAccount = JSON.parse(decoded);
          } catch (err3) {
             console.warn("Could not parse FIREBASE_SERVICE_ACCOUNT as JSON or Base64. Falling back to local file or ADC.");
          }
        }
      }
      
      if (!serviceAccount) {
        try {
          serviceAccount = require('./serviceAccountKey.json');
        } catch (fileErr) {
          // Ignorar se o arquivo não existir
        }
      }

      if (serviceAccount) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
      } else {
        admin.initializeApp();
      }
      console.log("[Firebase Admin] Initialized successfully with custom or default credentials.");
    } else {
      let serviceAccount;
      try {
        serviceAccount = require('./serviceAccountKey.json');
      } catch (fileErr) {
        // Ignorar se não existir
      }
      
      if (serviceAccount) {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        console.log("[Firebase Admin] Initialized successfully using local serviceAccountKey.json.");
      } else {
        admin.initializeApp();
        console.log("[Firebase Admin] Initialized successfully using Application Default Credentials.");
      }
    }
  } catch (error) {
    console.error("[Firebase Admin] Error initializing:", error);
  }
}

router.post("/", async (req, res) => {
  const { subscriptionId, userId, planKey } = req.body;

  if (!subscriptionId || !userId) {
    return res.status(400).json({ success: false, error: "Missing subscriptionId or userId" });
  }

  try {
    const clientId = process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;
    const secret = process.env.PAYPAL_SECRET;

    if (!clientId || !secret) {
      throw new Error("Servidor não configurado com credenciais do PayPal. API keys ausentes.");
    }

    const isSandbox = !clientId.startsWith("A") && !clientId.startsWith("live"); 
    // Usually live ids don't have a specific prefix but sandbox often does. Wait, let's just use production PayPal API by default unless overridden. 
    // The user's env vars are for production "ifaaluwo → Settings → Environment variables (Production)"
    const PAYPAL_API_URL = process.env.PAYPAL_ENV === 'sandbox' 
      ? "https://api-m.sandbox.paypal.com"
      : "https://api-m.paypal.com";

    // 1. Get Access Token from PayPal
    const authString = Buffer.from(`${clientId}:${secret}`).toString("base64");
    
    // Use standard fetch
    const tokenResponse = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials"
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("[PayPal Auth Error]", errorText);
      throw new Error("Falha ao autenticar no PayPal");
    }

    const { access_token } = await tokenResponse.json();

    // 2. Get Subscription Details
    const subResponse = await fetch(`${PAYPAL_API_URL}/v1/billing/subscriptions/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`,
        "Content-Type": "application/json",
      }
    });

    if (!subResponse.ok) {
      const errorText = await subResponse.text();
      console.error("[PayPal Subscription Error]", errorText);
      throw new Error(`Assinatura não encontrada no PayPal: ${subscriptionId}`);
    }

    const subData = await subResponse.json();

    // PayPal STATUS Check
    if (subData.status !== "ACTIVE" && subData.status !== "APPROVED") {
      console.warn(`[PayPal] Status da assinatura ${subscriptionId} é ${subData.status}`);
      return res.status(400).json({ 
        success: false, 
        error: `A assinatura está com status: ${subData.status}. O pagamento ainda não foi confirmado.` 
      });
    }

    // 3. Update Firestore securely with Firebase Admin
    if (admin.apps.length === 0) {
      throw new Error("Firebase Admin SDK não está configurado no servidor.");
    }

    const db = admin.firestore();
    const userRef = db.collection("users").doc(userId);
    
    const userSnap = await userRef.get();
    if (!userSnap.exists) {
      throw new Error("Usuário não encontrado no Firestore");
    }

    await userRef.update({
      isPro: true,
      paypalSubscriptionId: subscriptionId,
      planConfigured: planKey || "unknown",
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[Subscription Activated] User: ${userId}, Sub: ${subscriptionId}`);

    return res.status(200).json({ success: true, message: "Assinatura ativada com sucesso!" });

  } catch (error: any) {
    console.error("[Activate Subscription Error]", error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
});

export default router;