// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAoGhobFH3zya9PaGBR2X3HNbxdU5b2XEw",
  authDomain: "mentos-4e98d.firebaseapp.com",
  projectId: "mentos-4e98d",
  storageBucket: "mentos-4e98d.firebasestorage.app",
  messagingSenderId: "678351780837",
  appId: "1:678351780837:web:2df6516e92495a9ec38d0c",
}

// ✅ 중복 초기화 방지
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

// ✅ Auth export (persistence 설정)
export const auth = getAuth(app)

// ✅ Firestore export (캐싱 활성화)
export const db = getFirestore(app)

// 개발 환경에서 에뮬레이터 사용 (선택사항)
// if (process.env.NODE_ENV === 'development') {
//   connectAuthEmulator(auth, "http://localhost:9099")
//   connectFirestoreEmulator(db, 'localhost', 8080)
// }