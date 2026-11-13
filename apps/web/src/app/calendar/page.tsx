'use client';

import React, { useState, useMemo } from 'react';
import {
  getMonthCalendarInfo,
  getEventsForDay,
  FastingSchedule,
  DayCalendarInfo,
} from '@caodai-bcd/shared';
import { CalendarDayCell } from '@/components/calendar/CalendarDayCell';
import { DayDetailCard } from '@/components/calendar/DayDetailCard';
import { ReligiousEventsReference } from '@/components/calendar/ReligiousEventsReference';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Filter,
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

  // Ngày được chọn (mặc định là ngày hôm nay)
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

  // Tính toán dữ liệu toàn bộ các ngày trong tháng
  const daysInMonth: DayCalendarInfo[] = useMemo(() => {
    return getMonthCalendarInfo(currentYear, currentMonth, fastingSchedule);
  }, [currentYear, currentMonth, fastingSchedule]);

  // Tìm offset ngày đầu tiên trong tuần (Thứ Hai bắt đầu = 0)
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
    return getEventsForDay(
      selectedDayInfo.solarMonth,
      selectedDayInfo.solarDay,
      selectedDayInfo.lunar.month,
      selectedDayInfo.lunar.day,
    );
  }, [selectedDayInfo]);

  // Tên tháng Âm lịch chủ đạo của tháng Dương này
  const primaryLunarMonthStr = useMemo(() => {
    if (!daysInMonth || daysInMonth.length === 0) return '';
    const midDay = daysInMonth[Math.floor(daysInMonth.length / 2)];
    if (!midDay) return '';
    return `Tháng ${midDay.lunar.month} năm ${midDay.canChi.year} (Âm lịch)`;
  }, [daysInMonth]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Trang Lịch Đạo */}
      <div className="border-b border-heritage-border pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-heritage-goldDark">
            <CalendarIcon className="w-4 h-4" />
            <span>Phân hệ Lịch Đạo & Trai Kỳ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-heritage-wood mt-1">
            Lịch Đạo & Ngày Ăn Chay
          </h1>
          <p className="text-sm sm:text-base text-heritage-woodLight mt-1.5 max-w-2xl leading-relaxed">
            Tra cứu Âm – Dương song hành, Can Chi cổ truyền, 6 Giờ Hoàng Đạo mỗi ngày và các ngày Đại Lễ chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo.
          </p>
        </div>

        {/* Nút Về Hôm Nay & Chọn Lịch Ăn Chay Nhanh */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            type="button"
            onClick={handleToday}
            className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-heritage-parchment hover:bg-amber-100 text-heritage-wood border border-heritage-border transition-colors shadow-2xs"
          >
            Hôm Nay
          </button>
        </div>
      </div>

      {/* 2. Thanh Điều Khiển Tháng & Tùy Chọn Trai Kỳ */}
      <div className="bg-white/80 border border-heritage-border rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Bộ chuyển tháng */}
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Tháng trước"
              className="p-2 rounded-xl border border-heritage-border hover:bg-heritage-parchment text-heritage-wood transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Tháng sau"
              className="p-2 rounded-xl border border-heritage-border hover:bg-heritage-parchment text-heritage-wood transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-heritage-wood">
              Tháng {currentMonth} năm {currentYear}
            </div>
            <div className="text-xs sm:text-sm text-heritage-goldDark font-medium">
              {primaryLunarMonthStr}
            </div>
          </div>
        </div>

        {/* Bộ lọc Chế độ Ăn Chay (Trai Kỳ) */}
        <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0 border-t lg:border-t-0 border-heritage-border/60">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-heritage-woodLight mr-1">
            <Filter className="w-3.5 h-3.5 text-heritage-goldDark" />
            <span>Trai kỳ:</span>
          </div>

          {[
            { mode: FastingSchedule.NONE, label: 'Không chọn' },
            { mode: FastingSchedule.LUC_TRAI, label: 'Lục Trai (6 ngày)' },
            { mode: FastingSchedule.THAP_TRAI, label: 'Thập Trai (10 ngày)' },
            { mode: FastingSchedule.THIEN_NGUON, label: 'Thiên Ngươn' },
          ].map((item) => {
            const isActive = fastingSchedule === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => setFastingSchedule(item.mode)}
                className={`
                  px-3 py-1.5 rounded-xl text-xs font-medium transition-all
                  ${
                    isActive
                      ? 'bg-heritage-gold text-white font-semibold shadow-xs'
                      : 'bg-heritage-parchment text-heritage-wood hover:bg-amber-100 border border-heritage-border/70'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}

          {/* Toggle Can Chi */}
          <label className="flex items-center gap-1.5 ml-2 cursor-pointer text-xs font-medium text-heritage-woodLight select-none">
            <input
              type="checkbox"
              checked={showCanChi}
              onChange={(e) => setShowCanChi(e.target.checked)}
              className="rounded border-heritage-border text-heritage-gold focus:ring-heritage-gold"
            />
            <span>Can Chi</span>
          </label>
        </div>
      </div>

      {/* 3. Bố Cục Chính: Bảng Lịch Tháng (8 cột) & Thẻ Chi Tiết Ngày (4 cột) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Cột Trái: Bảng Lịch Tháng (lg:col-span-8) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-4">
          <div className="bg-white/90 border border-heritage-border rounded-2xl p-3 sm:p-5 shadow-xs overflow-hidden">
            {/* Hàng Tiêu Đề 7 Ngày Trong Tuần */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pb-2 border-b border-heritage-border/70 mb-2">
              {WEEKDAYS.map((wd, idx) => (
                <div
                  key={wd}
                  className={`text-xs sm:text-sm font-serif font-bold py-1 ${
                    idx === 6 ? 'text-caodai-red' : idx === 5 ? 'text-heritage-cyan' : 'text-heritage-wood'
                  }`}
                >
                  <span className="hidden sm:inline">{wd}</span>
                  <span className="sm:hidden">{wd.replace('Thứ ', 'T')}</span>
                </div>
              ))}
            </div>

            {/* Lưới Ngày trong Tháng */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {/* Các ô trống trước ngày 1 */}
              {Array.from({ length: startDayOffset }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="min-h-[82px] sm:min-h-[104px] bg-heritage-parchment/20 rounded-xl border border-dashed border-heritage-border/30"
                />
              ))}

              {/* Từng ngày trong tháng */}
              {daysInMonth.map((day) => {
                const dayEvents = getEventsForDay(
                  day.solarMonth,
                  day.solarDay,
                  day.lunar.month,
                  day.lunar.day,
                );
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
                    onSelect={() => setSelectedDateStr(day.solarDate)}
                  />
                );
              })}
            </div>

            {/* Chú giải ký hiệu lịch ở đáy bảng */}
            <div className="mt-4 pt-4 border-t border-heritage-border/60 flex flex-wrap items-center justify-between gap-3 text-xs text-heritage-woodLight">
              <div className="flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  <span>Sóc (Mùng 1)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-600" />
                  <span>Vọng (Rằm 15)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                    Chay
                  </span>
                  <span>Ngày ăn chay</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-caodai-red/10 text-caodai-red border border-caodai-red/30">
                    Lễ
                  </span>
                  <span>Đại Lễ & Kỷ Niệm</span>
                </span>
              </div>
              <div className="text-[11px] italic">
                * Giờ Hoàng Đạo tính theo Chi ngày
              </div>
            </div>
          </div>
        </div>

        {/* Cột Phải: Thẻ Chi Tiết Ngày Đang Chọn (lg:col-span-5) */}
        <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
          {selectedDayInfo && (
            <DayDetailCard day={selectedDayInfo} events={selectedDayEvents} />
          )}
        </div>
      </div>

      {/* 4. Danh Mục 13 Ngày Đại Lễ Chính Thức Ban Chỉnh Đạo */}
      <ReligiousEventsReference />
    </div>
  );
}
