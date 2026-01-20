import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Target, Users, Lightbulb, Award } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "목표 달성",
    description: "대학생의 취업 목표 달성을 위한 정확한 정보를 제공합니다",
  },
  {
    icon: Users,
    title: "커뮤니티",
    description: "경험자와 준비생이 함께 성장하는 커뮤니티를 만들어갑니다",
  },
  {
    icon: Lightbulb,
    title: "인사이트",
    description: "실무 경험에서 얻은 진짜 인사이트를 공유합니다",
  },
  {
    icon: Award,
    title: "신뢰성",
    description: "검증된 정보만을 선별하여 제공합니다",
  },
]

const stats = [
  { value: "50만+", label: "누적 사용자" },
  { value: "1,200+", label: "등록 공모전" },
  { value: "500+", label: "현직자 멘토" },
  { value: "95%", label: "만족도" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-slate-900 px-4 py-20 text-white">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              대학생의 성공적인 취업을 위한
              <br />
              실전 정보 플랫폼
            </h1>
            <p className="text-lg text-slate-300">
              멘토스는 대학생들이 취업 준비 과정에서 겪는 정보 비대칭 문제를
              <br className="hidden md:block" />
              해결하기 위해 2024년에 시작되었습니다.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b px-4 py-12">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-bold">우리의 미션</h2>
            <p className="text-lg text-slate-600">
              "모든 대학생이 공정한 정보 접근을 통해
              <br />
              자신의 잠재력을 최대한 발휘할 수 있도록 돕는다"
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="bg-slate-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-2xl font-bold">핵심 가치</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div key={value.title} className="rounded-2xl bg-white p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{value.title}</h3>
                  <p className="text-sm text-slate-500">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-2xl font-bold">팀 소개</h2>
            <p className="mb-8 text-slate-600">
              멘토스 팀은 대기업, 스타트업, 컨설팅 등 다양한 분야의
              <br className="hidden md:block" />
              취업 경험을 가진 전문가들로 구성되어 있습니다.
            </p>
            <div className="grid grid-cols-3 gap-4 md:grid-cols-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-square rounded-2xl bg-slate-100" />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
