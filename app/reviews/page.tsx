// app/reviews/page.tsx

"use client";

import { useState } from "react";

const reviews = [
  {
    id: 1,
    mentorName: "김지현",
    mentorField: "마케팅 · 브랜드전략",
    mentorCompany: "카카오",
    menteeName: "이수빈",
    menteeUniv: "연세대학교 경영학과 3학년",
    rating: 5,
    date: "2025.02",
    tag: "취업 준비",
    content:
      "막연하게 마케팅이 하고 싶다는 생각만 있었는데, 멘토님이 제 관심사와 강점을 같이 정리해주시면서 방향을 잡아주셨어요. 포트폴리오 구성부터 면접 준비까지 정말 구체적으로 도움받았습니다. 단순한 스펙 조언이 아니라 '나'에게 맞는 방향을 찾은 느낌이에요.",
    highlight: "방향을 잡아주셨어요",
  },
  {
    id: 2,
    mentorName: "박준영",
    mentorField: "개발 · 백엔드",
    mentorCompany: "네이버",
    menteeName: "최민준",
    menteeUniv: "한양대학교 컴퓨터공학과 2학년",
    rating: 5,
    date: "2025.01",
    tag: "전공 고민",
    content:
      "컴공인데 개발이 적성에 맞는지 계속 의문이었어요. 멘토님이 현업에서의 실제 이야기를 솔직하게 해주셔서 훨씬 현실적인 판단을 할 수 있었어요. 전공을 바꾸지 않고 다른 방향으로 활용하는 방법도 알게 됐고, 불안감이 많이 줄었습니다.",
    highlight: "현실적인 판단을 할 수 있었어요",
  },
  {
    id: 3,
    mentorName: "오서연",
    mentorField: "디자인 · UX/UI",
    mentorCompany: "토스",
    menteeName: "정다은",
    menteeUniv: "홍익대학교 시각디자인학과 4학년",
    rating: 5,
    date: "2024.12",
    tag: "진로 탐색",
    content:
      "디자인 전공인데 UX로 가야 할지 그래픽으로 가야 할지 갈팡질팡했어요. 멘토님이 제 포트폴리오를 보고 솔직한 피드백을 주셨고, 덕분에 지금은 확실한 방향으로 준비하고 있어요. 멘토링 후 첫 번째 인턴 합격도 했습니다!",
    highlight: "첫 번째 인턴 합격도 했습니다",
  },
  {
    id: 4,
    mentorName: "한동훈",
    mentorField: "금융 · 투자은행",
    mentorCompany: "삼성증권",
    menteeName: "윤재원",
    menteeUniv: "성균관대학교 경제학과 3학년",
    rating: 4,
    date: "2024.12",
    tag: "취업 준비",
    content:
      "금융권 취업을 목표로 하고 있었는데 어디서부터 시작해야 할지 막막했어요. 멘토님이 자격증 순서, 인턴 경로, 자소서 방향까지 로드맵을 짜주셔서 지금은 계획대로 움직이고 있어요. 중간중간 근황도 물어봐 주셔서 따뜻하게 느껴졌습니다.",
    highlight: "로드맵을 짜주셔서",
  },
  {
    id: 5,
    mentorName: "이나영",
    mentorField: "인사 · 조직문화",
    mentorCompany: "LG에너지솔루션",
    menteeName: "강예진",
    menteeUniv: "이화여자대학교 심리학과 4학년",
    rating: 5,
    date: "2024.11",
    tag: "인간관계",
    content:
      "취업 고민도 있었지만 사실 조직에서 잘 적응할 수 있을지가 더 걱정이었어요. 멘토님이 HR 현업 경험으로 직장 내 인간관계, 팀워크에 대해 리얼하게 얘기해주셨고, 막연한 두려움이 많이 사라졌어요. 이런 얘기를 나눌 수 있는 공간이 있다는 게 너무 좋았어요.",
    highlight: "막연한 두려움이 많이 사라졌어요",
  },
  {
    id: 6,
    mentorName: "신태양",
    mentorField: "창업 · 스타트업",
    mentorCompany: "전 대표 / 현 VC",
    menteeName: "임지호",
    menteeUniv: "카이스트 산업디자인학과 3학년",
    rating: 5,
    date: "2024.11",
    tag: "창업 고민",
    content:
      "창업 아이디어는 있는데 어디서 시작해야 할지 몰랐어요. 멘토님이 창업 실패 경험까지 솔직하게 공유해주셔서 오히려 더 현실적으로 준비할 수 있었어요. 스타트업의 실제 모습을 알고 시작하는 것과 모르고 시작하는 건 정말 다르다는 걸 느꼈습니다.",
    highlight: "실패 경험까지 솔직하게 공유",
  },
];

const tags = ["전체", "취업 준비", "전공 고민", "진로 탐색", "인간관계", "창업 고민"];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill={s <= rating ? "#FF6B35" : "none"}
        stroke={s <= rating ? "#FF6B35" : "#ccc"}
        strokeWidth="1.2"
      >
        <polygon points="7,1 8.8,5.2 13.3,5.6 10.1,8.4 11.1,12.9 7,10.5 2.9,12.9 3.9,8.4 0.7,5.6 5.2,5.2" />
      </svg>
    ))}
  </div>
);

