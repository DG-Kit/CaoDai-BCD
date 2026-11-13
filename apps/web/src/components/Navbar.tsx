'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Calendar,
  MapPin,
  FileEdit,
  Search,
  Info,
  Menu,
  X,
  Home,
} from 'lucide-react';
import { CoPhapEmblem } from '@/components/CoPhap';
import { TamGiaoStripe } from '@/components/ThienNhan';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Trang Chủ', icon: Home },
    { href: '/library', label: 'Kinh Sách', icon: BookOpen },
    { href: '/calendar', label: 'Lịch Đạo & Ngày Chay', icon: Calendar },
    { href: '/to-dinh', label: 'Tòa Thánh Bến Tre', icon: MapPin },
    { href: '/composer', label: 'Soạn Sớ Văn', icon: FileEdit },
    { href: '/research', label: 'Đạo Sử & Khảo Cứu', icon: Search },
  ];

  return (
    <header className="sticky top-0 z-40 bg-heritage-paper/95 backdrop-blur-sm border-b border-heritage-border transition-colors">
      {/* Dải 3 màu sắc chủ đạo Tam Giáo Cao Đài (Vàng - Xanh - Đỏ) ở đầu Header */}
      <TamGiaoStripe className="h-1.5 w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo nhận diện: Biểu tượng Cổ Pháp Tam Giáo Cao Đài */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center space-x-3 group py-2"
        >
          <CoPhapEmblem className="w-10 h-10 shrink-0 group-hover:scale-105 transition-transform" />
          <div>
            <span className="block text-lg font-serif font-bold text-heritage-wood leading-tight">
              Thư Viện Số
            </span>
            <span className="block text-xs uppercase tracking-wider text-caodai-ochre font-semibold">
              Đạo Cao Đài
            </span>
          </div>
        </Link>

        {/* Menu Các Phân Hệ Trên Desktop */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 text-xs font-semibold">
          {navLinks.slice(1).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-heritage-wood text-heritage-paper font-bold shadow-xs'
                    : 'text-heritage-woodLight hover:text-heritage-wood hover:bg-heritage-parchment'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Nút Giới thiệu, Dark Mode Toggle & Toggle Menu Mobile */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Nút Chuyển Đổi Dark/Light Mode */}
          <ThemeToggle />

          <Link
            href="/about"
            className="hidden sm:flex text-xs uppercase tracking-wider font-semibold text-heritage-woodLight hover:text-heritage-wood items-center space-x-1 border border-heritage-border rounded-lg px-2.5 py-1.5 hover:bg-heritage-parchment transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Giới Thiệu</span>
          </Link>

          {/* Nút Hamburger Toggle Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            className="md:hidden p-2 rounded-lg border border-heritage-border bg-heritage-parchment text-heritage-wood transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-heritage-border bg-heritage-paper px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-heritage-wood text-heritage-paper font-bold'
                      : 'text-heritage-wood hover:bg-heritage-parchment'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-heritage-border flex items-center justify-between px-2">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-heritage-woodLight hover:text-heritage-wood py-1"
              >
                <Info className="w-4 h-4" />
                <span>Giới Thiệu Dự Án</span>
              </Link>

              <ThemeToggle showLabel />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
