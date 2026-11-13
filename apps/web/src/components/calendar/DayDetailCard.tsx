'use client';

import React from 'react';
import { DayCalendarInfo, ReligiousEventItem } from '@caodai-bcd/shared';
import { Calendar, Clock, Moon, Sparkles, AlertCircle } from 'lucide-react';

interface DayDetailCardProps {
  day: DayCalendarInfo;
  events: ReligiousEventItem[];
}

export function DayDetailCard({ day, events }: DayDetailCardProps) {
  const isSunday = day.dayOfWeek === 0;
  const isSaturday = day.dayOfWeek === 6;

  return (
    <div className="bg-heritage-parchment/90 border border-heritage-border rounded-2xl p-5 shadow-xs flex flex-col space-y-5">
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

      {/* 3. Danh sách Giờ Hoàng Đạo Trong Ngày */}
      <div>
        <div className="flex items-center justify-between text-xs font-semibold text-heritage-woodLight uppercase tracking-wider mb-2">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-heritage-goldDark" />
            6 Giờ Hoàng Đạo trong ngày
          </span>
          <span className="text-[11px] text-heritage-goldDark font-normal">
            (Theo Chi Ngày: {day.canChi.day.split(' ')[1] || ''})
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {day.hoangDaoHours.map((hStr) => {
            const chi = hStr.split(' ')[0] || '';
            const timeRange = hStr.includes('(') ? hStr.slice(hStr.indexOf('(') + 1, hStr.indexOf(')')) : '';
            return (
              <div
                key={hStr}
                className="bg-white/80 border border-heritage-border/80 rounded-lg p-2 text-left shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-serif font-bold text-heritage-wood text-sm">
                    Giờ {chi}
                  </span>
                  <span className="text-[10px] font-semibold px-1 py-0.2 rounded bg-amber-100 text-heritage-goldDark">
                    Hoàng Đạo
                  </span>
                </div>
                <div className="text-[11px] text-heritage-woodLight mt-0.5">
                  {timeRange}
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

      {/* 5. Sự Kiện / Lễ Đạo Trong Ngày (Nếu Có) */}
      {events.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-caodai-red uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Đại Lễ & Kỷ Niệm Trong Ngày
          </div>
          {events.map((ev) => (
            <div
              key={ev.code}
              className={`p-3.5 rounded-xl border ${
                ev.category === 'MAJOR_HOLIDAY'
                  ? 'bg-caodai-red/5 border-caodai-red/30'
                  : 'bg-amber-50 border-amber-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-serif font-bold text-base text-heritage-wood">
                  {ev.title}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white text-heritage-goldDark border border-heritage-border">
                  {ev.dateRangeStr}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-heritage-woodLight mt-1 leading-relaxed">
                {ev.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Lời nhắc nhở tinh thần */}
      <div className="flex items-start gap-2 pt-2 border-t border-heritage-border/50 text-[11px] text-heritage-woodLight italic">
        <AlertCircle className="w-3.5 h-3.5 shrink-0 text-heritage-gold mt-0.5" />
        <span>
          Lịch Đạo được tính toán theo múi giờ Việt Nam (GMT+7) và đối chiếu với dữ liệu chính thức của Hội Thánh Cao Đài Ban Chỉnh Đạo.
        </span>
      </div>
    </div>
  );
}
