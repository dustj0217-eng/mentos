// app/qna/[id]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  BadgeCheck,
  Trash2,
  Eye,
  MessageSquare,
  BookOpen,
  Briefcase,
  Heart,
  Trophy,
  HelpCircle,
  Lock,
} from "lucide-react"
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore"
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

interface Answer {
  id: string
  content: string
  author: string
  authorId: string
  isMentor: boolean
  createdAt: any
}

const CATEGORY_MAP: Record<string, { label: string; icon: any; color: string }> = {
  major:   { label: "전공선택",   icon: BookOpen,    color: "text-violet-600 bg-violet-50" },
  career:  { label: "취업/진로",  icon: Briefcase,   color: "text-blue-600 bg-blue-50" },
  life:    { label: "인생고민",   icon: Heart,       color: "text-rose-600 bg-rose-50" },
  contest: { label: "공모전/스펙", icon: Trophy,      color: "text-amber-600 bg-amber-50" },
  other:   { label: "기타",      icon: HelpCircle,  color: "text-slate-600 bg-slate-100" },
}

export default function QnaDetailPage() {
  const router = useRouter()
  const params = useParams()
  const questionId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [isMentor, setIsMentor] = useState(false)
  const [userNickname, setUserNickname] = useState("")

  const [question, setQuestion] = useState<Question | null>(null)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [loading, setLoading] = useState(true)

  const [answerText, setAnswerText] = useState("")
  const [submitting, setSubmitting] = useState(false)

  // 인증 + 유저 정보
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid))
          if (userDoc.exists()) {
            const data = userDoc.data()
            setUserNickname(data.nickname || "사용자")
            setIsMentor(data.isMentor || false)
          }
        } catch (error) {
          console.error("유저 정보 로드 실패:", error)
        }
      }
    })
    return () => unsubscribe()
  }, [])

  // 질문 + 답변 로드
  useEffect(() => {
    if (questionId) {
      loadQuestion()
      loadAnswers()
      incrementViews()
    }
  }, [questionId])

  const loadQuestion = async () => {
    try {
      const snap = await getDoc(doc(db, "questions", questionId))
      if (snap.exists()) {
        setQuestion({ id: snap.id, ...snap.data() } as Question)
      } else {
        alert("질문을 찾을 수 없습니다")
        router.push("/qna")
      }
    } catch (error) {
      console.error("질문 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadAnswers = async () => {
    try {
      const ref = collection(db, "questions", questionId, "answers")
      const q = query(ref, orderBy("createdAt", "asc"))
      const snap = await getDocs(q)
      setAnswers(snap.docs.map((d) => ({ id: d.id, ...d.data() })) as Answer[])
    } catch (error) {
      console.error("답변 로드 실패:", error)
    }
  }

  const incrementViews = async () => {
    try {
      await updateDoc(doc(db, "questions", questionId), { views: increment(1) })
    } catch {}
  }

  const handleAnswerSubmit = async () => {
    if (!user) { alert("로그인이 필요합니다"); router.push("/login"); return }
    if (!isMentor) { alert("멘토만 답변할 수 있습니다"); return }
    if (!answerText.trim()) { alert("답변 내용을 입력해주세요"); return }

    setSubmitting(true)
    try {
      await addDoc(collection(db, "questions", questionId, "answers"), {
        content: answerText.trim(),
        author: userNickname,
        authorId: user.uid,
        isMentor: true,
        createdAt: serverTimestamp(),
      })

      await updateDoc(doc(db, "questions", questionId), {
        answerCount: increment(1),
        hasAnswer: true,
      })

      setAnswerText("")
      loadAnswers()
      if (question) {
        setQuestion({ ...question, answerCount: question.answerCount + 1, hasAnswer: true })
      }
    } catch (error) {
      console.error("답변 작성 실패:", error)
      alert("답변 작성에 실패했습니다")
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteQuestion = async () => {
    if (!confirm("질문을 삭제하시겠습니까?")) return
    try {
      await deleteDoc(doc(db, "questions", questionId))
      router.push("/qna")
    } catch {
      alert("삭제에 실패했습니다")
    }
  }

  const handleDeleteAnswer = async (answerId: string) => {
    if (!confirm("답변을 삭제하시겠습니까?")) return
    try {
      await deleteDoc(doc(db, "questions", questionId, "answers", answerId))
      await updateDoc(doc(db, "questions", questionId), { answerCount: increment(-1) })
      loadAnswers()
      if (question) {
        setQuestion({ ...question, answerCount: question.answerCount - 1 })
      }
    } catch {
      alert("삭제에 실패했습니다")
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString("ko-KR", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f7f4]">
        <p className="text-slate-400 text-sm">로딩 중...</p>
      </div>
    )
  }

  if (!question) return null

  const categoryInfo = CATEGORY_MAP[question.category] ?? CATEGORY_MAP["other"]
  const CategoryIcon = categoryInfo.icon
  const isAuthor = user?.uid === question.authorId

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      <Header />

      <main className="pt-20 pb-16">
        <div className="mx-auto max-w-3xl px-4 py-8">
          {/* 뒤로가기 */}
          <Button
            variant="ghost"
            onClick={() => router.push("/qna")}
            className="gap-2 mb-6 -ml-2 text-slate-500"
          >
            <ArrowLeft className="h-4 w-4" />
            목록으로
          </Button>

          {/* 질문 카드 */}
          <article className="bg-white rounded-2xl shadow-sm overflow-hidden mb-4">
            {/* 카테고리 + 제목 */}
            <div className="p-7 border-b border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${categoryInfo.color}`}>
                  <CategoryIcon className="h-3 w-3" />
                  {categoryInfo.label}
                </span>
                {question.hasAnswer ? (
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    ✓ 답변완료
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                    답변대기
                  </span>
                )}
              </div>

              <h1 className="text-xl font-bold text-slate-900 mb-5 leading-snug">
                {question.title}
              </h1>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-medium text-slate-700">{question.author}</span>
                  <span>·</span>
                  <span>{formatDate(question.createdAt)}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <div className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{question.views || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>{question.answerCount || 0}</span>
                  </div>
                  {isAuthor && (
                    <button onClick={handleDeleteQuestion} className="text-red-400 hover:text-red-600 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 본문 */}
            <div className="p-7">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                {question.content}
              </p>
            </div>
          </article>

          {/* 답변 목록 */}
          <div className="mb-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3 px-1">
              멘토 답변 {answers.length > 0 && `(${answers.length})`}
            </h2>

            {answers.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                <p className="text-slate-400 text-sm">아직 답변이 없습니다</p>
                <p className="text-slate-300 text-xs mt-1">멘토의 첫 답변을 기다리고 있어요</p>
              </div>
            ) : (
              <div className="space-y-3">
                {answers.map((answer) => (
                  <div key={answer.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {/* 멘토 헤더 */}
                    <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-slate-50 border-b border-indigo-100/60">
                      <div className="flex items-center gap-2.5">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold text-sm">
                          {answer.author[0]?.toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-900">{answer.author}</span>
                            {answer.isMentor && (
                              <span className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-100 px-1.5 py-0.5 rounded-full">
                                <BadgeCheck className="h-2.5 w-2.5" />
                                멘토
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-400">{formatDate(answer.createdAt)}</p>
                        </div>
                      </div>
                      {user?.uid === answer.authorId && (
                        <button
                          onClick={() => handleDeleteAnswer(answer.id)}
                          className="text-slate-300 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* 답변 본문 */}
                    <div className="px-6 py-5">
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-sm">
                        {answer.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 답변 작성 */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-500" />
                답변 작성
                <span className="text-xs font-normal text-slate-400 ml-1">멘토 전용</span>
              </h3>
            </div>

            <div className="p-6">
              {!user ? (
                /* 비로그인 */
                <div className="text-center py-6">
                  <Lock className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm mb-4">답변을 작성하려면 로그인이 필요합니다</p>
                  <Button onClick={() => router.push("/login")} variant="outline" size="sm">
                    로그인하기
                  </Button>
                </div>
              ) : !isMentor ? (
                /* 로그인 했지만 멘토 아님 */
                <div className="text-center py-6">
                  <BadgeCheck className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm mb-1">멘토만 답변을 작성할 수 있습니다</p>
                  <p className="text-slate-400 text-xs mb-4">마이페이지에서 멘토 신청을 해보세요</p>
                  <Button onClick={() => router.push("/mypage")} variant="outline" size="sm">
                    멘토 신청하러 가기
                  </Button>
                </div>
              ) : (
                /* 멘토 - 답변 작성 폼 */
                <div>
                  <div className="flex items-center gap-2 mb-3 text-xs text-indigo-600 font-semibold">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {userNickname} 멘토로 작성됩니다
                  </div>
                  <Textarea
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder={`질문자에게 도움이 될 경험이나 조언을 공유해주세요.\n\n구체적인 경험과 솔직한 이야기가 멘티에게 큰 힘이 됩니다 :)`}
                    rows={6}
                    className="border-slate-200 focus:border-indigo-400 focus:ring-indigo-400 resize-none mb-3"
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleAnswerSubmit}
                      disabled={submitting}
                      className="bg-indigo-600 hover:bg-indigo-500 gap-2"
                    >
                      <MessageSquare className="h-4 w-4" />
                      {submitting ? "작성 중..." : "답변 등록하기"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}