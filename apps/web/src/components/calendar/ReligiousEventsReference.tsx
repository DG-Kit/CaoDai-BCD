'use client';

import React, { useState } from 'react';
import {
  VERIFIED_RELIGIOUS_EVENTS,
  VERIFIED_NATIONAL_EVENTS,
} from '@caodai-bcd/shared';
import { BookMarked, ChevronDown, ChevronUp } from 'lucide-react';

export function ReligiousEventsReference() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'RELIGIOUS' | 'NATIONAL'>('RELIGIOUS');

  const activeEvents =
    activeTab === 'RELIGIOUS' ? VERIFIED_RELIGIOUS_EVENTS : VERIFIED_NATIONAL_EVENTS;

  return (
    <div className="bg-heritage-paper border border-heritage-border p-5 flex flex-col h-full rounded-xl shadow-xs">
      {/* Tiêu đề Box */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group pb-1"
      >
        <div className="flex items-center gap-3">
          <BookMarked className="w-5 h-5 text-caodai-ochre shrink-0" />
          <div>
            <h3 className="font-serif font-bold text-base sm:text-lg text-heritage-wood tracking-tight">
              Tra Cứu Danh Mục Ngày Lễ & Kỷ Niệm
            </h3>
            <p className="text-xs text-heritage-woodLight mt-0.5">
              13 Đại Lễ Cao Đài Ban Chỉnh Đạo & 16 Ngày Lễ Lớn Việt Nam
            </p>
          </div>
        </div>
        <div className="p-1 rounded-lg border border-heritage-border text-heritage-woodLight hover:text-heritage-wood shrink-0">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-4 pt-4 border-t border-heritage-border space-y-4 flex-1 flex flex-col">
          {/* Tabs chuyển đổi giữa Lễ Đạo & Lễ Quốc Gia */}
          <div className="flex items-center gap-2 p-1 rounded-lg border border-heritage-border bg-heritage-subtle text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('RELIGIOUS')}
              className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all text-center ${
                activeTab === 'RELIGIOUS'
                  ? 'bg-caodai-vermilion text-white shadow-2xs'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }`}
            >
              13 Đại Lễ Cao Đài Ban Chỉnh Đạo
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('NATIONAL')}
              className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'NATIONAL'
                  ? 'bg-heritage-wood text-heritage-paper shadow-2xs'
                  : 'text-heritage-woodLight hover:text-heritage-wood'
              }`}
            >
              16 Ngày Lễ Quốc Gia VN
            </button>
          </div>

          {/* Danh Sách Sự Kiện (Chữ rõ ràng, không font nhỏ) */}
          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {activeEvents.map((item, idx) => (
              <div
                key={item.code}
                className="bg-heritage-parchment border border-heritage-border rounded-lg p-3.5 hover:border-caodai-ochre transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${
                        activeTab === 'RELIGIOUS'
                          ? 'bg-caodai-vermilion text-white'
                          : 'bg-heritage-wood text-heritage-paper'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className="font-serif font-bold text-sm text-heritage-wood leading-snug">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-heritage-subtle text-heritage-wood border border-heritage-border shrink-0">
                    {item.dateRangeStr}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-heritage-woodLight mt-2 pl-7.5 leading-relaxed">
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
