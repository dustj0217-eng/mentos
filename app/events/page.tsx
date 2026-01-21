// app/events/page.tsx

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

const eventList = [
  {
    id: 'study-recruitment',
    title: "스터디 모집",
    subtitle: "공부하고 돈 받아가자",
    image: "/images/003.png",
    status: "ongoing",
    endDate: "2026.02.28",
    prize: "최대 50만원",
  },
  {
    id: 'instagram-follow',
    title: "인스타그램 팔로우 이벤트",
    subtitle: "팔로우하고 기프티콘 받자",
    image: "/images/002.png",
    status: "ongoing",
    endDate: "2026.01.31",
    prize: "스타벅스 아메리카노",
  },
  {
    id: 'student-concerns',
    title: "대학생 고민 상담",
    subtitle: "고민을 나누고 함께 해결해요",
    image: "/images/004.png", // 이미지 추가 필요
    status: "ongoing",
    endDate: "2026.12.31",
    prize: "무료 멘토링",
  },
  {
    id: 'contest-review',
    title: "공모전 후기 공유",
    subtitle: "경험을 나누고 포인트 받자",
    image: "/images/005.png", // 이미지 추가 필요
    status: "ongoing",
    endDate: "2026.12.31",
    prize: "3,000P",
  },
  {
    id: 'career-survey',
    title: "진로 설문조사",
    subtitle: "설문 참여하고 상품권 받자",
    image: "/images/006.png", // 이미지 추가 필요
    status: "ongoing",
    endDate: "2026.03.31",
    prize: "1만원 상품권 추첨",
  }
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 px-4">
        <div className="mx-auto max-w-6xl py-12">
          <h1 className="text-3xl font-bold mb-2">이벤트</h1>
          <p className="text-slate-600 mb-12">멘토스와 함께하는 특별한 혜택</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {eventList.map((event) => (
              <Link 
                key={event.id} 
                href={`/events/${event.id}`}
                className="group"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-200 mb-4">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full font-medium">
                    진행중
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                <p className="text-slate-600 mb-3">{event.subtitle}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-600 font-semibold">{event.prize}</span>
                  <span className="text-slate-500">~ {event.endDate}</span>
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