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
      alert(`Domínio NÃO AUTORIZADO no Firebase.\n\nComo resolver:\n1. Vá ao Console do Firebase (Authentication > Settings > Authorized Domains)\n2. Adicione "peptium.com.br"\n3. Adicione também o domínio do preview se necessário.\n\nSem isso, o login via Google não funcionará neste endereço.`);
    } else {
      alert(`Erro no login: ${error.message} (${error.code})`);
    }
    throw error;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

async function syncUser(user: any) {
  // Create or update user profile
  const userDoc = doc(db, 'users', user.uid);
  try {
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
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
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
  try {
    await updateDoc(userDoc, {
      isPro: true,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `users/${uid}`);
  }
}
