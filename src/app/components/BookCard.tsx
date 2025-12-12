import { Star, MessageCircle, Heart, Bookmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  cover: string;
  rating: number;
  reviews: number;
  onRate?: (bookId: string, rating: number) => void;
}

export function BookCard({ id, title, author, cover, rating, reviews, onRate }: BookCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const handleRating = (newRating: number) => {
    setUserRating(newRating);
    onRate?.(id, newRating);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
      <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700">
        <ImageWithFallback
          src={cover}
          alt={`Capa do livro ${title}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-3 sm:p-4">
        <h3 className="line-clamp-2 mb-1 dark:text-white text-sm sm:text-base">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 line-clamp-1">{author}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleRating(star)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRating(star);
                  }
                }}
                aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              >
                <Star
                  size={14}
                  className={`sm:w-4 sm:h-4 ${
                    star <= (userRating || rating) 
                      ? 'fill-yellow-400 text-yellow-400' 
                      : 'text-gray-300 dark:text-gray-600'
                  } transition-colors cursor-pointer hover:text-yellow-400`}
                />
              </button>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400" aria-label={`${reviews} avaliações`}>
            ({reviews})
          </span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            onClick={() => setIsLiked(!isLiked)}
            aria-label={isLiked ? "Remover curtida" : "Curtir"}
            aria-pressed={isLiked}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 sm:px-2 py-1"
          >
            <Heart size={16} className={`sm:w-[18px] sm:h-[18px] ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          
          <button
            aria-label="Ver comentários"
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 sm:px-2 py-1"
          >
            <MessageCircle size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          
          <button
            onClick={() => setIsSaved(!isSaved)}
            aria-label={isSaved ? "Remover dos salvos" : "Salvar"}
            aria-pressed={isSaved}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 sm:px-2 py-1"
          >
            <Bookmark size={16} className={`sm:w-[18px] sm:h-[18px] ${isSaved ? 'fill-blue-500 text-blue-500' : ''}`} />
          </button>
        </div>
      </div>
    </article>
  );
}