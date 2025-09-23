import React from 'react';
export default function LargeButton({ children, onClick, ariaLabel }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        minHeight: 60,
        minWidth: 160,
        borderRadius: 16,
        fontSize: 18,
        padding: '14px 20px',
      }}
      className="large-button"
    >
      {children}
    </button>
  );
}
