// app/qna/write/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft, BookOpen, Briefcase, Heart, Trophy, HelpCircle } from "lucide-react"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

const CATEGORIES = [
  { id: "major", label: "전공선택", icon: BookOpen, desc: "전공 선택, 복수전공, 편입 등" },
  { id: "career", label: "취업/진로", icon: Briefcase, desc: "취업 준비, 직종 선택, 이직 등" },
  { id: "life", label: "인생고민", icon: Heart, desc: "인간관계, 가치관, 슬럼프 등" },
  { id: "contest", label: "공모전/스펙", icon: Trophy, desc: "공모전, 자격증, 대외활동 등" },
  { id: "other", label: "기타", icon: HelpCircle, desc: "그 외 궁금한 것들" },
]

export default function QnaWritePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [userNickname, setUserNickname] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        alert("로그인이 필요합니다")
        router.push("/login")
        return
      }
      setUser(currentUser)

      try {
        const { doc, getDoc } = await import("firebase/firestore")
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        if (userDoc.exists()) {
          setUserNickname(userDoc.data().nickname || "사용자")
        } else {
          setUserNickname("사용자")
        }
      } catch {
        setUserNickname("사용자")
      } finally {
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) { alert("제목을 입력해주세요"); return }
    if (!content.trim()) { alert("내용을 입력해주세요"); return }
    if (!selectedCategory) { alert("카테고리를 선택해주세요"); return }

    setSubmitting(true)
    try {
      const docRef = await addDoc(collection(db, "questions"), {
        title: title.trim(),
        content: content.trim(),
        category: selectedCategory,
        author: isAnonymous ? "익명" : userNickname,
        authorId: user.uid,
        createdAt: serverTimestamp(),
        answerCount: 0,
        hasAnswer: false,
        views: 0,
      })
      router.push(`/qna/${docRef.id}`)
    } catch (error) {
      console.error("질문 등록 실패:", error)
      alert("질문 등록에 실패했습니다")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <p className="text-slate-400 text-sm">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Header />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-2xl px-4 py-8">
          {/* 상단 */}
          <div className="mb-8">
            <Button variant="ghost" onClick={() => router.back()} className="gap-2 mb-5 -ml-2 text-slate-500">
              <ArrowLeft className="h-4 w-4" />
              뒤로가기
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">질문 작성</h1>
            <p className="text-sm text-slate-500 mt-1">멘토에게 궁금한 것을 질문해보세요</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* 카테고리 선택 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Label className="text-sm font-semibold text-slate-700 block mb-3">
                카테고리 <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {CATEGORIES.map(({ id, label, icon: Icon, desc }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelectedCategory(id)}
                    className={`flex flex-col items-start gap-1 rounded-xl border-2 p-3.5 text-left transition-all ${
                      selectedCategory === id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-slate-100 bg-slate-50 hover:border-indigo-200 hover:bg-indigo-50/50"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 mb-0.5 ${
                        selectedCategory === id ? "text-indigo-600" : "text-slate-400"
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold ${
                        selectedCategory === id ? "text-indigo-700" : "text-slate-700"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-[10px] text-slate-400 leading-snug">{desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 제목 + 내용 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-5">
              {/* 작성자 */}
              <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl text-sm">
                <span className="text-slate-500 font-medium">작성자</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={!isAnonymous}
                    onChange={() => setIsAnonymous(false)}
                    className="accent-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">{userNickname}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(true)}
                    className="accent-indigo-500"
                  />
                  <span className="text-slate-700 font-medium">익명</span>
                </label>
              </div>

              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold text-slate-700">
                  제목 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="질문을 한 줄로 요약해주세요"
                  maxLength={100}
                  className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
                <p className="text-xs text-slate-400 text-right">{title.length}/100</p>
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content" className="text-sm font-semibold text-slate-700">
                  내용 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`구체적으로 작성할수록 좋은 답변을 받을 수 있어요.\n\n예) 현재 상황, 고민하게 된 계기, 원하는 조언 방향 등`}
                  rows={12}
                  maxLength={3000}
                  className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 resize-none"
                />
                <p className="text-xs text-slate-400 text-right">{content.length}/3000</p>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1 border-slate-200"
              >
                취소
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500"
              >
                {submitting ? "등록 중..." : "질문 등록하기"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}