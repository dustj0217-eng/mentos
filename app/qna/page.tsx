// app/qna/page.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, CheckCircle2, Clock, ChevronRight, Search, BookOpen, Briefcase, Heart, Trophy, HelpCircle } from "lucide-react"
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface Question {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  category: string
  createdAt: any
  answerCount: number
  hasAnswer: boolean
  views: number
}

const CATEGORIES = [
  { id: "all", label: "전체", icon: HelpCircle },
  { id: "major", label: "전공선택", icon: BookOpen },
  { id: "career", label: "취업/진로", icon: Briefcase },
  { id: "life", label: "인생고민", icon: Heart },
  { id: "contest", label: "공모전/스펙", icon: Trophy },
]

export default function QnaPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    loadQuestions()
  }, [activeCategory])

  const loadQuestions = async () => {
    setLoading(true)
    try {
      const qnaRef = collection(db, "questions")
      let q

      if (activeCategory === "all") {
        q = query(qnaRef, orderBy("createdAt", "desc"), limit(30))
      } else {
        q = query(
          qnaRef,
          where("category", "==", activeCategory),
          orderBy("createdAt", "desc"),
          limit(30)
        )
      }

      const snap = await getDocs(q)
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[]
      setQuestions(data)
    } catch (error) {
      console.error("질문 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWrite = () => {
    if (!user) {
      alert("로그인이 필요합니다")
      router.push("/login")
      return
    }
    router.push("/qna/write")
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)
    if (minutes < 1) return "방금 전"
    if (minutes < 60) return `${minutes}분 전`
    if (hours < 24) return `${hours}시간 전`
    if (days < 7) return `${days}일 전`
    return date.toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
  }

  const getCategoryLabel = (id: string) => {
    return CATEGORIES.find((c) => c.id === id)?.label ?? id
  }

  const filtered = questions.filter(
    (q) =>
      searchText === "" ||
      q.title.toLowerCase().includes(searchText.toLowerCase()) ||
      q.content.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Header />

      <main className="pt-20 pb-16">
        {/* 히어로 헤더 */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
          <div className="mx-auto max-w-4xl px-4 py-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-indigo-300 text-sm font-semibold tracking-widest uppercase mb-2">
                  Mentor Q&A
                </p>
                <h1 className="text-3xl font-bold mb-2 leading-tight">
                  궁금한 것을 물어보세요
                </h1>
                <p className="text-slate-400 text-sm">
                  현직 멘토들이 직접 답변해드립니다
                </p>
              </div>
              <Button
                onClick={handleWrite}
                className="shrink-0 bg-indigo-500 hover:bg-indigo-400 text-white gap-2 shadow-lg shadow-indigo-900/40"
              >
                <Plus className="h-4 w-4" />
                질문하기
              </Button>
            </div>

            {/* 검색 */}
            <div className="mt-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="질문 검색..."
                className="w-full bg-white/10 text-white placeholder:text-slate-400 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/15 transition-all"
              />
            </div>
          </div>

          {/* 카테고리 탭 */}
          <div className="border-t border-white/10">
            <div className="mx-auto max-w-4xl px-4">
              <div className="flex gap-1 overflow-x-auto scrollbar-hide py-1">
                {CATEGORIES.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveCategory(id)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === id
                        ? "text-white border-b-2 border-indigo-400"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 질문 목록 */}
        <div className="mx-auto max-w-4xl px-4 mt-6">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-5 animate-pulse">
                  <div className="h-4 bg-slate-100 rounded w-2/3 mb-3" />
                  <div className="h-3 bg-slate-100 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-14 text-center shadow-sm">
              <div className="text-4xl mb-4">🤔</div>
              <p className="text-slate-500 mb-4 font-medium">
                {searchText ? "검색 결과가 없습니다" : "아직 질문이 없습니다"}
              </p>
              <Button onClick={handleWrite} className="gap-2">
                <Plus className="h-4 w-4" />
                첫 질문 남기기
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((question) => (
                <Link
                  key={question.id}
                  href={`/qna/${question.id}`}
                  className="group block bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-indigo-100"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* 카테고리 + 답변 상태 뱃지 */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                          {getCategoryLabel(question.category)}
                        </span>
                        {question.hasAnswer ? (
                          <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="h-3 w-3" />
                            답변완료
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                            <Clock className="h-3 w-3" />
                            답변대기
                          </span>
                        )}
                      </div>

                      <p className="text-sm font-semibold text-slate-900 mb-1.5 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                        {question.title}
                      </p>
                      {question.content && (
                        <p className="text-xs text-slate-400 mb-3 line-clamp-1">
                          {question.content}
                        </p>
                      )}

                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{question.author}</span>
                        <span>·</span>
                        <span>{formatDate(question.createdAt)}</span>
                        <span>·</span>
                        <span>조회 {question.views || 0}</span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                        question.answerCount > 0
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-slate-400 bg-slate-50"
                      }`}>
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>{question.answerCount || 0}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}