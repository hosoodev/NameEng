import DesktopNavBar from './DesktopNavBar';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import CommonSidebar from './CommonSidebar';
import type { ComponentProps } from 'react';

// CommonSidebar의 customLinks 타입을 그대로 재사용
type SidebarLinks = ComponentProps<typeof CommonSidebar>['customLinks'];

interface TwoColumnLayoutProps {
  children: React.ReactNode;
  sidebarLinks?: SidebarLinks;
  extraContent?: React.ReactNode;
}

export default function TwoColumnLayout({ children, sidebarLinks, extraContent }: TwoColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col print:bg-white print:min-h-0">
      <div className="print:hidden">
        <DesktopNavBar />
      </div>

      <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1 print:max-w-none print:px-0 print:m-0">
        <div className="px-4 md:hidden mt-4 print:hidden">
          <SiteHeader />
        </div>

        {/* 인쇄 시 grid를 해제하고 block으로 변경, margin 초기화 */}
        <div className="md:grid md:grid-cols-[1fr_300px] gap-8 mt-8 print:block print:m-0 print:gap-0">
          <div className="w-full px-4 md:px-0 print:px-0 print:w-full">
            {children}
          </div>

          <div className="print:hidden">
            <CommonSidebar customLinks={sidebarLinks} extraContent={extraContent} />
          </div>
        </div>
      </main>

      <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}
