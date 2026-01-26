// lib/community.ts

export interface Post {
  id: number;
  title: string;
  content?: string;
  badge?: 'N' | 'HOT';
  comments: number;
  likes: number;
  author: string;
  createdAt: Date;
  views?: number;
}

// 더미 핫 게시글 (대폭 확장)
export const hotPosts: Post[] = [
  {
    id: 1,
    title: '중도 알에서 빨간색 지갑 분실하신분?',
    badge: 'N',
    comments: 12,
    likes: 45,
    author: '익명',
    createdAt: new Date('2026-01-26T10:30:00'),
    views: 234
  },
  {
    id: 2,
    title: '5만원 이하 수능보는 동생 선물 추천해주세요',
    comments: 23,
    likes: 31,
    author: '익명',
    createdAt: new Date('2026-01-26T09:15:00'),
    views: 189
  },
  {
    id: 3,
    title: '회계사되면',
    badge: 'HOT',
    comments: 8,
    likes: 19,
    author: '익명',
    createdAt: new Date('2026-01-25T22:45:00'),
    views: 156
  },
  {
    id: 4,
    title: '동아리 모집기간은 언제까지예요? 다음주에...',
    comments: 15,
    likes: 27,
    author: '익명',
    createdAt: new Date('2026-01-25T20:30:00'),
    views: 203
  },
  {
    id: 5,
    title: '커피 기프티콘 팝니다',
    comments: 5,
    likes: 12,
    author: '익명',
    createdAt: new Date('2026-01-25T18:00:00'),
    views: 98
  },
  {
    id: 6,
    title: '내일 오후 2시에 학식 같이 드실 분',
    badge: 'N',
    comments: 34,
    likes: 67,
    author: '익명',
    createdAt: new Date('2026-01-26T11:20:00'),
    views: 421
  },
  {
    id: 7,
    title: '경영학 전공 vs 경제학 전공 뭐가 나을까요?',
    comments: 56,
    likes: 89,
    author: '익명',
    createdAt: new Date('2026-01-26T08:40:00'),
    views: 678
  },
  {
    id: 8,
    title: '토익 900 넘으신 분들 공부법 좀 알려주세요',
    badge: 'HOT',
    comments: 78,
    likes: 134,
    author: '익명',
    createdAt: new Date('2026-01-25T19:30:00'),
    views: 892
  },
  {
    id: 9,
    title: '학교 근처 맛집 추천받습니다',
    comments: 29,
    likes: 41,
    author: '익명',
    createdAt: new Date('2026-01-25T17:15:00'),
    views: 312
  },
  {
    id: 10,
    title: '복학하고 적응 힘드신 분 계신가요ㅠㅠ',
    comments: 18,
    likes: 52,
    author: '익명',
    createdAt: new Date('2026-01-25T16:00:00'),
    views: 267
  },
  {
    id: 11,
    title: '노트북 맥북 vs LG그램 고민중이에요',
    badge: 'N',
    comments: 45,
    likes: 73,
    author: '익명',
    createdAt: new Date('2026-01-26T07:50:00'),
    views: 534
  },
  {
    id: 12,
    title: '대학생 알바 추천 좀요',
    comments: 61,
    likes: 88,
    author: '익명',
    createdAt: new Date('2026-01-25T21:40:00'),
    views: 623
  },
  {
    id: 13,
    title: '과 엠티 안 가도 괜찮을까요?',
    comments: 92,
    likes: 156,
    author: '익명',
    createdAt: new Date('2026-01-25T14:20:00'),
    views: 1024
  },
  {
    id: 14,
    title: '기말고사 망했는데 재수강 해야하나요',
    badge: 'HOT',
    comments: 37,
    likes: 64,
    author: '익명',
    createdAt: new Date('2026-01-25T13:10:00'),
    views: 487
  },
  {
    id: 15,
    title: '도서관 1층에 아이패드 두고 가신 분',
    badge: 'N',
    comments: 8,
    likes: 23,
    author: '익명',
    createdAt: new Date('2026-01-26T10:05:00'),
    views: 178
  },
  {
    id: 16,
    title: '혼자 밥 먹는 거 이상한가요?',
    comments: 73,
    likes: 112,
    author: '익명',
    createdAt: new Date('2026-01-25T12:30:00'),
    views: 856
  },
  {
    id: 17,
    title: '편의점 도시락 가성비 순위',
    comments: 42,
    likes: 95,
    author: '익명',
    createdAt: new Date('2026-01-25T11:45:00'),
    views: 701
  },
  {
    id: 18,
    title: '전과 고민중인데 조언 부탁드려요',
    comments: 28,
    likes: 47,
    author: '익명',
    createdAt: new Date('2026-01-25T10:20:00'),
    views: 389
  },
  {
    id: 19,
    title: '운동 같이 하실 분 구합니다',
    comments: 16,
    likes: 32,
    author: '익명',
    createdAt: new Date('2026-01-25T09:00:00'),
    views: 245
  },
  {
    id: 20,
    title: '졸업하고 나니까 그립네요',
    badge: 'HOT',
    comments: 104,
    likes: 203,
    author: '익명',
    createdAt: new Date('2026-01-24T22:30:00'),
    views: 1456
  }
];