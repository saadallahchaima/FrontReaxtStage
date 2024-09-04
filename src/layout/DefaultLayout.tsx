import React, { useState, ReactNode } from 'react';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar/index';

const DefaultLayout: React.FC<{ children: ReactNode; hideSidebar?: boolean; hideSearch?: boolean }> = ({ children, hideSidebar = false, hideSearch = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark min-h-screen">
      <div className="flex h-full overflow-hidden">
        {!hideSidebar && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!hideSearch && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}
          <main className="flex-1">
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
