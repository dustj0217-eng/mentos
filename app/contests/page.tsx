import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Calendar, Award } from "lucide-react"
import { Button } from "@/components/ui/button"

const contests = [
  {
    id: 1,
    title: "2026 대학생 마케팅 공모전",
    organizer: "삼성전자",
    deadline: "2026.02.28",
    category: "마케팅",
    prize: "총 상금 1,000만원",
  },
  {
    id: 2,
    title: "청년 창업 아이디어 공모전",
    organizer: "중소벤처기업부",
    deadline: "2026.03.15",
    category: "창업",
    prize: "총 상금 5,000만원",
  },
  {
    id: 3,
    title: "UX/UI 디자인 챌린지",
    organizer: "네이버",
    deadline: "2026.02.20",
    category: "디자인",
    prize: "총 상금 2,000만원",
  },
  {
    id: 4,
    title: "콘텐츠 기획 공모전",
    organizer: "카카오",
    deadline: "2026.03.10",
    category: "기획",
    prize: "총 상금 1,500만원",
  },
  {
    id: 5,
    title: "AI 서비스 아이디어 공모전",
    organizer: "SK텔레콤",
    deadline: "2026.04.01",
    category: "IT/SW",
    prize: "총 상금 3,000만원",
  },
  {
    id: 6,
    title: "친환경 캠페인 공모전",
    organizer: "환경부",
    deadline: "2026.03.30",
    category: "환경",
    prize: "총 상금 800만원",
  },
]

const categories = ["전체", "마케팅", "디자인", "기획", "IT/SW", "창업", "환경"]

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-slate-900 px-4 py-16 text-white">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl">공모전</h1>
            <p className="text-slate-300">대학생을 위한 최신 공모전 정보를 한눈에 확인하세요</p>
          </div>
        </section>

        {/* Search & Filter */}
        <section className="border-b px-4 py-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input type="text" placeholder="공모전 검색..." className="flex-1 bg-transparent text-sm outline-none" />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((cat) => (
                <Button key={cat} variant={cat === "전체" ? "default" : "outline"} size="sm" className="shrink-0">
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Contest List */}
        <section className="px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {contests.map((contest) => (
                <Link
                  key={contest.id}
                  href={`/contests/${contest.id}`}
                  className="group rounded-2xl border p-6 hover:border-slate-300"
                >
                  <div className="mb-4 aspect-[16/9] rounded-xl bg-slate-100" />
                  <span className="mb-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-medium">
                    {contest.category}
                  </span>
                  <h3 className="mb-2 font-semibold group-hover:text-slate-600">{contest.title}</h3>
                  <p className="mb-3 text-sm text-slate-500">{contest.organizer}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {contest.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {contest.prize}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
