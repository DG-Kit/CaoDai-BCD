'use client';

import React from 'react';
import { DayCalendarInfo, ReligiousEventItem } from '@caodai-bcd/shared';

interface CalendarDayCellProps {
  day: DayCalendarInfo;
  events: ReligiousEventItem[];
  isSelected: boolean;
  isToday: boolean;
  showCanChi: boolean;
  onSelect: () => void;
}

export function CalendarDayCell({
  day,
  events,
  isSelected,
  isToday,
  showCanChi,
  onSelect,
}: CalendarDayCellProps) {
  const isSunday = day.dayOfWeek === 0;
  const isSaturday = day.dayOfWeek === 6;

  // Ngày 1 âm lịch (Sóc) hoặc ngày 15 âm lịch (Vọng)
  const isSoc = day.lunar.day === 1;
  const isVong = day.lunar.day === 15;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        relative flex flex-col justify-between p-2 sm:p-2.5 min-h-[130px] sm:min-h-[155px] xl:min-h-[165px] text-left rounded-xl transition-all border
        ${
          isSelected
            ? 'bg-amber-100/80 border-heritage-goldDark ring-2 ring-heritage-goldDark shadow-md z-10'
            : isToday
            ? 'bg-amber-50/70 border-heritage-gold ring-2 ring-heritage-gold/80 shadow-xs hover:bg-amber-100/50'
            : 'bg-white/95 border-heritage-border/70 hover:bg-heritage-parchment/60 hover:border-heritage-gold/50 shadow-2xs'
        }
      `}
    >
      {/* 1. Hàng trên cùng: Số ngày Dương Lịch & Số ngày Âm Lịch */}
      <div className="flex items-start justify-between w-full">
        <span
          className={`
            text-xl sm:text-2xl font-serif font-bold leading-none tracking-tight
            ${isSunday ? 'text-caodai-red' : isSaturday ? 'text-heritage-cyan' : 'text-heritage-wood'}
          `}
        >
          {day.solarDay}
        </span>

        <div className="text-right">
          <div
            className={`text-xs sm:text-sm font-bold ${
              isSoc || isVong ? 'text-heritage-goldDark' : 'text-heritage-woodLight'
            }`}
          >
            {isSoc ? `M.1/${day.lunar.month}` : day.lunar.day} ÂL
          </div>
        </div>
      </div>

      {/* 2. Hàng Trạng Thái Sóc / Vọng / Ăn Chay (Hiển thị trực diện chữ trong ô) */}
      <div className="flex flex-wrap items-center gap-1 my-1">
        {isSoc && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-slate-800 text-white shadow-2xs">
            🌑 Sóc • Mùng 1
          </span>
        )}
        {isVong && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-amber-400 text-amber-950 border border-amber-600 shadow-2xs">
            🌕 Vọng • Rằm 15
          </span>
        )}
        {day.isFastingDay && (
          <span
            title={day.fastingNote || 'Ngày Ăn Chay'}
            className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
          >
            Chay
          </span>
        )}
      </div>

      {/* 3. Nội Dung Ngày Lễ Trong Ngày (Hiển thị đầy đủ, to rõ, dễ đọc) */}
      <div className="w-full flex-1 my-1 space-y-1 overflow-hidden">
        {events.slice(0, 2).map((ev) => {
          const isNational = ev.category === 'NATIONAL_HOLIDAY';
          const isMajorReligious = ev.category === 'MAJOR_HOLIDAY';

          return (
            <div
              key={ev.code}
              title={`${ev.title} (${ev.dateRangeStr})`}
              className={`
                text-[10px] sm:text-xs font-semibold px-1.5 py-1 rounded leading-snug line-clamp-2
                ${
                  isNational
                    ? 'bg-red-700 text-white shadow-2xs border border-red-800'
                    : isMajorReligious
                    ? 'bg-caodai-red/10 text-caodai-red border border-caodai-red/30'
                    : 'bg-amber-100 text-heritage-goldDark border border-amber-300'
                }
              `}
            >
              {isNational ? '🇻🇳 ' : '✨ '}
              {ev.title}
            </div>
          );
        })}
        {events.length > 2 && (
          <div className="text-[10px] font-medium text-heritage-goldDark text-center italic">
            +{events.length - 2} sự kiện khác
          </div>
        )}
      </div>

      {/* 4. Hàng đáy: Can Chi Ngày */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-heritage-border/50 text-[10px] sm:text-[11px] text-heritage-woodLight">
        <span className="font-medium text-heritage-goldDark truncate">
          {showCanChi ? `Ngày ${day.canChi.day}` : ''}
        </span>
        <span className="text-[10px] text-stone-400">
          {day.solarDate.split('-')[1]}/{day.solarDate.split('-')[2]}
        </span>
      </div>
    </button>
  );
}
