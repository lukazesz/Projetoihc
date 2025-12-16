import { useState } from 'react';
import { Menu, Bell, Home, BookMarked, Users as UsersIcon, Sparkles, List, Sun, Moon } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { UserProfile } from './components/UserProfile';
import { ReadingList } from './components/ReadingList';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

// Screens
import { HomeScreen } from './screens/HomeScreen';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { BookDetailsScreen } from './screens/BookDetailsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ReadingListsScreen } from './screens/ReadingListsScreen';
import { BookClubsScreen } from './screens/BookClubsScreen';
import { ClubDetailsScreen } from './screens/ClubDetailsScreen';
import { AddReviewScreen } from './screens/AddReviewScreen';

type Screen = 
  | 'home' 
  | 'discover' 
  | 'bookDetails' 
  | 'profile' 
  | 'readingLists' 
  | 'clubs'
  | 'clubDetails'
  | 'addReview';

interface NavigationState {
  screen: Screen;
  data?: any;
}

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [navigation, setNavigation] = useState<NavigationState>({ screen: 'home' });
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (screen: string, data?: any) => {
    setNavigation({ screen: screen as Screen, data });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const readingLists = {
    reading: [
      { id: '1', title: '1984', author: 'George Orwell', progress: 65 },
      { id: '2', title: 'O Hobbit', author: 'J.R.R. Tolkien', progress: 30 },
    ],
    wantToRead: [
      { id: '3', title: 'Cem Anos de Solidão', author: 'Gabriel García Márquez' },
      { id: '4', title: 'O Cortiço', author: 'Aluísio Azevedo' },
    ],
    finished: [
      { id: '5', title: 'Dom Casmurro', author: 'Machado de Assis' },
      { id: '6', title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien' },
    ],
  };

  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'discover', label: 'Descobrir', icon: Sparkles },
    { id: 'readingLists', label: 'Minhas Listas', icon: List },
    { id: 'clubs', label: 'Clubes', icon: UsersIcon },
    { id: 'profile', label: 'Perfil', icon: BookMarked },
  ];

  const renderScreen = () => {
    switch (navigation.screen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'discover':
        return <DiscoverScreen onNavigate={handleNavigate} />;
      case 'bookDetails':
        return <BookDetailsScreen book={navigation.data?.book} onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'readingLists':
        return <ReadingListsScreen onNavigate={handleNavigate} />;
      case 'clubs':
        return <BookClubsScreen onNavigate={handleNavigate} />;
      case 'clubDetails':
        return <ClubDetailsScreen club={navigation.data?.club} onNavigate={handleNavigate} />;
      case 'addReview':
        return <AddReviewScreen book={navigation.data?.book} onNavigate={handleNavigate} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-2.5 sm:px-4 py-2 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Menu size={18} className="sm:w-6 sm:h-6" />
            </button>
            
            <h1 
              onClick={() => handleNavigate('home')}
              className="text-base sm:text-xl lg:text-2xl cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap dark:text-white"
            >
              📚 BookConnect
            </h1>
            
            <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8 max-w-2xl">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            
            <div className="flex items-center gap-0.5 sm:gap-2">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
              >
                {theme === 'light' ? (
                  <Moon size={18} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-200" />
                ) : (
                  <Sun size={18} className="sm:w-6 sm:h-6 text-yellow-400" />
                )}
              </button>
              
              <button
                aria-label="Notificações"
                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
              >
                <Bell size={18} className="sm:w-6 sm:h-6 dark:text-gray-200" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-label="Novas notificações" />
              </button>
            </div>
          </div>
          
          <div className="md:hidden mt-2 sm:mt-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-[60px] sm:top-[73px] md:top-[89px] z-40 transition-colors" aria-label="Navegação principal">
        <div className="max-w-7xl mx-auto px-1.5 sm:px-4">
          <div className="flex gap-0.5 sm:gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = navigation.screen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 border-b-2 transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-base ${
                    isActive
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon size={16} className="sm:w-5 sm:h-5" aria-hidden="true" />
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-2.5 sm:px-4 py-3 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-6 lg:gap-8">
          {/* Left Sidebar - Profile (only on home screen) */}
          {navigation.screen === 'home' && (
            <aside className="lg:col-span-3 space-y-3 sm:space-y-6">
              <UserProfile
                name="Ana Costa"
                avatar="https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=200"
                booksRead={47}
                followers={234}
                following={156}
                bio="Apaixonada por fantasia e ficção científica 📚✨"
              />
              
              <ReadingList lists={readingLists} />
            </aside>
          )}

          {/* Main Content Area */}
          <section className={navigation.screen === 'home' ? 'lg:col-span-6' : 'lg:col-span-9'}>
            {renderScreen()}
          </section>

          {/* Right Sidebar - Ads & Suggestions (only on home screen) */}
          {navigation.screen === 'home' && (
            <aside className="lg:col-span-3 space-y-3 sm:space-y-6">
              <section className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg sm:rounded-xl p-3 sm:p-6" aria-label="Anúncio">
                <h3 className="mb-1.5 sm:mb-2 text-base sm:text-lg">Descubra Novos Autores</h3>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">
                  Participe do nosso evento mensal e conheça autores incríveis!
                </p>
                <button className="bg-white text-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500 text-xs sm:text-base">
                  Saiba Mais
                </button>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors">
                <h3 className="mb-3 sm:mb-4 dark:text-white text-base sm:text-lg">Usuários Sugeridos</h3>
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    { name: 'Carlos Mendes', books: 89 },
                    { name: 'Beatriz Lima', books: 124 },
                    { name: 'Pedro Oliveira', books: 67 },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm dark:text-white truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.books} livros</p>
                        </div>
                      </div>
                      <button className="text-xs sm:text-sm text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1 whitespace-nowrap flex-shrink-0">
                        Seguir
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}