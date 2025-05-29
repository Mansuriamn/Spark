import React from 'react';

export const Button = ({ variant = 'default', className = '', children, ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-xl font-semibold transition';
  const variants = {
    default: 'bg-purple-600 text-white hover:bg-purple-700',
    outline: 'border border-purple-600 text-purple-600 hover:bg-purple-100',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
