import Link from "next/link"
import { Mail, Instagram, Youtube } from "lucide-react"

const footerLinks = {
  고객지원: [
    { title: "공지사항", href: "/notice" },
    { title: "자주 묻는 질문", href: "/faq" },
    { title: "1:1 문의", href: "/contact" },
  ]
}

const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/mtors_official?igsh=MWdyazM1YTZyZHFqNQ==",
    label: "Instagram",
  },
]

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      {/* Main Footer */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold">
              멘토스
            </Link>
            <p className="mt-4 text-sm text-slate-600">
              대학생을 위한 실전 정보 플랫폼
              <br />
              공모전, 대외활동, 취업 준비를 한 곳에서
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <Mail className="h-4 w-4" />
                <span>mentoseu05@gmail.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 hover:text-slate-900"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-slate-500 md:flex-row">
          <p>© 2026 멘토스. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-slate-700">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-slate-700">
              개인정보처리방침
            </Link>
            <Link href="/youth-policy" className="hover:text-slate-700">
              청소년보호정책
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
