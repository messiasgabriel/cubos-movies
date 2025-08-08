import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../api/tmdb';

export function useMovieTrailer(movieId: number) {
    return useQuery({
        queryKey: ['movie-trailer', movieId],
        queryFn: () => tmdbApi.getMovieTrailer(movieId),
        enabled: !!movieId,
        staleTime: 30 * 60 * 1000, // 30 minutos
    });
}