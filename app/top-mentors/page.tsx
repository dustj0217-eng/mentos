"use client";

import { useState } from "react";

const mentors = [
  {
    id: 1,
    name: "김지현",
    field: "마케팅 · 브랜드전략",
    company: "카카오",
    career: "7년차",
    major: "경영학",
    univFrom: "연세대학교",
    badge: "이달의 멘토",
    tags: ["취업준비", "자소서", "포트폴리오"],
    intro:
      "마케터로 커리어를 전환하고 싶은 분들, 브랜드 전략이 뭔지 감이 안 오는 분들께 방향을 잡아드립니다. 취업부터 이직까지 같이 고민해요.",
    sessions: 128,
    rating: 4.97,
    reviewCount: 112,
    available: true,
    accentColor: "#FF6B35",
  },
  {
    id: 2,
    name: "박준영",
    field: "개발 · 백엔드",
    company: "네이버",
    career: "6년차",
    major: "컴퓨터공학",
    univFrom: "포항공과대학교",
    badge: "누적 1위",
    tags: ["코딩테스트", "개발취업", "전공고민"],
    intro:
      "개발이 적성인지 아직도 모르겠다면 이야기해요. 전공 선택부터 첫 취업, 개발자로 살아가는 것까지 솔직하게 공유합니다.",
    sessions: 203,
    rating: 4.95,
    reviewCount: 189,
    available: true,
    accentColor: "#3B82F6",
  },
  {
    id: 3,
    name: "오서연",
    field: "디자인 · UX/UI",
    company: "토스",
    career: "5년차",
    major: "시각디자인",
    univFrom: "홍익대학교",
    badge: "후기 최다",
    tags: ["UX포트폴리오", "디자인취업", "진로"],
    intro:
      "디자인 전공인데 UX로 가야 할지 고민이라면 저한테 물어보세요. 포트폴리오 피드백부터 핀테크 UX 현실까지 다 알려드려요.",
    sessions: 156,
    rating: 4.98,
    reviewCount: 143,
    available: false,
    accentColor: "#8B5CF6",
  },
  {
    id: 4,
    name: "한동훈",
    field: "금융 · 투자은행",
    company: "삼성증권",
    career: "8년차",
    major: "경제학",
    univFrom: "성균관대학교",
    badge: "스펙 전문",
    tags: ["금융권취업", "자격증로드맵", "IB"],
    intro:
      "금융권 취업 로드맵이 막막하다면 연락주세요. 자격증 순서, CFA 공부법, 증권사 면접까지 경험 기반으로 도와드립니다.",
    sessions: 97,
    rating: 4.93,
    reviewCount: 86,
    available: true,
    accentColor: "#10B981",
  },
  {
    id: 5,
    name: "이나영",
    field: "인사 · 조직문화",
    company: "LG에너지솔루션",
    career: "9년차",
    major: "심리학",
    univFrom: "이화여자대학교",
    badge: "인생고민 전문",
    tags: ["HR취업", "직장생활", "인간관계"],
    intro:
      "취업 걱정도 있지만 직장생활이 두려운 분들, 조직에서 어떻게 살아남는지 궁금한 분들이랑 이야기하고 싶어요.",
    sessions: 144,
    rating: 4.96,
    reviewCount: 131,
    available: true,
    accentColor: "#EC4899",
  },
  {
    id: 6,
    name: "신태양",
    field: "창업 · 스타트업",
    company: "전 대표 / 현 VC",
    career: "10년차",
    major: "산업디자인",
    univFrom: "카이스트",
    badge: "창업가 출신",
    tags: ["창업", "스타트업", "VC투자"],
    intro:
      "창업 아이디어 있는데 어디서 시작할지 모르겠다면? 실패 경험 포함해서 솔직하게 다 알려드립니다. 실제 투자 유치도 같이 고민해요.",
    sessions: 88,
    rating: 4.94,
    reviewCount: 77,
    available: true,
    accentColor: "#F59E0B",
  },
];

const fieldFilters = ["전체", "마케팅", "개발", "디자인", "금융", "인사", "창업"];

