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
    { id: 'finished' as const, label: 'Já Li', icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Minhas Listas de Leitura</h1>
        <button
          onClick={() => onNavigate('discover')}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Plus size={20} />
          <span>Adicionar Livro</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const count = lists[tab.id].length;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveList(tab.id)}
                className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 px-6 py-4 border-b-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  activeList === tab.id
                    ? `border-${tab.color}-500 text-${tab.color}-600 bg-${tab.color}-50`
                    : 'border-transparent text-gray-600 hover:bg-gray-50'
                }`}
                aria-current={activeList === tab.id ? 'page' : undefined}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{tab.label}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-sm">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6">
          {lists[activeList].length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Nenhum livro nesta lista
              </p>
              <button
                onClick={() => onNavigate('discover')}
                className="text-blue-500 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-4 py-2"
              >
                Explorar livros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lists[activeList].map((book) => (
                <article
                  key={book.id}
                  className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div
                      onClick={() => onNavigate('bookDetails', { book })}
                      className="cursor-pointer flex-shrink-0"
                    >
                      <ImageWithFallback
                        src={book.cover}
                        alt={`Capa de ${book.title}`}
                        className="w-24 h-36 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 flex flex-col">
                      <h3
                        onClick={() => onNavigate('bookDetails', { book })}
                        className="text-sm mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                      >
                        {book.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-auto">{book.author}</p>

                      {book.progress !== undefined && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-600 mb-1">
                            <span>Progresso</span>
                            <span>{book.progress}%</span>
                          </div>
                          <div
                            className="w-full bg-gray-200 rounded-full h-2"
                            role="progressbar"
                            aria-valuenow={book.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          >
                            <div
                              className="bg-blue-500 h-full rounded-full transition-all"
                              style={{ width: `${book.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        onClick={() => removeBook(book.id)}
                        className="mt-3 flex items-center gap-1 text-xs text-red-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded px-2 py-1 self-start"
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
