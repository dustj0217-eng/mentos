"use client"

import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { hotPosts } from "@/lib/community"
import { MessageCircle, Heart, TrendingUp, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
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
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              글쓰기
            </Button>
          </div>

          {/* 게시글 목록 */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-semibold">실시간 HOT</h2>
            </div>
            <div className="space-y-2">
              {hotPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/community/${post.id}`}
                  className="block bg-white rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      {post.badge && (
                        <span className="inline-flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded px-1.5 py-0.5 mb-2">
                          {post.badge}
                        </span>
                      )}
                      <p className="text-sm font-medium text-slate-900 mb-2">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5" />
                        <span>{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}