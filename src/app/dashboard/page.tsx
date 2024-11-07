import Map from '../component/Map'
import Header from '../component/Header'
import Sidebar from '../component/Sidebar'
import MainContent from '../component/Maincontent'

export default function Dashboard(){

    return( <div className="flex">
    <Sidebar />
    <div className="flex flex-col w-full">
      <Header />
      <main id="content" className="lg:ps-[260px] pt-[59px]">
      <div className="p-2 sm:p-5 sm:py-0 md:pt-5 space-y-5">
        <div className="p-4 flex flex-col justify-center h-72 md:h-96 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-103px)] bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
          <div className="relative h-full border border-dashed border-gray-200 rounded-xl overflow-hidden dark:border-neutral-700">
            <div className="absolute inset-0 size-full">
                <Map />
              <div className="bg-[linear-gradient(45deg,theme(colors.gray.100)_7.14%,transparent_7.14%,transparent_50%,theme(colors.gray.100)_50%,theme(colors.gray.100)_57.14%,transparent_57.14%,transparent);] bg-[length:10px_10px] dark:bg-[linear-gradient(45deg,theme(colors.neutral.700)_7.14%,transparent_7.14%,transparent_50%,theme(colors.neutral.700)_50%,theme(colors.neutral.700)_57.14%,transparent_57.14%,transparent);] size-full"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </div>
  </div>)
}