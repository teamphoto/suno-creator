// src/components/Button.tsx
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  category: 'event' | 'mood' | 'genre' | 'vocal' | 'instrument';
  selected?: boolean;
  onClick?: () => void;
};

const BUTTON_STYLE = {
  event:   'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  mood:    'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800',
  genre:   'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
  vocal:   'bg-gray-900 text-white border border-gray-700 hover:bg-gray-800',
  instrument: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50',
};

export default function Button({ children, category, selected, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        px-4 py-2 rounded-lg font-semibold transition
        ${BUTTON_STYLE[category]}
        ${selected ? 'ring-2 ring-blue-500' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
