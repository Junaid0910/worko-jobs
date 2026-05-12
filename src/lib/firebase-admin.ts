import * as admin from "firebase-admin";

if (!admin.apps.length && process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    // Note: For full admin capabilities (like custom claims), you will need a Service Account JSON
    // credential: admin.credential.cert(serviceAccount) 
  });
}

const adminAuth = admin.apps.length > 0 ? admin.auth() : null as any;
export { adminAuth };
