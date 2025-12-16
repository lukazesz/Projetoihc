import { Users, Calendar, MessageSquare } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BookClub {
  id: string;
  name: string;
  image: string;
  members: number;
  currentBook: string;
  nextMeeting: string;
  description: string;
}

interface BookClubCardProps {
  club: BookClub;
  onJoin?: (clubId: string) => void;
}

export function BookClubCard({ club, onJoin }: BookClubCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-24 sm:h-32 bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0">
        <ImageWithFallback
          src={club.image}
          alt={`Imagem do clube ${club.name}`}
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <h3 className="mb-1.5 sm:mb-2 dark:text-white text-sm sm:text-base">{club.name}</h3>
        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2 min-h-[32px] sm:min-h-[40px]">{club.description}</p>
        
        <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 flex-grow">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Users size={14} className="sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
            <span aria-label={`${club.members} membros`}>{club.members} membros</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <MessageSquare size={14} className="sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">Lendo: {club.currentBook}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={14} className="sm:w-4 sm:h-4 flex-shrink-0" aria-hidden="true" />
            <span className="truncate">Próximo: {club.nextMeeting}</span>
          </div>
        </div>
        
        <button
          onClick={() => onJoin?.(club.id)}
          className="w-full bg-purple-500 dark:bg-purple-600 text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full hover:bg-purple-600 dark:hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 mt-auto text-sm sm:text-base"
        >
          Participar do Clube
        </button>
      </div>
    </article>
  );
}