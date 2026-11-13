'use client';

import React, { useState } from 'react';
import { DayCalendarInfo, ReligiousEventItem } from '@caodai-bcd/shared';
import { Calendar, Clock, Moon, Sparkles, AlertCircle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface DayDetailCardProps {
  day: DayCalendarInfo;
  events: ReligiousEventItem[];
}

export function DayDetailCard({ day, events }: DayDetailCardProps) {
  const isSunday = day.dayOfWeek === 0;
  const isSaturday = day.dayOfWeek === 6;

  // Lọc 12 giờ: ALL (Tất cả), HOANG_DAO (Cát), HAC_DAO (Hung)
  const [hoursFilter, setHoursFilter] = useState<'ALL' | 'HOANG_DAO' | 'HAC_DAO'>('ALL');

  const displayedHours = (day.allHours || []).filter((h) => {
    if (hoursFilter === 'HOANG_DAO') return h.isHoangDao;
    if (hoursFilter === 'HAC_DAO') return !h.isHoangDao;
    return true;
  });

  return (
    <div className="bg-heritage-parchment/95 border border-heritage-border rounded-2xl p-5 shadow-xs flex flex-col space-y-5">
      {/* 1. Phần Tiêu Đề Ngày */}
      <div className="border-b border-heritage-border/70 pb-4">
        <div className="flex items-center justify-between text-xs font-semibold text-heritage-goldDark uppercase tracking-wider mb-1">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            Chi tiết ngày chọn
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-bold ${
              isSunday
                ? 'bg-caodai-red/10 text-caodai-red'
                : isSaturday
                ? 'bg-heritage-cyan/10 text-heritage-cyan'
                : 'bg-amber-100 text-heritage-wood'
            }`}
          >
            {day.dayOfWeekName}
          </span>
        </div>

        {/* Ngày Dương Lịch */}
        <div className="text-2xl sm:text-3xl font-serif font-bold text-heritage-wood">
          Ngày {day.solarDay} tháng {day.solarMonth} năm {day.solarYear}
        </div>

        {/* Ngày Âm Lịch */}
        <div className="mt-1 flex items-center gap-2 text-sm sm:text-base text-heritage-goldDark font-medium">
          <Moon className="w-4 h-4 shrink-0 text-heritage-gold" />
          <span>
            Ngày {day.lunar.day} tháng {day.lunar.month} {day.lunar.leap ? '(Nhuận) ' : ''}
            năm {day.canChi.year} (Âm lịch)
          </span>
          <span className="text-xs bg-amber-100/70 text-heritage-woodLight px-1.5 py-0.5 rounded">
            Tháng {day.lunar.totalDaysInMonth === 30 ? 'đủ (30 ngày)' : 'thiếu (29 ngày)'}
          </span>
        </div>
      </div>

      {/* 2. Bộ Ba Can Chi (Ngày - Tháng - Năm) */}
      <div>
        <div className="text-xs font-semibold text-heritage-woodLight uppercase tracking-wider mb-2">
          Can Chi Cổ Truyền
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white/80 border border-heritage-border/80 rounded-xl p-2.5 shadow-2xs">
            <div className="text-[11px] text-heritage-woodLight font-medium">Can Chi Ngày</div>
            <div className="text-base font-serif font-bold text-heritage-wood mt-0.5">
              {day.canChi.day}
            </div>
          </div>
          <div className="bg-white/80 border border-heritage-border/80 rounded-xl p-2.5 shadow-2xs">
            <div className="text-[11px] text-heritage-woodLight font-medium">Can Chi Tháng</div>
            <div className="text-base font-serif font-bold text-heritage-wood mt-0.5">
              {day.canChi.month}
            </div>
          </div>
          <div className="bg-white/80 border border-heritage-border/80 rounded-xl p-2.5 shadow-2xs">
            <div className="text-[11px] text-heritage-woodLight font-medium">Can Chi Năm</div>
            <div className="text-base font-serif font-bold text-heritage-wood mt-0.5">
              {day.canChi.year}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Danh Sách Đầy Đủ 12 Khung Giờ Trong Ngày (Hoàng Đạo & Hắc Đạo) */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-heritage-woodLight uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-heritage-goldDark" />
            12 Khung Giờ Trong Ngày
          </span>
          <span className="text-[11px] text-heritage-goldDark font-normal">
            (Theo Chi Ngày: {day.canChi.day.split(' ')[1] || ''})
          </span>
        </div>

        {/* Tab Lọc Giờ */}
        <div className="flex items-center gap-1 mb-2.5 bg-white/70 p-1 rounded-xl border border-heritage-border/60">
          <button
            type="button"
            onClick={() => setHoursFilter('ALL')}
            className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors ${
              hoursFilter === 'ALL'
                ? 'bg-heritage-wood text-white shadow-2xs'
                : 'text-heritage-woodLight hover:bg-stone-100'
            }`}
          >
            Tất cả 12 Giờ
          </button>
          <button
            type="button"
            onClick={() => setHoursFilter('HOANG_DAO')}
            className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
              hoursFilter === 'HOANG_DAO'
                ? 'bg-emerald-700 text-white shadow-2xs'
                : 'text-emerald-800 hover:bg-emerald-50'
            }`}
          >
            <CheckCircle2 className="w-3 h-3" />
            6 Hoàng Đạo
          </button>
          <button
            type="button"
            onClick={() => setHoursFilter('HAC_DAO')}
            className={`flex-1 py-1 text-xs rounded-lg font-medium transition-colors flex items-center justify-center gap-1 ${
              hoursFilter === 'HAC_DAO'
                ? 'bg-stone-700 text-white shadow-2xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            6 Hắc Đạo
          </button>
        </div>

        {/* Lưới 12 Giờ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-[290px] overflow-y-auto pr-0.5">
          {displayedHours.map((h) => {
            return (
              <div
                key={h.chi}
                className={`p-2.5 rounded-xl border text-left shadow-2xs transition-all ${
                  h.isHoangDao
                    ? 'bg-white/95 border-emerald-300 ring-1 ring-emerald-200'
                    : 'bg-stone-50/90 border-stone-200 text-stone-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-heritage-wood text-sm">
                    Giờ {h.chi}
                  </span>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      h.isHoangDao
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-stone-200 text-stone-600'
                    }`}
                  >
                    {h.isHoangDao ? 'Hoàng Đạo' : 'Hắc Đạo'}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-heritage-goldDark mt-0.5">
                  Sao {h.starName}
                </div>
                <div className="text-[10px] text-heritage-woodLight">
                  {h.timeRange}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Trạng Thái Ăn Chay (Trai Kỳ) */}
      <div className="bg-white/80 border border-heritage-border rounded-xl p-3.5">
        <div className="flex items-center gap-2">
          {day.isFastingDay ? (
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          ) : (
            <div className="w-2.5 h-2.5 rounded-full bg-stone-300" />
          )}
          <span className="text-xs font-semibold text-heritage-woodLight uppercase tracking-wider">
            Trai Kỳ / Ngày Chay
          </span>
        </div>
        <div className="mt-1.5 text-sm text-heritage-wood">
          {day.isFastingDay ? (
            <span className="font-semibold text-emerald-800">
              ✓ {day.fastingNote || 'Hôm nay là ngày ăn chay'}
            </span>
          ) : (
            <span className="text-heritage-woodLight">
              Hôm nay là ngày chay tùy duyên (không thuộc ngày chay bắt buộc trong chế độ đã chọn).
            </span>
          )}
        </div>
      </div>

      {/* 5. Sự Kiện / Lễ Đạo & Lễ Quốc Gia Trong Ngày */}
      {events.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-heritage-wood uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-caodai-red" />
            Đại Lễ & Sự Kiện Trong Ngày
          </div>
          {events.map((ev) => {
            const isNational = ev.category === 'NATIONAL_HOLIDAY';
            const isMajorReligious = ev.category === 'MAJOR_HOLIDAY';

            return (
              <div
                key={ev.code}
                className={`p-3.5 rounded-xl border ${
                  isNational
                    ? 'bg-red-50 border-red-300'
                    : isMajorReligious
                    ? 'bg-caodai-red/5 border-caodai-red/30'
                    : 'bg-amber-50 border-amber-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-serif font-bold text-base text-heritage-wood leading-snug">
                    {isNational ? '🇻🇳 ' : '✨ '}
                    {ev.title}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      isNational
                        ? 'bg-red-700 text-white'
                        : isMajorReligious
                        ? 'bg-caodai-red/10 text-caodai-red border border-caodai-red/30'
                        : 'bg-amber-100 text-heritage-goldDark border border-amber-300'
                    }`}
                  >
                    {ev.dateRangeStr}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-heritage-woodLight mt-1.5 leading-relaxed">
                  {ev.description}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* Lời nhắc nhở tinh thần */}
      <div className="flex items-start gap-2 pt-2 border-t border-heritage-border/50 text-[11px] text-heritage-woodLight italic">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-heritage-gold mt-0.5" />
        <span>
          Lịch Đạo được tính toán theo múi giờ Việt Nam (GMT+7) và đối chiếu với dữ liệu chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo cùng Lịch Lễ Quốc Gia Việt Nam.
        </span>
      </div>
    </div>
  );
}
