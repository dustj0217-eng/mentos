"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MessageCircle, Heart, TrendingUp, Plus, Clock, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { collection, query, orderBy, limit, getDocs, where } from "firebase/firestore"
import { db, auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"

interface Post {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  createdAt: any
  likes: number
  commentCount: number
  views: number
}

export default function CommunityPage() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [hotPosts, setHotPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"recent" | "hot">("hot")

  // 사용자 인증 상태 확인
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  // 게시글 불러오기
  useEffect(() => {
    loadPosts()
  }, [activeTab])

  const loadPosts = async () => {
    setLoading(true)
    try {
      const postsRef = collection(db, "posts")
      
      if (activeTab === "hot") {
        // HOT 게시글 (좋아요 + 댓글 많은 순)
        const hotQuery = query(
          postsRef,
          orderBy("likes", "desc"),
          limit(20)
        )
        const hotSnap = await getDocs(hotQuery)
        const hotData = hotSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[]
        setHotPosts(hotData)
      } else {
        // 최신 게시글
        const recentQuery = query(
          postsRef,
          orderBy("createdAt", "desc"),
          limit(30)
        )
        const recentSnap = await getDocs(recentQuery)
        const recentData = recentSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Post[]
        setPosts(recentData)
      }
    } catch (error) {
      console.error("게시글 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleWritePost = () => {
    if (!user) {
      alert("로그인이 필요합니다")
      router.push("/login")
      return
    }
    router.push("/community/write")
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
    
    return date.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })
  }

  const displayPosts = activeTab === "hot" ? hotPosts : posts

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="pt-20 px-4 pb-10">
        <div className="mx-auto max-w-4xl">
          {/* 헤더 */}
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">커뮤니티</h1>
              <p className="text-sm text-slate-600 mt-1">우리 학교 이야기를 나눠요</p>
            </div>
            <Button onClick={handleWritePost} className="gap-2">
              <Plus className="h-4 w-4" />
              글쓰기
            </Button>
          </div>

          {/* 탭 */}
          <div className="flex gap-2 mb-4 border-b">
            <button
              onClick={() => setActiveTab("hot")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === "hot"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Flame className="h-4 w-4" />
              HOT
            </button>
            <button
              onClick={() => setActiveTab("recent")}
              className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors ${
                activeTab === "recent"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Clock className="h-4 w-4" />
              최신
            </button>
          </div>

          {/* 게시글 목록 */}
          <section>
            {loading ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-slate-200 rounded w-1/4" />
                  </div>
                ))}
              </div>
            ) : displayPosts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center">
                <p className="text-slate-500">아직 작성된 글이 없습니다</p>
                <Button onClick={handleWritePost} className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  첫 글 작성하기
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {displayPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    href={`/community/${post.id}`}
                    className="block bg-white rounded-lg p-4 hover:shadow-md transition-all border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {activeTab === "hot" && index < 3 && (
                          <span className="inline-flex items-center justify-center bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded px-2 py-0.5 mb-2">
                            🔥 HOT {index + 1}
                          </span>
                        )}
                        <p className="text-sm font-medium text-slate-900 mb-1 line-clamp-2">
                          {post.title}
                        </p>
                        {post.content && (
                          <p className="text-xs text-slate-500 mb-2 line-clamp-1">
                            {post.content}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{formatDate(post.createdAt)}</span>
                          <span>·</span>
                          <span>조회 {post.views || 0}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>{post.commentCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3.5 w-3.5 text-red-400" />
                          <span>{post.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}