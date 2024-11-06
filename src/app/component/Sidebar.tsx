// components/Sidebar.tsx
import React from 'react';

const Sidebar: React.FC = () => {
  return (
    <aside id="hs-pro-sidebar" className="w-[260px] fixed inset-y-0 start-0 z-[60] bg-white border-e border-gray-200 lg:block lg:translate-x-0 dark:bg-neutral-800 dark:border-neutral-700">
      <div className="h-full p-4">
        <div className="relative h-full border border-dashed border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
          <div className="absolute inset-0 size-full">
            <div className="bg-[linear-gradient(45deg,theme(colors.gray.100)_7.14%,transparent_7.14%,transparent_50%,theme(colors.gray.100)_50%,theme(colors.gray.100)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,theme(colors.neutral.700)_7.14%,transparent_7.14%,transparent_50%,theme(colors.neutral.700)_50%,theme(colors.neutral.700)_57.14%,transparent_57.14%,transparent);] size-full"></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;