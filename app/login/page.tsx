"use client"

/**
 * LoginPage
 * - Firebase Auth (Email/Password, Google)
 */

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Firebase
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const googleProvider = new GoogleAuthProvider()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border p-8">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">로그인</h1>
              <p className="text-sm text-slate-500">
                멘토스에 오신 것을 환영합니다
              </p>
            </div>

            {/* Email Login */}
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()
                setLoading(true)

                try {
                  await signInWithEmailAndPassword(auth, email, password)
                  alert("로그인 성공")
                } catch (error: any) {
                  alert(error.message)
                } finally {
                  setLoading(false)
                }
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-600">로그인 상태 유지</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-slate-500 hover:text-slate-700"
                >
                  비밀번호 찾기
                </Link>
              </div>

              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? "로그인 중..." : "로그인"}
              </Button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-2 text-sm text-slate-400">
              <div className="flex-1 border-t" />
              <span>또는</span>
              <div className="flex-1 border-t" />
            </div>

            <div className="mt-6 text-center text-sm text-slate-500">
              아직 계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-medium text-slate-900 hover:underline"
              >
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
