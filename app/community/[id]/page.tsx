"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeft, 
  Heart, 
  MessageCircle, 
  Eye, 
  Trash2,
  MoreVertical 
} from "lucide-react"
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
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

interface Post {
  id: string
  title: string
  content: string
  author: string
  authorId: string
  createdAt: any
  likes: number
  likedBy: string[]
  commentCount: number
  views: number
}

interface Comment {
  id: string
  content: string
  author: string
  authorId: string
  createdAt: any
}

export default function PostDetailPage() {
  const router = useRouter()
  const params = useParams()
  const postId = params.id as string

  const [user, setUser] = useState<any>(null)
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [commentText, setCommentText] = useState("")
  const [submittingComment, setSubmittingComment] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (postId) {
      loadPost()
      loadComments()
      incrementViews()
    }
  }, [postId])

  const loadPost = async () => {
    try {
      const docRef = doc(db, "posts", postId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setPost({
          id: docSnap.id,
          ...docSnap.data(),
        } as Post)
      } else {
        alert("게시글을 찾을 수 없습니다")
        router.push("/community")
      }
    } catch (error) {
      console.error("게시글 로드 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadComments = async () => {
    try {
      const commentsRef = collection(db, "posts", postId, "comments")
      const q = query(commentsRef, orderBy("createdAt", "desc"))
      const snapshot = await getDocs(q)

      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[]

      setComments(commentsData)
    } catch (error) {
      console.error("댓글 로드 실패:", error)
    }
  }

  const incrementViews = async () => {
    try {
      const docRef = doc(db, "posts", postId)
      await updateDoc(docRef, {
        views: increment(1),
      })
    } catch (error) {
      console.error("조회수 증가 실패:", error)
    }
  }

  const handleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다")
      router.push("/login")
      return
    }

    if (!post) return

    const isLiked = post.likedBy?.includes(user.uid)
    const docRef = doc(db, "posts", postId)

    try {
      if (isLiked) {
        // 좋아요 취소
        await updateDoc(docRef, {
          likes: increment(-1),
          likedBy: arrayRemove(user.uid),
        })
        setPost({
          ...post,
          likes: post.likes - 1,
          likedBy: post.likedBy.filter((id) => id !== user.uid),
        })
      } else {
        // 좋아요
        await updateDoc(docRef, {
          likes: increment(1),
          likedBy: arrayUnion(user.uid),
        })
        setPost({
          ...post,
          likes: post.likes + 1,
          likedBy: [...(post.likedBy || []), user.uid],
        })
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error)
      alert("좋아요 처리에 실패했습니다")
    }
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("로그인이 필요합니다")
      router.push("/login")
      return
    }

    if (!commentText.trim()) {
      alert("댓글 내용을 입력하세요")
      return
    }

    setSubmittingComment(true)

    try {
      // 사용자 닉네임 가져오기
      const userDoc = await getDoc(doc(db, "users", user.uid))
      const nickname = userDoc.exists() ? userDoc.data().nickname : "익명"

      // 댓글 추가
      const commentsRef = collection(db, "posts", postId, "comments")
      await addDoc(commentsRef, {
        content: commentText.trim(),
        author: nickname,
        authorId: user.uid,
        createdAt: serverTimestamp(),
      })

      // 게시글 댓글 수 증가
      const docRef = doc(db, "posts", postId)
      await updateDoc(docRef, {
        commentCount: increment(1),
      })

      setCommentText("")
      loadComments()

      if (post) {
        setPost({
          ...post,
          commentCount: post.commentCount + 1,
        })
      }
    } catch (error) {
      console.error("댓글 작성 실패:", error)
      alert("댓글 작성에 실패했습니다")
    } finally {
      setSubmittingComment(false)
    }
  }

  const handleDeletePost = async () => {
    if (!confirm("정말로 삭제하시겠습니까?")) return

    try {
      await deleteDoc(doc(db, "posts", postId))
      alert("게시글이 삭제되었습니다")
      router.push("/community")
    } catch (error) {
      console.error("삭제 실패:", error)
      alert("삭제에 실패했습니다")
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return

    try {
      await deleteDoc(doc(db, "posts", postId, "comments", commentId))
      await updateDoc(doc(db, "posts", postId), {
        commentCount: increment(-1),
      })

      loadComments()
      if (post) {
        setPost({
          ...post,
          commentCount: post.commentCount - 1,
        })
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error)
      alert("삭제에 실패했습니다")
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">로딩 중...</p>
      </div>
    )
  }

  if (!post) {
    return null
  }

  const isLiked = post.likedBy?.includes(user?.uid || "")
  const isAuthor = user?.uid === post.authorId

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="pt-20 px-4 pb-10">
        <div className="mx-auto max-w-3xl">
          {/* 헤더 */}
          <div className="py-6">
            <Button
              variant="ghost"
              onClick={() => router.push("/community")}
              className="gap-2 mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              목록으로
            </Button>
          </div>

          {/* 게시글 */}
          <article className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* 제목 및 정보 */}
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                {post.title}
              </h1>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="font-medium">{post.author}</span>
                  <span>·</span>
                  <span>{formatDate(post.createdAt)}</span>
                </div>

                <div className="flex items-center gap-4 text-slate-500">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{post.views}</span>
                  </div>
                  {isAuthor && (
                    <button
                      onClick={handleDeletePost}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* 내용 */}
            <div className="p-6">
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-wrap text-slate-700">
                  {post.content}
                </p>
              </div>
            </div>

            {/* 좋아요 버튼 */}
            <div className="p-6 border-t flex justify-center">
              <Button
                variant={isLiked ? "default" : "outline"}
                onClick={handleLike}
                className="gap-2"
              >
                <Heart
                  className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                좋아요 {post.likes}
              </Button>
            </div>
          </article>

          {/* 댓글 섹션 */}
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              댓글 {post.commentCount}
            </h2>

            {/* 댓글 작성 */}
            <div className="mb-6">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder={
                  user
                    ? "댓글을 입력하세요"
                    : "댓글을 작성하려면 로그인하세요"
                }
                rows={3}
                disabled={!user}
                className="mb-2"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!user || submittingComment}
                  size="sm"
                >
                  {submittingComment ? "작성 중..." : "댓글 작성"}
                </Button>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-center text-slate-500 py-8">
                  첫 댓글을 남겨보세요!
                </p>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-900">
                          {comment.author}
                        </span>
                        <span className="text-xs text-slate-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      {user?.uid === comment.authorId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-slate-700 whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}