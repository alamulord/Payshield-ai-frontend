import React from 'react';

interface KPICardProps {
  title: string;
  value: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  progress: number;
  progressColor: string;
  className?: string;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  trend,
  icon,
  progress,
  progressColor,
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl p-5 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm relative overflow-hidden group ${className}`}
    >
      <div className='absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity'>
        {icon}
      </div>
      <p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
        {title}
      </p>
      <div className='flex items-baseline gap-2'>
        <p className='text-gray-900 dark:text-white text-2xl font-bold tracking-tight'>
          {value}
        </p>
        <span
          className={`text-xs font-medium px-1.5 py-0.5 rounded flex items-center ${
            trend.isPositive
              ? 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
              : 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30'
          }`}
        >
          {trend.isPositive ? (
            <svg
              className='w-3 h-3 mr-0.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 15l7-7 7 7'
              />
            </svg>
          ) : (
            <svg
              className='w-3 h-3 mr-0.5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M19 9l-7 7-7-7'
              />
            </svg>
          )}
          {trend.value}
        </span>
      </div>
      <div className='h-1 w-full bg-gray-200 dark:bg-gray-700 mt-2 rounded-full overflow-hidden'>
        <div
          className={`h-full ${progressColor} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default KPICard;
