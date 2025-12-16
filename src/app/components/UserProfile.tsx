import { Users, BookOpen, Trophy, Settings } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface UserProfileProps {
  name: string;
  avatar: string;
  booksRead: number;
  followers: number;
  following: number;
  bio?: string;
}

export function UserProfile({ name, avatar, booksRead, followers, following, bio }: UserProfileProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-6 transition-colors" role="region" aria-label="Perfil do usuário">
      <div className="flex items-center gap-2.5 sm:gap-4 mb-3 sm:mb-4">
        <img
          src={avatar}
          alt={`Foto de perfil de ${name}`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-base sm:text-xl mb-0.5 sm:mb-1 dark:text-white truncate">{name}</h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{bio}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-1.5 sm:gap-4 text-center mb-3 sm:mb-4">
        <div className="p-1.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
          <div className="text-base sm:text-xl dark:text-white">{booksRead}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Livros</div>
        </div>
        <div className="p-1.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
          <div className="text-base sm:text-xl dark:text-white">{followers}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Seguidores</div>
        </div>
        <div className="p-1.5 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors">
          <div className="text-base sm:text-xl dark:text-white">{following}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">Seguindo</div>
        </div>
      </div>
      
      <button className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-1.5 sm:py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-sm sm:text-base">
        Editar Perfil
      </button>
    </div>
  );
}