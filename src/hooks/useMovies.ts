import { useQuery } from '@tanstack/react-query';
import { tmdbApi } from '../api/tmdb';
import type { MovieFilters } from '../types/movie';

export function useMovies(query: string, page: number, filters?: MovieFilters) {
    return useQuery({
        queryKey: ['movies', query, page, filters],
        queryFn: () => tmdbApi.searchMovies(query, page, filters),
        staleTime: 5 * 60 * 1000, // 5 minutos
        gcTime: 10 * 60 * 1000, // 10 minutos
    });
}

export function useMovieDetails(movieId: number) {
    return useQuery({
        queryKey: ['movie', movieId],
        queryFn: () => tmdbApi.getMovieDetails(movieId),
        enabled: !!movieId,
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
    });
}

export function useGenres() {
    return useQuery({
        queryKey: ['genres'],
        queryFn: tmdbApi.getGenres,
        staleTime: 24 * 60 * 60 * 1000, // 24 horas
        gcTime: 24 * 60 * 60 * 1000,
    });
}