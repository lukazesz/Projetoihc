import { useState } from 'react';
import { ArrowLeft, Users, Calendar, MessageSquare, Bell, Settings } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface ClubDetailsScreenProps {
  club: any;
  onNavigate: (screen: string, data?: any) => void;
}

export function ClubDetailsScreen({ club, onNavigate }: ClubDetailsScreenProps) {
  const [isMember, setIsMember] = useState(club.isMember || false);

  const discussions = [
    {
      id: '1',
      user: 'Maria Silva',
      avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      title: 'O que acharam do capítulo 5?',
      preview: 'Achei essa parte muito impactante...',
      replies: 12,
      time: 'há 2 horas',
    },
    {
      id: '2',
      user: 'João Santos',
      avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      title: 'Teoria sobre o final do livro',
      preview: 'Tenho uma teoria sobre como vai terminar...',
      replies: 8,
      time: 'há 5 horas',
    },
    {
      id: '3',
      user: 'Ana Costa',
      avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100',
      title: 'Análise dos personagens principais',
      preview: 'Vamos discutir o desenvolvimento dos personagens...',
      replies: 15,
      time: 'há 1 dia',
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      title: 'Discussão: Capítulos 1-5',
      date: '15/12/2024',
      time: '20:00',
      type: 'online',
    },
    {
      id: '2',
      title: 'Encontro Presencial',
      date: '22/12/2024',
      time: '15:00',
      type: 'presencial',
      location: 'Livraria Central',
    },
  ];

  const members = [
    { name: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100', role: 'Admin' },
    { name: 'João Santos', avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100', role: 'Moderador' },
    { name: 'Ana Costa', avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100', role: 'Membro' },
    { name: 'Pedro Lima', avatar: 'https://images.unsplash.com/photo-1592693281721-67ad5dcfa91b?w=100', role: 'Membro' },
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => onNavigate('clubs')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} />
        <span>Voltar</span>
      </button>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
          <ImageWithFallback
            src={club.image}
            alt={`Capa do clube ${club.name}`}
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl mb-2">{club.name}</h1>
              <p className="text-gray-600">{club.description}</p>
            </div>
            {isMember && (
              <button
                aria-label="Configurações do clube"
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <Settings size={20} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>{club.members} membros</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Próximo encontro: {club.nextMeeting}</span>
            </div>
          </div>

          <div className="flex gap-3">
            {isMember ? (
              <>
                <button
                  onClick={() => setIsMember(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sair do Clube
                </button>
                <button
                  className="flex items-center gap-2 bg-purple-500 text-white py-3 px-6 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  <Bell size={20} />
                  <span>Notificações</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsMember(true)}
                className="flex-1 bg-purple-500 text-white py-3 px-6 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                Participar do Clube
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl mb-4">Livro Atual</h2>
        <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
          <div className="w-20 h-28 bg-gray-300 rounded flex-shrink-0" />
          <div>
            <h3 className="mb-1">{club.currentBook}</h3>
            <p className="text-sm text-gray-600 mb-2">Leitura em andamento</p>
            <button className="text-sm text-purple-600 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1">
              Ver detalhes do livro →
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Próximos Eventos</h2>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-sm">{event.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  event.type === 'online' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  {event.type}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>📅 {event.date}</span>
                <span>🕐 {event.time}</span>
                {event.location && <span>📍 {event.location}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Discussões Recentes</h2>
          {isMember && (
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
              Nova Discussão
            </button>
          )}
        </div>
        <div className="space-y-3">
          {discussions.map((discussion) => (
            <article key={discussion.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="flex items-start gap-3">
                <ImageWithFallback
                  src={discussion.avatar}
                  alt={`Foto de ${discussion.user}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm">{discussion.title}</h3>
                    <time className="text-xs text-gray-500">{discussion.time}</time>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{discussion.preview}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{discussion.user}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} />
                      <span>{discussion.replies} respostas</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl mb-4">Membros ({members.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {members.map((member, index) => (
            <div key={index} className="text-center">
              <ImageWithFallback
                src={member.avatar}
                alt={`Foto de ${member.name}`}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
              />
              <p className="text-sm">{member.name}</p>
              <span className="text-xs text-gray-500">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
