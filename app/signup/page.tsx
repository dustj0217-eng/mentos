"use client"

/**
 * SignupPage
 * - Firebase Auth (Email/Password) 실제 회원가입
 */

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function SignupPage() {
  const [open, setOpen] = useState(false)

  // 🔑 회원가입 입력값
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-100 p-8">
            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">회원가입</h1>
              <p className="text-sm text-slate-500">
                멘토스와 함께 대학 생활의 방향을 설계해 보세요
              </p>
            </div>

            {/* Signup Form */}
            <form
              className="space-y-4"
              onSubmit={async (e) => {
                e.preventDefault()

                try {
                  await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                  )

                  // ✅ 성공 시 안내 팝업
                  setOpen(true)
                } catch (error: any) {
                  alert(error.message)
                }
              }}
            >
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input id="name" type="text" placeholder="홍길동" />
              </div>

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
                  placeholder="8자 이상 입력"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                <Input
                  id="passwordConfirm"
                  type="password"
                  placeholder="비밀번호 재입력"
                />
              </div>

              {/* Agreements */}
              <div className="space-y-2 text-sm">
                <label className="flex items-start gap-2">
                  <input type="checkbox" className="mt-1 rounded" required />
                  <span className="text-slate-600">
                    <Link href="/terms" className="underline">
                      이용약관
                    </Link>{" "}
                    및{" "}
                    <Link href="/privacy" className="underline">
                      개인정보처리방침
                    </Link>
                    에 동의합니다
                  </span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-slate-600">
                    마케팅 정보 수신에 동의합니다 (선택)
                  </span>
                </label>
              </div>

              <Button className="w-full" type="submit">
                가입하기
              </Button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center text-sm text-slate-500">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="font-medium text-slate-900 hover:underline"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* 성공 팝업 */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>회원가입 완료</DialogTitle>
            <DialogDescription className="mt-2 text-left">
              회원가입이 정상적으로 완료되었습니다.
              <br />
              이제 로그인하실 수 있습니다.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-end">
            <Button onClick={() => setOpen(false)}>확인</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
