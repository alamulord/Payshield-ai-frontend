// src/components/common/Avatar.tsx
import { useState } from 'react';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name = 'U',
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = name ? getInitials(name) : 'U';

  if (src && !imgError) {
    return (
      <img
        src={src}
        alt={`${name || 'User'} profile`}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-blue-500 flex items-center justify-center text-white font-medium ${className}`}
    >
      {displayName}
    </div>
  );
};
