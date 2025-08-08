import { useState } from 'react';
import { SearchInput } from '../components/ui/SearchInput';
import { MovieList } from '../components/movies/MovieList';
import { MovieFilters } from '../components/movies/MovieFilters';
import { Pagination } from '../components/ui/Pagination';
import { useMovies } from '../hooks/useMovies';
import { useDebounce } from '../hooks/useDebounce';
import type { MovieFilters as MovieFiltersType } from '../types/movie';

export function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState<MovieFiltersType>({});
    const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
    
    const debouncedQuery = useDebounce(searchQuery, 500);
    const { data, isLoading, error } = useMovies(debouncedQuery, currentPage, filters);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1); 
    };

    const handleFiltersChange = (newFilters: MovieFiltersType) => {
        setFilters(newFilters);
        setCurrentPage(1); 
    };

    return (
        <div className="min-h-[calc(100vh-200px)] flex flex-col items-center">
            {/* Hero Section */}
            <div className="relative p-2 lg:p-6 bg-gradient-to-b from-accent to-background">
                <div className="relative flex flex-row mx-auto text-center gap-2.5">
                    <SearchInput 
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Pesquisar por filmes"
                    />
                    {/* Botão pra abrir os filtros*/}
                    <button
                        onClick={() => setIsFiltersExpanded(!isFiltersExpanded)}
                        className="px-5 py-3 bg-primary text-white rounded-lg bg-card hover:bg-accent transition-colors duration-200 hover:bg-purple-10 bg-purple-7/80 backdrop-blur cursor-pointer"
                    >
                        {isFiltersExpanded ? (
                            <svg
                                className="w-5 h-5 text-mauve-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>

                        ) : (
                            <svg
                                className="w-5 h-5 text-mauve-12"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Filters */}
            <MovieFilters 
                filters={filters} 
                onFiltersChange={handleFiltersChange} 
                isExpanded={isFiltersExpanded} 
            />

            {/* Results */}
            {error ? (
                <div className="text-center py-8">
                    <p className="text-red-500">Erro ao carregar filmes. Por favor, tente novamente.</p>
                </div>
            ) : (
                <>
                    <MovieList movies={data?.results || []} loading={isLoading} />
                    
                    {data && data.total_pages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={Math.min(data.total_pages, 500)}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            )}
        </div>
    );
}
