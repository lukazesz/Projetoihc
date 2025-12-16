import { useState } from 'react';
import { BookOpen, Clock, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ReadingListsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  progress?: number;
}

export function ReadingListsScreen({ onNavigate }: ReadingListsScreenProps) {
  const [activeList, setActiveList] = useState<'reading' | 'wantToRead' | 'finished'>('reading');

  const [lists, setLists] = useState({
    reading: [
      {
        id: '1',
        title: '1984',
        author: 'George Orwell',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
        progress: 65,
      },
      {
        id: '2',
        title: 'O Hobbit',
        author: 'J.R.R. Tolkien',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
        progress: 30,
      },
    ],
    wantToRead: [
      {
        id: '3',
        title: 'Cem Anos de Solidão',
        author: 'Gabriel García Márquez',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
      {
        id: '4',
        title: 'O Cortiço',
        author: 'Aluísio Azevedo',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
      {
        id: '5',
        title: 'Crime e Castigo',
        author: 'Fiódor Dostoiévski',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
    ],
    finished: [
      {
        id: '6',
        title: 'Dom Casmurro',
        author: 'Machado de Assis',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
      {
        id: '7',
        title: 'O Senhor dos Anéis',
        author: 'J.R.R. Tolkien',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
      {
        id: '8',
        title: 'Harry Potter e a Pedra Filosofal',
        author: 'J.K. Rowling',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      },
    ],
  });

  const removeBook = (bookId: string) => {
    setLists((prev) => ({
      ...prev,
      [activeList]: prev[activeList].filter((book) => book.id !== bookId),
    }));
  };

  const tabs = [
    { id: 'reading' as const, label: 'Lendo Agora', icon: BookOpen, color: 'blue' },
    { id: 'wantToRead' as const, label: 'Quero Ler', icon: Clock, color: 'orange' },
    { id: 'finished' as const, label: 'Lidos', icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl dark:text-white">Minhas Listas de Leitura</h1>
        <button
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-sm sm:text-base"
        >
          <Plus size={20} />
          <span>Adicionar Livro</span>
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = lists[tab.id].length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveList(tab.id)}
                className={`flex-1 min-w-[120px] sm:min-w-[150px] flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base ${
                  activeList === tab.id
                    ? `border-${tab.color}-500 text-${tab.color}-600 dark:text-${tab.color}-400 bg-${tab.color}-50 dark:bg-${tab.color}-900/20`
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
                aria-current={activeList === tab.id ? 'page' : undefined}
              >
                <Icon size={18} className="sm:w-5 sm:h-5" aria-hidden="true" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-1.5 sm:px-2 py-0.5 rounded-full text-xs sm:text-sm">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-4 sm:p-6">
          {lists[activeList].length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                Nenhum livro nesta lista
              </p>
              <button
                onClick={() => onNavigate('discover')}
                className="text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
              >
                Explorar livros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {lists[activeList].map((book) => (
                <article
                  key={book.id}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  <div className="flex gap-3 sm:gap-4 flex-grow">
                    <div
                      onClick={() => onNavigate('bookDetails', { book })}
                      className="cursor-pointer flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={book.cover}
                        alt={`Capa de ${book.title}`}
                        className="w-20 h-28 sm:w-24 sm:h-36 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 flex flex-col min-w-0">
                      <h3
                        onClick={() => onNavigate('bookDetails', { book })}
                        className="text-sm sm:text-base mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors dark:text-white line-clamp-2"
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-auto line-clamp-1">{book.author}</p>

                      {book.progress !== undefined && (
                        <div className="mt-2 sm:mt-3">
                          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                            <span>Progresso</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div
                            className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2"
                            role="progressbar"
                            aria-valuenow={book.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="bg-blue-500 dark:bg-blue-400 h-full rounded-full transition-all"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => removeBook(book.id)}
                        className="mt-2 sm:mt-3 flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 self-start"
                        aria-label={`Remover ${book.title}`}
                      >
                        <Trash2 size={14} />
                        <span>Remover</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}