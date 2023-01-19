import React from 'react';
import { clsx } from 'clsx';
import { Link } from 'wouter';

type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant: ButtonType;
  href?: string;
}

export const Button = ({ children, variant, href, ...props }: ButtonProps) => {
  const button = (
    <button
      className={clsx(
        'flex items-center justify-center font-bold bg-white rounded-xl p-6 border-2 hover:text-white hover:shadow-xl transition-all duration-200',
        variant === 'primary' && 'text-accent border-accent hover:bg-accent',
        variant === 'secondary' &&
          'text-secondary border-secondary hover:bg-secondary',
      )}
      {...props}
    >
      {children}
    </button>
  );

  return href ? <Link to={href}>{button}</Link> : button;
};
