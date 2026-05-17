import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, getRedirectResult } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  const isIframe = window.self !== window.top;
  
  try {
    if (isIframe) {
      console.log('Detectado ambiente iframe, usando signInWithRedirect');
      await signInWithRedirect(auth, googleProvider);
    } else {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await syncUser(user);
    }
  } catch (error: any) {
    console.error('Erro no login:', error);
    if (error.code === 'auth/unauthorized-domain') {
      alert('Domínio não autorizado no Firebase. Por favor, adicione este endereço nas configurações de domínios autorizados do seu console Firebase.');
    } else {
      alert(`Erro no login: ${error.message}`);
    }
    throw error;
  }
}

async function syncUser(user: any) {
  // Create or update user profile
  const userDoc = doc(db, 'users', user.uid);
  const snap = await getDoc(userDoc);
  
  if (!snap.exists()) {
    await setDoc(userDoc, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      isPro: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }
}

export async function handleRedirectResult() {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      await syncUser(result.user);
    }
  } catch (error) {
    console.error('Erro ao processar redirecionamento:', error);
  }
}

export async function logout() {
  await signOut(auth);
}

export async function upgradeToPro(uid: string) {
  const userDoc = doc(db, 'users', uid);
  await updateDoc(userDoc, {
    isPro: true,
    updatedAt: serverTimestamp()
  });
}
