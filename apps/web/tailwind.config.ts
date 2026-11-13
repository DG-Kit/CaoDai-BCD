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
        // Hệ màu Di sản Cao Đài Bản Sắc (Heritage Warm Ink & Sacred Tam Giao)
        heritage: {
          paper: 'var(--bg-canvas)',
          parchment: 'var(--bg-surface)',
          subtle: 'var(--bg-subtle)',
          border: 'var(--border-subtle)',
          borderStrong: 'var(--border-strong)',
          wood: 'var(--text-primary)',
          woodLight: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          gold: 'var(--caodai-ochre)',
          goldDark: 'var(--caodai-ochre)',
          seal: 'var(--caodai-vermilion)',
          sealSubtle: 'var(--caodai-vermilion-subtle)',
          indigo: 'var(--caodai-indigo)',
          pine: 'var(--caodai-pine)',
          pineSubtle: 'var(--caodai-pine-subtle)',
        },
        // Ba màu sắc chủ đạo Tam Giáo của Đạo Cao Đài & Thanh Trai
        caodai: {
          ochre: 'var(--caodai-ochre)',             // Vàng hoàng thổ (Phái Thái / Phật)
          ochreSubtle: 'var(--caodai-ochre-subtle)',
          ochreBorder: 'var(--caodai-ochre-border)',
          indigo: 'var(--caodai-indigo)',           // Xanh chàm cổ (Phái Thượng / Tiên)
          indigoSubtle: 'var(--caodai-indigo-subtle)',
          indigoBorder: 'var(--caodai-indigo-border)',
          vermilion: 'var(--caodai-vermilion)',     // Đỏ chu sa (Phái Ngọc / Nho)
          vermilionSubtle: 'var(--caodai-vermilion-subtle)',
          vermilionBorder: 'var(--caodai-vermilion-border)',
          pine: 'var(--caodai-pine)',               // Xanh rêu thanh trai
          pineSubtle: 'var(--caodai-pine-subtle)',
          pineBorder: 'var(--caodai-pine-border)',
          // Backward compatibility
          yellow: 'var(--caodai-ochre)',
          blue: 'var(--caodai-indigo)',
          red: 'var(--caodai-vermilion)',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', '"Lora"', '"Times New Roman"', 'Times', 'serif'],
        sans: ['var(--font-sans)', '"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
