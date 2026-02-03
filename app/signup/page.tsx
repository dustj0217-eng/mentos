"use client"

/**
 * SignupPage
 * - Firebase Auth (Email/Password) 실제 회원가입
 * - 예쁜 에러/성공 팝업
 */

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
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
import { AlertCircle, CheckCircle2, Mail } from "lucide-react"

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function SignupPage() {
  const router = useRouter()

  // 입력값
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [termsAgreed, setTermsAgreed] = useState(false)

  // 팝업 상태
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"success" | "error">("success")
  const [dialogTitle, setDialogTitle] = useState("")
  const [dialogMessage, setDialogMessage] = useState("")

  // 이메일에서 닉네임 자동 생성
  const generateNickname = (email: string) => {
    const username = email.split("@")[0]
    const randomNum = Math.floor(Math.random() * 10000)
    return `${username}_${randomNum}`
  }

  // 에러 메시지 한글화
  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다"
      case "auth/invalid-email":
        return "올바른 이메일 형식이 아닙니다"
      case "auth/weak-password":
        return "비밀번호는 최소 6자 이상이어야 합니다"
      case "auth/network-request-failed":
        return "네트워크 연결을 확인해주세요"
      case "auth/operation-not-allowed":
        return "이메일/비밀번호 로그인이 비활성화되어 있습니다"
      default:
        return "회원가입에 실패했습니다. 다시 시도해주세요"
    }
  }

  // 에러 팝업 표시
  const showError = (title: string, message: string) => {
    setDialogType("error")
    setDialogTitle(title)
    setDialogMessage(message)
    setDialogOpen(true)
  }

  // 성공 팝업 표시
  const showSuccess = () => {
    setDialogType("success")
    setDialogTitle("회원가입 완료!")
    setDialogMessage("멘토스의 회원이 되신 것을 환영합니다")
    setDialogOpen(true)
  }

  // 회원가입 처리
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // 유효성 검사
    if (!termsAgreed) {
      showError("약관 동의 필요", "이용약관 및 개인정보처리방침에 동의해주세요")
      return
    }

    if (password !== passwordConfirm) {
      showError("비밀번호 불일치", "입력하신 비밀번호가 일치하지 않습니다")
      return
    }

    if (password.length < 6) {
      showError("비밀번호 오류", "비밀번호는 최소 6자 이상이어야 합니다")
      return
    }

    try {
      // 1. 회원가입
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      // 2. Firestore에 사용자 정보 저장 (자동 생성된 닉네임)
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        nickname: generateNickname(email),
        bio: "",
        phone: "",
        university: "",
        major: "",
        createdAt: serverTimestamp(),
      })

      // 3. 성공 팝업
      showSuccess()
    } catch (error: any) {
      console.error("회원가입 실패:", error)
      showError("회원가입 실패", getErrorMessage(error.code))
    }
  }

  // 성공 후 로그인 페이지로 이동
  const handleSuccessClose = () => {
    setDialogOpen(false)
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="rounded-2xl border border-slate-100 p-8 shadow-sm">
            {/* Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold">회원가입</h1>
              <p className="text-sm text-slate-500">
                멘토스와 함께 대학 생활의 방향을 설계해 보세요
              </p>
            </div>

            {/* Signup Form */}
            <form className="space-y-4" onSubmit={handleSignup}>
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
                  placeholder="6자 이상 입력"
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
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>

              {/* Agreements */}
              <div className="space-y-2 text-sm">
                <label className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 rounded"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                  />
                  <span className="text-slate-600">
                    <Link
                      href="/terms"
                      className="underline hover:text-slate-900"
                    >
                      이용약관
                    </Link>{" "}
                    및{" "}
                    <Link
                      href="/privacy"
                      className="underline hover:text-slate-900"
                    >
                      개인정보처리방침
                    </Link>
                    에 동의합니다 (필수)
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

      {/* 예쁜 팝업 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mb-4 flex justify-center">
              {dialogType === "success" ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
              )}
            </div>
            <DialogTitle className="text-center text-xl">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              {dialogMessage}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 flex justify-center gap-3">
            {dialogType === "success" ? (
              <>
                <Button onClick={handleSuccessClose} className="flex-1">
                  로그인하러 가기
                </Button>
              </>
            ) : (
              <Button onClick={() => setDialogOpen(false)} className="w-full">
                확인
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}