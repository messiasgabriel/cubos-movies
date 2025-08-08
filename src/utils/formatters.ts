import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { TMDB_CONFIG } from './constants';

export const formatDate = (dateString: string): string => {
    if (!dateString) return 'Data não disponível';
    try {
        const date = parseISO(dateString);
        return format(date, "MM/dd/yyyy", { locale: ptBR });
    } catch {
        return 'Data inválida';
    }
};

export const formatCurrency = (value: number): string => {
    if(value >= 1_000_000){
        const formatted = (value / 1_000_000).toFixed(value % 1_000_000 === 0 ? 0 : 1);
        return `$${formatted}M`;
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const formatRuntime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
};

export const getImageUrl = (path: string | null, size: string): string => {
    if (!path) return '/assets/placeholder.png';
    return `${TMDB_CONFIG.IMAGE_BASE_URL}/${size}${path}`;
};

export const formatVoteAverage = (vote: number): string => {
    return vote.toFixed(1);
};