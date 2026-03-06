export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    category: string;
    tags: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: 'korean-surname-history',
        title: '한국 성씨의 영문 표기 역사와 변천사',
        excerpt: '조선시대부터 현재까지 한국 성씨가 어떻게 로마자로 표기되어 왔는지, 그 역사적 배경과 변화 과정을 살펴봅니다.',
        date: '2024-12-15',
        readTime: '8분',
        category: '역사',
        tags: ['성씨', '역사', '로마자표기법']
    },
    {
        id: 'passport-name-guide',
        title: '여권 발급 시 영문명 작성 완벽 가이드',
        excerpt: '여권 신청 시 영문명을 어떻게 작성해야 하는지, 주의사항과 실제 사례를 통해 자세히 알아봅니다.',
        date: '2024-12-10',
        readTime: '12분',
        category: '실용정보',
        tags: ['여권', '영문명', '공식문서']
    },
    {
        id: 'overseas-name-tips',
        title: '해외 거주 시 영문명 사용 팁과 주의사항',
        excerpt: '해외에서 생활할 때 영문명을 효과적으로 사용하는 방법과 문화적 차이를 고려한 실용적인 조언을 제공합니다.',
        date: '2024-12-05',
        readTime: '10분',
        category: '해외생활',
        tags: ['해외거주', '문화차이', '실용팁']
    },
    {
        id: 'business-name-etiquette',
        title: '국제 비즈니스에서의 영문명 에티켓',
        excerpt: '글로벌 비즈니스 환경에서 전문적이고 효과적인 영문명 사용법과 명함, 이메일 서명 작성 가이드입니다.',
        date: '2024-11-28',
        readTime: '7분',
        category: '비즈니스',
        tags: ['비즈니스', '네트워킹', '전문성']
    },
    {
        id: 'romanization-rules-explained',
        title: '국어의 로마자 표기법 규칙 상세 해설',
        excerpt: '국립국어원의 로마자 표기법 규칙을 실제 예시와 함께 쉽게 이해할 수 있도록 상세히 설명합니다.',
        date: '2024-11-20',
        readTime: '15분',
        category: '언어학',
        tags: ['표기법', '언어학', '규칙']
    },
    {
        id: 'negative-meaning-words',
        title: '영어권에서 피해야 할 한국 이름 표기들',
        excerpt: '한글 이름을 로마자로 변환할 때 영어권에서 부정적 의미를 가질 수 있는 표기들과 안전한 대안을 소개합니다.',
        date: '2024-11-15',
        readTime: '9분',
        category: '안전가이드',
        tags: ['부정적의미', '안전표기', '대안']
    }
];
