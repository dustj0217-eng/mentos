"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

export default function WritePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [nickname, setNickname] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        alert("로그인이 필요합니다")
        router.push("/login")
        return
      }

      setUser(currentUser)

      // 닉네임 가져오기
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid))
        if (userDoc.exists()) {
          setNickname(userDoc.data().nickname || "익명")
        }
      } catch (error) {
        console.error("닉네임 로드 실패:", error)
        setNickname("익명")
      } finally {
        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      alert("제목을 입력해주세요")
      return
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요")
      return
    }

    setSubmitting(true)

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title.trim(),
        content: content.trim(),
        author: nickname || "익명",
        authorId: user.uid,
        createdAt: serverTimestamp(),
        likes: 0,
        commentCount: 0,
        views: 0,
        likedBy: [],
      })

      alert("글이 작성되었습니다!")
      router.push(`/community/${docRef.id}`)
    } catch (error) {
      console.error("글 작성 실패:", error)
      alert("글 작성에 실패했습니다")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="pt-20 px-4 pb-10">
        <div className="mx-auto max-w-3xl">
          {/* 헤더 */}
          <div className="py-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              뒤로가기
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">글쓰기</h1>
          </div>

          {/* 작성 폼 */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="space-y-6">
              {/* 작성자 표시 */}
              <div className="text-sm text-slate-600">
                작성자: <span className="font-medium text-slate-900">{nickname}</span>
              </div>

              {/* 제목 */}
              <div className="space-y-2">
                <Label htmlFor="title">제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력하세요"
                  maxLength={100}
                  required
                />
                <p className="text-xs text-slate-500 text-right">
                  {title.length}/100
                </p>
              </div>

              {/* 내용 */}
              <div className="space-y-2">
                <Label htmlFor="content">내용</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력하세요"
                  rows={15}
                  maxLength={5000}
                  required
                />
                <p className="text-xs text-slate-500 text-right">
                  {content.length}/5000
                </p>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1"
                >
                  {submitting ? "작성 중..." : "작성 완료"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}