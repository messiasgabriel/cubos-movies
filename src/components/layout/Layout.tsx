import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="relative flex flex-col min-h-screen">
            {/* Imagem de fundo com filtro cinza leve */}
            <div className="absolute inset-0 -z-10 bg-cover bg-center"
            >
                <img   
                    src="/assets/backgropund-krists-luhaers-unsplash.png"
                    alt="Background"
                    className="absolute top-[-60px] left-0 w-full h-[600px] object-cover -z-10"
                    style={{
                    maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                />

                {/* Filtro cinza leve */}
                <div className="absolute inset-0 bg-mauve-1/60" />
            </div>

            <Header />
            <main className="container mx-auto flex-1 flex flex-col align-middle justify-center">
                {children}
            </main>
            <Footer />
        </div>
    );
}
