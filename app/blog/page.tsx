"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, Calendar, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { posts } from "@/lib/posts"

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6" />
              <h1 className="text-2xl font-bold">블로그</h1>
            </div>
            <p className="text-slate-600">취업, 공모전, 대외활동에 관한 유용한 정보를 만나보세요</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group overflow-hidden rounded-2xl border">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{post.category}</span>
                  <h3 className="mt-2 font-semibold line-clamp-2 group-hover:text-slate-600">{post.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
