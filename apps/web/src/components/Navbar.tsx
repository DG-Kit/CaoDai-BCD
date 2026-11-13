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
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Trang Chủ', icon: Home },
    { href: '/library', label: 'Kinh Sách', icon: BookOpen },
    { href: '/calendar', label: 'Lịch Đạo & Ngày Chay', icon: Calendar },
    { href: '/worship-sites', label: 'Thánh Sở & Họ Đạo', icon: MapPin },
    { href: '/composer', label: 'Soạn Sớ Văn', icon: FileEdit },
    { href: '/research', label: 'Đạo Sử & Khảo Cứu', icon: Search },
  ];

  return (
    <header className="sticky top-0 z-40 bg-heritage-paper/95 backdrop-blur-sm border-b border-heritage-border shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Logo nhận diện: Biểu tượng Cổ Pháp Tam Giáo Cao Đài */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center space-x-3 group py-2"
        >
          <CoPhapEmblem className="w-11 h-11 shrink-0 group-hover:scale-105 transition-transform" />
          <div>
            <span className="block text-lg font-serif font-bold text-heritage-wood leading-tight group-hover:text-heritage-goldDark transition-colors">
              Thư Viện Số
            </span>
            <span className="block text-xs uppercase tracking-wider text-heritage-goldDark font-semibold">
              Đạo Cao Đài
            </span>
          </div>
        </Link>

        {/* Menu Các Phân Hệ Trên Desktop */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          {navLinks.slice(1).map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-amber-100/80 dark:bg-amber-950/60 text-heritage-goldDark font-semibold shadow-2xs'
                    : 'text-heritage-wood hover:bg-heritage-parchment hover:text-heritage-goldDark'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-heritage-goldDark' : 'text-heritage-woodLight'}`} />
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
            className="hidden sm:flex text-xs uppercase tracking-wider font-semibold text-heritage-woodLight hover:text-heritage-goldDark items-center space-x-1 border border-heritage-border rounded-xl px-2.5 py-2 hover:bg-heritage-parchment transition-colors shadow-2xs"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Giới Thiệu</span>
          </Link>

          {/* Nút Hamburger Toggle Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu điều hướng'}
            className="md:hidden p-2 rounded-xl border border-heritage-border bg-heritage-parchment/60 hover:bg-heritage-parchment text-heritage-wood transition-colors shadow-2xs"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-heritage-border bg-heritage-paper/98 px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-100/90 dark:bg-amber-950/70 text-heritage-goldDark font-bold shadow-2xs'
                      : 'text-heritage-wood hover:bg-heritage-parchment'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-heritage-goldDark' : 'text-heritage-woodLight'}`} />
                  <span>{link.label}</span>
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-heritage-border/60 flex items-center justify-between px-2">
              <Link
                href="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-sm font-medium text-heritage-woodLight hover:text-heritage-goldDark py-1"
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
