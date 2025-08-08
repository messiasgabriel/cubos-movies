import { useGenres } from '../../hooks/useMovies';
import type { MovieFilters as MovieFiltersType } from '../../types/movie';
import { SORT_OPTIONS } from '../../utils/constants';
import clsx from 'clsx';

interface MovieFiltersProps {
  filters: MovieFiltersType;
  onFiltersChange: (filters: MovieFiltersType) => void;
  isExpanded: boolean; 
}

export function MovieFilters({ filters, onFiltersChange, isExpanded }: MovieFiltersProps) {
    const { data: genres } = useGenres();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const handleFilterChange = (key: keyof MovieFiltersType, value: any) => {
        onFiltersChange({
        ...filters,
        [key]: value,
        });
    };

    const clearFilters = () => {
        onFiltersChange({});
    };

    const hasActiveFilters = Object.keys(filters).length > 0;

    return (
        <div className="rounded-lg flex flex-col items-center justify-end w-full md:w-fit px-4">
            <div className="flex items-center justify-between">
                {/* Botão Limpar filtros */}
                {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="rounded-lg bg-card hover:bg-accent bg-purple-7/50 backdrop-blur p-6 m-4 font-medium text-sm text-mauve-12 hover:text-foreground  hover:bg-purple-10 transition-colors duration-200 cursor-pointer"
                >
                    Limpar filtros
                </button>
                )}
            </div>

        <div
            className={clsx(
            "grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4 transition-all duration-300 w-full",
            isExpanded ? 
                "opacity-100 max-h-96 rounded-lg bg-card hover:bg-accent bg-purple-7/60 backdrop-blur p-6 m-4 text-mauve-12" 
                :
                "opacity-0 max-h-0 overflow-hidden "
            )}
        >
            {/* Ordenação */}
            <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
                Ordenar por
            </label>
            <select
                value={filters.sortBy || ''}
                onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="" className="bg-purple-7/80 backdrop-blur">Padrão</option>
                {SORT_OPTIONS.map(option => (
                <option key={option.value} value={option.value} className="bg-purple-7/80 backdrop-blur">
                    {option.label}
                </option>
                ))}
            </select>
            </div>

            {/* Ano */}
            <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
                Ano de lançamento
            </label>
            <select
                value={filters.year || ''}
                onChange={(e) => handleFilterChange('year', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
                <option value="" className="bg-purple-7/80 backdrop-blur">Todos os anos</option>
                {years.map(year => (
                <option key={year} value={year} className="bg-purple-7/80 backdrop-blur">
                    {year}
                </option>
                ))}
            </select>
            </div>
                {/* Gênero */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Gênero
                    </label>
                    <select
                        value={filters.genre || ''}
                        onChange={(e) => handleFilterChange('genre', e.target.value ? Number(e.target.value) : undefined)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="" className="bg-purple-7/80 backdrop-blur">Todos os gêneros</option>
                        {genres?.map(genre => (
                        <option key={genre.id} value={genre.id} className="bg-purple-7/80 backdrop-blur">
                            {genre.name}
                        </option>
                        ))}
                    </select>
                </div>

                {/* Avaliação */}
                <div>
                    <label className="block text-sm font-medium text-muted-foreground mb-2">
                        Avaliação
                    </label>
                    <select
                        value={filters.voteAverage?.max ?? ""}
                        onChange={(e) =>
                        handleFilterChange("voteAverage", {
                            min: 0, 
                            max: e.target.value ? Number(e.target.value) : undefined, 
                        })
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="" className="bg-purple-7/80 backdrop-blur">
                        Todas as avaliações
                        </option>
                        {Array.from({ length: 11 }, (_, i) => i * 1).map((value) => (
                        <option 
                            key={value} 
                            value={value}
                            className="bg-purple-7/80 backdrop-blur"
                        >
                            {value === 0 ? "0" : `${value}`} 
                        </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
