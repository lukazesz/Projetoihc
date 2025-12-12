// Serviço para buscar livros usando a Open Library API
export interface BookSearchResult {
  title: string;
  author: string;
  coverId?: number;
  isbn?: string;
  year?: number;
  key: string;
}

export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  if (!query.trim()) return [];
  
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );
    
    if (!response.ok) throw new Error('Erro ao buscar livros');
    
    const data = await response.json();
    
    return data.docs.map((doc: any) => ({
      title: doc.title || 'Título não disponível',
      author: doc.author_name?.[0] || 'Autor desconhecido',
      coverId: doc.cover_i,
      isbn: doc.isbn?.[0],
      year: doc.first_publish_year,
      key: doc.key,
    }));
  } catch (error) {
    console.error('Erro ao buscar livros:', error);
    return [];
  }
}

export function getBookCoverUrl(coverId: number | undefined, size: 'S' | 'M' | 'L' = 'M'): string {
  if (!coverId) {
    return 'https://images.unsplash.com/photo-1755543832265-aa4a6b8c1414?w=400';
  }
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

export async function getBookDetails(key: string) {
  try {
    const response = await fetch(`https://openlibrary.org${key}.json`);
    if (!response.ok) throw new Error('Erro ao buscar detalhes');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar detalhes do livro:', error);
    return null;
  }
}
