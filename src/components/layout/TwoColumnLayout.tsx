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
}

export default function TwoColumnLayout({ children, sidebarLinks }: TwoColumnLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <DesktopNavBar />

      <main className="max-w-[1280px] mx-auto w-full px-0 md:px-8 flex-1">
        <div className="px-4 md:hidden mt-4">
          <SiteHeader />
        </div>

        <div className="md:grid md:grid-cols-[1fr_300px] gap-8 mt-8">
          <div className="w-full px-4 md:px-0">
            {children}
          </div>

          <CommonSidebar customLinks={sidebarLinks} />
        </div>
      </main>

      <div className="px-4 mb-8 max-w-[1280px] w-full mx-auto">
        <SiteFooter />
      </div>
    </div>
  );
}
