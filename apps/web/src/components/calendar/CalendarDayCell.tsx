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
        relative flex flex-col justify-between p-1.5 sm:p-2.5 min-h-[82px] sm:min-h-[104px] text-left rounded-xl transition-all border
        ${
          isSelected
            ? 'bg-amber-100/70 border-heritage-goldDark ring-2 ring-heritage-goldDark shadow-md'
            : isToday
            ? 'bg-amber-50/60 border-heritage-gold ring-1 ring-heritage-gold shadow-xs hover:bg-amber-100/40'
            : 'bg-white/90 border-heritage-border/70 hover:bg-heritage-parchment/60 hover:border-heritage-gold/50'
        }
      `}
    >
      {/* Hàng trên: Ngày Dương Lịch & Trạng thái Chay / Sóc / Vọng */}
      <div className="flex items-start justify-between w-full gap-1">
        <span
          className={`
            text-base sm:text-xl font-serif font-bold leading-none
            ${isSunday ? 'text-caodai-red' : isSaturday ? 'text-heritage-cyan' : 'text-heritage-wood'}
          `}
        >
          {day.solarDay}
        </span>

        <div className="flex items-center gap-1 shrink-0">
          {/* Huy hiệu Ngày Ăn Chay */}
          {day.isFastingDay && (
            <span
              title={day.fastingNote || 'Ngày Ăn Chay'}
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs"
            >
              Chay
            </span>
          )}

          {/* Dấu chấm Ngày Sóc / Vọng */}
          {isSoc && (
            <span
              title="Ngày Sóc (Mùng Một Âm Lịch)"
              className="inline-block w-2.5 h-2.5 rounded-full bg-slate-800 border border-white"
            />
          )}
          {isVong && (
            <span
              title="Ngày Vọng (Rằm 15 Âm Lịch)"
              className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600 shadow-xs"
            />
          )}
        </div>
      </div>

      {/* Sự kiện / Lễ Đạo nổi bật nếu có */}
      <div className="w-full my-1 space-y-0.5">
        {events.slice(0, 1).map((ev) => (
          <div
            key={ev.code}
            title={`${ev.title} (${ev.dateRangeStr})`}
            className={`
              truncate text-[10px] sm:text-xs font-semibold px-1 py-0.5 rounded
              ${
                ev.category === 'MAJOR_HOLIDAY'
                  ? 'bg-caodai-red/10 text-caodai-red border border-caodai-red/30'
                  : 'bg-amber-100 text-heritage-goldDark border border-amber-300'
              }
            `}
          >
            {ev.title.replace('Đại lễ ', '').replace('Lễ Kỷ niệm ', '')}
          </div>
        ))}
      </div>

      {/* Hàng dưới: Ngày Âm Lịch & Can Chi Ngày */}
      <div className="flex items-baseline justify-between w-full pt-1 border-t border-heritage-border/40 text-[11px] sm:text-xs text-heritage-woodLight">
        <span className="font-medium text-heritage-goldDark">
          {showCanChi ? day.canChi.day : ''}
        </span>
        <span
          className={`font-semibold ${
            isSoc || isVong ? 'text-heritage-goldDark font-bold' : 'text-heritage-woodLight'
          }`}
        >
          {isSoc ? `1/${day.lunar.month}` : day.lunar.day}
        </span>
      </div>
    </button>
  );
}
