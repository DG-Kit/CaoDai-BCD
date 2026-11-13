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
        group relative flex flex-col justify-between p-1.5 sm:p-2 
        min-h-[68px] sm:min-h-[88px] lg:min-h-[98px] xl:min-h-[108px]
        text-left rounded-xl transition-all border
        ${
          isSelected
            ? 'bg-amber-100/90 dark:bg-amber-950/60 border-heritage-goldDark ring-2 ring-heritage-goldDark shadow-md z-10'
            : isToday
            ? 'bg-amber-50/80 dark:bg-amber-950/30 border-heritage-gold ring-2 ring-heritage-gold/80 shadow-xs hover:bg-amber-100/60 dark:hover:bg-amber-900/40'
            : 'bg-white/95 dark:bg-stone-900/70 border-heritage-border/70 dark:border-heritage-border/40 hover:bg-heritage-parchment/60 dark:hover:bg-stone-850 shadow-2xs'
        }
      `}
    >
      {/* 1. Hàng trên: Số ngày Dương Lịch & Số ngày Âm Lịch */}
      <div className="flex items-start justify-between w-full">
        <span
          className={`
            text-base sm:text-lg lg:text-xl font-serif font-bold leading-none tracking-tight
            ${isSunday ? 'text-caodai-red dark:text-rose-400' : isSaturday ? 'text-heritage-cyan dark:text-sky-400' : 'text-heritage-wood'}
          `}
        >
          {day.solarDay}
        </span>

        <div className="text-right flex items-center gap-1">
          <span
            className={`text-[11px] sm:text-xs font-bold leading-none ${
              isSoc || isVong ? 'text-heritage-goldDark' : 'text-heritage-woodLight'
            }`}
          >
            {isSoc ? `1/${day.lunar.month}` : day.lunar.day}
          </span>
          <span className="hidden sm:inline text-[10px] text-stone-400 dark:text-stone-500">ÂL</span>
        </div>
      </div>

      {/* 2. Chỉ Báo Nổi Bật: Sóc / Vọng / Ăn Chay (Desktop hiện chữ, Mobile hiện chấm gọn) */}
      <div className="flex flex-wrap items-center gap-1 my-0.5">
        {/* Sóc Mùng 1 */}
        {isSoc && (
          <>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-white dark:bg-stone-800 dark:border dark:border-stone-700 shadow-2xs">
              🌑 Sóc
            </span>
            <span className="sm:hidden w-2 h-2 rounded-full bg-slate-800 dark:bg-stone-300" title="Sóc (Mùng 1)" />
          </>
        )}

        {/* Vọng Rằm 15 */}
        {isVong && (
          <>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400 text-amber-950 border border-amber-600 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-500/60 shadow-2xs">
              🌕 Vọng
            </span>
            <span className="sm:hidden w-2 h-2 rounded-full bg-amber-400 border border-amber-600 dark:bg-amber-300" title="Vọng (Rằm 15)" />
          </>
        )}

        {/* Ngày Ăn Chay */}
        {day.isFastingDay && (
          <>
            <span
              title={day.fastingNote || 'Ngày Ăn Chay'}
              className="hidden sm:inline-flex items-center px-1 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800"
            >
              Chay
            </span>
            <span className="sm:hidden w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400" title="Ngày Ăn Chay" />
          </>
        )}
      </div>

      {/* 3. Sự Kiện / Ngày Lễ Trong Ngày */}
      <div className="w-full my-0.5 space-y-0.5 overflow-hidden">
        {events.slice(0, 1).map((ev) => {
          const isNational = ev.category === 'NATIONAL_HOLIDAY';
          const isMajor = ev.category === 'MAJOR_HOLIDAY';

          return (
            <div
              key={ev.code}
              title={`${ev.title} (${ev.dateRangeStr})`}
              className={`
                truncate text-[9px] sm:text-[10px] lg:text-[11px] font-semibold px-1 py-0.5 rounded leading-tight
                ${
                  isNational
                    ? 'bg-red-700 text-white shadow-2xs dark:bg-red-900/90 dark:text-red-100'
                    : isMajor
                    ? 'bg-caodai-red/10 text-caodai-red border border-caodai-red/30 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/50'
                    : 'bg-amber-100 text-heritage-goldDark border border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-900/50'
                }
              `}
            >
              <span className="hidden sm:inline">{isNational ? '🇻🇳 ' : '✨ '}</span>
              {ev.title.replace('Đại lễ ', '').replace('Lễ Kỷ niệm ', '')}
            </div>
          );
        })}

        {events.length > 1 && (
          <div className="text-[9px] font-semibold text-heritage-goldDark text-center leading-none">
            +{events.length - 1} lễ
          </div>
        )}
      </div>

      {/* 4. Hàng đáy: Can Chi Ngày */}
      <div className="flex items-center justify-between w-full pt-0.5 border-t border-heritage-border/40 text-[9px] sm:text-[10px] text-heritage-woodLight">
        <span className="font-medium text-heritage-goldDark truncate">
          {showCanChi ? day.canChi.day : ''}
        </span>
        <span className="text-[9px] text-stone-400 dark:text-stone-500 group-hover:text-heritage-gold transition-colors">
          Chi tiết ➜
        </span>
      </div>
    </button>
  );
}
