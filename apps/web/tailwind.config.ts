import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Bảng màu di sản Cao Đài Ban Chỉnh Đạo (Áp dụng tiêu chuẩn Impeccable, hỗ trợ cả Sáng & Tối)
        heritage: {
          paper: 'rgb(var(--heritage-paper-rgb) / <alpha-value>)',
          parchment: 'rgb(var(--heritage-parchment-rgb) / <alpha-value>)',
          border: 'rgb(var(--heritage-border-rgb) / <alpha-value>)',
          gold: 'rgb(var(--heritage-gold-rgb) / <alpha-value>)',
          goldDark: 'rgb(var(--heritage-gold-dark-rgb) / <alpha-value>)',
          wood: 'rgb(var(--heritage-wood-rgb) / <alpha-value>)',
          woodLight: 'rgb(var(--heritage-wood-light-rgb) / <alpha-value>)',
          crimson: 'rgb(var(--heritage-crimson-rgb) / <alpha-value>)',
          ruby: 'rgb(var(--heritage-crimson-rgb) / <alpha-value>)',
          cyan: 'rgb(var(--heritage-cyan-rgb) / <alpha-value>)',
          jade: '#059669',
        },
        // Ba màu sắc chủ đạo Tam Giáo của Đạo Cao Đài
        caodai: {
          yellow: '#EAB308', // Vàng: Thái Thanh (Phật giáo - Từ Bi)
          blue: '#0284C7',   // Xanh lam: Thượng Thanh (Tiên giáo - Thanh Tịnh)
          red: '#DC2626',    // Đỏ son: Ngọc Thanh (Nho giáo - Công Bình)
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
