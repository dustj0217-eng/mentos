export interface MentorReview {
  id: number
  author: string
  rating: number
  date: string
  content: string
}

export interface Mentor {
  id: number
  name: string
  school: string
  company: string
  role: string
  experience: string
  rating: number
  reviews: number
  price: number
  categories: string[]
  badges: string[]
  availableTime: string
  intro: string
  career?: string[]
  topics?: string[]
  reviewList?: MentorReview[]
}

export const mentors: Mentor[] = [
  {
    id: 1,
    name: "김현우",
    school: "서울대 경영학과",
    company: "삼성전자",
    role: "마케팅 팀장",
    experience: "5년차",
    rating: 4.9,
    reviews: 128,
    price: 45000,
    categories: ["마케팅", "대기업"],
    badges: ["빠른응답", "이번주가능"],
    availableTime: "평일 저녁",
    intro: "실무 경험을 바탕으로 취업 전략을 알려드립니다",
    career: [
      "2020 - 현재: 삼성전자 마케팅 팀장",
      "2018 - 2020: 삼성전자 마케팅 매니저",
      "2017 - 2018: LG생활건강 브랜드 매니저",
    ],
    topics: ["자기소개서 첨삭", "모의 면접", "직무 이해", "경력 설계"],
    reviewList: [
      {
        id: 1,
        author: "김○○",
        rating: 5,
        date: "2025.01.15",
        content: "자소서 첨삭 정말 꼼꼼하게 봐주셨어요. 3일 뒤 면접에서 자소서 관련 질문 다 맞췄습니다!",
      },
      {
        id: 2,
        author: "이○○",
        rating: 5,
        date: "2025.01.10",
        content: "실무 경험을 바탕으로 구체적인 조언 주셔서 도움 많이 됐습니다.",
      },
      {
        id: 3,
        author: "박○○",
        rating: 4,
        date: "2025.01.05",
        content: "친절하고 명확한 설명 감사합니다. 방향성 잡는 데 큰 도움!",
      },
    ],
  },
  {
    id: 2,
    name: "이지은",
    school: "연세대 디자인학과",
    company: "네이버",
    role: "UX 디자이너",
    experience: "4년차",
    rating: 4.8,
    reviews: 95,
    price: 40000,
    categories: ["디자인", "IT"],
    badges: ["베스트멘토"],
    availableTime: "주말 오전",
    intro: "포트폴리오 제작과 면접 준비를 도와드립니다",
    career: [
      "2021 - 현재: 네이버 UX 디자이너",
      "2019 - 2021: 카카오 UI 디자이너",
      "2018 - 2019: 스타트업 프로덕트 디자이너",
    ],
    topics: ["포트폴리오 리뷰", "디자인 면접", "커리어 상담", "이직 전략"],
    reviewList: [
      {
        id: 1,
        author: "정○○",
        rating: 5,
        date: "2025.01.12",
        content: "포트폴리오 피드백이 정말 구체적이고 실질적이었어요!",
      },
      {
        id: 2,
        author: "최○○",
        rating: 5,
        date: "2025.01.08",
        content: "디자이너로서의 커리어 방향을 잡는 데 큰 도움이 됐습니다.",
      },
    ],
  },
  {
    id: 3,
    name: "박준형",
    school: "고려대 경영학과",
    company: "McKinsey",
    role: "컨설턴트",
    experience: "6년차",
    rating: 5.0,
    reviews: 156,
    price: 80000,
    categories: ["컨설팅", "전략"],
    badges: ["빠른응답"],
    availableTime: "평일 오후",
    intro: "케이스 인터뷰와 커리어 설계를 함께합니다",
    career: [
      "2019 - 현재: McKinsey & Company 컨설턴트",
      "2017 - 2019: BCG 주니어 컨설턴트",
      "2016 - 2017: 삼성물산 전략기획팀",
    ],
    topics: ["케이스 인터뷰", "컨설팅 면접", "MBA 준비", "전략적 사고"],
    reviewList: [
      {
        id: 1,
        author: "윤○○",
        rating: 5,
        date: "2025.01.14",
        content: "케이스 인터뷰 준비에 정말 도움이 많이 됐습니다. 맥킨지 합격했어요!",
      },
      {
        id: 2,
        author: "강○○",
        rating: 5,
        date: "2025.01.11",
        content: "논리적인 사고방식을 배울 수 있었습니다.",
      },
      {
        id: 3,
        author: "임○○",
        rating: 5,
        date: "2025.01.06",
        content: "컨설팅 업계에 대한 깊은 인사이트를 얻었습니다.",
      },
    ],
  },
  {
    id: 4,
    name: "최서연",
    school: "KAIST 산업디자인",
    company: "토스",
    role: "프로덕트 매니저",
    experience: "3년차",
    rating: 4.7,
    reviews: 72,
    price: 50000,
    categories: ["PM", "스타트업"],
    badges: ["이번주가능"],
    availableTime: "평일 저녁",
    intro: "PM 직무 이해와 실무 역량 강화에 집중합니다",
    career: ["2022 - 현재: 토스 프로덕트 매니저", "2020 - 2022: 쿠팡 주니어 PM", "2019 - 2020: 스타트업 기획자"],
    topics: ["PM 직무 이해", "프로덕트 기획", "스타트업 문화", "이력서 첨삭"],
    reviewList: [
      {
        id: 1,
        author: "서○○",
        rating: 5,
        date: "2025.01.13",
        content: "PM이 실제로 어떤 일을 하는지 명확하게 이해할 수 있었어요.",
      },
      {
        id: 2,
        author: "한○○",
        rating: 4,
        date: "2025.01.09",
        content: "스타트업 취업에 관한 현실적인 조언 감사합니다.",
      },
    ],
  },
  {
    id: 5,
    name: "정민수",
    school: "서울대 컴퓨터공학",
    company: "카카오",
    role: "백엔드 개발자",
    experience: "7년차",
    rating: 4.9,
    reviews: 184,
    price: 55000,
    categories: ["개발", "IT"],
    badges: ["베스트멘토", "빠른응답"],
    availableTime: "주말 전일",
    intro: "코딩 테스트부터 기술 면접까지 준비합니다",
    career: ["2018 - 현재: 카카오 백엔드 개발자", "2016 - 2018: 네이버 서버 개발자", "2015 - 2016: 삼성SDS 개발자"],
    topics: ["코딩 테스트", "기술 면접", "시스템 설계", "커리어 상담"],
    reviewList: [
      {
        id: 1,
        author: "조○○",
        rating: 5,
        date: "2025.01.16",
        content: "코테 준비 방법과 실제 면접 팁까지 알려주셔서 정말 좋았습니다.",
      },
      {
        id: 2,
        author: "백○○",
        rating: 5,
        date: "2025.01.12",
        content: "기술 면접 모의 면접이 실제 면접에 큰 도움이 됐어요!",
      },
      {
        id: 3,
        author: "오○○",
        rating: 5,
        date: "2025.01.07",
        content: "개발자 커리어 로드맵을 명확하게 그릴 수 있게 됐습니다.",
      },
    ],
  },
  {
    id: 6,
    name: "한소희",
    school: "이화여대 행정학과",
    company: "한국전력공사",
    role: "인사팀장",
    experience: "10년차",
    rating: 4.8,
    reviews: 203,
    price: 38000,
    categories: ["공기업", "인사"],
    badges: ["이번주가능"],
    availableTime: "평일 저녁",
    intro: "NCS와 면접 전략을 체계적으로 알려드립니다",
    career: [
      "2015 - 현재: 한국전력공사 인사팀장",
      "2012 - 2015: 한국전력공사 인사팀 과장",
      "2010 - 2012: 한국전력공사 인사팀 대리",
    ],
    topics: ["NCS 준비", "공기업 면접", "자기소개서", "직무 이해"],
    reviewList: [
      {
        id: 1,
        author: "황○○",
        rating: 5,
        date: "2025.01.15",
        content: "공기업 면접 준비하는 데 정말 많은 도움이 됐습니다.",
      },
      {
        id: 2,
        author: "송○○",
        rating: 5,
        date: "2025.01.10",
        content: "NCS 공부 방법과 시험 전략을 알 수 있었어요.",
      },
      {
        id: 3,
        author: "안○○",
        rating: 4,
        date: "2025.01.05",
        content: "공기업 자소서 첨삭이 특히 도움됐습니다.",
      },
    ],
  },
]

export const categories = ["전체", "마케팅", "디자인", "개발", "컨설팅", "PM", "공기업", "IT", "스타트업"]
export const companyTypes = ["전체", "대기업", "외국계", "스타트업", "공기업"]
export const sortOptions = ["평점순", "리뷰많은순", "가격낮은순", "가격높은순"]

export function getMentorById(id: number): Mentor | undefined {
  return mentors.find((m) => m.id === id)
}

export function filterMentors(searchTerm: string, category: string, companyType: string, sortBy: string): Mentor[] {
  return mentors
    .filter((m) => {
      const matchSearch = m.name.includes(searchTerm) || m.company.includes(searchTerm) || m.role.includes(searchTerm)
      const matchCategory = category === "전체" || m.categories.includes(category)
      const matchCompany = companyType === "전체" || m.categories.includes(companyType)
      return matchSearch && matchCategory && matchCompany
    })
    .sort((a, b) => {
      if (sortBy === "평점순") return b.rating - a.rating
      if (sortBy === "리뷰많은순") return b.reviews - a.reviews
      if (sortBy === "가격낮은순") return a.price - b.price
      if (sortBy === "가격높은순") return b.price - a.price
      return 0
    })
}
