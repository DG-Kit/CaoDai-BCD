'use client';

import React, { useState } from 'react';
import {
  VERIFIED_RELIGIOUS_EVENTS,
  VERIFIED_NATIONAL_EVENTS,
} from '@caodai-bcd/shared';
import { BookMarked, ChevronDown, ChevronUp, Flag } from 'lucide-react';

export function ReligiousEventsReference() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'RELIGIOUS' | 'NATIONAL'>('RELIGIOUS');

  const activeEvents =
    activeTab === 'RELIGIOUS' ? VERIFIED_RELIGIOUS_EVENTS : VERIFIED_NATIONAL_EVENTS;

  return (
    <div className="bg-heritage-parchment/70 border border-heritage-border rounded-2xl p-5 shadow-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div className="flex items-center gap-3">
          <BookMarked className="w-5 h-5 text-heritage-goldDark shrink-0" />
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-heritage-wood group-hover:text-heritage-goldDark transition-colors">
              Tra Cứu Danh Mục Ngày Đại Lễ & Sự Kiện (Ban Chỉnh Đạo & Quốc Gia)
            </h3>
            <p className="text-xs text-heritage-woodLight">
              Gồm 13 ngày Đại Lễ Cao Đài Ban Chỉnh Đạo & 16 ngày Lễ lớn Nhà nước Việt Nam (Bấm để {isOpen ? 'thu gọn' : 'xem đầy đủ'})
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg bg-white/80 border border-heritage-border text-heritage-woodLight group-hover:text-heritage-goldDark shrink-0">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-heritage-border/70 space-y-4">
          {/* Tabs chuyển đổi giữa Lễ Đạo & Lễ Quốc Gia */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('RELIGIOUS')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'RELIGIOUS'
                  ? 'bg-caodai-red text-white shadow-xs'
                  : 'bg-white/80 text-heritage-wood hover:bg-heritage-parchment border border-heritage-border'
              }`}
            >
              ✨ 13 Đại Lễ Cao Đài Ban Chỉnh Đạo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('NATIONAL')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'NATIONAL'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'bg-white/80 text-heritage-wood hover:bg-heritage-parchment border border-heritage-border'
              }`}
            >
              <Flag className="w-3.5 h-3.5" />
              16 Ngày Lễ Lớn Nhà Nước Việt Nam
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeEvents.map((item, idx) => (
              <div
                key={item.code}
                className="bg-white/90 border border-heritage-border/80 rounded-xl p-3 shadow-2xs hover:border-heritage-gold transition-colors"
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
                    className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded shrink-0 ${
                      item.category === 'NATIONAL_HOLIDAY'
                        ? 'bg-red-700 text-white'
                        : item.category === 'MAJOR_HOLIDAY'
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
