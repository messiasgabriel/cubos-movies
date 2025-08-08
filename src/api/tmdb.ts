import axios from 'axios';
import { TMDB_CONFIG } from '../utils/constants';
import type { Movie, MovieDetails, Genre, PaginatedResponse, MovieFilters, MovieVideo } from '../types/movie';

const api = axios.create({
    baseURL: TMDB_CONFIG.BASE_URL,
    params: {
        api_key: TMDB_CONFIG.API_KEY,
        language: 'pt-BR',
    },
});

export const tmdbApi = {
    // Buscar filmes populares ou por query
    searchMovies: async (query?: string, page = 1, filters?: MovieFilters): Promise<PaginatedResponse<Movie>> => {
        if (query && query.trim()) {
            const response = await api.get<PaginatedResponse<Movie>>('/search/movie', {
                params: { query, page },
            });
            return response.data;
        }

        // Se não houver query, buscar filmes populares com filtros
        const params: any = {
            page,
            sort_by: filters?.sortBy || 'popularity.desc',
        };

        if (filters?.year) {
            params.primary_release_year = filters.year;
        }

        if (filters?.genre) {
            params.with_genres = filters.genre;
        }

        if (filters?.voteAverage) {
            params['vote_average.lte'] = filters.voteAverage.max;
            params['vote_average.gte'] = filters.voteAverage.min;
        }

        const response = await api.get<PaginatedResponse<Movie>>('/discover/movie', { params });
        return response.data;
    },


    // Obter videos/trailers
    getMovieVideos: async (movieId: number): Promise<MovieVideo[]> => {
        const response = await api.get<{ results: MovieVideo[] }>(`/movie/${movieId}/videos`);
        return response.data.results;
    },

    // Método alternativo com fallback para inglês se não houver em PT-BR
    getMovieTrailer: async (movieId: number): Promise<MovieVideo | null> => {
        try {
        // Primeiro tenta em PT-BR
        let response = await api.get<{ results: MovieVideo[] }>(`/movie/${movieId}/videos`);
        let videos = response.data.results;

        // Se não encontrar vídeos em PT-BR, tenta em inglês
        if (videos.length === 0) {
            response = await api.get<{ results: MovieVideo[] }>(`/movie/${movieId}/videos`, {
            params: {
                api_key: TMDB_CONFIG.API_KEY,
                language: 'en-US',
            },
            });
            videos = response.data.results;
        }

        // Filtrar para pegar o trailer oficial do YouTube
        const trailer = videos.find(
            video => video.type === 'Trailer' && 
            video.site === 'YouTube' && 
            video.official === true
        ) || videos.find(
            video => video.type === 'Trailer' && 
            video.site === 'YouTube'
        ) || videos.find(
            video => video.site === 'YouTube'
        );

        return trailer || null;
        } catch (error) {
        console.error('Erro ao buscar trailer:', error);
            return null;
        }
    },

    // Obter detalhes de um filme
    getMovieDetails: async (movieId: number): Promise<MovieDetails> => {
        const response = await api.get<MovieDetails>(`/movie/${movieId}`);
        return response.data;
    },

    // Obter lista de gêneros
    getGenres: async (): Promise<Genre[]> => {
        const response = await api.get<{ genres: Genre[] }>('/genre/movie/list');
        return response.data.genres;
    },

    // Obter filmes similares
    getSimilarMovies: async (movieId: number): Promise<PaginatedResponse<Movie>> => {
        const response = await api.get<PaginatedResponse<Movie>>(`/movie/${movieId}/similar`);
        return response.data;
    },

    // Obter filmes recomendados
    getRecommendedMovies: async (movieId: number): Promise<PaginatedResponse<Movie>> => {
        const response = await api.get<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`);
        return response.data;
    },
};