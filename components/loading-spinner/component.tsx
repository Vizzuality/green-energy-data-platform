import React, { FC } from 'react';

interface LoadingSpinnerProps {
  isLoading: boolean
}
const LoadingSpinner: FC<LoadingSpinnerProps> = (
  { isLoading }: LoadingSpinnerProps) => (
    <svg className="animate-spin h-10 w-10 rounded-full border-4 bg-gray1 border-color1 border-opacity-10">
      <circle cx="0" cy="0" r="20" strokeWidth="10" viewBox="0 0 40 40" />
    </svg>
);

export default LoadingSpinner;
