"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Users } from "lucide-react"

export default function YouthPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-6 w-6" />
              <h1 className="text-2xl font-bold">청소년보호정책</h1>
            </div>
            <p className="text-slate-600">시행일: 2026년 1월 1일</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <p>
              멘토스(이하 "회사")는 청소년이 건전한 인격체로 성장할 수 있도록 하기 위하여 「청소년보호법」에 따라
              청소년보호정책을 수립하고 시행하고 있습니다.
            </p>

            <h2>1. 청소년보호를 위한 기본 원칙</h2>
            <p>
              회사는 청소년이 정신적·신체적으로 유해한 환경으로부터 보호받을 수 있도록 유해정보로부터 청소년을 보호하기
              위한 기술적 조치를 강구합니다.
            </p>

            <h2>2. 유해정보에 대한 청소년접근제한 및 관리조치</h2>
            <p>회사는 청소년이 아무런 제한장치 없이 유해정보에 노출되지 않도록 다음과 같은 조치를 취하고 있습니다.</p>
            <ul>
              <li>청소년유해매체물로 결정·고시된 것은 청소년보호법에 따라 청소년의 접근을 차단합니다.</li>
              <li>유해정보가 게시될 경우 지체 없이 삭제하거나 청소년의 접근을 제한합니다.</li>
              <li>청소년유해정보가 포함된 게시물은 별도의 연령 확인 절차를 거쳐야만 접근이 가능하도록 합니다.</li>
            </ul>

            <h2>3. 유해정보로부터 청소년을 보호하기 위한 조치</h2>
            <ul>
              <li>회원가입 시 생년월일 확인을 통해 청소년 여부를 확인합니다.</li>
              <li>청소년에게 유해한 정보에 대해서는 인증 절차를 거치도록 합니다.</li>
              <li>청소년 유해매체물의 표시 의무를 성실히 이행합니다.</li>
            </ul>

            <h2>4. 청소년보호 책임자 지정</h2>
            <p>
              회사는 청소년보호 업무를 효율적으로 수행하기 위하여 다음과 같이 청소년보호 책임자를 지정하고 있습니다.
            </p>
            <ul>
              <li>성명: 김청소년</li>
              <li>직책: 청소년보호책임자</li>
              <li>이메일: youth@mentos.kr</li>
              <li>전화: 02-1234-5678</li>
            </ul>

            <h2>5. 청소년보호 관련 신고</h2>
            <p>청소년 유해정보를 발견하시면 위 청소년보호 책임자에게 연락하시거나, 아래 기관에 신고하실 수 있습니다.</p>
            <ul>
              <li>방송통신심의위원회: 1377</li>
              <li>청소년보호 신고전화: 1388</li>
              <li>경찰청 사이버안전국: 182</li>
            </ul>

            <h2>6. 청소년보호정책의 개정</h2>
            <p>
              본 청소년보호정책의 내용 추가, 삭제 및 수정이 있을 경우에는 개정 최소 7일 전부터 '공지사항' 을 통해 사전
              공지할 것입니다.
            </p>

            <p className="mt-8 text-slate-500">본 방침은 2026년 1월 1일부터 시행됩니다.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
