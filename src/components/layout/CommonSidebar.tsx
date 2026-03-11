import React from 'react';
import {
    FileText,
    Briefcase,
    Search,
    Globe,
    AlertCircle,
    Users,
    Award
} from 'lucide-react';
import AdSlot from '../ads/AdSlot';
import ContentLinks from '../converter/ContentLinks';

interface ContentLinkItem {
    href: string;
    icon: React.ReactNode;
    title: string;
    desc: string;
}

interface CommonSidebarProps {
    adSlotId?: string;
    type?: 'default' | 'blog' | 'tool';
    contentLinksTitle?: React.ReactNode;
    customLinks?: ContentLinkItem[];
    extraContent?: React.ReactNode;
    className?: string;
}

const DEFAULT_LINKS: ContentLinkItem[] = [
    {
        href: '/names/us/popular',
        icon: <Award className="text-amber-500" size={20} />,
        title: '미국 영어 이름 순위 TOP 50',
        desc: '가장 핫한 글로벌 영어 이름 트렌드'
    },
    {
        href: '/how-to-use',
        icon: <FileText className="text-emerald-500" size={20} />,
        title: 'NameEng 기초 사용법',
        desc: '서비스를 활용법과 꿀팁 알아보기'
    },
    {
        href: '/passport-guide',
        icon: <Briefcase className="text-indigo-500" size={20} />,
        title: '여권 로마자 표기 규정',
        desc: '외교부 여권 발급 공식 가이드'
    },
    {
        href: '/faq',
        icon: <Search className="text-blue-500" size={20} />,
        title: '비자/여권 FAQ',
        desc: '가장 많이 물어보는 여권 질문과 답변'
    }
];

const TOOL_LINKS: ContentLinkItem[] = [
    {
        href: '/tools/name-checker',
        icon: <Search className="text-blue-500" size={20} />,
        title: '영문명 적합성 검사',
        desc: '나의 영문명 디자인 분석'
    },
    {
        href: '/',
        icon: <Globe className="text-emerald-500" size={20} />,
        title: '영문이름변환기',
        desc: '이름을 가장 적합한 로마자로 변환'
    }
];

export default function CommonSidebar({
    adSlotId = "2738626516",
    type = 'default',
    contentLinksTitle,
    customLinks,
    extraContent,
    className = ""
}: CommonSidebarProps) {

    // 기본 타이틀 설정
    const defaultTitle = type === 'tool'
        ? <span className="flex items-center gap-1.5"><Users size={16} className="text-gray-500" /> 다른 앱 보기</span>
        : <span className="flex items-center gap-1.5"><Globe size={16} className="text-blue-500" /> 연관 추천</span>;

    // 링크 데이터 결정
    const links = customLinks || (type === 'tool' ? TOOL_LINKS : DEFAULT_LINKS);

    return (
        <aside className={`hidden md:block w-[300px] ${className}`}>
            <div className="sticky top-4 space-y-6">
                {/* 상단 광고 슬롯 */}
                <AdSlot
                    slot={adSlotId}
                    format="auto"
                    wrapperClassName="md:rounded-lg md:overflow-hidden min-h-[250px]"
                    lazyLoad={true}
                />

                {/* 추천 링크 위젯 */}
                <ContentLinks
                    title={contentLinksTitle || defaultTitle}
                    items={links}
                />

                {/* 추가 콘텐츠 (필요 시) */}
                {extraContent}
            </div>
        </aside>
    );
}
