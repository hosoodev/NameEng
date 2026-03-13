import React from 'react';
import type { CertData } from '../CaBirthCertClient';

interface CertPreviewProps {
    data: CertData;
}

const countyTranslations: Record<string, string> = {
    "alameda": "알라미다", "alpine": "알파인", "amador": "아마도르", "butte": "뷰트",
    "calaveras": "캘러베러스", "colusa": "콜루사", "contra costa": "콘트라 코스타",
    "del norte": "델노르트", "el dorado": "엘도라도", "fresno": "프레즈노",
    "glenn": "글렌", "humboldt": "험볼트", "imperial": "임페리얼", "inyo": "인요",
    "kern": "컨", "kings": "킹스", "lake": "레이크", "lassen": "래슨",
    "los angeles": "로스앤젤레스", "madera": "마데라", "marin": "마린",
    "mariposa": "마리포사", "mendocino": "멘도시노", "merced": "머세드",
    "modoc": "모독", "mono": "모노", "monterey": "몬터레이", "napa": "나파",
    "nevada": "네바다", "orange": "오렌지", "placer": "플레이서", "plumas": "플루머스",
    "riverside": "리버사이드", "sacramento": "새크라멘토", "san benito": "산베니토",
    "san bernardino": "샌버너디노", "san diego": "샌디에이고", "san francisco": "샌프란시스코",
    "san joaquin": "샌호아킨", "san luis obispo": "산루이스오비스포", "san mateo": "산마테오",
    "santa barbara": "산타바바라", "santa clara": "산타클라라", "santa cruz": "산타크루즈",
    "shasta": "샤스타", "sierra": "시에라", "siskiyou": "시스키유", "solano": "솔라노",
    "sonoma": "소노마", "stanislaus": "스타니슬라오", "sutter": "서터",
    "tehama": "테하마", "trinity": "트리니티", "tulare": "툴레어", "tuolumne": "투올러미",
    "ventura": "벤투라", "yolo": "욜로", "yuba": "유바"
};

function convertDateToKorean(dateStr: string) {
    if (!dateStr || dateStr.length !== 10) return dateStr;
    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const month = parseInt(parts[0], 10);
        const day = parseInt(parts[1], 10);
        const year = parts[2];
        if (!isNaN(month) && !isNaN(day)) return `${year}년 ${month}월 ${day}일`;
    }
    return dateStr;
}

