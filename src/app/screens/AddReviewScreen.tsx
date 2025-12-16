import { useState } from 'react';
import { ArrowLeft, Star } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useTheme } from '../contexts/ThemeContext';

interface AddReviewScreenProps {
  book: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function AddReviewScreen({ book, onNavigate }: AddReviewScreenProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [containsSpoilers, setContainsSpoilers] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você adicionaria a lógica para salvar a avaliação
    alert('Avaliação enviada com sucesso!');
    onNavigate('bookDetails', { book });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => onNavigate('bookDetails', { book })}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors">
        <h1 className="text-2xl mb-6 dark:text-white">Escrever Avaliação</h1>

        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6 transition-colors">
          <ImageWithFallback
            src={book.cover}
            alt={`Capa de ${book.title}`}
            className="w-16 h-24 object-cover rounded"
          />
          <div>
            <h2 className="mb-1 dark:text-white">{book.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">{book.author}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 dark:text-white">
              Sua Avaliação <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                  aria-label={`Avaliar com ${star} estrela${star > 1 ? 's' : ''}`}
                >
                  <Star
                    size={32}
                    className={`${
                      star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    } transition-colors cursor-pointer hover:text-yellow-400`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {rating} de 5 estrelas
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="review-text" className="block mb-2 dark:text-white">
              Sua Opinião <span className="text-red-500">*</span>
            </label>
            <textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Compartilhe sua opinião sobre o livro... O que você achou da história, dos personagens, da escrita?"
              required
              rows={8}
              className="w-full p-4 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:border-blue-500 focus:outline-none transition-colors resize-vertical"
              aria-describedby="review-help"
            />
            <p id="review-help" className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Mínimo de 50 caracteres. Seja respeitoso e construtivo em sua avaliação.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="spoilers"
              checked={containsSpoilers}
              onChange={(e) => setContainsSpoilers(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            <div>
              <label htmlFor="spoilers" className="cursor-pointer dark:text-white">
                Esta avaliação contém spoilers
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Marque esta opção se sua avaliação revelar partes importantes da história
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => onNavigate('bookDetails', { book })}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 py-3 px-6 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={rating === 0 || reviewText.length < 50}
              className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publicar Avaliação
            </button>
          </div>
        </form>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded transition-colors">
        <h3 className="text-sm mb-2 dark:text-white">📝 Dicas para uma boa avaliação</h3>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>Seja específico sobre o que você gostou ou não gostou</li>
          <li>Evite spoilers ou marque a opção correspondente</li>
          <li>Seja respeitoso com autores e outros leitores</li>
          <li>Explique o porquê da sua avaliação</li>
        </ul>
      </div>
    </div>
  );
}