export interface Movie {
    genres: any;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genre_ids: number[];
    adult: boolean;
}

export interface MovieVideo {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
}

export interface MovieDetails extends Movie {
    budget: number;
    revenue: number;
    runtime: number;
    status: string;
    tagline: string;
    genres: Genre[];
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    spoken_languages: SpokenLanguage[];
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string | null;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    iso_639_1: string;
    name: string;
}

export interface MovieFilters {
    year?: number;
    genre?: number;
    sortBy?: 'popularity.desc' | 'popularity.asc' | 'release_date.desc' | 'release_date.asc' | 'vote_average.desc' | 'vote_average.asc';
    voteAverage?: { min: number; max: number };
}

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface MovieListProps {
    movies: Movie[];
    loading?: boolean;
}