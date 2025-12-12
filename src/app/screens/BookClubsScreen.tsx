import { BookClubCard } from '../components/BookClubCard';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface BookClubsScreenProps {
  onNavigate: (screen: string, data?: any) => void;
}

export function BookClubsScreen({ onNavigate }: BookClubsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const myClubs = [
    {
      id: '1',
      name: 'Clube de Ficção Científica',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 342,
      currentBook: 'Fundação - Isaac Asimov',
      nextMeeting: '15/12/2024',
      description: 'Explorando os melhores livros de ficção científica',
      isMember: true,
    },
    {
      id: '2',
      name: 'Leitoras do Brasil',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 521,
      currentBook: 'A Cor Púrpura - Alice Walker',
      nextMeeting: '17/12/2024',
      description: 'Celebrando autoras brasileiras e internacionais',
      isMember: true,
    },
  ];

  const suggestedClubs = [
    {
      id: '3',
      name: 'Clássicos da Literatura',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 578,
      currentBook: 'Crime e Castigo - Dostoiévski',
      nextMeeting: '18/12/2024',
      description: 'Descobrindo os clássicos que marcaram gerações',
      isMember: false,
    },
    {
      id: '4',
      name: 'Fantasia e Magia',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 892,
      currentBook: 'O Nome do Vento - Patrick Rothfuss',
      nextMeeting: '20/12/2024',
      description: 'Para amantes de fantasia épica e mundos mágicos',
      isMember: false,
    },
    {
      id: '5',
      name: 'Thrillers e Mistérios',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 456,
      currentBook: 'O Silêncio dos Inocentes - Thomas Harris',
      nextMeeting: '22/12/2024',
      description: 'Suspense, mistério e muita tensão',
      isMember: false,
    },
    {
      id: '6',
      name: 'Romances Inesquecíveis',
      image: 'https://images.unsplash.com/photo-1686100510925-1bca5eca8776?w=400',
      members: 634,
      currentBook: 'Orgulho e Preconceito - Jane Austen',
      nextMeeting: '19/12/2024',
      description: 'Os romances que nos fizeram sonhar',
      isMember: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl">Clubes de Leitura</h1>
        <button className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          <Plus size={20} />
          <span>Criar Clube</span>
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar clubes por nome ou interesse..."
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-purple-500 focus:outline-none transition-colors"
          aria-label="Buscar clubes"
        />
      </div>

      {myClubs.length > 0 && (
        <section>
          <h2 className="text-xl mb-4">Meus Clubes ({myClubs.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myClubs.map((club) => (
              <div
                key={club.id}
                onClick={() => onNavigate('clubDetails', { club })}
                className="cursor-pointer"
              >
                <BookClubCard club={club} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-xl mb-4">Clubes Sugeridos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedClubs.map((club) => (
            <div
              key={club.id}
              onClick={() => onNavigate('clubDetails', { club })}
              className="cursor-pointer"
            >
              <BookClubCard club={club} />
            </div>
          ))}
        </div>
      </section>

      <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-8 text-center">
        <h3 className="text-xl mb-3">Não encontrou o clube ideal?</h3>
        <p className="text-gray-700 mb-4">
          Crie seu próprio clube de leitura e convide amigos para participar!
        </p>
        <button className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
          Criar Meu Clube
        </button>
      </div>
    </div>
  );
}
