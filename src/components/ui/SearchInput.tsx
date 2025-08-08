import type { SearchInputProps } from "../../types/others";

export function SearchInput({ value, onChange, placeholder = "Pesquisar filmes..." }: SearchInputProps) {
    return (
        <div className="relative w-full  mx-auto">
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-[280px] sm:w-[300px] md:w-[488px] px-4 py-3 pr-12 bg-card text-mauve-12 placeholder-mauve-10 rounded-lg border border-border border-mauve-7 focus:outline-none focus:ring-2 focus:ring-purple-7 focus:border-transparent transition-all duration-200 backdrop-blur bg-mauve-2"
        />
            <svg 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-mauve-12"
                width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 18C15.366 18 18.5 14.866 18.5 11C18.5 7.13401 15.366 4 11.5 4C7.63401 4 4.5 7.13401 4.5 11C4.5 14.866 7.63401 18 11.5 18ZM11.5 6C10.8434 6 10.1932 6.12933 9.58658 6.3806C8.97995 6.63188 8.42876 7.00017 7.96447 7.46447C7.50017 7.92876 7.13188 8.47996 6.8806 9.08658C6.62933 9.69321 6.5 10.3434 6.5 11C6.5 11.5523 6.94772 12 7.5 12C8.05228 12 8.5 11.5523 8.5 11C8.5 10.606 8.5776 10.2159 8.72836 9.85195C8.87913 9.48797 9.1001 9.15726 9.37868 8.87868C9.65726 8.6001 9.98797 8.37913 10.3519 8.22836C10.7159 8.0776 11.106 8 11.5 8C12.0523 8 12.5 7.55228 12.5 7C12.5 6.44772 12.0523 6 11.5 6Z" fill="#B5B2BC"/>
                <path d="M20.5 20L18.5 18" stroke="#B5B2BC" stroke-width="2" stroke-linecap="round"/>
            </svg>
        </div>
    );
}

