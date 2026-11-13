'use client';

import React, { useState, useMemo } from 'react';
import {
  getMonthCalendarInfo,
  getEventsForDay,
  FastingSchedule,
  DayCalendarInfo,
} from '@caodai-bcd/shared';
import { CalendarDayCell } from '@/components/calendar/CalendarDayCell';
import { DayDetailModal } from '@/components/calendar/DayDetailModal';
import { ReligiousEventsReference } from '@/components/calendar/ReligiousEventsReference';
import {
  ChevronLeft,
  ChevronRight,
  BookMarked,
} from 'lucide-react';

const WEEKDAYS = [
  'Thứ Hai',
  'Thứ Ba',
  'Thứ Tư',
  'Thứ Năm',
  'Thứ Sáu',
  'Thứ Bảy',
  'Chủ Nhật',
];

export default function CalendarPage() {
  const today = useMemo(() => new Date(), []);
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth() + 1);
  const [fastingSchedule, setFastingSchedule] = useState<FastingSchedule>(
    FastingSchedule.LUC_TRAI,
  );
  const [showCanChi, setShowCanChi] = useState<boolean>(true);
  const [eventTypeFilter, setEventTypeFilter] = useState<'ALL' | 'RELIGIOUS' | 'NATIONAL'>('ALL');

  // Modal chi tiết ngày
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showReference, setShowReference] = useState<boolean>(false);

  // Ngày được chọn (mặc định là hôm nay)
  const todayStr = useMemo(() => {
    const m = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
    const d = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
    return `${today.getFullYear()}-${m}-${d}`;
  }, [today]);

  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  // Điều hướng tháng
  const handlePrevMonth = () => {
    if (currentMonth === 1) {
      setCurrentMonth(12);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 12) {
      setCurrentMonth(1);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handleToday = () => {
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setSelectedDateStr(todayStr);
  };

  // Tính toán dữ liệu các ngày trong tháng
  const daysInMonth: DayCalendarInfo[] = useMemo(() => {
    return getMonthCalendarInfo(currentYear, currentMonth, fastingSchedule);
  }, [currentYear, currentMonth, fastingSchedule]);

  // Offset ngày đầu tiên trong tuần (Thứ Hai bắt đầu = 0)
  const startDayOffset = useMemo(() => {
    if (!daysInMonth || daysInMonth.length === 0 || !daysInMonth[0]) return 0;
    return (daysInMonth[0].dayOfWeek + 6) % 7;
  }, [daysInMonth]);

  // Ngày đang được chọn
  const selectedDayInfo = useMemo(() => {
    const found = daysInMonth.find((d) => d.solarDate === selectedDateStr);
    if (found) return found;
    return daysInMonth[0] || null;
  }, [daysInMonth, selectedDateStr]);

  // Sự kiện của ngày được chọn
  const selectedDayEvents = useMemo(() => {
    if (!selectedDayInfo) return [];
    const all = getEventsForDay(
      selectedDayInfo.solarMonth,
      selectedDayInfo.solarDay,
      selectedDayInfo.lunar.month,
      selectedDayInfo.lunar.day,
    );
    if (eventTypeFilter === 'RELIGIOUS') {
      return all.filter((e) => e.category !== 'NATIONAL_HOLIDAY');
    }
    if (eventTypeFilter === 'NATIONAL') {
      return all.filter((e) => e.category === 'NATIONAL_HOLIDAY');
    }
    return all;
  }, [selectedDayInfo, eventTypeFilter]);

  // Tên tháng Âm lịch chủ đạo
  const primaryLunarMonthStr = useMemo(() => {
    if (!daysInMonth || daysInMonth.length === 0) return '';
    const midDay = daysInMonth[Math.floor(daysInMonth.length / 2)];
    if (!midDay) return '';
    return `Tháng ${midDay.lunar.month} năm ${midDay.canChi.year} (Âm lịch)`;
  }, [daysInMonth]);

  // Nhấn vào một ngày
  const handleSelectDay = (solarDate: string) => {
    setSelectedDateStr(solarDate);
    setModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-3 sm:px-6 py-4 flex-1 flex flex-col justify-between space-y-4">
      {/* 1. Header Trang & Thanh Điều Khiển Tinh Gọn (Màu Di Sản Trầm Mặc, Ấm Áp) */}
      <div className="bg-heritage-paper border border-heritage-border p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Bộ chuyển tháng & Tiêu đề Tháng */}
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <div className="flex items-center space-x-1 border border-heritage-border p-0.5 rounded-lg bg-heritage-subtle">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Tháng trước"
              className="p-1.5 hover:bg-heritage-parchment text-heritage-wood rounded transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Tháng sau"
              className="p-1.5 hover:bg-heritage-parchment text-heritage-wood rounded transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-heritage-wood leading-none">
              Tháng {currentMonth} năm {currentYear}
            </div>
            <div className="text-xs sm:text-sm font-medium text-heritage-woodLight mt-1">
              {primaryLunarMonthStr}
            </div>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-heritage-parchment hover:bg-heritage-subtle text-heritage-wood border border-heritage-border transition-colors"
          >
            Hôm Nay
          </button>
        </div>

        {/* Cụm Bộ Lọc Giữa: Lễ Đạo / Lễ Quốc Gia */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center border border-heritage-border rounded-lg p-0.5 text-xs bg-heritage-subtle">
            <button
              type="button"
              onClick={() => setEventTypeFilter('ALL')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                eventTypeFilter === 'ALL'
                  ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }`}
            >
              Tất cả lễ
            </button>
            <button
              type="button"
              onClick={() => setEventTypeFilter('RELIGIOUS')}
              className={`px-3 py-1 rounded-md font-semibold transition-all flex items-center gap-1.5 ${
                eventTypeFilter === 'RELIGIOUS'
                  ? 'bg-heritage-seal text-white shadow-2xs'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-heritage-seal inline-block" />
              Lễ Đạo Cao Đài
            </button>
            <button
              type="button"
              onClick={() => setEventTypeFilter('NATIONAL')}
              className={`px-3 py-1 rounded-md font-semibold transition-all ${
                eventTypeFilter === 'NATIONAL'
                  ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }`}
            >
              Lễ Quốc Gia VN
            </button>
          </div>
        </div>

        {/* Cụm Bộ Lọc Phải: Chế độ Ăn Chay (Trai Kỳ) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-heritage-muted mr-1 hidden xl:inline">
            Trai kỳ:
          </span>

          {[
            { mode: FastingSchedule.NONE, label: 'Tùy duyên' },
            { mode: FastingSchedule.LUC_TRAI, label: 'Lục Trai' },
            { mode: FastingSchedule.THAP_TRAI, label: 'Thập Trai' },
            { mode: FastingSchedule.THIEN_NGUON, label: 'Thiên Ngươn' },
          ].map((item) => {
            const isActive = fastingSchedule === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => setFastingSchedule(item.mode)}
                className={`
                  px-3 py-1 rounded-lg text-xs transition-all
                  ${
                    isActive
                      ? 'bg-heritage-pine text-white font-bold'
                      : 'bg-heritage-subtle text-heritage-woodLight hover:bg-heritage-parchment hover:text-heritage-wood border border-heritage-border font-medium'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}

          {/* Toggle Can Chi */}
          <label className="flex items-center gap-1.5 ml-2 cursor-pointer text-xs font-semibold text-heritage-woodLight select-none">
            <input
              type="checkbox"
              checked={showCanChi}
              onChange={(e) => setShowCanChi(e.target.checked)}
              className="rounded border-heritage-border text-heritage-wood focus:ring-heritage-wood dark:bg-heritage-surface"
            />
            <span>Can Chi</span>
          </label>
        </div>
      </div>

      {/* 2. BẢNG LỊCH THÁNG (BẢNG LƯỚI NGUYÊN KHỐI ARCHITECTURAL GRID) */}
      <section className="bg-heritage-paper border border-heritage-border p-2 sm:p-3 flex-1 flex flex-col justify-between overflow-hidden">
        {/* Hàng Tiêu Đề 7 Ngày Trong Tuần */}
        <div className="grid grid-cols-7 text-center pb-2 border-b border-heritage-border mb-2">
          {WEEKDAYS.map((wd, idx) => (
            <div
              key={wd}
              className={`text-xs sm:text-sm uppercase tracking-wider py-1.5 ${
                idx === 6
                  ? 'text-caodai-vermilion font-bold'
                  : idx === 5
                  ? 'text-caodai-indigo font-bold'
                  : 'text-heritage-wood font-semibold'
              }`}
            >
              <span className="hidden sm:inline">{wd}</span>
              <span className="sm:hidden">{wd.replace('Thứ ', 'T')}</span>
            </div>
          ))}
        </div>

        {/* Lưới 7 Cột Ngày Trong Tháng (Khung lưới phẳng, 1px border) */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 flex-1">
          {/* Các ô trống trước ngày 1 */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[96px] sm:min-h-[112px] lg:min-h-[120px] bg-heritage-subtle/40 border border-dashed border-heritage-border/60"
            />
          ))}

          {/* Từng ngày trong tháng */}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDay(
              day.solarMonth,
              day.solarDay,
              day.lunar.month,
              day.lunar.day,
            ).filter((e) => {
              if (eventTypeFilter === 'RELIGIOUS') return e.category !== 'NATIONAL_HOLIDAY';
              if (eventTypeFilter === 'NATIONAL') return e.category === 'NATIONAL_HOLIDAY';
              return true;
            });

            const isSelected = day.solarDate === selectedDateStr;
            const isToday = day.solarDate === todayStr;

            return (
              <CalendarDayCell
                key={day.solarDate}
                day={day}
                events={dayEvents}
                isSelected={isSelected}
                isToday={isToday}
                showCanChi={showCanChi}
                onSelect={() => handleSelectDay(day.solarDate)}
              />
            );
          })}
        </div>

        {/* Chú giải ký hiệu lịch ở đáy bảng (Nhã nhặn, chữ chuẩn ≥ 12px) */}
        <div className="mt-3 pt-3 border-t border-heritage-border flex flex-wrap items-center justify-between gap-3 text-xs text-heritage-woodLight">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-medium">
            <span className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-heritage-wood text-heritage-paper">
                Sóc
              </span>
              <span>Mùng 1 ÂL</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-bold border border-caodai-vermilionBorder text-caodai-vermilion bg-caodai-vermilionSubtle">
                Vọng
              </span>
              <span>Rằm 15 ÂL</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-semibold bg-caodai-pineSubtle text-caodai-pine border border-caodai-pineBorder">
                Chay
              </span>
              <span>Ngày ăn chay</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-caodai-vermilion inline-block" />
              <span>Đại Lễ Đạo</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowReference(!showReference)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-heritage-parchment hover:bg-heritage-subtle text-heritage-wood border border-heritage-border transition-colors"
            >
              <BookMarked className="w-4 h-4" />
              <span>{showReference ? 'Thu gọn danh mục lễ' : 'Tra cứu 29 ngày lễ lớn'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Khối Tra Cứu Sự Kiện */}
      {showReference && (
        <section className="animate-in fade-in duration-200">
          <ReligiousEventsReference />
        </section>
      )}

      {/* 4. MODAL POP-UP CHI TIẾT NGÀY */}
      <DayDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        day={selectedDayInfo}
        events={selectedDayEvents}
      />
    </div>
  );
}