export default function CertPreview({ data }: CertPreviewProps) {

    // 데이터 전처리
    const getValue = (key: keyof CertData) => data[key] || '';

    const getCounty = (key: 'top-county' | '5d') => {
        let val = getValue(key);
        if (val.trim() !== '') {
            const matchKey = Object.keys(countyTranslations).find(k => k === val.toLowerCase());
            if (matchKey) val = countyTranslations[matchKey];
            if (key === 'top-county') val = val + " 카운티";
        }
        return val;
    };

    const val2 = getValue('2');
    const val3a = getValue('3a') === '기타' ? getValue('3a-text') : getValue('3a');

    const paperSizeClass = data['paper-size'] === 'A4' ? 'size-a4' : 'size-letter';

    return (
        <>
            <style>{`
        #print-section {
            background: #fff;
            box-sizing: border-box;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: 0 auto;
            transition: width 0.3s ease, min-height 0.3s ease;
            font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;
            color: #333;
        }

        .size-letter {
            width: 816px;
            min-height: 1056px;
            padding: 35px 38px;
        }

        .size-a4 {
            width: 794px;
            min-height: 1123px;
            padding: 32px 36px;
        }

        .doc-title-right { text-align: right; font-size: 13px; letter-spacing: 1px; margin-bottom: 15px; }
        .doc-main-title { text-align: center; margin-bottom: 25px; }
        .doc-main-title h1 { font-size: 32px; margin: 0; font-weight: 900; letter-spacing: 2px; }
        .doc-main-title h2 { font-size: 26px; margin: 5px 0 0 0; font-weight: 900; letter-spacing: 2px; }

        .top-info-section { display: flex; justify-content: space-between; align-items: flex-end; text-align: center; font-size: 13px; margin-bottom: 10px; }
        .top-info-box { width: 28%; }
        .top-info-center { width: 38%; }

        .underline-input {
            border-bottom: 1px solid #000;
            height: 22px;
            font-weight: bold;
            font-size: 14px;
            padding: 0 5px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
        }

        #out-top-county { font-size: 18px !important; letter-spacing: 1px; color: #111; }
        #out-5d { font-size: 14px !important; }

        .top-label { margin-top: 5px; color: #000; font-size: 14px; }

        .cert-table { width: 100%; border-collapse: collapse; border: 2px solid #000; table-layout: fixed; }
        .cert-table th, .cert-table td { border: 1px solid #000; padding: 4px; vertical-align: top; word-break: keep-all; overflow: hidden; height: 56px; }

        .category-td { font-weight: normal; text-align: center; vertical-align: middle; white-space: nowrap; font-size: 14px; letter-spacing: 2px; }
        .cell-label { font-size: 10px; color: #000; display: block; line-height: 1.2; margin-bottom: 4px; white-space: nowrap; letter-spacing: -0.5px; }
        .cell-data { font-size: 14px; font-weight: bold; color: #000; min-height: 16px; padding-left: 4px; text-align: left; }
        .align-top-left { vertical-align: top !important; text-align: left; font-size: 8.5px; letter-spacing: -0.5px; line-height: 1.3; padding: 4px 6px !important; }

        .translator-section { width: 85%; margin-left: auto; margin-right: auto; margin-top: 30px; }
        .size-a4 .translator-section { margin-top: 40px; }

        .t-row { display: flex; align-items: flex-end; margin-bottom: 15px; }
        .t-label-group { display: flex; align-items: flex-end; width: 75px; font-size: 16px; font-weight: bold; margin-right: 8px; }
        .t-label-text { display: flex; justify-content: space-between; flex: 1; }
        .t-label-colon { margin-left: 2px; }
        .t-line { flex: 1; border-bottom: 1px solid #000; min-height: 20px; font-weight: bold; font-size: 15px; padding: 0 10px; text-align: left; }
        .t-seal { padding: 0 15px; font-size: 15px; }

        @media print {
            /* 브라우저 여백 강제 무력화 */
            @page {
              size: ${data['paper-size'] === 'A4' ? 'A4' : 'letter'};
              margin: 0;
            }
            body { background-color: #fff; margin: 0; padding: 0; }
            .no-print { display: none !important; }
            .no-print-bg { background-color: transparent !important; padding-bottom: 0 !important; }
            
            /* Next.js 등에서 생성하는 외부 영역 및 광고 감추기 */
            header, nav, footer, aside, .sidebar-container,
            ins, .adsbygoogle, .adsbygoogle-noablate, .adsbygoogle-noablate * { 
                display: none !important; 
            }
            
            #print-section {
                box-shadow: none !important;
                margin: 0 !important;
                /* 웹과 동일한 height를 유지하여 absolute 카피라이트 위치가 같도록 함 */
                page-break-after: avoid;
            }
        }
      `}</style>

            <div id="print-section" className={`${paperSizeClass} relative`}>
                {/* 화면에서만 보이는 현재 규격 안내 뱃지 */}
                <div className="absolute top-4 left-4 bg-gray-100 text-gray-600 font-semibold text-[11px] px-2.5 py-1 rounded shadow-sm no-print border border-gray-200">
                    현재 인쇄 규격 : {data['paper-size'] === 'A4' ? 'A4 (한국 표준)' : 'Letter (미국 표준)'}
                </div>

                <div className="doc-title-right">&lt;출생증명서 번역본&gt;</div>

                <div className="doc-main-title">
                    <h1>캘리포니아주</h1>
                    <h2>출생기록증명서</h2>
                </div>

                <div className="top-info-section">
                    <div className="top-info-box">
                        <div className="underline-input" id="out-file-no">{getValue('file-no')}</div>
                        <div className="top-label">파일번호</div>
                    </div>
                    <div className="top-info-center">
                        <div className="underline-input" id="out-top-county">{getCounty('top-county')}</div>
                        <div className="top-label" style={{ fontWeight: 'bold', fontSize: 16 }}>캘리포니아주 출생증명</div>
                        <div style={{ fontSize: 12, marginTop: 2 }}>검정잉크 사용</div>
                    </div>
                    <div className="top-info-box">
                        <div className="underline-input" id="out-reg-no">{getValue('reg-no')}</div>
                        <div className="top-label">지방등기소 증명번호</div>
                    </div>
                </div>

                <table className="cert-table">
                    <colgroup>
                        <col style={{ width: '12%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                        <col style={{ width: '8.8%' }} />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td rowSpan={2} className="category-td">출생자</td>
                            <td colSpan={4}><span className="cell-label">1A. 출생자 – 이름</span>
                                <div className="cell-data" id="out-1a">{getValue('1a')}</div>
                            </td>
                            <td colSpan={3}><span className="cell-label">1B. 중간이름</span>
                                <div className="cell-data" id="out-1b">{getValue('1b')}</div>
                            </td>
                            <td colSpan={3}><span className="cell-label">1C. 성</span>
                                <div className="cell-data" id="out-1c">{getValue('1c')}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}><span className="cell-label">2. 성별</span>
                                <div className="cell-data" id="out-2">{val2}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">3A. 단생아, 쌍생아 등</span>
                                <div className="cell-data" id="out-3a">{val3a}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">3B. 쌍생아 첫째, 둘째 등</span>
                                <div className="cell-data" id="out-3b">{getValue('3b')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">4A. 출생일자 - 월/일/년</span>
                                <div className="cell-data" id="out-4a">{getValue('4a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">4B. 시간 - 24시각제</span>
                                <div className="cell-data" id="out-4b">{getValue('4b')}</div>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={2} className="category-td">출생장소</td>
                            <td colSpan={5}><span className="cell-label">5A. 출생장소 – 병원 또는 기관</span>
                                <div className="cell-data" id="out-5a">{getValue('5a')}</div>
                            </td>
                            <td colSpan={5}><span className="cell-label">5B. 주소 – 번지 또는 위치</span>
                                <div className="cell-data" id="out-5b">{getValue('5b')}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}><span className="cell-label">5C. 도시</span>
                                <div className="cell-data" id="out-5c">{getValue('5c')}</div>
                            </td>
                            <td colSpan={5}><span className="cell-label">5D. 카운티</span>
                                <div className="cell-data" id="out-5d">{getCounty('5d')}</div>
                            </td>
                        </tr>

                        <tr>
                            <td className="category-td">아버지</td>
                            <td colSpan={2}><span className="cell-label">6A. 아버지 이름</span>
                                <div className="cell-data" id="out-6a">{getValue('6a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">6B. 중간이름</span>
                                <div className="cell-data" id="out-6b">{getValue('6b')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">6C. 성</span>
                                <div className="cell-data" id="out-6c">{getValue('6c')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">7. 출생지</span>
                                <div className="cell-data" id="out-7">{getValue('7')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">8. 출생일자 - 월/일/년</span>
                                <div className="cell-data" id="out-8">{getValue('8')}</div>
                            </td>
                        </tr>

                        <tr>
                            <td className="category-td">어머니</td>
                            <td colSpan={2}><span className="cell-label">9A. 어머니 이름</span>
                                <div className="cell-data" id="out-9a">{getValue('9a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">9B. 중간이름</span>
                                <div className="cell-data" id="out-9b">{getValue('9b')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">9C. 성</span>
                                <div className="cell-data" id="out-9c">{getValue('9c')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">10. 출생지</span>
                                <div className="cell-data" id="out-10">{getValue('10')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">11. 출생일자 - 월/일/년</span>
                                <div className="cell-data" id="out-11">{getValue('11')}</div>
                            </td>
                        </tr>

                        <tr>
                            <td rowSpan={3} className="category-td">출생증명<br />제공자</td>
                            <td colSpan={2} className="align-top-left">본인은 기재된 사항을 검토하였으며, 본인이 아는 한 위 내용이 모두 사실과 다름없음을 증명합니다.</td>
                            <td colSpan={4}><span className="cell-label">12A. 부모 또는 다른 증명자 - 서명</span>
                                <div className="cell-data" id="out-12a">{getValue('12a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">12B. 출생자와의 관계</span>
                                <div className="cell-data" id="out-12b">{getValue('12b')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">12C. 서명일 - 월/일/년</span>
                                <div className="cell-data" id="out-12c">{getValue('12c')}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} className="align-top-left">본인은 출생아가 기재된 일시 및 장소에서 살아서 출생하였음을 증명합니다.</td>
                            <td colSpan={4}><span className="cell-label">13A. 담당자/확인자 - 서명, 직함</span>
                                <div className="cell-data" id="out-13a">{getValue('13a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">13B. 인가번호</span>
                                <div className="cell-data" id="out-13b">{getValue('13b')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">13C. 서명일 - 월/일/년</span>
                                <div className="cell-data" id="out-13c">{getValue('13c')}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6}>
                                <span className="cell-label" style={{ marginBottom: 1 }}>13D. 담당의사 이름, 주소</span>
                                <div className="cell-data" style={{ display: 'flex', flexDirection: 'column', width: '100%', boxSizing: 'border-box', overflow: 'hidden', paddingLeft: 2, paddingRight: 4, minHeight: 0 }}>
                                    <span id="out-13d-name" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.2, fontSize: 13.5 }}>
                                        {getValue('13d-name')}
                                    </span>
                                    <div id="out-13d-addr-container" style={{ width: '100%', overflow: 'visible', lineHeight: 1, marginTop: 1 }}>
                                        <span id="out-13d-addr" style={{ whiteSpace: 'nowrap', transformOrigin: 'left top', lineHeight: 1, display: 'inline-block', fontSize: 11, fontWeight: 'normal', color: '#111' }}>
                                            {getValue('13d-addr')}
                                        </span>
                                    </div>
                                </div>
                            </td>
                            <td colSpan={4}><span className="cell-label">14. 기타 다른 증명인 이름</span>
                                <div className="cell-data" id="out-14">{getValue('14')}</div>
                            </td>
                        </tr>

                        <tr>
                            <td className="category-td">지역담당자</td>
                            <td colSpan={2}><span className="cell-label">15A. 사망일시 - 월/일/년</span>
                                <div className="cell-data" id="out-15a">{getValue('15a')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">15B. 주정부 인가번호</span>
                                <div className="cell-data" id="out-15b">{getValue('15b')}</div>
                            </td>
                            <td colSpan={4}><span className="cell-label">16. 지역담당자 - 서명</span>
                                <div className="cell-data" id="out-16">{getValue('16')}</div>
                            </td>
                            <td colSpan={2}><span className="cell-label">17. 등록 승인일 - 월/일/년</span>
                                <div className="cell-data" id="out-17">{getValue('17')}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                {/* 번역인 서명란 */}
                <div className="translator-section">
                    <div className="t-row">
                        <div className="t-label-group">
                            <div className="t-label-text"><span>번</span><span>역</span><span>일</span></div><span className="t-label-colon">:</span>
                        </div>
                        <div className="t-line" id="out-t-date">{convertDateToKorean(getValue('t-date'))}</div>
                    </div>

                    <div className="t-row">
                        <div className="t-label-group">
                            <div className="t-label-text"><span>번</span><span>역</span><span>인</span></div><span className="t-label-colon">:</span>
                        </div>
                        <div className="t-line" id="out-t-name">{getValue('t-name')}</div>
                        <div className="t-seal">(서명)</div>
                        <div className="t-line"></div>
                    </div>

                    <div className="t-row">
                        <div className="t-label-group">
                            <div className="t-label-text"><span>주</span><span>소</span></div><span className="t-label-colon">:</span>
                        </div>
                        <div className="t-line" id="out-t-addr">{getValue('t-addr')}</div>
                    </div>

                    <div className="t-row">
                        <div className="t-label-group">
                            <div className="t-label-text"><span>연</span><span>락</span><span>처</span></div><span className="t-label-colon">:</span>
                        </div>
                        <div className="t-line" id="out-t-contact" style={{ flex: 1 }}>{getValue('t-contact')}</div>

                        {getValue('t-email').trim() !== '' && (
                            <>
                                <div className="t-label-group" id="out-t-email-label" style={{ width: 'auto', marginLeft: 20, marginRight: 5, display: 'flex' }}>
                                    <div className="t-label-text"><span>이</span><span>메</span><span>일</span></div><span className="t-label-colon">:</span>
                                </div>
                                <div className="t-line" id="out-t-email" style={{ flex: 1.2, display: 'block' }}>{getValue('t-email')}</div>
                            </>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center text-[10px] text-gray-400 font-sans tracking-wide">
                    &copy; {new Date().getFullYear()} NameEng.
                </div>
            </div>
        </>
    );
}
