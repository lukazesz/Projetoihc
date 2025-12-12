import { useState } from 'react';
import { ArrowLeft, Star, Heart, Bookmark, Share2, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface BookDetailsScreenProps {
  book: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function BookDetailsScreen({ book, onNavigate }: BookDetailsScreenProps) {
  const [userRating, setUserRating] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [readingStatus, setReadingStatus] = useState<'none' | 'wantToRead' | 'reading' | 'finished'>('none');

  const reviews = [
    {
      id: '1',
      user: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      rating: 5,
      date: '10/12/2024',
      text: 'Simplesmente incrível! Um dos melhores livros que já li. A narrativa é envolvente do início ao fim.',
    },
    {
      id: '2',
      user: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      rating: 4,
      date: '08/12/2024',
      text: 'Muito bom, mas achei algumas partes um pouco lentas. No geral, recomendo!',
    },
  ];

  const statusButtons = [
    { id: 'wantToRead' as const, label: 'Quero Ler' },
    { id: 'reading' as const, label: 'Lendo' },
    { id: 'finished' as const, label: 'Já Li' },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => onNavigate('discover')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid md:grid-cols-3 gap-6 p-6">
          <div className="md:col-span-1">
            <div className="aspect-[2/3] bg-gray-200 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={book.cover}
                alt={`Capa do livro ${book.title}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <div>
              <h1 className="text-2xl md:text-3xl mb-2">{book.title}</h1>
              <p className="text-lg text-gray-600">por {book.author}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  >
                    <Star
                      size={24}
                      className={`${
                        star <= (userRating || book.rating || 0)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors cursor-pointer hover:text-yellow-400`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-gray-600">
                {book.rating || 4.5}/5 ({book.reviews || 0} avaliações)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {statusButtons.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setReadingStatus(status.id)}
                  className={`px-4 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    readingStatus === status.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsLiked(!isLiked)}
                aria-label={isLiked ? "Remover curtida" : "Curtir"}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2"
              >
                <Heart size={20} className={isLiked ? 'fill-red-500 text-red-500' : ''} />
                <span>Curtir</span>
              </button>

              <button
                onClick={() => setIsSaved(!isSaved)}
                aria-label={isSaved ? "Remover dos salvos" : "Salvar"}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2"
              >
                <Bookmark size={20} className={isSaved ? 'fill-blue-500 text-blue-500' : ''} />
                <span>Salvar</span>
              </button>

              <button
                aria-label="Compartilhar"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-3 py-2"
              >
                <Share2 size={20} />
                <span>Compartilhar</span>
              </button>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg mb-2">Sobre o Livro</h3>
              <p className="text-gray-700 leading-relaxed">
                Uma história emocionante que cativa leitores de todas as idades. 
                Com personagens memoráveis e uma trama envolvente, este livro se tornou 
                um clássico da literatura mundial.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl">Avaliações</h2>
          <button
            onClick={() => onNavigate('addReview', { book })}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Escrever Avaliação
          </button>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <article key={review.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-3 mb-3">
                <ImageWithFallback
                  src={review.avatar}
                  alt={`Foto de ${review.user}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm">{review.user}</h4>
                    <time className="text-xs text-gray-500">{review.date}</time>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        className={star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
