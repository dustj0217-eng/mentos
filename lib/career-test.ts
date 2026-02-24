// 진단 테스트 질문 및 유형 정의

export interface Question {
  id: number
  text: string
  options: {
    text: string
    scores: {
      [key: string]: number
    }
  }[]
}

export interface CareerType {
  id: string
  name: string
  shortDesc: string
  fullDesc: string
  traits: string[]
  workStyle: string
  environment: string
  recommendedJobs: string[]
  detailedJobs: {
    name: string
    desc: string
  }[]
  strengths: string[]
  challenges: string[]
  careerPath: string
  salary: string
}

// 6가지 차원으로 점수 계산
// I: 내향형(Introvert) vs E: 외향형(Extrovert)
// R: 루틴형(Routine) vs C: 창의형(Creative)
// D: 실무형(Doing) vs T: 사고형(Thinking)
// P: 사람중심(People) vs S: 시스템중심(System)
// A: 분석형(Analytical) vs I: 직관형(Intuitive)
// St: 안정형(Stable) vs Ch: 도전형(Challenge)

export const questions: Question[] = [
  {
    id: 1,
    text: "팀 프로젝트를 할 때, 나는?",
    options: [
      {
        text: "여러 사람과 함께 아이디어를 나누며 에너지를 얻는다",
        scores: { E: 3, P: 2 },
      },
      {
        text: "혼자 생각을 정리한 후 필요할 때만 의견을 공유한다",
        scores: { I: 3, T: 2 },
      },
      {
        text: "소수의 팀원과 깊이 있게 논의하는 걸 선호한다",
        scores: { I: 1, P: 1, T: 1 },
      },
      {
        text: "리더십을 발휘하며 사람들을 이끄는 역할을 맡는다",
        scores: { E: 2, P: 3, Ch: 2 },
      },
    ],
  },
  {
    id: 2,
    text: "업무를 처리할 때 더 끌리는 방식은?",
    options: [
      {
        text: "매뉴얼과 절차에 따라 정확하게 처리한다",
        scores: { R: 3, S: 2, St: 2 },
      },
      {
        text: "새로운 방법을 시도하며 개선점을 찾는다",
        scores: { C: 3, Ch: 2, I: 1 },
      },
      {
        text: "데이터와 논리로 최적의 방법을 분석한다",
        scores: { T: 3, A: 3, S: 1 },
      },
      {
        text: "직감적으로 빠르게 판단하고 실행한다",
        scores: { D: 2, I: 3, Ch: 2 },
      },
    ],
  },
  {
    id: 3,
    text: "일할 때 가장 즐거움을 느끼는 순간은?",
    options: [
      {
        text: "복잡한 문제를 논리적으로 해결했을 때",
        scores: { T: 3, A: 3, S: 1 },
      },
      {
        text: "사람들에게 도움을 주고 감사를 받을 때",
        scores: { P: 3, E: 2, I: 1 },
      },
      {
        text: "창의적인 아이디어가 실제로 구현될 때",
        scores: { C: 3, D: 2, Ch: 1 },
      },
      {
        text: "목표를 달성하고 성과를 확인할 때",
        scores: { D: 3, St: 2, A: 1 },
      },
    ],
  },
  {
    id: 4,
    text: "선호하는 업무 환경은?",
    options: [
      {
        text: "조용하고 개인 공간이 확보된 곳",
        scores: { I: 3, T: 2, St: 1 },
      },
      {
        text: "활기차고 사람들과 소통이 많은 곳",
        scores: { E: 3, P: 3 },
      },
      {
        text: "자율적이고 유연한 근무가 가능한 곳",
        scores: { C: 2, Ch: 2, I: 1 },
      },
      {
        text: "체계적이고 구조화된 조직",
        scores: { R: 3, S: 2, St: 2 },
      },
    ],
  },
  {
    id: 5,
    text: "새로운 프로젝트를 시작할 때 나는?",
    options: [
      {
        text: "전체 계획을 세밀하게 수립한 후 시작한다",
        scores: { T: 3, A: 2, R: 2, St: 1 },
      },
      {
        text: "일단 시작하고 상황에 맞춰 조정한다",
        scores: { D: 3, I: 2, Ch: 2 },
      },
      {
        text: "팀원들과 충분히 논의하며 진행한다",
        scores: { P: 3, E: 2 },
      },
      {
        text: "성공 사례를 분석하고 검증된 방법을 따른다",
        scores: { A: 3, R: 2, St: 2 },
      },
    ],
  },
  {
    id: 6,
    text: "스트레스를 받는 상황은?",
    options: [
      {
        text: "너무 많은 사람들과 지속적으로 소통해야 할 때",
        scores: { I: 3, S: 1 },
      },
      {
        text: "매일 똑같은 반복 작업만 해야 할 때",
        scores: { C: 3, Ch: 2 },
      },
      {
        text: "감정적인 대립이나 갈등 상황",
        scores: { S: 3, T: 2, I: 1 },
      },
      {
        text: "불확실하고 계획이 없는 상황",
        scores: { R: 3, St: 3, A: 1 },
      },
    ],
  },
  {
    id: 7,
    text: "의사결정을 할 때 나는?",
    options: [
      {
        text: "데이터와 사실을 기반으로 논리적으로 판단한다",
        scores: { A: 3, T: 3, S: 1 },
      },
      {
        text: "직감과 경험을 믿고 빠르게 결정한다",
        scores: { I: 3, D: 2 },
      },
      {
        text: "여러 사람의 의견을 듣고 합의점을 찾는다",
        scores: { P: 3, E: 2 },
      },
      {
        text: "장단점을 꼼꼼히 비교하며 신중하게 결정한다",
        scores: { T: 2, A: 2, St: 2 },
      },
    ],
  },
  {
    id: 8,
    text: "장기적인 커리어에서 중요하게 생각하는 것은?",
    options: [
      {
        text: "안정적인 직장과 예측 가능한 커리어 경로",
        scores: { St: 3, R: 2, S: 1 },
      },
      {
        text: "새로운 도전과 성장 기회",
        scores: { Ch: 3, C: 2, I: 1 },
      },
      {
        text: "전문성을 인정받고 영향력을 발휘하는 것",
        scores: { T: 2, A: 2, E: 1 },
      },
      {
        text: "사람들과의 관계와 협력을 통한 성취",
        scores: { P: 3, E: 2 },
      },
    ],
  },
  {
    id: 9,
    text: "업무에서 강점을 발휘하는 영역은?",
    options: [
      {
        text: "복잡한 정보를 분석하고 인사이트 도출",
        scores: { A: 3, T: 3, I: 1 },
      },
      {
        text: "사람들과 소통하며 관계 구축",
        scores: { P: 3, E: 3 },
      },
      {
        text: "창의적인 아이디어 기획과 실행",
        scores: { C: 3, Ch: 2, D: 1 },
      },
      {
        text: "체계적인 프로세스 설계와 운영",
        scores: { R: 3, S: 3, St: 1 },
      },
    ],
  },
  {
    id: 10,
    text: "5년 후 나의 모습으로 가장 매력적인 것은?",
    options: [
      {
        text: "특정 분야의 전문가로 깊이 있는 지식 보유",
        scores: { T: 3, A: 2, I: 1, St: 1 },
      },
      {
        text: "다양한 경험으로 폭넓은 역량 보유",
        scores: { C: 2, Ch: 3, D: 1 },
      },
      {
        text: "많은 사람들과 네트워크를 구축한 상태",
        scores: { P: 3, E: 3 },
      },
      {
        text: "안정적인 위치에서 체계적으로 일하는 모습",
        scores: { R: 2, S: 2, St: 3 },
      },
    ],
  },
]

