export interface InfoCardProps {
    label: string;
    value: string | number;
    show?: boolean;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}