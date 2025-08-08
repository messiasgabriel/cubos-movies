export const TMDB_CONFIG = {
    API_KEY: import.meta.env.VITE_TMDB_API_KEY,
    BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p',
    POSTER_SIZES: {
        SMALL: 'w185',
        MEDIUM: 'w342',
        LARGE: 'w500',
        ORIGINAL: 'original',
    },
    BACKDROP_SIZES: {
        SMALL: 'w300',
        MEDIUM: 'w780',
        LARGE: 'w1280',
        ORIGINAL: 'original',
    },
};

export const ITEMS_PER_PAGE = 10;

export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Mais Populares' },
    { value: 'popularity.asc', label: 'Menos Populares' },
    { value: 'release_date.desc', label: 'Mais Recentes' },
    { value: 'release_date.asc', label: 'Mais Antigos' },
    { value: 'vote_average.desc', label: 'Melhor Avaliados' },
    { value: 'vote_average.asc', label: 'Pior Avaliados' },
]
