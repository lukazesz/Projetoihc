import { Heart, MessageCircle, Share2, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  type: 'review' | 'status' | 'recommendation';
  book?: {
    title: string;
    cover: string;
  };
  content: string;
  rating?: number;
  timestamp: string;
  likes: number;
  comments: number;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const [likedActivities, setLikedActivities] = useState<Set<string>>(new Set());

  const toggleLike = (activityId: string) => {
    setLikedActivities(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activityId)) {
        newSet.delete(activityId);
      } else {
        newSet.add(activityId);
      }
      return newSet;
    });
  };

  return (
    <section aria-label="Feed de atividades">
      <h2 className="text-xl mb-3 sm:mb-4 dark:text-white">Atividades Recentes</h2>
      
      <div className="space-y-3 sm:space-y-4">
        {activities.map((activity) => (
          <article key={activity.id} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-3 sm:p-4 transition-colors">
            <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
              <ImageWithFallback
                src={activity.user.avatar}
                alt={`Foto de ${activity.user.name}`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                  <h3 className="text-sm dark:text-white">{activity.user.name}</h3>
                  <time className="text-xs text-gray-500 dark:text-gray-400" dateTime={activity.timestamp}>
                    {activity.timestamp}
                  </time>
                </div>
                
                {activity.rating && (
                  <div className="flex items-center gap-0.5 sm:gap-1 mb-1.5 sm:mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={12}
                        className={`sm:w-[14px] sm:h-[14px] ${star <= activity.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        aria-hidden="true"
                      />
                    ))}
                    <span className="sr-only">Avaliou com {activity.rating} estrelas</span>
                  </div>
                )}
                
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 break-words">{activity.content}</p>
                
                {activity.book && (
                  <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <ImageWithFallback
                      src={activity.book.cover}
                      alt={`Capa de ${activity.book.title}`}
                      className="w-10 h-14 sm:w-16 sm:h-24 object-cover rounded flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm dark:text-white line-clamp-2">{activity.book.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-4 pt-2 sm:pt-3 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => toggleLike(activity.id)}
                aria-label={likedActivities.has(activity.id) ? "Remover curtida" : "Curtir"}
                aria-pressed={likedActivities.has(activity.id)}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1.5 sm:px-2 py-1"
              >
                <Heart 
                  size={14}
                  className={`sm:w-[18px] sm:h-[18px] ${likedActivities.has(activity.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
                <span className="text-xs sm:text-sm">
                  {activity.likes + (likedActivities.has(activity.id) ? 1 : 0)}
                </span>
              </button>
              
              <button
                aria-label={`${activity.comments} comentários`}
                className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1.5 sm:px-2 py-1"
              >
                <MessageCircle size={14} className="sm:w-[18px] sm:h-[18px]" />
                <span className="text-xs sm:text-sm">{activity.comments}</span>
              </button>
              
              <button
                aria-label="Compartilhar"
                className="flex items-center gap-1 sm:gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1.5 sm:px-2 py-1"
              >
                <Share2 size={14} className="sm:w-[18px] sm:h-[18px]" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}