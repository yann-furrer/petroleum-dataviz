// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="lg:ms-[260px] fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
      <div className="flex justify-between basis-full items-center w-full py-2.5 px-2 sm:px-5">
        <div className="lg:hidden">
          <button type="button" className="w-7 h-[38px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-300">
            {/* SVG Icon */}
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 8L21 12L17 16M3 12H13M3 6H13M3 18H13"/>
            </svg>
          </button>
        </div>
        
        <span className="hidden lg:block text-lg font-semibold text-gray-800 dark:text-white">
          Preline
        </span>

        <div className="flex justify-end items-center gap-x-2">
          {/* Account, Upgrade button, and other controls */}
          <span className="text-sm text-gray-800 dark:text-white">Trial ends in 12 days</span>
          <a href="/pro/dashboard/plans.html" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">
            Upgrade
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"/>
              <path d="M7 17L17 7"/>
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;