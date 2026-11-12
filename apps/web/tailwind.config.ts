import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Bảng màu di sản Cao Đài Ban Chỉnh Đạo (Áp dụng tiêu chuẩn Impeccable)
        heritage: {
          paper: '#FBF9F5',      // Màu nền trang nhã như giấy kinh xưa
          parchment: '#F3EFE6',  // Màu thẻ / card đọc êm mắt
          border: '#E2D9C8',     // Viền mềm mại, không sắc nhọn
          gold: '#C27803',       // Vàng đạo biểu trưng cho sự trang nghiêm
          goldDark: '#9A5B02',   // Vàng sẫm dùng cho text tương phản cao
          wood: '#2C1810',       // Màu chữ chính / Nâu gỗ gụ sâu sắc
          woodLight: '#5A3D31',  // Màu chữ phụ
          crimson: '#881337',    // Màu điểm xuyết son truyền thống
          cyan: '#0C4A6E',       // Xanh dương thâm trầm
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
