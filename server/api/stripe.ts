import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

const router = express.Router();

router.use((req, res, next) => {
  console.log(`[STRIPE ROUTER] ${req.method} ${req.originalUrl}`);
  next();
});

console.log('[STRIPE] Router module loaded');

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Stripe router is reachable' });
});

// Load Firebase config for project ID
const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
let projectId = '';
if (fs.existsSync(configPath)) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  projectId = config.projectId;
}

// Initialize Firebase Admin
if (!admin.apps.length) {
  try {
    if (projectId) {
      admin.initializeApp({ projectId });
    } else {
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase Admin Init Error:', error);
  }
}

const db = admin.firestore();

// Lazy Stripe initialization
let stripeInstance: Stripe | null = null;
const getStripe = () => {
  if (!stripeInstance) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY não configurada. Adicione em "Secrets".');
    }
    stripeInstance = new Stripe(key, {
      apiVersion: '2023-10-16' as any, // Versão estável
    });
  }
  return stripeInstance;
};

// Map plan names to Stripe prices (IDs from dashboard)
// In a real app, these would come from env or a database.
const PLAN_PRICE_IDS: Record<string, string> = {
  'Pro Mensal': process.env.STRIPE_PRICE_MONTHLY || 'price_monthly_id',
  'Pro Anual': process.env.STRIPE_PRICE_ANNUAL || 'price_annual_id',
};

router.post('/create-checkout-session', async (req: Request, res: Response) => {

  console.log('--- STRIPE CHECKOUT REQUEST RECEIVED ---');
  console.log('Path:', req.path);
  console.log('Body:', JSON.stringify(req.body));
  try {
    const { planName, userId, userEmail } = req.body;
    
    if (!userId || !planName) {
      return res.status(400).json({ error: 'Informações de usuário ou plano ausentes.' });
    }

    // Determine line items
    let line_items: any[] = [];
    
    if (PLAN_PRICE_IDS[planName] && PLAN_PRICE_IDS[planName] !== 'price_monthly_id' && PLAN_PRICE_IDS[planName] !== 'price_annual_id') {
      line_items = [{ price: PLAN_PRICE_IDS[planName], quantity: 1 }];
    } else {
      // Fallback: Dynamic price creation for developers who haven't set up Price IDs yet
      const amount = planName === 'Pro Anual' ? 47520 : 9999; // in cents
      line_items = [{
        price_data: {
          currency: 'brl',
          product_data: {
            name: `Assinatura Peptium Prime - ${planName}`,
            description: `Acesso total à plataforma Peptium Prime (${planName}).`,
          },
          unit_amount: amount,
          recurring: {
            interval: planName === 'Pro Anual' ? 'year' : 'month',
          },
        },
        quantity: 1,
      }];
    }

    const stripe = getStripe();
    const appUrl = process.env.APP_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'subscription',
      success_url: `${appUrl}?payment_status=success`,
      cancel_url: `${appUrl}?payment_status=cancel`,
      customer_email: userEmail,
      metadata: {
        userId: userId,
        planName: planName,
      },
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Session Error:', error);
    res.status(500).json({ error: 'Erro ao iniciar checkout', details: error.message });
  }
});

// Webhook listener
router.post('/webhook', express.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  console.log('--- STRIPE WEBHOOK RECEIVED ---');
  const stripe = getStripe();
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret!);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;

    if (userId) {
      try {
        await db.collection('users').doc(userId).update({
          isPro: true,
          subscriptionId: session.subscription as string,
          stripeCustomerId: session.customer as string,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        console.log(`User ${userId} upgraded to Pro via Webhook.`);
      } catch (dbError) {
        console.error('Firestore Update Error:', dbError);
      }
    }
  }

  res.json({ received: true });
});

export default router;
