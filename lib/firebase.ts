import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app"
import { getAuth, type Auth, setPersistence, browserLocalPersistence } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Validate that all required config values are present
const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"] as const
const missingKeys = requiredConfigKeys.filter((key) => !firebaseConfig[key])

if (missingKeys.length > 0) {
  console.error("[v0] Missing Firebase configuration keys:", missingKeys)
  console.error("[v0] Please ensure all NEXT_PUBLIC_FIREBASE_* environment variables are set")
}

// Initialize Firebase only if we have the required configuration
let app: FirebaseApp
let auth: Auth

try {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  auth = getAuth(app)
  
  // Set persistence to keep user logged in across browser sessions
  // This persists the user session until they explicitly log out
  setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.warn("[Firebase] Could not set persistence:", error)
  })
  
  console.log("[Firebase] Authentication initialized with local persistence")
} catch (error) {
  console.error("[v0] Firebase initialization error:", error)
  throw new Error("Firebase kon niet worden geïnitialiseerd. Controleer je configuratie.")
}

export { app, auth }
