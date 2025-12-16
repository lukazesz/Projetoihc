import { UserProfile } from '../components/UserProfile';
import { BookCard } from '../components/BookCard';
import { Calendar, Award, TrendingUp } from 'lucide-react';

interface ProfileScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const myBooks = [
    {
      id: '1',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 5,
      reviews: 543,
    },
    {
      id: '2',
      title: 'O Cortiço',
      author: 'Aluísio Azevedo',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 4,
      reviews: 321,
    },
    {
      id: '3',
      title: 'Memórias Póstumas de Brás Cubas',
      author: 'Machado de Assis',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 5,
      reviews: 678,
    },
    {
      id: '4',
      title: 'Grande Sertão: Veredas',
      author: 'Guimarães Rosa',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 5,
      reviews: 432,
    },
  ];

  const achievements = [
    { title: 'Leitor Iniciante', description: 'Leu 10 livros', icon: '📚', earned: true },
    { title: 'Crítico Literário', description: 'Escreveu 25 avaliações', icon: '✍️', earned: true },
    { title: 'Explorador', description: 'Leu 5 gêneros diferentes', icon: '🗺️', earned: true },
    { title: 'Maratonista', description: 'Leu 50 livros', icon: '🏃', earned: false },
    { title: 'Influenciador', description: '100 seguidores', icon: '⭐', earned: false },
    { title: 'Mestre dos Livros', description: 'Leu 100 livros', icon: '👑', earned: false },
  ];

  const readingGoals = {
    yearly: {
      target: 52,
      current: 47,
    },
    monthly: {
      target: 4,
      current: 3,
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-3 sm:space-y-6">
      <UserProfile
        name="Ana Costa"
        avatar="https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=200"
        booksRead={47}
        followers={234}
        following={156}
        bio="Apaixonada por fantasia e ficção científica 📚✨"
      />

      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <TrendingUp className="text-green-500 dark:text-green-400" size={18} />
          <h2 className="text-base sm:text-xl dark:text-white">Metas de Leitura</h2>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Meta Anual</span>
              <span className="text-xs sm:text-sm dark:text-gray-300">
                {readingGoals.yearly.current} / {readingGoals.yearly.target} livros
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-green-500 dark:bg-green-400 h-full transition-all"
                style={{ width: `${(readingGoals.yearly.current / readingGoals.yearly.target) * 100}%` }}
                role="progressbar"
                aria-valuenow={readingGoals.yearly.current}
                aria-valuemin={0}
                aria-valuemax={readingGoals.yearly.target}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Meta Mensal (Dezembro)</span>
              <span className="text-xs sm:text-sm dark:text-gray-300">
                {readingGoals.monthly.current} / {readingGoals.monthly.target} livros
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-blue-500 dark:bg-blue-400 h-full transition-all"
                style={{ width: `${(readingGoals.monthly.current / readingGoals.monthly.target) * 100}%` }}
                role="progressbar"
                aria-valuenow={readingGoals.monthly.current}
                aria-valuemin={0}
                aria-valuemax={readingGoals.monthly.target}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Award className="text-yellow-500 dark:text-yellow-400" size={18} />
          <h2 className="text-base sm:text-xl dark:text-white">Conquistas</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-2 sm:p-4 rounded-lg text-center transition-all ${
                achievement.earned
                  ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-2 border-yellow-300 dark:border-yellow-600'
                  : 'bg-gray-50 dark:bg-gray-700 opacity-50'
              }`}
            >
              <div className="text-xl sm:text-3xl mb-1 sm:mb-2">{achievement.icon}</div>
              <h4 className="text-xs sm:text-sm mb-0.5 sm:mb-1 dark:text-white">{achievement.title}</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">{achievement.description}</p>
              {achievement.earned && (
                <div className="mt-1 sm:mt-2 text-xs text-yellow-600 dark:text-yellow-400">✓ Conquistado</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors">
        <h2 className="text-base sm:text-xl mb-3 sm:mb-4 dark:text-white">Minha Biblioteca ({myBooks.length} livros)</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-4">
          {myBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onNavigate('bookDetails', { book })}
              className="cursor-pointer"
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}