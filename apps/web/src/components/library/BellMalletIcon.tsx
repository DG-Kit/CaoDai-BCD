import React from 'react';

interface BellMalletIconProps {
  className?: string;
  active?: boolean;
}

/**
 * Biểu tượng Chuông hình chữ U (chuông gia trì) và Chày gõ đặt nghiêng,
 * dùng để đánh dấu câu kinh cần thỉnh chuông.
 */
export function BellMalletIcon({ className = 'h-4 w-4', active = true }: BellMalletIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Miệng chuông (nét ngang trên cùng của hình chữ U) */}
      <path
        d="M4.5 7.5H16.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Thân chuông hình chữ U */}
      <path
        d="M5 7.5V11.5C5 15.0899 7.46243 18 10.5 18C13.5376 18 16 15.0899 16 11.5V7.5Z"
        fill={active ? 'currentColor' : 'none'}
        fillOpacity={active ? 0.18 : 0}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      {/* Đế kê chuông */}
      <path
        d="M7.5 20.5H13.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Chày / Dùi thỉnh chuông đặt chéo bên phải thành chuông */}
      <path
        d="M16.2 11.2L21.5 5.5"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <circle
        cx="15.8"
        cy="11.6"
        r="1.6"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
