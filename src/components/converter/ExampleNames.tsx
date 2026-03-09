'use client';

import { useMemo } from 'react';

/* 예시 이름 풀: 아이돌·유명인 이름 리스트 */
const CELEBRITY_NAMES = [
    // BTS
    '김남준', '김석진', '민윤기', '정호석', '박지민', '김태형', '전정국',
    // BLACKPINK
    '김지수', '김제니', '박채영',
    // 배우·연예인
    '송중기', '김수현', '이민호', '전지현', '수지', '배수지',
    '이종석', '보아', '차은우', '이준호', '박서준', '마동석',
    // 스포츠
    '손흥민', '김연경', '박인비', '권은비',
    // 일반 예시
    '김민수', '이지은', '박준혁', '최수연', '남궁민',
];

/** 배열에서 중복 없이 n개를 랜덤으로 추출 */
function pickRandom<T>(arr: T[], n: number): T[] {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
}

interface ExampleNamesProps {
    onSelectName: (name: string) => void;
}

export default function ExampleNames({ onSelectName }: ExampleNamesProps) {
    // 매 마운트 시 유명인 이름 풀에서 7개를 랜덤 추출 (모바일 4개, 데스크탑 7개 표시)
    const exampleNames = useMemo(() => pickRandom(CELEBRITY_NAMES, 7), []);

    return (
        <div className="px-4 md:px-0 space-y-6 mt-2">
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    예시 이름
                </p>
                <div className="flex flex-wrap gap-2">
                    {exampleNames.map((name, i) => (
                        <button
                            key={`${name}-${i}`}
                            onClick={() => onSelectName(name)}
                            className={`px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 active:scale-95 transition-all ${i >= 4 ? 'hidden md:inline-flex' : ''
                                }`}
                        >
                            {name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
