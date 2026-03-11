'use client';

import { useNameConverter } from '@/hooks/useNameConverter';
import { 
  AD_SLOT_INDEX_CONTENT, 
  AD_SLOT_RESULT, 
  AD_SLOT_CONTENT, 
  guideLinks, 
  toolLinks 
} from '@/lib/converter/constants';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import NameInput from '@/components/converter/NameInput';
import ResultCard from '@/components/converter/ResultCard';
import WarningCard from '@/components/converter/WarningCard';
import OptionsPanel from '@/components/converter/OptionsPanel';
import ContentLinks from '@/components/converter/ContentLinks';
import DesktopNavBar from '@/components/layout/DesktopNavBar';
import AdSlot from '@/components/ads/AdSlot';
import CommonSidebar from '@/components/layout/CommonSidebar';
import { BookOpen, Briefcase, Award, ChevronRight } from 'lucide-react';

export default function NameEngConverter() {
  const {
    inputName,
    options,
    result,
    surnameVariants,
    familyNameOptions,
    history,
    showHistory,
    contextualLinks,
    handleNameChange,
    handleConvert,
    handleOptionChange,
    handleFamilyNameTypeChange,
    copyToClipboard,
    handleShare,
    handleSelectHistory,
    handleExampleSelect,
    handleRemoveHistory,
    handleClearHistory,
    handleLogoClick,
    setShowHistory,
  } = useNameConverter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1">
        <div className="px-4 md:hidden">
          <SiteHeader onLogoClick={handleLogoClick} />
        </div>

        <div className="md:grid md:grid-cols-[1fr_300px] gap-8">
          <div className="w-full">
            <div className="px-4 md:px-0 mt-1 md:mt-4 mb-3">
              <NameInput
                value={inputName}
                onChange={handleNameChange}
                onConvert={handleConvert}
                history={history}
                showHistory={showHistory}
                onShowHistory={setShowHistory}
                onSelectHistory={handleSelectHistory}
                onRemoveHistory={handleRemoveHistory}
                onClearHistory={handleClearHistory}
              />
            </div>

            {result ? (
              <div className="space-y-3">
                {(() => {
                  const familyName =
                    options.familyNameType === 'compound' && familyNameOptions.hasCompoundOption
                      ? familyNameOptions.compoundFamily
                      : familyNameOptions.singleFamily;

                  return (
                    <>
                      <div className="px-4 md:px-0">
                        <ResultCard
                          inputName={inputName}
                          romanized={result.romanized}
                          onCopy={copyToClipboard}
                          onShare={handleShare}
                          contextualLinks={contextualLinks}
                        />
                      </div>

                      {result.warnings.length > 0 && (
                        <div className="px-4 md:px-0">
                          <WarningCard warnings={result.warnings} />
                        </div>
                      )}

                      <AdSlot
                        slot={AD_SLOT_RESULT}
                        format="auto"
                        wrapperClassName="md:my-6 md:rounded-lg md:overflow-hidden"
                        lazyLoad={true}
                      />

                      <div className="px-4 md:px-0">
                        <OptionsPanel
                          options={options}
                          onChange={handleOptionChange}
                          familyName={familyName}
                          familyNameOptions={familyNameOptions}
                          alternatives={result.alternatives}
                          onCopyAlternative={copyToClipboard}
                          onFamilyNameTypeChange={handleFamilyNameTypeChange}
                        />
                      </div>

                      <div className="px-4 md:px-0 mt-2">
                        <p className="text-xs text-gray-400 text-center">
                          국어의 로마자 표기법 (2024.05.23) 기준 ·{' '}
                          <a href="/passport-guide" className="underline hover:text-blue-500 transition-colors">
                            여권 표기 규정 확인
                          </a>
                        </p>
                      </div>
                    </>
                  );
                })()}

                <AdSlot
                  slot={AD_SLOT_CONTENT}
                  format="auto"
                  wrapperClassName="md:my-6 md:rounded-lg md:overflow-hidden"
                  lazyLoad={true}
                />

                <div className="md:hidden">
                  <div className="px-4 mt-6">
                    <ContentLinks 
                      title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 유용한 가이드</span>} 
                      items={guideLinks} 
                    />
                  </div>
                  <div className="px-4 pb-2 mt-4">
                    <ContentLinks 
                      title={<span className="flex items-center gap-1.5"><Briefcase size={16} className="text-gray-500" /> 도구</span>} 
                      items={toolLinks} 
                    />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <AdSlot
                  slot={AD_SLOT_INDEX_CONTENT}
                  format="auto"
                  wrapperClassName="md:my-6 md:rounded-lg mt-4"
                  lazyLoad={false}
                />

                <div className="px-4 md:px-0 space-y-6 mt-2">
                  <div className="mt-4 space-y-3">
                    <a
                      href="/names/us/popular"
                      className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100 p-5 flex items-center justify-between transition-all hover:border-blue-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <Award className="text-amber-500" size={20} />
                          <span className="text-base font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors">2024년 미국 인기 영어 이름 TOP 50</span>
                        </div>
                        <span className="text-sm text-blue-800/70 leading-relaxed pr-8 line-clamp-2 md:line-clamp-none">
                          요즘 가장 핫한 영어 이름은? 미국 실데이터 기반 인기 랭킹을 확인해보세요!
                        </span>
                      </div>
                      <div className="shrink-0 text-blue-300 group-hover:text-blue-600 transition-colors bg-white group-hover:bg-blue-100 p-2 rounded-full shadow-sm">
                        <ChevronRight size={20} />
                      </div>
                    </a>

                    <a
                      href="/about"
                      className="group bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between transition-all hover:border-gray-300 hover:shadow-md hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-gray-900 group-hover:text-gray-700 transition-colors">Nameeng 서비스 소개</span>
                        </div>
                        <span className="text-sm text-gray-500 leading-relaxed pr-8 line-clamp-2 md:line-clamp-none">
                          여권 로마자 표기 규정부터 부정적 영단어 어감 분석까지. 가장 쉽고 정확하게 내 이름의 영문 스펠링을 찾아보세요.
                        </span>
                      </div>
                      <div className="shrink-0 text-gray-300 group-hover:text-gray-600 transition-colors bg-gray-50 group-hover:bg-gray-100 p-2 rounded-full">
                        <ChevronRight size={20} />
                      </div>
                    </a>
                  </div>

                  <div className="md:hidden mt-6">
                    <ContentLinks 
                      title={<span className="flex items-center gap-1.5"><BookOpen size={16} className="text-blue-500" /> 인기 가이드</span>} 
                      items={guideLinks.slice(0, 3)} 
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <CommonSidebar
            extraContent={
              <div className="pt-2">
                <ContentLinks 
                  title={<span className="flex items-center gap-1.5"><Briefcase size={16} className="text-gray-500" /> 도구</span>} 
                  items={toolLinks} 
                />
              </div>
            }
          />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
