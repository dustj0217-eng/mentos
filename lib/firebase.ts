// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAoGhobFH3zya9PaGBR2X3HNbxdU5b2XEw",
  authDomain: "mentos-4e98d.firebaseapp.com",
  projectId: "mentos-4e98d",
  storageBucket: "mentos-4e98d.firebasestorage.app",
  messagingSenderId: "678351780837",
  appId: "1:678351780837:web:2df6516e92495a9ec38d0c",
}

// ✅ 중복 초기화 방지 (Next.js에서 매우 중요)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// ✅ Auth export
export const auth = getAuth(app)
