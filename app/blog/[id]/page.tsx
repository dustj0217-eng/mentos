import { posts } from "@/lib/posts"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  const post = posts.find((p) => p.id === Number(params.id))

  if (!post) return notFound()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      
      <article className="mx-auto max-w-3xl px-4 py-10">
        {/* 카테고리 태그 */}
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">
          {post.category}
        </span>
        
        {/* 제목 */}
        <h1 className="text-3xl font-bold mb-4 mt-4">{post.title}</h1>
        
        {/* 메타 정보 */}
        <div className="mb-6 text-sm text-slate-500 flex items-center gap-4">
          <span>{post.author}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        
        {/* 본문 - HTML을 렌더링 */}
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      
      <Footer />
    </div>
  )
}
