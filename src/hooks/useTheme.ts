import { useEffect, useState } from 'react';
type Theme = 'dark' | 'light';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        return savedTheme;
    });

    useEffect(() => {
        const root = document.documentElement;
        
        root.classList.remove('light', 'dark');

        root.classList.add(theme);
        
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
}