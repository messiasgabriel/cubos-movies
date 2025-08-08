import clsx from 'clsx';
import type { InfoCardProps } from '../../types/others';

export function InfoCard({ label, value, size = 'medium' }: InfoCardProps) {
  const sizeClasses = {
    small: 'w-[115px] md:w-[128px] p-5',
    medium: 'w-[160px] md:w-[180px] p-4',
    large: 'w-[180px] md:w-[200px] p-5'
  };

    return (
        <div className="flex justify-center">
            <div className={clsx(
                "bg-mauve-2/75 rounded-lg",
                sizeClasses[size]
            )}>
                <div className="flex flex-col gap-2 items-center text-center">
                    <span className="text-xs uppercase text-mauve-12 font-bold">
                        {label}
                    </span>
                    <span className="text-sm text-mauve-12 font-bold">
                        {value || "N/A"}
                    </span>
                </div>
            </div>
        </div>
    );
}