// 8가지 유형 정의
export const careerTypes: CareerType[] = [
  {
    id: "analytical-specialist",
    name: "분석가형 전문가",
    shortDesc: "데이터와 논리로 세상을 읽는 전략가",
    fullDesc:
      "복잡한 정보를 체계적으로 분석하고 인사이트를 도출하는 능력이 뛰어납니다. 논리적 사고와 깊이 있는 전문성을 바탕으로 문제를 해결하며, 혼자 집중해서 일할 때 최고의 성과를 냅니다. 데이터 기반 의사결정을 선호하고, 체계적인 접근으로 안정적인 결과를 만들어냅니다.",
    traits: ["논리적 사고", "심층 분석", "체계적 접근", "독립적 업무", "전문성 추구"],
    workStyle: "혼자 또는 소수 팀원과 집중적으로 작업하며, 체계적인 프로세스를 따라 정확한 결과물을 산출합니다.",
    environment: "조용하고 개인 공간이 확보된 환경에서 데이터와 자료를 다루는 업무",
    recommendedJobs: [
      "데이터 분석가",
      "리서치 전문가",
      "재무 분석가",
      "컨설턴트",
      "품질관리 전문가",
      "통계학자",
    ],
    detailedJobs: [
      {
        name: "데이터 분석가/데이터 사이언티스트",
        desc: "대량의 데이터를 수집, 정제, 분석하여 비즈니스 인사이트를 도출합니다. SQL, Python, R 등을 활용한 통계 분석과 머신러닝 모델 구축을 수행합니다.",
      },
      {
        name: "리서치 전문가 (시장조사/UX리서치)",
        desc: "시장 동향, 소비자 행동, 사용자 경험을 체계적으로 조사하고 분석합니다. 정량/정성 조사 방법론을 활용하여 인사이트를 제공합니다.",
      },
      {
        name: "경영/전략 컨설턴트",
        desc: "기업의 문제를 분석하고 해결책을 제시합니다. 산업 분석, 경쟁사 분석, 비즈니스 모델 최적화 등 전략적 조언을 제공합니다.",
      },
      {
        name: "재무 분석가/회계사",
        desc: "기업의 재무제표를 분석하고 투자 의사결정을 지원합니다. 정확한 수치 분석과 리스크 관리가 핵심입니다.",
      },
    ],
    strengths: [
      "복잡한 데이터를 명확하게 해석하는 능력",
      "논리적이고 체계적인 문제 해결",
      "깊이 있는 전문 지식 구축",
      "정확성과 디테일에 대한 집중력",
    ],
    challenges: [
      "과도한 완벽주의로 인한 속도 저하 가능",
      "팀 협업이나 대인 소통이 많은 환경에서 스트레스",
      "빠른 변화와 불확실성에 대한 적응 필요",
    ],
    careerPath:
      "주니어 분석가 → 시니어 분석가 → 팀장/매니저 → 디렉터급 전문가. 또는 특정 도메인(금융, 헬스케어 등)의 전문 컨설턴트로 성장 가능.",
    salary: "초봉 3,500~4,500만원 / 경력 5년차 5,000~7,000만원 / 10년차 8,000만원 이상",
  },
  {
    id: "creative-innovator",
    name: "창의적 혁신가",
    shortDesc: "새로운 아이디어로 세상을 바꾸는 크리에이터",
    fullDesc:
      "기존의 틀을 깨고 새로운 시도를 두려워하지 않는 혁신가입니다. 창의적 사고와 직관적 판단으로 차별화된 결과물을 만들어내며, 변화와 도전을 즐깁니다. 자유로운 환경에서 자율성을 발휘할 때 최고의 퍼포먼스를 보이며, 새로운 트렌드를 만들어가는 것에 큰 보람을 느낍니다.",
    traits: ["창의적 사고", "혁신 추구", "빠른 실행력", "트렌드 감각", "유연한 적응력"],
    workStyle: "자유롭고 유연한 방식으로 일하며, 새로운 시도와 실험을 통해 혁신적인 결과물을 만들어냅니다.",
    environment: "자율성이 보장되고 창의적 시도가 장려되는 스타트업이나 프로젝트 기반 조직",
    recommendedJobs: [
      "프로덕트 매니저",
      "마케터/브랜드 매니저",
      "콘텐츠 크리에이터",
      "UX/UI 디자이너",
      "스타트업 창업가",
      "기획자",
    ],
    detailedJobs: [
      {
        name: "프로덕트 매니저 (PM)",
        desc: "제품/서비스 전략을 수립하고 개발부터 출시까지 전 과정을 관리합니다. 사용자 니즈를 파악하고 혁신적인 기능을 기획합니다.",
      },
      {
        name: "브랜드/마케팅 매니저",
        desc: "브랜드 정체성을 구축하고 창의적인 마케팅 캠페인을 기획합니다. 시장 트렌드를 분석하고 차별화된 메시지를 전달합니다.",
      },
      {
        name: "콘텐츠 크리에이터/PD",
        desc: "영상, 글, 이미지 등 다양한 형태의 콘텐츠를 기획하고 제작합니다. 유튜브, 틱톡 등 플랫폼에 최적화된 콘텐츠를 만듭니다.",
      },
      {
        name: "UX/UI 디자이너",
        desc: "사용자 경험을 디자인하고 직관적인 인터페이스를 만듭니다. 사용자 조사부터 프로토타이핑까지 전 과정을 담당합니다.",
      },
    ],
    strengths: [
      "새로운 아이디어를 빠르게 구현하는 실행력",
      "트렌드를 읽고 선도하는 감각",
      "변화에 유연하게 대응하는 능력",
      "차별화된 관점과 독창성",
    ],
    challenges: [
      "루틴하고 반복적인 업무에서 지루함",
      "체계적인 프로세스나 규칙에 답답함 느낄 수 있음",
      "장기적 일관성 유지보다 새로운 것을 좇는 경향",
    ],
    careerPath:
      "주니어 기획자/디자이너 → 시니어 → 리드/팀장 → CPO/CMO 또는 독립 크리에이터/창업가로 성장",
    salary: "초봉 3,200~4,200만원 / 경력 5년차 4,500~6,500만원 / 10년차 7,000만원 이상 (스타트업 스톡옵션 포함 시 변동 큼)",
  },
  {
    id: "people-coordinator",
    name: "소통형 조율자",
    shortDesc: "사람과 사람을 연결하는 관계의 전문가",
    fullDesc:
      "뛰어난 소통 능력과 공감 능력으로 사람들과 깊은 관계를 형성합니다. 팀워크를 중시하고 협력을 통해 목표를 달성하는 것에 큰 보람을 느낍니다. 사람들의 니즈를 정확히 파악하고, 갈등을 조율하며, 긍정적인 분위기를 만들어내는 능력이 뛰어납니다. 외향적 에너지로 많은 사람들과 함께 일할 때 행복합니다.",
    traits: ["뛰어난 소통력", "공감 능력", "협력 중시", "외향적 에너지", "관계 구축"],
    workStyle: "많은 사람들과 소통하며 협력적으로 일하고, 팀의 화합과 목표 달성을 동시에 추구합니다.",
    environment: "활기차고 소통이 많은 환경, 사람들과의 교류가 핵심인 업무",
    recommendedJobs: ["HR 전문가", "영업/세일즈", "고객 성공 매니저", "PR 전문가", "교육 기획자", "이벤트 매니저"],
    detailedJobs: [
      {
        name: "HR 전문가 (채용/HRD)",
        desc: "조직의 인재를 채용하고 육성합니다. 면접 진행, 온보딩, 교육 프로그램 설계, 조직문화 개선 등을 담당합니다.",
      },
      {
        name: "영업/세일즈 매니저",
        desc: "고객과의 관계를 구축하고 제품/서비스를 판매합니다. B2B 또는 B2C 영업, 제안서 작성, 계약 협상 등을 수행합니다.",
      },
      {
        name: "고객 성공 매니저 (CS Manager)",
        desc: "고객이 제품/서비스를 성공적으로 활용하도록 지원합니다. 고객 만족도를 높이고 장기적 관계를 유지합니다.",
      },
      {
        name: "PR/홍보 전문가",
        desc: "기업의 이미지를 관리하고 미디어, 인플루언서와 관계를 맺습니다. 보도자료 작성, 행사 기획, 위기 관리를 담당합니다.",
      },
    ],
    strengths: [
      "사람들과 빠르게 친밀감을 형성하는 능력",
      "갈등을 조율하고 협력을 이끌어내는 리더십",
      "다양한 이해관계자와 원활하게 소통",
      "긍정적인 에너지로 팀 분위기 주도",
    ],
    challenges: [
      "혼자 집중해야 하는 업무에서 에너지 저하",
      "감정 소모가 큰 고객 대응에서 번아웃 위험",
      "논리/데이터보다 감정 우선 시 판단 오류 가능",
    ],
    careerPath:
      "주니어 코디네이터 → 시니어/팀장 → 본부장/임원. 또는 독립 컨설턴트, 프리랜서 코치로 전환 가능",
    salary: "초봉 3,000~4,000만원 / 경력 5년차 4,500~6,000만원 / 10년차 7,000만원 이상 (영업 인센티브 포함 시 변동 큼)",
  },
  {
    id: "systematic-organizer",
    name: "체계적 운영자",
    shortDesc: "안정과 질서를 만드는 조직의 중심",
    fullDesc:
      "체계적이고 꼼꼼한 성향으로 조직의 안정성을 책임집니다. 명확한 프로세스와 규칙을 선호하며, 정해진 절차에 따라 정확하게 일을 처리하는 것에 강점이 있습니다. 예측 가능한 환경에서 장기적인 계획을 세우고 실행할 때 최고의 성과를 냅니다. 조직의 질서와 효율을 유지하는 핵심 인재입니다.",
    traits: ["체계적 사고", "꼼꼼함", "책임감", "안정 추구", "프로세스 준수"],
    workStyle: "명확한 업무 절차와 매뉴얼을 따라 정확하게 일하며, 안정적이고 예측 가능한 결과를 만들어냅니다.",
    environment: "구조화되고 체계적인 조직, 명확한 역할과 책임이 정해진 환경",
    recommendedJobs: [
      "프로젝트 매니저",
      "운영 관리자",
      "회계/재무 담당자",
      "법무 전문가",
      "품질 관리자",
      "공기업/공무원",
    ],
    detailedJobs: [
      {
        name: "프로젝트 매니저 (PM)",
        desc: "프로젝트의 일정, 예산, 리소스를 관리하고 목표를 달성하도록 조율합니다. 체계적인 계획 수립과 리스크 관리가 핵심입니다.",
      },
      {
        name: "운영 관리자 (Operations Manager)",
        desc: "조직의 일상적인 운영을 총괄합니다. 프로세스 최적화, 자원 배분, 효율성 개선 등을 담당합니다.",
      },
      {
        name: "회계/재무 담당자",
        desc: "기업의 재무 기록을 관리하고 세무 신고, 결산 업무를 수행합니다. 정확성과 규정 준수가 가장 중요합니다.",
      },
      {
        name: "법무 전문가/변호사",
        desc: "계약서 검토, 법적 리스크 관리, 소송 대응 등을 담당합니다. 법규와 판례에 대한 깊은 이해가 필요합니다.",
      },
    ],
    strengths: [
      "정확하고 꼼꼼한 업무 처리",
      "장기적 계획 수립과 실행력",
      "규칙과 절차를 철저히 준수",
      "안정적이고 예측 가능한 결과 산출",
    ],
    challenges: [
      "급격한 변화나 불확실한 상황에서 스트레스",
      "창의적이고 유연한 접근이 필요할 때 어려움",
      "과도한 완벽주의로 속도 저하 가능",
    ],
    careerPath:
      "주니어 스태프 → 시니어 → 팀장/매니저 → 본부장/임원. 전문성 기반으로 안정적 승진 가능",
    salary: "초봉 3,000~4,000만원 / 경력 5년차 4,500~6,000만원 / 10년차 7,000~9,000만원 (공기업/대기업 기준)",
  },
  {
    id: "hands-on-executor",
    name: "실행형 현장 리더",
    shortDesc: "말보다 행동으로 결과를 만드는 실무자",
    fullDesc:
      "직접 손으로 만지고 눈으로 확인하며 일하는 것을 선호하는 실행력 있는 리더입니다. 빠른 판단과 즉각적인 행동으로 문제를 해결하며, 현장에서 직접 부딪히며 경험을 쌓아갑니다. 이론보다는 실전, 회의보다는 실행을 중시하며, 즉각적인 피드백을 받을 수 있는 환경에서 최고의 성과를 냅니다.",
    traits: ["빠른 실행력", "현장 중심", "직관적 판단", "결과 지향", "문제 해결"],
    workStyle: "현장에서 직접 실행하고 빠르게 시도하며, 즉각적인 피드백을 통해 개선해 나갑니다.",
    environment: "현장 중심의 동적인 환경, 빠른 실행과 즉각적인 결과 확인이 가능한 곳",
    recommendedJobs: [
      "프로덕트 오너",
      "스타트업 운영자",
      "매장/현장 관리자",
      "제조/생산 관리자",
      "외식업 매니저",
      "건설 현장 관리자",
    ],
    detailedJobs: [
      {
        name: "프로덕트 오너/스크럼 마스터",
        desc: "애자일 방식으로 제품을 빠르게 개선해 나갑니다. 스프린트 단위로 실행하고 피드백을 받아 즉시 반영합니다.",
      },
      {
        name: "스타트업 운영자/COO",
        desc: "빠르게 변하는 스타트업 환경에서 즉각적인 의사결정과 실행을 담당합니다. 멀티태스킹과 문제 해결이 일상입니다.",
      },
      {
        name: "매장/점포 관리자",
        desc: "리테일 현장에서 재고, 인력, 매출을 관리하고 고객 응대를 직접 수행합니다. 현장 감각이 가장 중요합니다.",
      },
      {
        name: "제조/생산 관리자",
        desc: "공장 현장에서 생산 라인을 관리하고 품질을 점검합니다. 실시간 문제 해결과 효율 개선을 주도합니다.",
      },
    ],
    strengths: [
      "빠른 의사결정과 즉각적 실행",
      "현장에서 직접 문제를 해결하는 능력",
      "불확실한 상황에서도 과감한 시도",
      "즉각적인 피드백으로 빠른 학습",
    ],
    challenges: [
      "장기적 계획이나 이론적 분석에 인내심 부족",
      "반복적이고 정적인 사무 업무에서 지루함",
      "체계적 문서화나 보고서 작성 어려움",
    ],
    careerPath:
      "현장 실무자 → 팀장/매니저 → 운영 총괄 → 사업부장/COO. 또는 자신의 사업 창업",
    salary: "초봉 2,800~3,800만원 / 경력 5년차 4,000~5,500만원 / 10년차 6,000~8,000만원 (업종별 편차 큼)",
  },
  {
    id: "strategic-planner",
    name: "전략적 기획자",
    shortDesc: "큰 그림을 그리고 길을 만드는 전략가",
    fullDesc:
      "장기적 관점에서 전략을 수립하고 조직의 방향을 설정하는 전략가입니다. 복잡한 문제를 구조화하고, 다양한 변수를 고려하여 최적의 해결책을 찾아냅니다. 분석과 직관을 균형있게 활용하며, 조직의 큰 그림을 그리고 실행 가능한 로드맵을 만드는 데 탁월합니다.",
    traits: ["전략적 사고", "장기적 관점", "구조화 능력", "균형잡힌 판단", "비전 제시"],
    workStyle: "큰 그림을 그리고 세부 계획을 수립하며, 이해관계자들을 설득하고 방향을 제시합니다.",
    environment: "전략적 의사결정이 중요한 조직, 장기 계획과 분석이 필요한 환경",
    recommendedJobs: [
      "경영 기획자",
      "전략 컨설턴트",
      "사업 개발 매니저",
      "투자 심사역",
      "정책 연구원",
      "경영진 (CEO/COO)",
    ],
    detailedJobs: [
      {
        name: "경영 기획자",
        desc: "회사의 중장기 전략을 수립하고 실행 계획을 관리합니다. 사업 계획, 예산 편성, 성과 관리 등을 총괄합니다.",
      },
      {
        name: "전략 컨설턴트",
        desc: "기업의 전략적 문제를 진단하고 해결책을 제시합니다. 시장 분석, 경쟁 전략, M&A 자문 등을 제공합니다.",
      },
      {
        name: "사업 개발 매니저 (BD)",
        desc: "새로운 사업 기회를 발굴하고 파트너십을 구축합니다. 시장 기회 분석부터 계약 체결까지 전 과정을 관리합니다.",
      },
      {
        name: "벤처캐피탈/PE 심사역",
        desc: "투자 대상 기업을 분석하고 투자 의사결정을 지원합니다. 재무 분석, 시장 분석, 실사(Due Diligence)를 수행합니다.",
      },
    ],
    strengths: [
      "복잡한 문제를 구조화하고 단순화하는 능력",
      "장기적 관점에서 전략을 수립하는 통찰력",
      "다양한 이해관계자를 설득하는 커뮤니케이션",
      "분석과 직관의 균형잡힌 활용",
    ],
    challenges: [
      "즉각적인 실행보다 계획에 시간 소요",
      "디테일한 실무 집행에서 답답함",
      "빠르게 변하는 환경에서 계획 변경 필요",
    ],
    careerPath:
      "주니어 기획자 → 시니어 → 전략 팀장 → 전략 본부장/임원 → C-Level (CEO/CSO)",
    salary: "초봉 3,500~4,500만원 / 경력 5년차 5,500~7,500만원 / 10년차 9,000만원 이상",
  },
  {
    id: "independent-specialist",
    name: "독립형 전문가",
    shortDesc: "자신만의 길을 가는 독보적 전문가",
    fullDesc:
      "특정 분야에서 깊은 전문성을 구축하고 독립적으로 일하는 것을 선호합니다. 혼자 집중해서 일할 때 최고의 성과를 내며, 자신만의 방식으로 문제를 해결합니다. 조직보다는 개인의 전문성과 자율성을 중시하며, 프리랜서나 1인 사업가로 성장할 가능성이 높습니다.",
    traits: ["독립적 업무", "전문성 추구", "자율성 중시", "내향적 몰입", "자기주도"],
    workStyle: "혼자 집중하며 자신만의 방식으로 깊이 있는 결과물을 만들어냅니다.",
    environment: "자율성이 보장되고 독립적으로 일할 수 있는 환경, 리모트 워크",
    recommendedJobs: [
      "프리랜서 개발자",
      "독립 디자이너",
      "번역/통역사",
      "작가/에디터",
      "연구원",
      "1인 사업가",
    ],
    detailedJobs: [
      {
        name: "프리랜서 개발자",
        desc: "프로젝트 단위로 웹/앱 개발을 진행합니다. 클라이언트와 소통하지만 대부분 혼자 코딩하며 일합니다.",
      },
      {
        name: "독립 디자이너",
        desc: "브랜딩, UI/UX, 그래픽 디자인 등을 프리랜서로 수행합니다. 포트폴리오 기반으로 클라이언트를 확보합니다.",
      },
      {
        name: "번역/통역 전문가",
        desc: "문서 번역, 자막 번역, 동시통역 등을 수행합니다. 언어 능력과 전문 분야 지식이 필요합니다.",
      },
      {
        name: "콘텐츠 작가/에디터",
        desc: "글을 쓰고 편집하는 일을 합니다. 블로그, 뉴스레터, 책 등 다양한 형태의 콘텐츠를 생산합니다.",
      },
    ],
    strengths: [
      "혼자 집중하며 높은 퀄리티의 결과물 산출",
      "자기주도적으로 일정과 방식 관리",
      "특정 분야에서 독보적 전문성 구축",
      "조직의 정치나 관료주의에서 자유로움",
    ],
    challenges: [
      "혼자 일하다 보니 외로움이나 소외감",
      "불안정한 수입과 프로젝트 확보 스트레스",
      "자기관리와 영업 능력 필요",
    ],
    careerPath:
      "주니어 전문가 → 시니어 전문가 → 독립/프리랜서 → 에이전시 설립 또는 1인 기업가",
    salary: "프로젝트당 100~500만원 / 연 수입 3,000~8,000만원 (역량과 네트워크에 따라 큰 편차)",
  },
  {
    id: "empathetic-supporter",
    name: "공감형 서포터",
    shortDesc: "사람의 성장을 돕는 따뜻한 조력자",
    fullDesc:
      "깊은 공감 능력으로 타인의 감정과 상황을 이해하고 도움을 제공합니다. 사람들의 성장과 발전을 돕는 것에 큰 보람을 느끼며, 신뢰를 바탕으로 한 관계 형성에 탁월합니다. 경청하고 지지하며, 심리적 안정감을 제공하는 역할에서 빛을 발합니다.",
    traits: ["공감 능력", "경청", "지지적 태도", "인내심", "관계 중시"],
    workStyle: "사람들의 이야기를 깊이 듣고 이해하며, 신뢰를 바탕으로 장기적 관계를 형성합니다.",
    environment: "사람들의 성장과 발전을 돕는 환경, 1:1 또는 소규모 그룹 상호작용",
    recommendedJobs: [
      "상담사/심리상담가",
      "코치/멘토",
      "교사/강사",
      "사회복지사",
      "의료 종사자",
      "HR 컨설턴트",
    ],
    detailedJobs: [
      {
        name: "심리상담사/커리어 코치",
        desc: "개인의 심리적 문제나 커리어 고민을 상담하고 해결을 돕습니다. 경청과 공감을 통해 내담자의 성장을 지원합니다.",
      },
      {
        name: "교사/교육 강사",
        desc: "학생들을 가르치고 성장을 돕습니다. 지식 전달뿐 아니라 정서적 지지와 동기부여도 중요합니다.",
      },
      {
        name: "사회복지사",
        desc: "취약 계층을 지원하고 사회 문제 해결에 기여합니다. 공공기관, NGO, 복지시설 등에서 활동합니다.",
      },
      {
        name: "간호사/의료 종사자",
        desc: "환자를 돌보고 치료를 지원합니다. 의료 지식뿐 아니라 공감과 케어가 핵심입니다.",
      },
    ],
    strengths: [
      "깊은 공감과 경청으로 신뢰 형성",
      "사람들의 감정과 니즈를 정확히 파악",
      "인내심 있게 장기적으로 관계 유지",
      "따뜻하고 지지적인 분위기 조성",
    ],
    challenges: [
      "감정 소모로 인한 번아웃 위험",
      "논리나 효율보다 감정 우선 시 갈등",
      "강한 주장이나 갈등 상황 대응 어려움",
    ],
    careerPath:
      "보조 상담사/초임교사 → 경력 상담사/수석교사 → 슈퍼바이저/교감 → 독립 개업/교장",
    salary: "초봉 2,500~3,500만원 / 경력 5년차 3,500~5,000만원 / 10년차 5,000~7,000만원 (비영리 vs 민간 편차 큼)",
  },
]

