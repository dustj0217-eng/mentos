// app/mypage/mentor/page.tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Heart,
  Phone,
  ShieldCheck,
  Trophy,
  User,
} from "lucide-react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, updatePhoneNumber } from "firebase/auth"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

// ────────────────────────────────────────────────
// 상수
// ────────────────────────────────────────────────
const MENTOR_FIELDS = [
  { id: "major",   label: "전공 / 학업",    icon: BookOpen },
  { id: "career",  label: "취업 / 진로",    icon: Briefcase },
  { id: "life",    label: "인생 고민",      icon: Heart },
  { id: "contest", label: "공모전 / 스펙",  icon: Trophy },
]

// ────────────────────────────────────────────────
// 메인 페이지
// ────────────────────────────────────────────────
export default function MentorApplyPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1) // 0: 인증, 1: 신청서, 2: 완료

  // ── 전화 인증 상태
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)

  // ── 신청서 상태
  const [school, setSchool] = useState("")
  const [major, setMajor] = useState("")
  const [company, setCompany] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [selectedFields, setSelectedFields] = useState<string[]>([])
  const [intro, setIntro] = useState("")
  const [motivation, setMotivation] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // ── 이미 신청/멘토 여부 확인
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const [alreadyMentor, setAlreadyMentor] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login")
        return
      }
      setUser(currentUser)
      try {
        const snap = await getDoc(doc(db, "users", currentUser.uid))
        if (snap.exists()) {
          const data = snap.data()
          if (data.isMentor) setAlreadyMentor(true)
          if (data.mentorStatus === "pending") setAlreadyApplied(true)
        }
      } catch {}
      finally { setLoading(false) }
    })
    return () => unsubscribe()
  }, [router])

  // reCAPTCHA 초기화 (step 0 진입 시)
  useEffect(() => {
    if (step !== 0 || phoneVerified) return
    const timer = setTimeout(() => {
      try {
        if (recaptchaRef.current && !recaptchaVerifierRef.current) {
          recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaRef.current, {
            size: "invisible",
          })
        }
      } catch {}
    }, 300)
    return () => clearTimeout(timer)
  }, [step, phoneVerified])

  // ── OTP 발송
  const handleSendOtp = async () => {
    const cleaned = phone.replace(/[^0-9]/g, "")
    if (cleaned.length < 10) { alert("올바른 전화번호를 입력해주세요"); return }

    setSendingOtp(true)
    try {
      if (!recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, recaptchaRef.current!, {
          size: "invisible",
        })
      }
      // 한국 번호 형식으로 변환 (+82)
      const formatted = "+82" + cleaned.replace(/^0/, "")
      const result = await signInWithPhoneNumber(auth, formatted, recaptchaVerifierRef.current)
      setConfirmationResult(result)
      setOtpSent(true)
    } catch (error: any) {
      console.error("OTP 발송 실패:", error)
      alert("인증번호 발송에 실패했습니다. 전화번호를 확인해주세요.")
      recaptchaVerifierRef.current = null
    } finally {
      setSendingOtp(false)
    }
  }

  // ── OTP 검증
  const handleVerifyOtp = async () => {
    if (!confirmationResult) return
    if (otp.length < 6) { alert("인증번호 6자리를 입력해주세요"); return }

    setVerifyingOtp(true)
    try {
      await confirmationResult.confirm(otp)
      setPhoneVerified(true)
    } catch {
      alert("인증번호가 올바르지 않습니다")
    } finally {
      setVerifyingOtp(false)
    }
  }

  // ── 신청서 제출
  const handleSubmit = async () => {
    if (!school.trim()) { alert("학교를 입력해주세요"); return }
    if (!major.trim()) { alert("전공을 입력해주세요"); return }
    if (selectedFields.length === 0) { alert("멘토링 가능 분야를 선택해주세요"); return }
    if (!intro.trim()) { alert("자기소개를 입력해주세요"); return }
    if (!motivation.trim()) { alert("지원 동기를 입력해주세요"); return }

    setSubmitting(true)
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          isMentor: false,
          mentorStatus: "pending", // 관리자 승인 대기
          mentorAppliedAt: new Date(),
          phoneVerified: true,
          phone: phone.replace(/[^0-9]/g, ""),
          mentorProfile: {
            school,
            major,
            company,
            jobTitle,
            fields: selectedFields,
            intro,
            motivation,
          },
        },
        { merge: true }
      )
      setStep(2)
    } catch (error) {
      console.error("신청 실패:", error)
      alert("신청 중 오류가 발생했습니다")
    } finally {
      setSubmitting(false)
    }
  }

  const toggleField = (id: string) => {
    setSelectedFields((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  // ────────────────────────────────────────────────
  // 로딩 / 예외 처리
  // ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <p className="text-slate-400 text-sm">로딩 중...</p>
      </div>
    )
  }

  // 이미 멘토
  if (alreadyMentor) {
    return (
      <div className="min-h-screen bg-[#f8f7f4]">
        <Header />
        <main className="pt-20 pb-16 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full mx-4 text-center">
            <BadgeCheck className="h-14 w-14 text-indigo-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">이미 멘토입니다</h2>
            <p className="text-slate-500 text-sm mb-6">QnA에서 멘티들의 질문에 답변해보세요.</p>
            <Button onClick={() => router.push("/qna")} className="bg-indigo-600 hover:bg-indigo-500">
              QnA 바로가기
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // 심사 대기 중
  if (alreadyApplied) {
    return (
      <div className="min-h-screen bg-[#f8f7f4]">
        <Header />
        <main className="pt-20 pb-16 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full mx-4 text-center">
            <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-7 w-7 text-amber-500" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">심사 중입니다</h2>
            <p className="text-slate-500 text-sm mb-6">
              멘토 신청서를 검토하고 있습니다.<br />승인되면 알림을 드릴게요.
            </p>
            <Button variant="outline" onClick={() => router.push("/mypage")}>
              마이페이지로
            </Button>
          </div>
        </main>
      </div>
    )
  }

  // ────────────────────────────────────────────────
  // 메인 렌더
  // ────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Header />
      <div ref={recaptchaRef} />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-xl px-4 py-10">
          {/* 뒤로가기 */}
          <Button
            variant="ghost"
            onClick={() => step === 0 ? router.push("/mypage") : setStep(step - 1)}
            className="gap-2 mb-6 -ml-2 text-slate-500"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 0 ? "마이페이지로" : "이전으로"}
          </Button>

          {/* 타이틀 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">멘토 신청</h1>
            <p className="text-sm text-slate-500 mt-1">
              경험을 나눠 멘티들의 고민을 함께 해결해요
            </p>
          </div>

          {/* ── STEP 1: 신청서 ── */}
          {step === 1 && (
            <div className="space-y-4">
              {/* 학력 */}
              <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-indigo-500" />
                  <h2 className="font-bold text-slate-900 text-sm">학력 정보</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">학교명 *</Label>
                    <Input
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="예: 한국대학교"
                      className="border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">전공 *</Label>
                    <Input
                      value={major}
                      onChange={(e) => setMajor(e.target.value)}
                      placeholder="예: 경영학과"
                      className="border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* 직장 */}
              <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="h-4 w-4 text-indigo-500" />
                  <h2 className="font-bold text-slate-900 text-sm">
                    현재 직장 <span className="text-slate-400 font-normal">(선택)</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">회사명</Label>
                    <Input
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="예: 네이버"
                      className="border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">직종/직무</Label>
                    <Input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      placeholder="예: 프론트엔드 개발자"
                      className="border-slate-200 focus:border-indigo-400"
                    />
                  </div>
                </div>
              </div>

              {/* 멘토링 분야 */}
              <div className="bg-white rounded-2xl shadow-sm p-7">
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-indigo-500" />
                  <h2 className="font-bold text-slate-900 text-sm">멘토링 가능 분야 *</h2>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {MENTOR_FIELDS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleField(id)}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition-all ${
                        selectedFields.includes(id)
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-slate-100 bg-slate-50 text-slate-600 hover:border-indigo-200"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span className="text-sm font-semibold">{label}</span>
                      {selectedFields.includes(id) && (
                        <CheckCircle2 className="h-4 w-4 ml-auto text-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* 자기소개 + 동기 */}
              <div className="bg-white rounded-2xl shadow-sm p-7 space-y-5">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-indigo-500" />
                  <h2 className="font-bold text-slate-900 text-sm">자기소개 & 지원 동기</h2>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    자기소개 * <span className="text-slate-400 font-normal">(멘티에게 보여집니다)</span>
                  </Label>
                  <Textarea
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    placeholder="본인의 경험, 전문 분야, 성격 등을 소개해주세요"
                    rows={4}
                    maxLength={500}
                    className="border-slate-200 focus:border-indigo-400 resize-none"
                  />
                  <p className="text-xs text-slate-400 text-right">{intro.length}/500</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-slate-700">
                    멘토 지원 동기 *
                  </Label>
                  <Textarea
                    value={motivation}
                    onChange={(e) => setMotivation(e.target.value)}
                    placeholder="멘토로 활동하고 싶은 이유, 멘티에게 어떤 도움을 주고 싶은지 작성해주세요"
                    rows={4}
                    maxLength={500}
                    className="border-slate-200 focus:border-indigo-400 resize-none"
                  />
                  <p className="text-xs text-slate-400 text-right">{motivation.length}/500</p>
                </div>
              </div>

              {/* 제출 버튼 */}
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-500 h-12 text-base font-semibold gap-2"
              >
                {submitting ? "제출 중..." : "멘토 신청 제출하기"}
                {!submitting && <ArrowRight className="h-4 w-4" />}
              </Button>

              <p className="text-xs text-center text-slate-400">
                검토 후 승인되면 멘토 활동을 시작할 수 있습니다 (보통 1~3일 소요)
              </p>
            </div>
          )}

          {/* ── STEP 2: 완료 ── */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-6">
                <BadgeCheck className="h-10 w-10 text-indigo-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">신청 완료!</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                멘토 신청서가 접수되었습니다.<br />
                검토 후 승인 결과를 알려드릴게요.<br />
                <span className="text-slate-400">(보통 1~3일 소요)</span>
              </p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => router.push("/mypage")}
                  className="flex-1"
                >
                  마이페이지
                </Button>
                <Button
                  onClick={() => router.push("/qna")}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500"
                >
                  QnA 보러가기
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}