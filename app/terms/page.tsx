"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { FileText } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="h-6 w-6" />
              <h1 className="text-2xl font-bold">이용약관</h1>
            </div>
            <p className="text-slate-600">시행일: 2026년 1월 1일</p>
          </div>

          <div className="prose prose-slate max-w-none">
            <h2>제1조 (목적)</h2>
            <p>
              이 약관은 멘토스(이하 "회사")가 제공하는 서비스의 이용조건 및 절차, 회사와 이용자의 권리, 의무, 책임사항
              및 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>

            <h2>제2조 (정의)</h2>
            <p>이 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
            <ol>
              <li>"서비스"란 회사가 제공하는 모든 서비스를 의미합니다.</li>
              <li>
                "이용자"란 회사의 서비스에 접속하여 이 약관에 따라 회사가 제공하는 서비스를 받는 회원 및 비회원을
                말합니다.
              </li>
              <li>
                "회원"이란 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가
                제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.
              </li>
            </ol>

            <h2>제3조 (약관의 효력 및 변경)</h2>
            <p>
              이 약관은 서비스 화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다. 회사는 필요하다고
              인정되는 경우 이 약관을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지함으로써 효력이
              발생합니다.
            </p>

            <h2>제4조 (이용계약의 성립)</h2>
            <p>
              이용계약은 이용자가 본 약관의 내용에 동의하고 회원가입 신청을 한 후 회사가 이를 승낙함으로써 성립됩니다.
            </p>

            <h2>제5조 (서비스의 제공)</h2>
            <p>회사는 다음과 같은 서비스를 제공합니다.</p>
            <ol>
              <li>공모전, 대외활동, 인턴십 등 정보 제공 서비스</li>
              <li>멘토링 및 커리어 상담 서비스</li>
              <li>커뮤니티 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ol>

            <h2>제6조 (개인정보보호)</h2>
            <p>
              회사는 이용자의 개인정보를 보호하기 위해 개인정보처리방침을 수립하고 이를 준수합니다. 자세한 내용은
              개인정보처리방침을 참조하시기 바랍니다.
            </p>

            <h2>제7조 (이용자의 의무)</h2>
            <p>이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ol>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 금지한 정보의 송신 또는 게시</li>
              <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>기타 불법적이거나 부당한 행위</li>
            </ol>

            <h2>제8조 (책임제한)</h2>
            <p>
              회사는 천재지변, 전쟁 및 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스
              제공에 대한 책임이 면제됩니다.
            </p>

            <h2>제9조 (분쟁해결)</h2>
            <p>
              본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따르며, 회사와 이용자 간의 분쟁은 서울중앙지방법원을
              관할법원으로 합니다.
            </p>

            <p className="mt-8 text-slate-500">본 약관은 2026년 1월 1일부터 시행됩니다.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
