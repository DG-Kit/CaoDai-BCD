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
  Sparkles,
  Flag,
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

  // Tên tháng Âm lịch chủ đạo của tháng Dương này
  const primaryLunarMonthStr = useMemo(() => {
    if (!daysInMonth || daysInMonth.length === 0) return '';
    const midDay = daysInMonth[Math.floor(daysInMonth.length / 2)];
    if (!midDay) return '';
    return `Tháng ${midDay.lunar.month} năm ${midDay.canChi.year} (Âm lịch)`;
  }, [daysInMonth]);

  // Xử lý khi nhấn vào một ngày trên lịch
  const handleSelectDay = (solarDate: string) => {
    setSelectedDateStr(solarDate);
    setModalOpen(true);
  };

  return (
    <div className="w-full max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-8 py-3 sm:py-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4 transition-colors">
      {/* 1. Header Trang & Thanh Điều Khiển Tinh Gọn */}
      <div className="bg-white/90 dark:bg-stone-900/80 border border-heritage-border rounded-2xl p-3 sm:p-4 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 transition-colors">
        {/* Bộ chuyển tháng & Tiêu đề Tháng */}
        <div className="flex items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Tháng trước"
              className="p-2 rounded-xl border border-heritage-border hover:bg-heritage-parchment dark:hover:bg-stone-800 text-heritage-wood transition-colors shadow-2xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Tháng sau"
              className="p-2 rounded-xl border border-heritage-border hover:bg-heritage-parchment dark:hover:bg-stone-800 text-heritage-wood transition-colors shadow-2xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-heritage-wood leading-none">
              Tháng {currentMonth} năm {currentYear}
            </div>
            <div className="text-xs sm:text-sm text-heritage-goldDark font-semibold mt-0.5">
              {primaryLunarMonthStr}
            </div>
          </div>

          <button
            type="button"
            onClick={handleToday}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-heritage-parchment dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/50 text-heritage-wood border border-heritage-border transition-colors shadow-2xs"
          >
            Hôm Nay
          </button>
        </div>

        {/* Cụm Bộ Lọc Giữa: Lễ Đạo / Lễ Quốc Gia */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1 bg-heritage-parchment/80 dark:bg-stone-850 p-1 rounded-xl border border-heritage-border/70 text-xs">
            <button
              type="button"
              onClick={() => setEventTypeFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                eventTypeFilter === 'ALL'
                  ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                  : 'text-heritage-wood hover:bg-white dark:hover:bg-stone-800'
              }`}
            >
              Tất cả lễ
            </button>
            <button
              type="button"
              onClick={() => setEventTypeFilter('RELIGIOUS')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                eventTypeFilter === 'RELIGIOUS'
                  ? 'bg-caodai-red text-white shadow-2xs'
                  : 'text-heritage-wood hover:bg-white dark:hover:bg-stone-800'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              Lễ Đạo Cao Đài
            </button>
            <button
              type="button"
              onClick={() => setEventTypeFilter('NATIONAL')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
                eventTypeFilter === 'NATIONAL'
                  ? 'bg-red-700 text-white shadow-2xs dark:bg-red-850'
                  : 'text-heritage-wood hover:bg-white dark:hover:bg-stone-800'
              }`}
            >
              <Flag className="w-3 h-3" />
              Lễ Nhà Nước VN
            </button>
          </div>
        </div>

        {/* Cụm Bộ Lọc Phải: Chế độ Ăn Chay (Trai Kỳ) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-heritage-woodLight mr-1 hidden xl:inline">
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
                  px-2.5 py-1 rounded-xl text-xs font-medium transition-all
                  ${
                    isActive
                      ? 'bg-heritage-gold text-white font-semibold shadow-xs'
                      : 'bg-heritage-parchment dark:bg-stone-850 text-heritage-wood hover:bg-amber-100 dark:hover:bg-stone-800 border border-heritage-border/70'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}

          {/* Toggle Can Chi */}
          <label className="flex items-center gap-1 ml-1 cursor-pointer text-xs font-medium text-heritage-woodLight select-none">
            <input
              type="checkbox"
              checked={showCanChi}
              onChange={(e) => setShowCanChi(e.target.checked)}
              className="rounded border-heritage-border text-heritage-gold focus:ring-heritage-gold dark:bg-stone-800"
            />
            <span className="hidden sm:inline">Can Chi</span>
          </label>
        </div>
      </div>

      {/* 2. BẢNG LỊCH THÁNG TOÀN KHỔ (TRÒN TRONG 1 KHUNG HÌNH - RESPONSIVE TOÀN DIỆN) */}
      <section className="bg-white/95 dark:bg-stone-900/80 border border-heritage-border rounded-2xl p-2.5 sm:p-4 shadow-sm flex-1 flex flex-col justify-between overflow-hidden transition-colors">
        {/* Hàng Tiêu Đề 7 Ngày Trong Tuần */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center pb-2 border-b border-heritage-border/70 mb-2">
          {WEEKDAYS.map((wd, idx) => (
            <div
              key={wd}
              className={`text-xs sm:text-sm font-serif font-bold py-1 rounded-lg ${
                idx === 6
                  ? 'text-caodai-red dark:text-rose-400 bg-red-50/60 dark:bg-rose-950/30'
                  : idx === 5
                  ? 'text-heritage-cyan dark:text-sky-400 bg-sky-50/60 dark:bg-sky-950/30'
                  : 'text-heritage-wood bg-stone-50/60 dark:bg-stone-800/40'
              }`}
            >
              <span className="hidden sm:inline">{wd}</span>
              <span className="sm:hidden">{wd.replace('Thứ ', 'T')}</span>
            </div>
          ))}
        </div>

        {/* Lưới 7 Cột Ngày Trong Tháng */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 flex-1">
          {/* Các ô trống trước ngày 1 */}
          {Array.from({ length: startDayOffset }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[68px] sm:min-h-[88px] lg:min-h-[98px] xl:min-h-[108px] bg-heritage-parchment/15 dark:bg-stone-900/30 rounded-xl border border-dashed border-heritage-border/25"
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

        {/* Chú giải ký hiệu lịch & Nút Tra Cứu ở đáy bảng */}
        <div className="mt-3 pt-2.5 border-t border-heritage-border/60 flex flex-wrap items-center justify-between gap-2 text-xs text-heritage-woodLight">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-slate-800 text-white dark:bg-stone-800 dark:border dark:border-stone-700">
                🌑 Sóc
              </span>
              <span className="hidden sm:inline">Mùng 1 ÂL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-400 text-amber-950 border border-amber-600 dark:bg-amber-500/30 dark:text-amber-200 dark:border-amber-500/60">
                🌕 Vọng
              </span>
              <span className="hidden sm:inline">Rằm 15 ÂL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                Chay
              </span>
              <span className="hidden sm:inline">Ăn chay</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-caodai-red/10 text-caodai-red border border-caodai-red/30 dark:bg-rose-950/50 dark:text-rose-300 dark:border-rose-900/50">
                ✨ Lễ Đạo
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-red-700 text-white dark:bg-red-900">
                🇻🇳 Lễ Quốc Gia
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowReference(!showReference)}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-semibold bg-heritage-parchment dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-heritage-wood border border-heritage-border transition-colors shadow-2xs"
            >
              <BookMarked className="w-3.5 h-3.5 text-heritage-goldDark" />
              <span>{showReference ? 'Thu gọn danh mục lễ' : 'Tra cứu 29 ngày lễ lớn'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Khối Tra Cứu Sự Kiện (Mở ra khi bấm nút hoặc cuộn xuống) */}
      {showReference && (
        <section className="animate-in fade-in duration-200">
          <ReligiousEventsReference />
        </section>
      )}

      {/* 4. MODAL POP-UP CHI TIẾT NGÀY KHI NHẤN VÀO BẤT KỲ NGÀY NÀO */}
      <DayDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        day={selectedDayInfo}
        events={selectedDayEvents}
      />
    </div>
  );
}
