import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'accent' | 'neutral' | 'error' | 'success';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    accent: 'bg-accent/10 text-accent-dark border-accent/20',
    neutral: 'bg-neutral-100 text-neutral-600 border-neutral-200',
    error: 'bg-error/10 text-error border-error/20',
    success: 'bg-emerald-100 text-emerald-600 border-emerald-200',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
