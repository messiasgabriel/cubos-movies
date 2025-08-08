import { useState } from 'react';
import type { MovieVideo } from '../../types/movie';

interface MovieTrailerProps {
  trailer: MovieVideo | null;
  movieTitle?: string;
}

export function MovieTrailer({ trailer, movieTitle }: MovieTrailerProps) {
  const [isLoading, setIsLoading] = useState(true);

  if (!trailer) {
    return null;
  }

    return (
        <div className="bg-background/80 backdrop-blur-md rounded-lg p-8">
            <h3 className="text-2xl text-mauve-12 font-bold mb-3">Trailer</h3>
            <div className="relative w-full rounded-lg overflow-hidden bg-black">
                {/* Aspect Ratio Container */}
                <div className="relative pb-[56.25%]"> {/* 16:9 Aspect Ratio */}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-card">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
                        </div>
                    )}
                
                    <iframe
                        src={`https://www.youtube.com/embed/${trailer.key}?rel=0`}
                        title={`${movieTitle || 'Movie'} - Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                        onLoad={() => setIsLoading(false)}
                    />
                </div>
            </div>
        </div>
    );
}