import { ActivityFeed } from '../components/ActivityFeed';
import { BookCard } from '../components/BookCard';

interface HomeScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const activities = [
    {
      id: '1',
      user: {
        name: 'Maria Silva',
        avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      },
      type: 'review' as const,
      book: {
        title: 'O Senhor dos Anéis',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=100',
      },
      content: 'Uma obra-prima absoluta! A construção do mundo é incomparável.',
      rating: 5,
      timestamp: 'há 2 horas',
      likes: 24,
      comments: 5,
    },
    {
      id: '2',
      user: {
        name: 'João Santos',
        avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      },
      type: 'status' as const,
      content: 'Acabei de terminar mais um capítulo incrível! Não consigo parar de ler.',
      timestamp: 'há 4 horas',
      likes: 18,
      comments: 3,
    },
    {
      id: '3',
      user: {
        name: 'Ana Costa',
        avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      },
      type: 'review' as const,
      book: {
        title: '1984',
        cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=100',
      },
      content: 'Assustadoramente relevante nos dias de hoje. Leitura obrigatória!',
      rating: 5,
      timestamp: 'há 6 horas',
      likes: 45,
      comments: 12,
    },
  ];

  const recommendedBooks = [
    {
      id: '1',
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J.K. Rowling',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 5,
      reviews: 2341,
    },
    {
      id: '2',
      title: 'O Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 5,
      reviews: 1876,
    },
    {
      id: '3',
      title: 'A Revolução dos Bichos',
      author: 'George Orwell',
      cover: 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400',
      rating: 4,
      reviews: 987,
    },
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <ActivityFeed activities={activities} />
      
      <section>
        <h2 className="text-xl mb-4 dark:text-white">Recomendados para Você</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onNavigate('bookDetails', { book })}
              className="cursor-pointer"
            >
              <BookCard {...book} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}