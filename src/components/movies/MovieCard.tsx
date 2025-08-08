import { Link } from '@tanstack/react-router';
import { getImageUrl } from '../../utils/formatters';
import { TMDB_CONFIG } from '../../utils/constants';
import type { Movie } from '../../types/movie';
import { useGenres } from '../../hooks/useMovies';

interface MovieCardProps {
    movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
    const { data: genres } = useGenres();
    const genresMap = genres
    ? Object.fromEntries(genres.map((genre) =>[genre.id, genre.name]))
    : {};

    const genresNames = movie.genre_ids
    ?.map((id) => genresMap[id])
    .filter(Boolean)
    .slice(0,2)
    .join(', ');

    const posterUrl = getImageUrl(movie.poster_path, TMDB_CONFIG.POSTER_SIZES.MEDIUM);
    return (
        <Link
        to="/movie/$movieId"
            params={{ movieId: movie.id.toString() }}
            className="group block bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        >
            <div className="relative aspect-[2/3] overflow-hidden">
                <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
                {/* Rating Badge */}
                <div className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Barra de progresso circular */}
                    <div className="absolute w-full h-full">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                            {/* Fundo cinza */}
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="#4a4a4a"
                                strokeWidth="3"
                            />
                            {/* Barra colorida baseada na nota */}
                            <path
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${Math.round((movie.vote_average ?? 0) * 10)}, 100`}
                                className={`
                                ${(movie.vote_average ?? 0) * 10 >= 70 ? 'text-green-500' : ''}
                                ${(movie.vote_average ?? 0) * 10 >= 40 && (movie.vote_average ?? 0) * 10 < 70 ? 'text-yellow-500' : ''}
                                ${(movie.vote_average ?? 0) * 10 < 40 ? 'text-red-500' : ''}
                                `}
                            />
                        </svg>
                    </div>
                    
                    {/* Nota no centro */}
                    <div className="relative z-10 flex flex-col items-center justify-center w-[120px] h-[120px] rounded-full bg-black/70 text-white backdrop-blur transform-gpu">
                        <span className="text-2xl font-bold">
                            {Math.round((movie.vote_average ?? 0) * 10)}%
                        </span>
                    </div>
                </div>

                <div className="font-[Montserrat] absolute bottom-0 left-0 right-0      bg-mauve-1/90 text-white p-4 flex flex-col items-center gap-1 text-center"
                    style={{
                        maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
                    }}
                >
                    {/* Título do filme */}
                    <p className="mt-3.5 text-base text-mauve-12 whitespace-break-spaces uppercase font-semibold truncate">
                        {movie.title}
                    </p>
                    
                    {/* Texto com transição suave */}
                    <div className="overflow-hidden">
                        <p className="text-xs text-mauve-12 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[50px] transition-all duration-300">
                            {genresNames || 'N/A'}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    )   
}