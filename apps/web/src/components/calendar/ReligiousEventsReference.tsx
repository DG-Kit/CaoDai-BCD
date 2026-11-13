'use client';

import React, { useState } from 'react';
import { VERIFIED_RELIGIOUS_EVENTS } from '@caodai-bcd/shared';
import { BookMarked, ChevronDown, ChevronUp } from 'lucide-react';

export function ReligiousEventsReference() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-heritage-parchment/60 border border-heritage-border rounded-2xl p-5 shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2.5">
          <BookMarked className="w-5 h-5 text-heritage-goldDark" />
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-heritage-wood group-hover:text-heritage-goldDark transition-colors">
              Danh Mục 13 Ngày Đại Lễ & Kỷ Niệm Chính Thức
            </h3>
            <p className="text-xs text-heritage-woodLight">
              Đã thẩm định theo truyền thống Hội Thánh Cao Đài Ban Chỉnh Đạo (Bấm để {isOpen ? 'thu gọn' : 'xem đầy đủ'})
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg bg-white/80 border border-heritage-border text-heritage-woodLight group-hover:text-heritage-goldDark">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-heritage-border/70 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VERIFIED_RELIGIOUS_EVENTS.map((item, idx) => (
              <div
                key={item.code}
                className="bg-white/80 border border-heritage-border/70 rounded-xl p-3 shadow-2xs hover:border-heritage-gold transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-heritage-goldDark text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="font-serif font-bold text-sm text-heritage-wood leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                      item.category === 'MAJOR_HOLIDAY'
                        ? 'bg-caodai-red/10 text-caodai-red border border-caodai-red/30'
                        : 'bg-amber-100 text-heritage-goldDark border border-amber-300'
                    }`}
                  >
                    {item.dateRangeStr}
                  </span>
                </div>
                <p className="text-xs text-heritage-woodLight mt-1.5 pl-7 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
