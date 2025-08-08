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
                    <input
                        min={1900}
                        max={new Date().getFullYear()}
                        placeholder="Digite o ano"
                        value={filters.year ?? ''}
                        onChange={(e) =>
                            handleFilterChange(
                                "year",
                                e.target.value ? Number(e.target.value) : undefined
                            )
                        }
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
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
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.5"
                        value={filters.voteAverage?.min || 0}
                        onChange={(e) =>
                        handleFilterChange('voteAverage', {
                            min: Number(e.target.value),
                            max: 10,
                        })
                        }
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>0</span>
                            <span className="font-medium text-foreground">{filters.voteAverage?.min || 0}+</span>
                        <span>10</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
