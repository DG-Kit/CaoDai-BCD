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

  // Ngày 1 âm lịch (Sóc) hoặc ngày 15 âm lịch (Vọng)
  const isSoc = day.lunar.day === 1;
  const isVong = day.lunar.day === 15;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`
        group relative flex flex-col justify-between p-2 sm:p-2.5 
        min-h-[96px] sm:min-h-[112px] lg:min-h-[120px]
        text-left transition-colors border
        ${
          isSelected
            ? 'bg-heritage-subtle border-caodai-vermilion ring-1 ring-caodai-vermilion z-10'
            : isToday
            ? 'bg-heritage-subtle border-heritage-borderStrong ring-1 ring-caodai-ochre/40'
            : 'bg-heritage-paper border-heritage-border hover:bg-heritage-subtle hover:border-caodai-ochre/60'
        }
      `}
    >
      {/* 1. Hàng trên: Số ngày Dương Lịch & Số ngày Âm Lịch (Cân đối tỷ lệ, số Âm Lịch đồng nhất font với chữ ÂL) */}
      <div className="flex items-start justify-between w-full">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`
              text-lg sm:text-xl lg:text-2xl font-serif font-bold leading-none tracking-tight
              ${isSunday ? 'text-caodai-vermilion' : 'text-heritage-wood'}
            `}
          >
            {day.solarDay}
          </span>
          {isToday && (
            <span className="text-xs font-bold uppercase tracking-wider text-caodai-vermilion bg-caodai-vermilionSubtle border border-caodai-vermilionBorder px-1.5 py-0.5 rounded leading-none">
              Nay
            </span>
          )}
        </div>

        {/* Số ngày Âm Lịch: Chuẩn xác, đồng bộ font số & chữ trong cùng 1 khối văn bản, khắc phục triệt để lỗi số to hơn chữ */}
        <div className="text-right">
          <span
            className={`font-sans text-xs font-semibold tabular-nums leading-none ${
              isSoc || isVong
                ? 'text-caodai-vermilion font-bold'
                : 'text-heritage-woodLight'
            }`}
          >
            {isSoc ? `1/${day.lunar.month} ÂL` : `${day.lunar.day} ÂL`}
          </span>
        </div>
      </div>

      {/* 2. Chỉ Báo Sóc / Vọng / Ăn Chay (Chữ rõ ràng ≥ 12px, sắc màu di sản Tam Giáo nhã nhặn) */}
      <div className="flex flex-wrap items-center gap-1.5 my-1">
        {/* Sóc Mùng 1 */}
        {isSoc && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-heritage-wood text-heritage-paper">
            Sóc
          </span>
        )}

        {/* Vọng Rằm 15 */}
        {isVong && (
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold border border-caodai-vermilionBorder text-caodai-vermilion bg-caodai-vermilionSubtle">
            Vọng
          </span>
        )}

        {/* Ngày Ăn Chay (Màu thanh trai lục bảo dịu mát) */}
        {day.isFastingDay && (
          <span
            title={day.fastingNote || 'Ngày Ăn Chay'}
            className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold bg-caodai-pineSubtle text-caodai-pine border border-caodai-pineBorder"
          >
            Chay
          </span>
        )}
      </div>

      {/* 3. Sự Kiện / Ngày Lễ Trong Ngày (Nhãn phẳng, chữ tối thiểu 12px) */}
      <div className="w-full my-0.5 space-y-1 overflow-hidden">
        {events.slice(0, 1).map((ev) => {
          const isMajor = ev.category === 'MAJOR_HOLIDAY';

          return (
            <div
              key={ev.code}
              title={`${ev.title} (${ev.dateRangeStr})`}
              className="flex items-center gap-1.5 text-xs font-medium text-heritage-wood bg-heritage-parchment px-2 py-0.5 rounded border border-heritage-border truncate"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                  isMajor ? 'bg-caodai-vermilion' : 'bg-caodai-ochre'
                }`}
              />
              <span className="truncate">
                {ev.title.replace('Đại lễ ', '').replace('Lễ Kỷ niệm ', '')}
              </span>
            </div>
          );
        })}

        {events.length > 1 && (
          <div className="text-xs font-medium text-heritage-muted pl-1 leading-none">
            +{events.length - 1} lễ khác
          </div>
        )}
      </div>

      {/* 4. Hàng đáy: Can Chi Ngày */}
      <div className="flex items-center justify-between w-full pt-1 border-t border-heritage-border text-xs">
        <span className="font-medium text-heritage-woodLight truncate">
          {showCanChi ? day.canChi.day : ''}
        </span>
        <span className="text-xs font-medium text-heritage-muted group-hover:text-caodai-vermilion transition-colors">
          Chi tiết
        </span>
      </div>
    </button>
  );
}
