import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchBooks, getBookCoverUrl, BookSearchResult } from '../services/bookApi';
import { BookCard } from '../components/BookCard';

interface DiscoverScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function DiscoverScreen({ onNavigate }: DiscoverScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BookSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setHasSearched(true);
    const results = await searchBooks(searchQuery);
    setSearchResults(results);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    { name: 'Ficção Científica', emoji: '🚀' },
    { name: 'Romance', emoji: '💕' },
    { name: 'Terror', emoji: '👻' },
    { name: 'Fantasia', emoji: '🧙‍♂️' },
    { name: 'Biografia', emoji: '📖' },
    { name: 'História', emoji: '🏛️' },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl mb-4 dark:text-white">Buscar Livros</h2>
        
        <div className="relative">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o nome do livro ou autor..."
            aria-label="Buscar livros"
            className="w-full pl-10 sm:pl-12 pr-20 sm:pr-24 py-3 sm:py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors text-sm sm:text-base"
          />
          <Search 
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" 
            size={18}
            aria-hidden="true"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !searchQuery.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 dark:bg-blue-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 text-sm sm:text-base"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              'Buscar'
            )}
          </button>
        </div>
      </section>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin text-blue-500 dark:text-blue-400" size={40} />
          <span className="ml-3 text-gray-600 dark:text-gray-400 text-sm sm:text-base">Buscando livros...</span>
        </div>
      )}

      {!isLoading && hasSearched && searchResults.length > 0 && (
        <section>
          <h3 className="text-lg mb-4 dark:text-white">
            {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {searchResults.map((book, index) => (
              <div
                key={`${book.key}-${index}`}
                onClick={() => onNavigate('bookDetails', { book })}
                className="cursor-pointer"
              >
                <BookCard
                  id={book.key}
                  title={book.title}
                  author={book.author}
                  cover={getBookCoverUrl(book.coverId, 'L')}
                  rating={Math.floor(Math.random() * 2) + 4}
                  reviews={Math.floor(Math.random() * 1000) + 100}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {!isLoading && hasSearched && searchResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
            Nenhum livro encontrado para "{searchQuery}"
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            Tente buscar com outros termos
          </p>
        </div>
      )}

      {!hasSearched && (
        <section>
          <h3 className="text-lg mb-4 dark:text-white">Explorar por Categoria</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setSearchQuery(category.name);
                  handleSearch();
                }}
                className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <div className="text-3xl sm:text-4xl mb-2">{category.emoji}</div>
                <h4 className="text-sm dark:text-white">{category.name}</h4>
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}