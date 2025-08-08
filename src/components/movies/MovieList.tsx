import { MovieCard } from './MovieCard';
import { MovieListSkeleton } from '../../components/ui/Skeleton';
import type { MovieListProps } from '../../types/movie';

export function MovieList({ movies, loading }: MovieListProps) {
  if (loading) {
    return <MovieListSkeleton />;
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <svg className="w-24 h-24 text-muted-foreground mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M7 4v16M17 4v16M3 8h4m10 0h4M5 12h14M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
        </svg>
        <h3 className="text-xl font-semibold text-foreground mb-2">Nenhum filme encontrado</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Tente ajustar seus filtros ou termos de pesquisa para encontrar o que procura.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 p-6 rounded-lg backdrop-blur-xs bg-mauve-4/60 ">
      {movies.slice(0,10).map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}