"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MessageCircle, Heart, ChevronRight, Flame } from "lucide-react"
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

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

export function CommunityPreviewSection() {
  const [hotPosts, setHotPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHotPosts()
  }, [])

  const loadHotPosts = async () => {
    try {
      const postsRef = collection(db, "posts")
      
      // 좋아요 많은 순으로 최대 3개만 가져오기
      const hotQuery = query(
        postsRef,
        orderBy("likes", "desc"),
        limit(3)
      )
      
      const snapshot = await getDocs(hotQuery)
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[]
      
      setHotPosts(posts)
    } catch (error) {
      console.error("HOT 게시글 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="px-4 py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            <h2 className="text-xl font-bold text-slate-900">HOT 게시판</h2>
          </div>
          <Link 
            href="/community" 
            className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            더 보기
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 게시글 목록 */}
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/4" />
              </div>
            ))}
          </div>
        ) : hotPosts.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-slate-500 mb-2">아직 작성된 글이 없습니다</p>
            <Link 
              href="/community" 
              className="text-sm text-blue-600 hover:underline"
            >
              첫 글을 작성해보세요 →
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {hotPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/community/${post.id}`}
                className="block bg-white rounded-lg p-4 hover:shadow-md transition-all border border-transparent hover:border-slate-200"
              >
                <div className="flex items-start justify-between gap-3">
                  {/* 게시글 내용 */}
                  <div className="flex-1 min-w-0">
                    {/* HOT 뱃지 */}
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded px-2 py-0.5 mb-2">
                        🔥 HOT
                      </span>
                    )}
                    
                    {/* 게시글 제목 */}
                    <p className="text-sm font-medium text-slate-900 line-clamp-1 mb-1">
                      {post.title}
                    </p>

                    {/* 게시글 내용 미리보기 */}
                    {post.content && (
                      <p className="text-xs text-slate-500 line-clamp-1 mb-2">
                        {post.content}
                      </p>
                    )}

                    {/* 작성자 정보 */}
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>조회 {post.views || 0}</span>
                    </div>
                  </div>
                  
                  {/* 통계 (댓글/좋아요) */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                    {/* 댓글 수 */}
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3.5 w-3.5" />
                      <span>{post.commentCount || 0}</span>
                    </div>
                    {/* 좋아요 수 */}
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
      </div>
    </section>
  )
}