export default function ReviewsPage() {
  const [activeTag, setActiveTag] = useState("전체");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered =
    activeTag === "전체" ? reviews : reviews.filter((r) => r.tag === activeTag);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700&family=Pretendard:wght@300;400;500;600&display=swap');

        .reviews-root {
          min-height: 100vh;
          background: #FAFAF8;
          font-family: 'Pretendard', sans-serif;
          color: #1a1a1a;
        }

        .reviews-hero {
          position: relative;
          padding: 80px 40px 60px;
          max-width: 1100px;
          margin: 0 auto;
          overflow: hidden;
        }

        .hero-deco {
          position: absolute;
          top: 20px;
          right: -40px;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hero-eyebrow {
          font-family: 'Pretendard', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.2em;
          color: #FF6B35;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .hero-title {
          font-family: 'Noto Serif KR', serif;
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          line-height: 1.2;
          color: #111;
          margin-bottom: 20px;
        }

        .hero-title em {
          font-style: italic;
          color: #FF6B35;
        }

        .hero-desc {
          font-size: 16px;
          color: #666;
          line-height: 1.7;
          max-width: 480px;
          font-weight: 300;
        }

        .hero-stat {
          display: flex;
          gap: 40px;
          margin-top: 40px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-num {
          font-family: 'Noto Serif KR', serif;
          font-size: 32px;
          font-weight: 700;
          color: #111;
        }

        .stat-label {
          font-size: 13px;
          color: #999;
        }

        .stat-divider {
          width: 1px;
          background: #e5e5e5;
          align-self: stretch;
        }

        .filter-bar {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 40px;
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 8px 18px;
          border-radius: 100px;
          border: 1.5px solid #e5e5e5;
          background: white;
          font-size: 13px;
          font-weight: 500;
          color: #666;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: 'Pretendard', sans-serif;
        }

        .filter-btn:hover {
          border-color: #FF6B35;
          color: #FF6B35;
        }

        .filter-btn.active {
          background: #FF6B35;
          border-color: #FF6B35;
          color: white;
        }

        .reviews-grid {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 40px 80px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .review-card {
          background: white;
          border-radius: 20px;
          padding: 28px;
          border: 1px solid #f0f0f0;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .review-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF6B35, #FF8C5A);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .review-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .review-card:hover::before {
          transform: scaleX(1);
        }

        .card-tag {
          display: inline-block;
          padding: 4px 10px;
          background: #FFF3EE;
          color: #FF6B35;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .card-quote {
          font-family: 'Noto Serif KR', serif;
          font-size: 15px;
          line-height: 1.7;
          color: #333;
          margin-bottom: 16px;
        }

        .card-quote .highlight {
          background: linear-gradient(180deg, transparent 55%, rgba(255,107,53,0.2) 55%);
          font-weight: 600;
        }

        .card-expanded {
          font-size: 14px;
          line-height: 1.8;
          color: #555;
          margin-bottom: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .card-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #f5f5f5;
        }

        .mentee-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .mentee-name {
          font-size: 13px;
          font-weight: 600;
          color: #333;
        }

        .mentee-univ {
          font-size: 11px;
          color: #aaa;
        }

        .mentor-badge {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
        }

        .mentor-name-small {
          font-size: 12px;
          font-weight: 600;
          color: #FF6B35;
        }

        .mentor-company {
          font-size: 11px;
          color: #bbb;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 12px;
        }

        .expand-hint {
          font-size: 11px;
          color: #ccc;
          transition: color 0.2s;
        }

        .review-card:hover .expand-hint {
          color: #FF6B35;
        }

        @media (max-width: 640px) {
          .reviews-hero { padding: 60px 20px 40px; }
          .filter-bar { padding: 0 20px 32px; }
          .reviews-grid { padding: 0 20px 60px; grid-template-columns: 1fr; }
          .hero-stat { gap: 24px; }
        }
      `}</style>

      <div className="reviews-root">
        <div className="reviews-hero">
          <div className="hero-deco" />
          <p className="hero-eyebrow">Mentee Reviews</p>
          <h1 className="hero-title">
            실제로 도움받은
            <br />
            <em>진짜 이야기</em>들
          </h1>
          <p className="hero-desc">
            스펙이 아닌 방향, 정답이 아닌 이해.<br />
            MENTORS를 통해 길을 찾은 멘티들의 솔직한 후기입니다.
          </p>
          <div className="hero-stat">
            <div className="stat-item">
              <span className="stat-num">98%</span>
              <span className="stat-label">만족도</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">1,200+</span>
              <span className="stat-label">누적 후기</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-item">
              <span className="stat-num">4.9</span>
              <span className="stat-label">평균 별점</span>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`filter-btn ${activeTag === tag ? "active" : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="reviews-grid">
          {filtered.map((review) => (
            <div
              key={review.id}
              className="review-card"
              onClick={() => setExpanded(expanded === review.id ? null : review.id)}
            >
              <span className="card-tag">{review.tag}</span>

              <p className="card-quote">
                "…{" "}
                <span className="highlight">{review.highlight}</span>
                {" "}…"
              </p>

              {expanded === review.id && (
                <p className="card-expanded">{review.content}</p>
              )}

              <div className="card-footer">
                <StarRating rating={review.rating} />
                <span className="expand-hint">
                  {expanded === review.id ? "접기 ↑" : "전체 보기 ↓"}
                </span>
              </div>

              <div className="card-meta">
                <div className="mentee-info">
                  <span className="mentee-name">{review.menteeUniv.split(" ")[0]} · {review.menteeUniv.split(" ").slice(1).join(" ")}</span>
                  <span className="mentee-univ">{review.menteeUniv.split(" ")[0]} · {review.date}</span>
                </div>
                <div className="mentor-badge">
                  <span className="mentor-name-small">멘토 {review.mentorName}</span>
                  <span className="mentor-company">{review.mentorCompany} · {review.mentorField.split(" · ")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}