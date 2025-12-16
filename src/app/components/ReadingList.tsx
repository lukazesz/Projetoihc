import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Book {
  id: string;
  title: string;
  author: string;
  progress?: number;
}

interface ReadingListProps {
  lists: {
    reading: Book[];
    wantToRead: Book[];
    finished: Book[];
  };
}

export function ReadingList({ lists }: ReadingListProps) {
  const [activeTab, setActiveTab] = useState<'reading'>('reading');

  const tabs = [
    { id: 'reading' as const, label: 'Minha Lista', icon: BookOpen, count: lists.reading.length },
  ];

  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors" aria-label="Lendo Atualmente">
      <h2 className="text-base sm:text-xl mb-3 sm:mb-4 dark:text-white">Lendo Atualmente</h2>
      
      <div role="tablist" className="flex gap-1 sm:gap-2 mb-3 sm:mb-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`${tab.id}-panel`}
              id={`${tab.id}-tab`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-nowrap text-sm sm:text-base ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <Icon size={14} className="sm:w-[18px] sm:h-[18px]" aria-hidden="true" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
      
      <div
        role="tabpanel"
        id={`${activeTab}-panel`}
        aria-labelledby={`${activeTab}-tab`}
        className="space-y-2 sm:space-y-3"
      >
        {lists[activeTab].map((book) => (
          <div key={book.id} className="p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
            <h3 className="text-xs sm:text-sm mb-0.5 sm:mb-1 dark:text-white truncate">{book.title}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1.5 sm:mb-2 truncate">{book.author}</p>
            
            {book.progress !== undefined && (
              <div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progresso</span>
                  <span aria-label={`${book.progress}% concluído`}>{book.progress}%</span>
                </div>
                <div 
                  className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 sm:h-2 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={book.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="bg-blue-500 dark:bg-blue-400 h-full transition-all duration-300"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
        
        {lists[activeTab].length === 0 && (
          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 py-6 sm:py-8">
            Nenhum livro nesta lista
          </p>
        )}
      </div>
    </section>
  );
}