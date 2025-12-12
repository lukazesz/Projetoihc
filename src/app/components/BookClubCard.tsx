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
    <article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-32 bg-gradient-to-br from-purple-500 to-pink-500">
        <ImageWithFallback
          src={club.image}
          alt={`Imagem do clube ${club.name}`}
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      <div className="p-4">
        <h3 className="mb-2">{club.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{club.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users size={16} aria-hidden="true" />
            <span aria-label={`${club.members} membros`}>{club.members} membros</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MessageSquare size={16} aria-hidden="true" />
            <span className="truncate">Lendo: {club.currentBook}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} aria-hidden="true" />
            <span>Próximo encontro: {club.nextMeeting}</span>
          </div>
        </div>
        
        <button
          onClick={() => onJoin?.(club.id)}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          Participar do Clube
        </button>
      </div>
    </article>
  );
}