// 점수 계산 및 유형 판별 로직
export function calculateCareerType(answers: number[][]): CareerType {
  const scores: { [key: string]: number } = {
    E: 0,
    I: 0,
    R: 0,
    C: 0,
    D: 0,
    T: 0,
    P: 0,
    S: 0,
    A: 0,
    // I는 Introvert와 Intuitive 둘 다 사용되므로 Int로 구분
    Int: 0,
    St: 0,
    Ch: 0,
  }

  // 각 질문의 선택한 옵션들의 점수를 합산
  answers.forEach((selectedOptions, questionIndex) => {
    selectedOptions.forEach((optionIndex) => {
      const option = questions[questionIndex].options[optionIndex]
      Object.entries(option.scores).forEach(([key, value]) => {
        if (key === "I") {
          // Intuitive인 경우 Int로 저장
          if (questionIndex === 1 || questionIndex === 6) {
            scores.Int = (scores.Int || 0) + value
          } else {
            scores.I = (scores.I || 0) + value
          }
        } else {
          scores[key] = (scores[key] || 0) + value
        }
      })
    })
  })

  // 최종 차원별 점수 계산
  const finalScores = {
    introvert: scores.I || 0,
    extrovert: scores.E || 0,
    routine: scores.R || 0,
    creative: scores.C || 0,
    doing: scores.D || 0,
    thinking: scores.T || 0,
    people: scores.P || 0,
    system: scores.S || 0,
    analytical: scores.A || 0,
    intuitive: scores.Int || 0,
    stable: scores.St || 0,
    challenge: scores.Ch || 0,
  }

  // 유형 판별 로직
  const isIntrovert = finalScores.introvert > finalScores.extrovert
  const isCreative = finalScores.creative > finalScores.routine
  const isThinking = finalScores.thinking > finalScores.doing
  const isPeople = finalScores.people > finalScores.system
  const isAnalytical = finalScores.analytical > finalScores.intuitive
  const isStable = finalScores.stable > finalScores.challenge

  // 8가지 유형 중 가장 적합한 유형 선택
  if (isAnalytical && isThinking && isIntrovert) {
    return careerTypes.find((t) => t.id === "analytical-specialist")!
  } else if (isCreative && !isStable) {
    return careerTypes.find((t) => t.id === "creative-innovator")!
  } else if (isPeople && !isIntrovert) {
    return careerTypes.find((t) => t.id === "people-coordinator")!
  } else if (!isCreative && isStable && finalScores.routine > 10) {
    return careerTypes.find((t) => t.id === "systematic-organizer")!
  } else if (!isThinking && finalScores.doing > 10) {
    return careerTypes.find((t) => t.id === "hands-on-executor")!
  } else if (isThinking && isAnalytical && !isIntrovert) {
    return careerTypes.find((t) => t.id === "strategic-planner")!
  } else if (isIntrovert && isThinking) {
    return careerTypes.find((t) => t.id === "independent-specialist")!
  } else if (isPeople && isIntrovert) {
    return careerTypes.find((t) => t.id === "empathetic-supporter")!
  }

  // 기본값 (가장 높은 점수 기준)
  return careerTypes.find((t) => t.id === "analytical-specialist")!
}