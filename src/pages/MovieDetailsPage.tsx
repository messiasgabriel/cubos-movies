import { useParams, Link } from '@tanstack/react-router';
import { useMovieDetails } from '../hooks/useMovies';
import { Skeleton } from '../components/ui/Skeleton';
import {
  getImageUrl,
  formatDate,
  formatCurrency,
  formatRuntime,
} from '../utils/formatters';
import { TMDB_CONFIG } from '../utils/constants';
import { MovieTrailer } from '../components/movies/MovieTrailer';
import { useMovieTrailer } from '../hooks/useMovieTrailer';
import { InfoCard } from '../components/ui/InfoCard';

export function MovieDetailsPage() {
    const { movieId } = useParams({ from: '/movie/$movieId' });
    const { data: movie, isLoading, error } = useMovieDetails(Number(movieId));
    const { data: trailer} = useMovieTrailer(Number(movieId));
    

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-200px)] flex flex-col items-center">
                <div className="max-w-7xl mx-auto w-full p-6">
                    <Skeleton className="w-full h-[400px] mb-8" />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <Skeleton className="h-[500px]" />
                        <div className="lg:col-span-2 space-y-4">
                        <Skeleton className="h-12 w-3/4" />
                        <Skeleton className="h-6 w-1/2" />
                        <Skeleton className="h-32" />
                        <Skeleton className="h-24" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !movie) {
        return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center">
            <div className="text-center py-16">
                <p className="text-red-500 mb-4">Erro ao carregar detalhes do filme.</p>
                <Link to="/" className="text-primary hover:underline">
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
        );
    }
    const movieInfoCards = [
        {
            label: "Lançamento",
            value: formatDate(movie.release_date),
            show: true,
            size: "large" as const
        },
        {
            label: "Duração",
            value: formatRuntime(movie.runtime),
            show: movie.runtime > 0,
            size: "large" as const
        },
        {
            label: "Situação",
            value: movie.status || "Lançado",
            show: true,
            size: "large" as const
        },
        {
            label: "Idioma",
            value: movie.spoken_languages?.[0]?.name || "",
            show: movie.spoken_languages && movie.spoken_languages[0],
            size: "large" as const
        },
        {
            label: "Orçamento",
            value: formatCurrency(movie.budget),
            show: movie.budget > 0,
            size: "small" as const,
        },
        {
            label: "Receita",
            value: formatCurrency(movie.revenue),
            show: movie.revenue > 0,
            size: "small" as const
        },
        {
            label: "Lucro",
            value: formatCurrency(movie.revenue - movie.budget),
            show: movie.revenue > 0 && movie.budget > 0,
            size: "small" as const
        }
    ];

  const backdropUrl = getImageUrl(movie.backdrop_path, TMDB_CONFIG.BACKDROP_SIZES.LARGE);
  const posterUrl = getImageUrl(movie.poster_path, TMDB_CONFIG.POSTER_SIZES.LARGE);

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center">
            {/* Main Content Section */}
            <div className="relative w-full max-w-7xl mx-auto mt-8 p-4 md:p-6">
                {/* Backdrop Image Background */}
                <div className="hidden sm:block absolute inset-0 -z-10">
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background bg-mauve-1/50 to-transparent" />
                    <div className="absolute inset-0 bg-mauve-6/20" />
                </div>

                <div className="gap-6 flex flex-col lg:grid lg:grid-cols-[1fr_3fr]">
                
                    {/* COLUNA 1 - Apenas Poster */}
                    <div className="flex flex-col justify-center items-center lg:items-start lg:justify-start">
                        <img
                        src={posterUrl}
                        alt={movie.title}
                        className="w-full max-w-full sm:max-h-[542px] sm:max-w-[354px] rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* COLUNA 2 - Informações*/}
                    <div className="flex flex-col">
                        {/* LINHA 1 */}
                        <div className='flex flex-wrap justify-between items-center'>
                            {/* Título e Tagline */}
                            <div className="rounded-lg py-5 md:py-0">
                                <h1 className="text-mauve-12 text-3xl lg:text-3xl font-bold text-foreground mb-2 max-w-[440px] line-clamp-3">
                                    {movie.title}
                                </h1>
                                {movie.title !== movie.original_title && (
                                    <p className="text-base font-normal
                                     text-mauve-12 mb-2 max-w-[250px] line-clamp-2">
                                        Titulo original: {movie.original_title}
                                    </p>
                                )}
                                {movie.tagline ? (
                                        <p className="text-sm mt-3 text-mauve-12 font-normal italic">
                                            "{movie.tagline}" 
                                        </p>
                                    ) : (
                                        <p className="text-sm mt-3 text-mauve-12 font-normal italic">...</p>
                                    )
                                }
                            </div> 
                            <div className="rounded-lg py-5 md:py-0 flex items-center  justify-center flex-wrap gap-4">
                                {/* Popularidade */}
                                <InfoCard
                                    label="Popularidade"
                                    value={movie.popularity?.toFixed(0) || 'N/A'}
                                    size='small'
                                    show={movie.popularity > 0}
                                />
                                {/* Votos */}
                                <InfoCard
                                    label="Votos"
                                    value={movie.vote_count?.toFixed(0) || 'N/A'}
                                    size='small'
                                    show={movie.vote_count > 0}
                                />
                                {/* Avaliação */}
                                <div className="flex items-center justify-between">
                                    {/* Rating Badge Circular */}
                                    <div className="relative w-[98px] h-[98px]">
                                        <svg className='w-full h-full' viewBox="0 0 36 36">
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

                                        {/* Nota central */}
                                        <div className="absolute inset-0 flex items-center justify-center rounded-full  text-mauve-12 text-sm font-semibold">
                                            {Math.round((movie.vote_average ?? 0) * 10)}%
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LINHA 2*/}
                        <div className='flex flex-wrap flex-col md:flex-row justify-between items-baseline'>
                            {/* Sinopse */}
                            <div className="bg-mauve-2/75 rounded-lg p-5 w-full  md:w-1/2 order-1 md:order-1">
                                <h2 className="text-base text-mauve-12 uppercase font-bold mb-3">Sinopse</h2>
                                <p className="text-base leading-relaxed text-mauve-12 font-normal min-h-[220px] max-h-[220px] overflow-auto">
                                {movie.overview || 'Sinopse não disponível.'}
                                </p>
                            </div>
                            {/* Info Cards */}
                            <div className="flex flex-wrap justify-between md:justify-center gap-4 mt-4 md:w-1/2 order-3 md:order-2">
                                {movieInfoCards.map((card, index) => 
                                    card.show && (
                                        <InfoCard 
                                        key={index}
                                        label={card.label}
                                        value={card.value}
                                        size={card.size}
                                        />
                                    )
                                )}
                            </div>
                            {/* Gêneros */}
                            {movie.genres.length > 0 && (
                                <div className="bg-mauve-2/75 rounded-lg p-5 mt-4 w-full md:w-1/2 order-2 md:order-3">
                                    <h3 className="text-lg text-mauve-12 font-bold mb-3">Gêneros</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {movie.genres.map((genre: { id: number; name: string }) => (
                                            <span
                                            key={genre.id}
                                            className="px-3 p-2 uppercase bg-purple-7/80 backdrop-blur text-mauve-12 rounded-xs text-xs font-semibold"
                                            >
                                            {genre.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* LINHA 3 */}
                        <div className='flex justify-center md:justify-end w-full items-center  mt-6 md:mt-0'>
                            {/* Botão Voltar */}
                            <Link
                                to="/"
                                className="inline-flex font-normal items-center gap-2 px-5 py-3 rounded-lg bg-card hover:bg-purple-10 transition-colors duration-200 bg-purple-7/80 backdrop-blur cursor-pointer text-mauve-12"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                                </svg>
                                <p>
                                    Voltar para a lista
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* Seção do Trailer */}
            <div className='w-full'>
                {trailer && <MovieTrailer trailer={trailer} movieTitle={movie.title} />}
            </div>
        </div>
    );
}