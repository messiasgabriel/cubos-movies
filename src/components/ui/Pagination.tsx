import clsx from 'clsx';
import type { PaginationProps } from '../../types/others';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const maxVisible = 4;
    const halfVisible = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <div className="flex items-center gap-2 justify-center p-6">

            {/* Botão Anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={clsx(
                "px-3 py-2 rounded-xs transition-colors duration-200 ",
                currentPage === 1
                    ? "bg-mauve-4 text-muted-foreground cursor-not-allowed"
                    : "bg-purple-7/80 hover:bg-purple-10 text-white cursor-pointer"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9"
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-6 text-mauve-12"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                    />
                </svg>

            </button>

            {/* Primeira Página + ... */}
            {startPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-2 rounded-xs bg-card hover:bg-accent text-mauve-12 transition-colors duration-200 bg-purple-7/80 cursor-pointer hover:bg-purple-10"
                    >
                        1
                    </button>
                    {startPage > 2 && 
                        <span 
                            className="text-muted-foreground px-3 py-2 rounded-xs transition-colors duration-200 bg-purple-7/80 hover:bg-accent text-mauve-12 cursor-not-allowed hidden sm:block"
                        >
                            ...
                        </span>
                    }
                </>
            )}

            {/* Páginas visíveis */}
            {pages.map(page => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    disabled={currentPage === page}
                    className={clsx(
                        "px-3 py-2 rounded-xs transition-colors duration-200",
                        currentPage === page
                        ? "bg-mauve-4 text-primary cursor-not-allowed"
                        : "hover:bg-purple-10 bg-purple-7/80 backdrop-blur hover:bg-accent text-mauve-12 cursor-pointer"
                    )}
                    >
                        {page}
                </button>
            ))}

            {/* Botão Próximo */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={clsx(
                "px-3 py-2 rounded-xs hover:bg-purple-10 transition-colors duration-200 bg-purple-7/80",
                currentPage === totalPages
                    ? " text-muted-foreground cursor-not-allowed"
                    : " hover:bg-accent cursor-pointer"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="9" 
                    height="18"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-8 h-6 text-mauve-12"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
}