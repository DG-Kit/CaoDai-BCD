'use client';

import React, { useEffect, useState } from 'react';
import { DayCalendarInfo, ReligiousEventItem } from '@caodai-bcd/shared';
import {
  Calendar,
  Clock,
  Moon,
  X,
  CheckCircle2,
  ShieldAlert,
  AlertCircle,
} from 'lucide-react';

interface DayDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayCalendarInfo | null;
  events: ReligiousEventItem[];
}

export function DayDetailModal({
  isOpen,
  onClose,
  day,
  events,
}: DayDetailModalProps) {
  const [hoursFilter, setHoursFilter] = useState<'ALL' | 'HOANG_DAO' | 'HAC_DAO'>('ALL');

  // Đóng modal khi nhấn phím Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !day) return null;

  const isSunday = day.dayOfWeek === 0;

  const displayedHours = (day.allHours || []).filter((h) => {
    if (hoursFilter === 'HOANG_DAO') return h.isHoangDao;
    if (hoursFilter === 'HAC_DAO') return !h.isHoangDao;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs animate-in fade-in duration-150">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Dialog Content (Trang nhã, ấm áp, di sản) */}
      <div className="relative w-full max-w-2xl bg-heritage-paper border border-heritage-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] z-10 animate-in zoom-in-95 duration-150">
        {/* Header Modal */}
        <div className="bg-heritage-parchment border-b border-heritage-border px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-heritage-wood">
            <Calendar className="w-4 h-4 text-heritage-wood" />
            <span>Chi tiết ngày chọn</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-heritage-subtle text-heritage-woodLight hover:text-heritage-wood transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          {/* 1. Phần Tiêu Đề Ngày */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                  isSunday
                    ? 'bg-heritage-sealSubtle text-heritage-seal border border-heritage-seal/20'
                    : 'bg-heritage-parchment text-heritage-wood'
                }`}
              >
                {day.dayOfWeekName}
              </span>
              <span className="text-xs text-heritage-muted font-medium">
                Múi giờ Việt Nam (GMT+7)
              </span>
            </div>

            {/* Ngày Dương Lịch */}
            <div className="text-2xl sm:text-3xl font-serif font-bold text-heritage-wood tracking-tight">
              Ngày {day.solarDay} tháng {day.solarMonth} năm {day.solarYear}
            </div>

            {/* Ngày Âm Lịch (font số đều đặn, hài hòa với chữ) */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm sm:text-base text-heritage-wood font-medium">
              <Moon className="w-4 h-4 shrink-0 text-heritage-wood" />
              <span>
                Ngày {day.lunar.day} tháng {day.lunar.month} {day.lunar.leap ? '(Nhuận) ' : ''}
                năm {day.canChi.year} (Âm lịch)
              </span>
              <span className="text-xs font-medium bg-heritage-parchment text-heritage-woodLight px-2 py-0.5 rounded border border-heritage-border">
                Tháng {day.lunar.totalDaysInMonth === 30 ? 'đủ (30 ngày)' : 'thiếu (29 ngày)'}
              </span>
            </div>
          </div>

          {/* 2. Bộ Ba Can Chi */}
          <div>
            <div className="text-xs font-bold text-heritage-muted uppercase tracking-wider mb-2">
              Can Chi Cổ Truyền
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-heritage-parchment border border-heritage-border rounded-lg p-3">
                <div className="text-xs text-heritage-muted font-medium">Can Chi Ngày</div>
                <div className="text-base sm:text-lg font-serif font-bold text-heritage-wood mt-1">
                  {day.canChi.day}
                </div>
              </div>
              <div className="bg-heritage-parchment border border-heritage-border rounded-lg p-3">
                <div className="text-xs text-heritage-muted font-medium">Can Chi Tháng</div>
                <div className="text-base sm:text-lg font-serif font-bold text-heritage-wood mt-1">
                  {day.canChi.month}
                </div>
              </div>
              <div className="bg-heritage-parchment border border-heritage-border rounded-lg p-3">
                <div className="text-xs text-heritage-muted font-medium">Can Chi Năm</div>
                <div className="text-base sm:text-lg font-serif font-bold text-heritage-wood mt-1">
                  {day.canChi.year}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Trạng Thái Ăn Chay (Trai Kỳ) */}
          <div className="bg-heritage-parchment border border-heritage-border rounded-lg p-4">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${day.isFastingDay ? 'bg-heritage-pine' : 'bg-heritage-muted'}`} />
              <span className="text-xs font-bold text-heritage-wood uppercase tracking-wider">
                Trai Kỳ / Ngày Chay
              </span>
            </div>
            <div className="mt-2 text-sm text-heritage-wood">
              {day.isFastingDay ? (
                <span className="font-semibold text-heritage-pine">
                  ✓ {day.fastingNote || 'Hôm nay là ngày ăn chay'}
                </span>
              ) : (
                <span className="text-heritage-woodLight">
                  Hôm nay là ngày chay tùy duyên (không thuộc ngày chay bắt buộc trong chế độ đã chọn).
                </span>
              )}
            </div>
          </div>

          {/* 4. Sự Kiện / Lễ Đạo & Lễ Quốc Gia Trong Ngày */}
          {events.length > 0 && (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-heritage-wood uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-heritage-seal" />
                Đại Lễ & Sự Kiện Trong Ngày
              </div>
              {events.map((ev) => {
                const isMajor = ev.category === 'MAJOR_HOLIDAY';

                return (
                  <div
                    key={ev.code}
                    className="p-3.5 rounded-lg border border-heritage-border bg-heritage-parchment"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${isMajor ? 'bg-heritage-seal' : 'bg-heritage-gold'}`} />
                        <span className="font-serif font-bold text-base text-heritage-wood leading-snug">
                          {ev.title}
                        </span>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded bg-heritage-subtle text-heritage-wood border border-heritage-border shrink-0">
                        {ev.dateRangeStr}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-heritage-woodLight mt-2 pl-4 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                );
              })}
            </div>
          )}

          {/* 5. Danh Sách 12 Khung Giờ Trong Ngày */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-heritage-wood uppercase tracking-wider mb-2.5">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-heritage-wood" />
                12 Khung Giờ Trong Ngày (Thập Nhị Thần Sát)
              </span>
              <span className="text-xs text-heritage-muted font-medium">
                Chi Ngày: {day.canChi.day.split(' ')[1] || ''}
              </span>
            </div>

            {/* Tab Lọc Giờ */}
            <div className="flex items-center gap-1.5 mb-3 p-1 rounded-lg border border-heritage-border bg-heritage-subtle text-xs">
              <button
                type="button"
                onClick={() => setHoursFilter('ALL')}
                className={`flex-1 py-1.5 rounded font-bold transition-colors ${
                  hoursFilter === 'ALL'
                    ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                    : 'text-heritage-woodLight hover:text-heritage-wood'
                }`}
              >
                Tất cả 12 Giờ
              </button>
              <button
                type="button"
                onClick={() => setHoursFilter('HOANG_DAO')}
                className={`flex-1 py-1.5 rounded font-bold transition-colors flex items-center justify-center gap-1 ${
                  hoursFilter === 'HOANG_DAO'
                    ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                    : 'text-heritage-woodLight hover:text-heritage-wood'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                6 Hoàng Đạo (Cát)
              </button>
              <button
                type="button"
                onClick={() => setHoursFilter('HAC_DAO')}
                className={`flex-1 py-1.5 rounded font-bold transition-colors flex items-center justify-center gap-1 ${
                  hoursFilter === 'HAC_DAO'
                    ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                    : 'text-heritage-woodLight hover:text-heritage-wood'
                }`}
              >
                <ShieldAlert className="w-3.5 h-3.5" />
                6 Hắc Đạo (Hung)
              </button>
            </div>

            {/* Lưới 12 Giờ */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {displayedHours.map((h) => (
                <div
                  key={h.chi}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    h.isHoangDao
                      ? 'bg-heritage-paper border-heritage-borderStrong'
                      : 'bg-heritage-subtle/50 border-heritage-border text-heritage-woodLight'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-heritage-wood text-sm">
                      Giờ {h.chi}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${
                        h.isHoangDao
                          ? 'bg-heritage-wood text-heritage-paper'
                          : 'bg-heritage-parchment text-heritage-muted'
                      }`}
                    >
                      {h.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-heritage-wood mt-1">
                    Sao {h.starName}
                  </div>
                  <div className="text-xs text-heritage-muted mt-0.5 font-sans">
                    {h.timeRange}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ghi chú */}
          <div className="flex items-start gap-2 pt-2 border-t border-heritage-border text-xs text-heritage-muted">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Lịch Đạo đối chiếu với dữ liệu chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo & Lễ Quốc Gia Việt Nam.
            </span>
          </div>
        </div>

        {/* Footer Modal */}
        <div className="bg-heritage-parchment border-t border-heritage-border px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider bg-heritage-wood text-heritage-paper hover:bg-heritage-woodLight transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
