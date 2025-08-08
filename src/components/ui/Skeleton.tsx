import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-muted rounded-lg",
        className
      )}
    />
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden">
      <Skeleton className="w-full h-[400px]" />
      <div className="p-4 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
}

export function MovieListSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </div>
  );
}