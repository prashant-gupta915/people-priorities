import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 md:px-6">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="ml-4 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <MagnifyingGlassIcon className="absolute right-2 top-1.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <BellIcon className="h-5 w-5" />
        </button>
        <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <UserCircleIcon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          <span className="hidden md:inline-block text-sm font-medium text-gray-800 dark:text-gray-200">Admin</span>
        </button>
      </div>
    </header>
  );
}