export default function TopMentorsPage() {
  const [activeField, setActiveField] = useState("전체");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered =
    activeField === "전체"
      ? mentors
      : mentors.filter((m) => m.field.includes(activeField));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=Pretendard:wght@300;400;500;600;700&display=swap');

        .tm-root {
          min-height: 100vh;
          background: #0E0E0E;
          font-family: 'Pretendard', sans-serif;
          color: #f5f5f5;
        }

        .tm-hero {
          position: relative;
          padding: 80px 40px 60px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .tm-hero-bg {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 600px 400px at 80% 50%, rgba(255,107,53,0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        .tm-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.25em;
          color: #FF6B35;
          text-transform: uppercase;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tm-eyebrow::after {
          content: '';
          display: block;
          width: 40px;
          height: 1px;
          background: #FF6B35;
          opacity: 0.5;
        }

        .tm-title {
          font-family: 'Noto Serif KR', serif;
          font-size: clamp(34px, 5vw, 54px);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 20px;
          color: #fff;
        }

        .tm-title span {
          color: #FF6B35;
        }

        .tm-desc {
          font-size: 15px;
          color: #888;
          line-height: 1.8;
          max-width: 440px;
          font-weight: 300;
        }

        .tm-filter {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 40px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tm-filter-btn {
          padding: 7px 16px;
          border-radius: 100px;
          border: 1px solid #333;
          background: transparent;
          font-size: 12px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Pretendard', sans-serif;
        }

        .tm-filter-btn:hover {
          border-color: #FF6B35;
          color: #FF6B35;
        }

        .tm-filter-btn.active {
          background: #FF6B35;
          border-color: #FF6B35;
          color: white;
        }

        .tm-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 80px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .mentor-card {
          background: #161616;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #222;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          cursor: default;
        }

        .mentor-card::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .mentor-card:hover {
          border-color: #333;
          background: #1a1a1a;
          transform: translateY(-3px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .mentor-card:hover::after {
          opacity: 1;
        }

        .card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .mentor-avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Noto Serif KR', serif;
          font-size: 20px;
          font-weight: 700;
          color: white;
          background: var(--accent);
          flex-shrink: 0;
          opacity: 0.9;
        }

        .mentor-badge-pill {
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: rgba(255,255,255,0.05);
          color: var(--accent);
          border: 1px solid var(--accent);
          opacity: 0.8;
        }

        .mentor-name {
          font-family: 'Noto Serif KR', serif;
          font-size: 20px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 4px;
        }

        .mentor-field {
          font-size: 13px;
          color: var(--accent);
          margin-bottom: 2px;
          font-weight: 500;
        }

        .mentor-company-line {
          font-size: 12px;
          color: #555;
        }

        .mentor-intro {
          font-size: 13px;
          line-height: 1.75;
          color: #777;
          margin: 16px 0;
          font-weight: 300;
        }

        .mentor-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .mentor-tag {
          padding: 3px 9px;
          background: #222;
          border-radius: 6px;
          font-size: 11px;
          color: #666;
        }

        .mentor-stats {
          display: flex;
          gap: 0;
          border-top: 1px solid #222;
          padding-top: 16px;
        }

        .stat-box {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .stat-box + .stat-box {
          border-left: 1px solid #222;
        }

        .stat-val {
          font-family: 'Noto Serif KR', serif;
          font-size: 16px;
          font-weight: 700;
          color: #eee;
        }

        .stat-val.accent {
          color: var(--accent);
        }

        .stat-lbl {
          font-size: 10px;
          color: #555;
          letter-spacing: 0.05em;
        }

        .avail-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22C55E;
          margin-right: 5px;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .unavail-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #444;
          margin-right: 5px;
        }

        .avail-text {
          font-size: 11px;
          color: #22C55E;
        }

        .unavail-text {
          font-size: 11px;
          color: #555;
        }

        .card-avail-row {
          display: flex;
          align-items: center;
          margin-top: 14px;
        }

        @media (max-width: 640px) {
          .tm-hero { padding: 60px 20px 40px; }
          .tm-filter { padding: 0 20px 32px; }
          .tm-grid { padding: 0 20px 60px; grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="tm-root">
        <div className="tm-hero">
          <div className="tm-hero-bg" />
          <p className="tm-eyebrow">Top Mentors</p>
          <h1 className="tm-title">
            검증된 선배,
            <br />
            <span>우수 멘토</span>를 만나보세요
          </h1>
          <p className="tm-desc">
            멘토링 횟수, 후기 평점, 멘티 만족도를 기준으로
            선정된 MENTORS의 우수 멘토입니다.
          </p>
        </div>

        <div className="tm-filter">
          {fieldFilters.map((f) => (
            <button
              key={f}
              className={`tm-filter-btn ${activeField === f ? "active" : ""}`}
              onClick={() => setActiveField(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="tm-grid">
          {filtered.map((mentor) => (
            <div
              key={mentor.id}
              className="mentor-card"
              style={{ "--accent": mentor.accentColor } as React.CSSProperties}
              onMouseEnter={() => setHovered(mentor.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="card-top">
                <div className="mentor-avatar">
                  {mentor.name[0]}
                </div>
                <span className="mentor-badge-pill">{mentor.badge}</span>
              </div>

              <div className="mentor-name">{mentor.name}</div>
              <div className="mentor-field">{mentor.field}</div>
              <div className="mentor-company-line">
                {mentor.company} · {mentor.career} · {mentor.univFrom} {mentor.major}
              </div>

              <p className="mentor-intro">{mentor.intro}</p>

              <div className="mentor-tags">
                {mentor.tags.map((tag) => (
                  <span key={tag} className="mentor-tag">#{tag}</span>
                ))}
              </div>

              <div className="mentor-stats">
                <div className="stat-box">
                  <span className="stat-val">{mentor.sessions}</span>
                  <span className="stat-lbl">멘토링 횟수</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val accent">{mentor.rating}</span>
                  <span className="stat-lbl">평점</span>
                </div>
                <div className="stat-box">
                  <span className="stat-val">{mentor.reviewCount}</span>
                  <span className="stat-lbl">후기</span>
                </div>
              </div>

              <div className="card-avail-row">
                {mentor.available ? (
                  <>
                    <span className="avail-dot" />
                    <span className="avail-text">멘토링 가능</span>
                  </>
                ) : (
                  <>
                    <span className="unavail-dot" />
                    <span className="unavail-text">현재 마감</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}