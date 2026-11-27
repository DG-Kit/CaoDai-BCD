'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Info,
  List,
  Maximize2,
  Minimize2,
  Minus,
  Plus,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';
import { BellMalletIcon } from '@/components/library/BellMalletIcon';
import {
  FALLBACK_DOCUMENTS,
  FALLBACK_SECTIONS,
  LibraryDocument,
  LibraryEdition,
  LibrarySection,
} from '@/lib/library-data';

interface SplitLibraryReaderProps {
  slug: string;
}

const BELL_STORAGE_KEY = 'caodai-bcd:bell-markers:v1';

// Dữ liệu đánh dấu câu kinh thỉnh chuông đã được người dùng kiểm tra và xác nhận (bài 1–12, 15–19)
const DEFAULT_BELL_MARKERS: Record<string, number[]> = {
  '1-niem-huong': [5, 6, 8, 11],
  '2-khai-kinh': [4, 6, 8, 9, 10],
  '3-ngoc-hoang-kinh': [2, 16, 19, 26],
  '4-phat-giao-kinh': [3, 20],
  '5-tien-giao-kinh': [4, 26],
  '6-thanh-giao-kinh': [4, 19],
  '7-dang-hoa': [1, 2],
  '8-dang-ruou': [1, 2],
  '9-dang-tra': [1, 2],
  '10-ngu-nguyen': [2],
  '11-giai-kho': [0, 9],
  '12-doat-nghiet': [0],
  '15-phat-mau-kinh': [0],
  '16-cuu-nuong-kinh': [4, 7, 11, 12, 13, 16, 20, 21, 23, 26],
  '17-kinh-cau-sieu': [2, 3, 4, 6, 8, 10, 12, 18],
  '18-kinh-sam-hoi': [
    1, 23, 40, 120, 122, 127, 150, 173, 195, 232, 255, 256, 300, 313, 330, 353, 370, 372, 387, 407,
    438, 443, 448, 498, 512, 535,
  ],
  'bai-khen-ngoi-kinh-sam-hoi': [1, 11, 12],
};

// Các bài kinh văn xuôi cần đánh chuông ngay trước từng cụm từ cụ thể trong đoạn
const INLINE_BELL_PHRASES: Record<string, string[]> = {
  '19-kinh-cuu-kho': [
    'Nam mô Đại Từ Đại Bi Quảng Đại Linh Quan Thế Âm Bồ Tát (3 lần)',
    'Quan Thế Âm Bồ Tát',
    'Phật cáo A Nan ngôn',
    'Nam mô Phật',
    'A Nậu Đại Thiên Vương Chánh Điện Bồ Tát',
    'chư Đại Bồ Tát',
    'Quan Thế Âm Anh Lạc',
    'Kim Bà Kim Bà Đế',
  ],
};

interface BellRenderOptions {
  showBells: boolean;
  isEditing: boolean;
  bellLines: Set<number>;
  inlineBellPhrases?: string[];
  onToggleLine?: (lineIdx: number) => void;
}

const FONT_SIZES = [
  { label: 'Nhỏ', textClass: 'text-sm leading-relaxed' },
  { label: 'Vừa', textClass: 'text-base leading-loose' },
  { label: 'Lớn', textClass: 'text-lg leading-loose' },
  { label: 'Rất lớn', textClass: 'text-xl leading-loose' },
];

function extractScriptureBodyOnly(markdown: string): string {
  // Chỉ giữ lại phần nội dung bài kinh, bỏ phần nghi thức vái lạy và ghi chú bên dưới (sau dấu '---')
  const separatorMatch = markdown.match(/\n---(?:\r?\n|$)/);
  if (separatorMatch && separatorMatch.index !== undefined) {
    return markdown.slice(0, separatorMatch.index).trim();
  }
  return markdown;
}

function getCleanSectionTitle(title: string): string {
  // Bỏ phần chú thích trong ngoặc đơn (...) để tiêu đề nút điều hướng luôn ngắn gọn, không vỡ dòng
  return title.replace(/\s*\([^)]*\)/g, '').trim();
}

function renderScriptureMarkdown(
  markdown: string,
  textClass: string,
  bellOptions?: BellRenderOptions,
) {
  const lines = markdown.split('\n');
  const showBells = bellOptions?.showBells ?? false;
  const isEditing = bellOptions?.isEditing ?? false;
  const inlinePhrases = showBells ? bellOptions?.inlineBellPhrases : undefined;

  return (
    <div className={`space-y-2.5 font-serif text-heritage-ink dark:text-heritage-dark-ink ${textClass}`}>
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (line === '') {
          return <div key={idx} className="h-2" />;
        }
        if (line === '---') {
          return (
            <hr
              key={idx}
              className="my-4 border-t border-heritage-border dark:border-heritage-dark-border"
            />
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h4
              key={idx}
              className="mt-5 font-serif text-lg font-bold uppercase tracking-wide text-caodai-ochre dark:text-caodai-yellow"
            >
              {line.replace('### ', '')}
            </h4>
          );
        }
        if (line.startsWith('- ')) {
          const itemText = line.replace('- ', '');
          return (
            <div key={idx} className="flex items-start gap-2 pl-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-caodai-ochre dark:bg-caodai-yellow" />
              <span>{renderInlineFormatting(itemText)}</span>
            </div>
          );
        }

        const isNonVerseLine =
          line.startsWith('*(Giọng') ||
          line.startsWith('**(') ||
          line.startsWith('★') ||
          line.startsWith('>');

        const isBelled =
          !isNonVerseLine && !inlinePhrases?.length && (bellOptions?.bellLines.has(idx) ?? false);

        if (isEditing && !isNonVerseLine) {
          return (
            <button
              key={idx}
              type="button"
              onClick={() => bellOptions?.onToggleLine?.(idx)}
              aria-pressed={isBelled}
              className={`group flex w-full items-start gap-2.5 px-2 py-1 text-left transition-colors ${
                isBelled
                  ? 'bg-heritage-parchment/80 dark:bg-heritage-dark-surface/80'
                  : 'hover:bg-heritage-parchment/40 dark:hover:bg-heritage-dark-surface/40'
              }`}
              title={isBelled ? 'Nhấp để bỏ đánh dấu chuông' : 'Nhấp để đánh dấu đánh chuông'}
            >
              <span
                className={`mt-1.5 shrink-0 transition-opacity ${
                  isBelled
                    ? 'text-caodai-vermilion opacity-100 dark:text-caodai-yellow'
                    : 'text-heritage-muted opacity-30 group-hover:opacity-80 dark:text-heritage-dark-muted'
                }`}
              >
                <BellMalletIcon className="h-4 w-4" active={isBelled} />
              </span>
              <span className="flex-1">{renderInlineFormatting(line)}</span>
            </button>
          );
        }

        if (showBells && isBelled) {
          return (
            <div key={idx} className="flex items-start gap-2.5">
              <span
                className="mt-1.5 shrink-0 text-caodai-vermilion dark:text-caodai-yellow"
                title="Câu kinh thỉnh chuông"
                aria-label="Thỉnh chuông"
              >
                <BellMalletIcon className="h-4 w-4" active />
              </span>
              <p className="flex-1 font-medium text-heritage-wood dark:text-heritage-dark-ink">
                {renderInlineFormatting(line, inlinePhrases)}
              </p>
            </div>
          );
        }

        return <p key={idx}>{renderInlineFormatting(line, inlinePhrases)}</p>;
      })}
    </div>
  );
}

function renderTextWithInlineBells(text: string, inlinePhrases?: string[]): React.ReactNode {
  if (!inlinePhrases || inlinePhrases.length === 0) {
    return text;
  }
  const escaped = [...inlinePhrases]
    .sort((a, b) => b.length - a.length)
    .map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');
  const segments = text.split(regex);
  if (segments.length === 1) {
    return text;
  }
  const phraseSet = new Set(inlinePhrases);
  return segments.map((seg, i) => {
    if (phraseSet.has(seg)) {
      return (
        <span
          key={i}
          className="inline-flex items-baseline gap-1 font-semibold text-heritage-wood dark:text-heritage-dark-ink"
        >
          <BellMalletIcon
            className="inline-block h-3.5 w-3.5 shrink-0 translate-y-[2px] text-caodai-vermilion dark:text-caodai-yellow"
            active
          />
          <span>{seg}</span>
        </span>
      );
    }
    return <React.Fragment key={i}>{seg}</React.Fragment>;
  });
}

function renderInlineFormatting(text: string, inlinePhrases?: string[]): React.ReactNode {
  // Xử lý đơn giản **bold**, *(italic)* và <u>underline</u> giữ nguyên văn bản gốc
  const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*|<u>.*?<\/u>)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-heritage-wood dark:text-heritage-dark-ink">
          {renderTextWithInlineBells(part.slice(2, -2), inlinePhrases)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-heritage-muted dark:text-heritage-dark-muted">
          {renderTextWithInlineBells(part.slice(1, -1), inlinePhrases)}
        </em>
      );
    }
    if (part.startsWith('<u>') && part.endsWith('</u>')) {
      return (
        <span key={idx} className="underline underline-offset-4">
          {renderTextWithInlineBells(part.slice(3, -4), inlinePhrases)}
        </span>
      );
    }
    return <React.Fragment key={idx}>{renderTextWithInlineBells(part, inlinePhrases)}</React.Fragment>;
  });
}

export function SplitLibraryReader({ slug }: SplitLibraryReaderProps) {
  const fallbackDoc = useMemo(
    () => FALLBACK_DOCUMENTS.find((d) => d.slug === slug) ?? FALLBACK_DOCUMENTS[0]!,
    [slug],
  );

  const [document, setDocument] = useState<LibraryDocument>(fallbackDoc);
  const [selectedEditionId, setSelectedEditionId] = useState<string>(
    fallbackDoc.editions[0]?.id ?? '',
  );
  const [sections, setSections] = useState<LibrarySection[]>(
    fallbackDoc.editions[0]?.sections ?? FALLBACK_SECTIONS,
  );
  const [activeSectionId, setActiveSectionId] = useState<string>(
    fallbackDoc.editions[0]?.sections?.[1]?.id ??
      fallbackDoc.editions[0]?.sections?.[0]?.id ??
      '',
  );
  const [activeSectionDetail, setActiveSectionDetail] = useState<LibrarySection | null>(
    fallbackDoc.editions[0]?.sections?.[1] ?? fallbackDoc.editions[0]?.sections?.[0] ?? null,
  );

  const [showToc, setShowToc] = useState<boolean>(true);
  const [mobileTocOpen, setMobileTocOpen] = useState<boolean>(true);
  const [showScan, setShowScan] = useState<boolean>(true);
  const [showEditionInfo, setShowEditionInfo] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'TEXT' | 'SCAN'>('TEXT');
  const [fontSizeIdx, setFontSizeIdx] = useState<number>(1);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showBells, setShowBells] = useState<boolean>(true);
  const [isEditingBells, setIsEditingBells] = useState<boolean>(false);
  const [bellMarkersMap, setBellMarkersMap] = useState<Record<string, number[]>>(
    DEFAULT_BELL_MARKERS,
  );
  const fullscreenContentRef = useRef<HTMLDivElement | null>(null);

  // Nạp dữ liệu đánh dấu chuông tùy chỉnh từ localStorage
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(BELL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, number[]>;
        if (parsed && typeof parsed === 'object') {
          setBellMarkersMap({ ...DEFAULT_BELL_MARKERS, ...parsed });
        }
      }
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, []);

  const persistBellMarkers = (nextMap: Record<string, number[]>) => {
    setBellMarkersMap(nextMap);
    try {
      window.localStorage.setItem(BELL_STORAGE_KEY, JSON.stringify(nextMap));
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  };

  const activeSectionSlug = activeSectionDetail?.slug ?? '';
  const activeBellLines = useMemo(() => {
    const arr = activeSectionSlug ? bellMarkersMap[activeSectionSlug] ?? [] : [];
    return new Set<number>(arr);
  }, [bellMarkersMap, activeSectionSlug]);

  const handleToggleBellLine = (lineIdx: number) => {
    if (!activeSectionSlug) return;
    const current = new Set(bellMarkersMap[activeSectionSlug] ?? []);
    if (current.has(lineIdx)) {
      current.delete(lineIdx);
    } else {
      current.add(lineIdx);
    }
    persistBellMarkers({
      ...bellMarkersMap,
      [activeSectionSlug]: Array.from(current).sort((a, b) => a - b),
    });
  };

  const handleResetSectionBells = () => {
    if (!activeSectionSlug) return;
    const fallback = DEFAULT_BELL_MARKERS[activeSectionSlug] ?? [];
    persistBellMarkers({
      ...bellMarkersMap,
      [activeSectionSlug]: fallback,
    });
  };

  const [copiedBells, setCopiedBells] = useState<boolean>(false);

  const handleClearSectionBells = () => {
    if (!activeSectionSlug) return;
    persistBellMarkers({
      ...bellMarkersMap,
      [activeSectionSlug]: [],
    });
  };

  const handleCopyBellConfig = () => {
    const cleanedEntries = Object.entries(bellMarkersMap).filter(
      ([, lines]) => Array.isArray(lines) && lines.length > 0,
    );
    const payload = JSON.stringify(Object.fromEntries(cleanedEntries), null, 2);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(payload);
      setCopiedBells(true);
      setTimeout(() => setCopiedBells(false), 2500);
    }
  };

  // 1. Nạp thông tin tác phẩm từ API (nếu có)
  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    let cancelled = false;

    async function loadDocument() {
      try {
        const res = await fetch(`${apiBase}/library/documents/${slug}`);
        if (!cancelled && res.ok) {
          const docJson = (await res.json()) as LibraryDocument;
          setDocument(docJson);
          if (docJson.editions?.[0]) {
            setSelectedEditionId(docJson.editions[0].id);
          }
        }
      } catch {
        // Dùng fallback data
      }
    }

    loadDocument();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const currentEdition: LibraryEdition | undefined = useMemo(
    () =>
      document.editions.find((ed) => ed.id === selectedEditionId) ?? document.editions[0],
    [document, selectedEditionId],
  );

  // 2. Nạp danh sách mục lục (sections) của ấn bản hiện tại
  useEffect(() => {
    if (!currentEdition?.id) return;
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    let cancelled = false;

    async function loadEditionSections() {
      // Nếu là fallback ID
      if (currentEdition?.sections && currentEdition.sections.length > 0) {
        setSections(currentEdition.sections);
        const firstReadable = currentEdition.sections[1] ?? currentEdition.sections[0];
        if (firstReadable) {
          setActiveSectionId(firstReadable.id);
          setActiveSectionDetail(firstReadable);
        }
      }

      try {
        const res = await fetch(`${apiBase}/library/editions/${currentEdition!.id}`);
        if (!cancelled && res.ok) {
          const edJson = (await res.json()) as LibraryEdition;
          if (Array.isArray(edJson.sections) && edJson.sections.length > 0) {
            setSections(edJson.sections);
            const firstReadable = edJson.sections[1] ?? edJson.sections[0];
            if (firstReadable) {
              setActiveSectionId(firstReadable.id);
            }
          }
        }
      } catch {
        // Giữ dữ liệu fallback
      }
    }

    loadEditionSections();
    return () => {
      cancelled = true;
    };
  }, [currentEdition?.id]);

  // 3. Nạp chi tiết nội dung bài kinh khi chọn activeSectionId
  useEffect(() => {
    if (!activeSectionId) return;
    const localMatch = sections.find((s) => s.id === activeSectionId);
    if (localMatch) {
      setActiveSectionDetail(localMatch);
    }

    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    let cancelled = false;

    async function loadSectionContent() {
      try {
        const res = await fetch(`${apiBase}/library/sections/${activeSectionId}`);
        if (!cancelled && res.ok) {
          const secJson = (await res.json()) as LibrarySection;
          setActiveSectionDetail(secJson);
        }
      } catch {
        // Giữ dữ liệu fallback
      }
    }

    loadSectionContent();
    return () => {
      cancelled = true;
    };
  }, [activeSectionId, sections]);

  const activeIndex = sections.findIndex((s) => s.id === activeSectionId);
  const prevSection = activeIndex > 0 ? sections[activeIndex - 1] : null;
  const nextSection =
    activeIndex >= 0 && activeIndex < sections.length - 1 ? sections[activeIndex + 1] : null;

  // Tìm bài kinh có nội dung liền trước / liền sau (bỏ qua tiêu đề nhóm không có nội dung)
  const prevReadableSection = useMemo(() => {
    if (activeIndex <= 0) return null;
    for (let i = activeIndex - 1; i >= 0; i--) {
      if (sections[i]?.content?.contentMarkdown) return sections[i]!;
    }
    return prevSection;
  }, [sections, activeIndex, prevSection]);

  const nextReadableSection = useMemo(() => {
    if (activeIndex < 0 || activeIndex >= sections.length - 1) return null;
    for (let i = activeIndex + 1; i < sections.length; i++) {
      if (sections[i]?.content?.contentMarkdown) return sections[i]!;
    }
    return nextSection;
  }, [sections, activeIndex, nextSection]);

  // Hỗ trợ phím Esc thoát chế độ toàn màn hình và khóa cuộn nền
  useEffect(() => {
    if (!isFullscreen) return;
    const prevOverflow = window.document.body.style.overflow;
    window.document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFullscreen]);

  // Cuộn lên đầu bài kinh khi chuyển bài trong chế độ toàn màn hình
  useEffect(() => {
    if (isFullscreen && fullscreenContentRef.current) {
      fullscreenContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeSectionId, isFullscreen]);

  const pdfFile = useMemo(
    () =>
      currentEdition?.files?.find((f) => f.fileType === 'SCAN_ORIGINAL_PDF') ??
      currentEdition?.files?.find((f) => f.fileType === 'OPTIMIZED_PDF'),
    [currentEdition],
  );

  const activePdfPage = activeSectionDetail?.pdfPageStart ?? 1;
  const pdfUrlWithPage = pdfFile
    ? `${pdfFile.storagePath}#page=${activePdfPage}&view=FitH`
    : null;

  const citationText = `${document.title} — ${currentEdition?.editionLabel ?? ''} — Mục: ${
    activeSectionDetail?.title ?? ''
  }${
    activeSectionDetail?.printedPageLabel
      ? `, Trang in ${activeSectionDetail.printedPageLabel}`
      : ''
  }${activePdfPage ? ` (PDF trang ${activePdfPage})` : ''}.`;

  const handleCopyCitation = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(citationText);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Thanh điều hướng trở về & Thông tin Tác phẩm */}
      <div className="border border-heritage-border bg-heritage-paper p-5 sm:p-6 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/library"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-caodai-ochre hover:underline dark:text-caodai-yellow"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Quay lại Thư Viện Kinh Sách</span>
          </Link>

          <button
            type="button"
            onClick={() => setShowEditionInfo((prev) => !prev)}
            className="inline-flex items-center gap-1.5 border border-heritage-border px-3 py-1.5 text-xs font-medium text-heritage-ink hover:border-caodai-ochre dark:border-heritage-dark-border dark:text-heritage-dark-ink"
          >
            <Info className="h-3.5 w-3.5 text-caodai-ochre dark:text-caodai-yellow" />
            <span>{showEditionInfo ? 'Ẩn thông tin ấn bản' : 'Nguồn gốc & Ấn bản'}</span>
          </button>
        </div>

        <h1 className="mt-3 font-serif text-2xl font-bold text-heritage-ink sm:text-3xl dark:text-heritage-dark-ink">
          {document.title}
        </h1>
        {document.authorOrIssuingBody && (
          <p className="mt-1 text-xs font-medium text-heritage-muted sm:text-sm dark:text-heritage-dark-muted">
            {document.authorOrIssuingBody}
          </p>
        )}

        {/* Bộ chọn Ấn bản (nếu có nhiều ấn bản lịch sử) */}
        {document.editions.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
              Ấn bản đang đọc:
            </span>
            {document.editions.map((ed) => (
              <button
                key={ed.id}
                type="button"
                onClick={() => setSelectedEditionId(ed.id)}
                className={`border px-3 py-1 text-xs font-medium transition-colors ${
                  ed.id === currentEdition?.id
                    ? 'border-caodai-ochre bg-heritage-parchment font-semibold text-caodai-vermilion dark:border-caodai-yellow dark:bg-heritage-dark-surface dark:text-caodai-yellow'
                    : 'border-heritage-border text-heritage-muted hover:border-caodai-ochre dark:border-heritage-dark-border dark:text-heritage-dark-muted'
                }`}
              >
                {ed.editionLabel}
              </button>
            ))}
          </div>
        )}

        {/* Chi tiết Lịch sử, Xuất bản & Bản quyền (mở rộng khi cần) */}
        {showEditionInfo && currentEdition && (
          <div className="mt-4 space-y-2 border-t border-heritage-border pt-4 text-xs leading-relaxed text-heritage-muted sm:text-sm dark:border-heritage-dark-border dark:text-heritage-dark-muted">
            {document.historicalOrigin && (
              <p>
                <strong className="text-heritage-ink dark:text-heritage-dark-ink">
                  Lịch sử tài liệu:
                </strong>{' '}
                {document.historicalOrigin}
              </p>
            )}
            {currentEdition.publisher && (
              <p>
                <strong className="text-heritage-ink dark:text-heritage-dark-ink">
                  Nhà xuất bản / Cơ quan in:
                </strong>{' '}
                {currentEdition.publisher}
              </p>
            )}
            {currentEdition.editorialTeam && (
              <p>
                <strong className="text-heritage-ink dark:text-heritage-dark-ink">
                  Ban sửa bản in & Liên kết:
                </strong>{' '}
                {currentEdition.editorialTeam}
              </p>
            )}
            {(currentEdition.isbn || currentEdition.registrationCode) && (
              <p>
                <strong className="text-heritage-ink dark:text-heritage-dark-ink">
                  Mã lưu chiểu & ISBN:
                </strong>{' '}
                {[currentEdition.isbn && `ISBN: ${currentEdition.isbn}`, currentEdition.registrationCode]
                  .filter(Boolean)
                  .join(' — ')}
              </p>
            )}
            {pdfFile?.checksumSha256 && (
              <p className="font-mono text-[11px] break-all">
                <strong>SHA-256 (Toàn vẹn bản scan):</strong> {pdfFile.checksumSha256}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Thanh Công Cụ Điều Khiển Bộ Đọc */}
      <div className="flex flex-wrap items-center justify-between gap-3 border border-heritage-border bg-heritage-parchment/70 px-4 py-3 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/60">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowToc((prev) => !prev)}
            className="inline-flex items-center gap-1.5 border border-heritage-border bg-heritage-paper px-3 py-1.5 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink"
          >
            <List className="h-3.5 w-3.5 text-caodai-ochre dark:text-caodai-yellow" />
            <span>{showToc ? 'Ẩn Mục lục' : 'Hiện Mục lục'}</span>
          </button>

          {/* Điều chỉnh cỡ chữ */}
          <div className="flex items-center border border-heritage-border bg-heritage-paper dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
            <button
              type="button"
              onClick={() => setFontSizeIdx((prev) => Math.max(0, prev - 1))}
              disabled={fontSizeIdx === 0}
              className="px-2.5 py-1.5 text-xs text-heritage-ink disabled:opacity-40 dark:text-heritage-dark-ink"
              title="Giảm cỡ chữ"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="border-x border-heritage-border px-2.5 py-1 text-xs font-medium text-heritage-muted dark:border-heritage-dark-border dark:text-heritage-dark-muted">
              Cỡ chữ: {FONT_SIZES[fontSizeIdx]?.label}
            </span>
            <button
              type="button"
              onClick={() => setFontSizeIdx((prev) => Math.min(FONT_SIZES.length - 1, prev + 1))}
              disabled={fontSizeIdx === FONT_SIZES.length - 1}
              className="px-2.5 py-1.5 text-xs text-heritage-ink disabled:opacity-40 dark:text-heritage-dark-ink"
              title="Tăng cỡ chữ"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Bật/tắt hiển thị icon chuông & chày */}
          <button
            type="button"
            onClick={() => setShowBells((prev) => !prev)}
            aria-pressed={showBells}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              showBells
                ? 'border-caodai-ochre bg-heritage-paper text-caodai-vermilion dark:border-caodai-yellow dark:bg-heritage-dark-paper dark:text-caodai-yellow'
                : 'border-heritage-border bg-heritage-paper text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-muted'
            }`}
            title="Bật hoặc tắt hiển thị biểu tượng đánh chuông"
          >
            <BellMalletIcon className="h-3.5 w-3.5" active={showBells} />
            <span>{showBells ? 'Hiện chuông' : 'Ẩn chuông'}</span>
          </button>

          {/* Chế độ tự đánh dấu / tùy chỉnh đánh chuông */}
          <button
            type="button"
            onClick={() => {
              setIsEditingBells((prev) => !prev);
              setShowBells(true);
            }}
            aria-pressed={isEditingBells}
            className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isEditingBells
                ? 'border-caodai-vermilion bg-caodai-vermilion text-white'
                : 'border-heritage-border bg-heritage-paper text-heritage-ink hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink'
            }`}
            title="Nhấp vào từng câu kinh để đánh dấu hoặc bỏ đánh dấu chuông"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>{isEditingBells ? 'Đang đánh dấu chuông' : 'Tùy chỉnh đánh chuông'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Nút Xem Toàn Màn Hình (Focus Mode) */}
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="inline-flex items-center gap-1.5 border border-caodai-vermilion bg-caodai-vermilion px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-caodai-vermilion/90"
            title="Mở chế độ đọc toàn màn hình để tập trung"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            <span>Xem toàn màn hình</span>
          </button>

          {/* Nút bật/tắt khung Scan trên Desktop */}
          <button
            type="button"
            onClick={() => setShowScan((prev) => !prev)}
            className="hidden items-center gap-1.5 border border-heritage-border bg-heritage-paper px-3 py-1.5 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre lg:inline-flex dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink"
          >
            {showScan ? (
              <EyeOff className="h-3.5 w-3.5 text-caodai-ochre dark:text-caodai-yellow" />
            ) : (
              <Eye className="h-3.5 w-3.5 text-caodai-ochre dark:text-caodai-yellow" />
            )}
            <span>{showScan ? 'Ẩn bản scan đối chiếu' : 'Hiện bản scan đối chiếu'}</span>
          </button>

          {pdfUrlWithPage && (
            <a
              href={pdfUrlWithPage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-caodai-ochre bg-heritage-paper px-3 py-1.5 text-xs font-semibold text-caodai-ochre hover:bg-caodai-ochre hover:text-white dark:border-caodai-yellow dark:bg-heritage-dark-paper dark:text-caodai-yellow"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Mở PDF gốc (Trang {activePdfPage})</span>
            </a>
          )}
        </div>
      </div>

      {/* Thanh Chuyển Tab trên Mobile (< lg) */}
      <div className="grid grid-cols-2 border border-heritage-border lg:hidden dark:border-heritage-dark-border">
        <button
          type="button"
          onClick={() => setMobileTab('TEXT')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider ${
            mobileTab === 'TEXT'
              ? 'bg-caodai-vermilion text-white'
              : 'bg-heritage-paper text-heritage-ink dark:bg-heritage-dark-paper dark:text-heritage-dark-ink'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Bản Văn Số Hóa</span>
        </button>
        <button
          type="button"
          onClick={() => setMobileTab('SCAN')}
          className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold uppercase tracking-wider ${
            mobileTab === 'SCAN'
              ? 'bg-caodai-vermilion text-white'
              : 'bg-heritage-paper text-heritage-ink dark:bg-heritage-dark-paper dark:text-heritage-dark-ink'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Bản Scan Gốc</span>
        </button>
      </div>

      {/* Không Gian Đọc Song Song (Mục lục + Bản văn + Bản Scan PDF) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* 1. Cột Mục Lục */}
        {showToc && (
          <aside className="lg:col-span-3">
            <div className="border border-heritage-border bg-heritage-paper p-4 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
              <div className="flex items-center justify-between gap-2 border-b border-heritage-border pb-2.5 dark:border-heritage-dark-border">
                <h2 className="font-serif text-sm font-bold uppercase tracking-wider text-heritage-ink dark:text-heritage-dark-ink">
                  Mục Lục Ấn Bản
                </h2>
                <button
                  type="button"
                  onClick={() => setMobileTocOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1 border border-heritage-border bg-heritage-parchment/70 px-2 py-1 text-[11px] font-semibold text-heritage-ink hover:border-caodai-ochre lg:hidden dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-heritage-dark-ink"
                  aria-expanded={mobileTocOpen}
                >
                  {mobileTocOpen ? (
                    <>
                      <span>Thu gọn</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>Mở rộng</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
              <nav
                className={`${
                  mobileTocOpen ? 'block' : 'hidden lg:block'
                } mt-3 max-h-[650px] space-y-0.5 overflow-y-auto pr-1`}
              >
                {sections.map((sec) => {
                  const isActive = sec.id === activeSectionId;
                  const parent = sec.parentId ? sections.find((s) => s.id === sec.parentId) : null;
                  const depth = !sec.parentId ? 0 : !parent?.parentId ? 1 : 2;
                  const hasChildren = sections.some((s) => s.parentId === sec.id);

                  const indentClass =
                    depth === 0
                      ? 'mt-2 bg-heritage-parchment/60 font-bold uppercase tracking-wide text-caodai-ochre dark:bg-heritage-dark-surface/60 dark:text-caodai-yellow'
                      : depth === 1
                        ? hasChildren
                          ? 'mt-1.5 pl-3 font-bold text-heritage-wood dark:text-heritage-dark-ink'
                          : 'pl-3 font-medium'
                        : 'pl-6 font-normal';

                  return (
                    <button
                      key={sec.id}
                      type="button"
                      onClick={() => setActiveSectionId(sec.id)}
                      className={`flex w-full items-start justify-between gap-2 px-2.5 py-1.5 text-left text-xs transition-colors ${indentClass} ${
                        isActive
                          ? 'bg-heritage-parchment text-caodai-vermilion dark:bg-heritage-dark-surface dark:text-caodai-yellow'
                          : 'text-heritage-ink hover:bg-heritage-parchment/50 dark:text-heritage-dark-ink dark:hover:bg-heritage-dark-surface/50'
                      }`}
                    >
                      <span className="leading-snug">{sec.title}</span>
                      {sec.printedPageLabel && (
                        <span className="shrink-0 text-[11px] text-heritage-muted dark:text-heritage-dark-muted">
                          tr.{sec.printedPageLabel}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}

        {/* 2. Khung Bản Văn Điện Tử */}
        <section
          className={`${mobileTab === 'TEXT' ? 'block' : 'hidden lg:block'} ${
            showToc && showScan
              ? 'lg:col-span-5'
              : showToc || showScan
                ? 'lg:col-span-9'
                : 'lg:col-span-12'
          }`}
        >
          <div className="border border-heritage-border bg-heritage-paper p-6 sm:p-8 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
            {activeSectionDetail ? (
              <>
                <div className="border-b border-heritage-border pb-4 dark:border-heritage-dark-border">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
                      {activeSectionDetail.tuneType || 'Văn bản nguyên tác'}
                    </span>
                    <div className="flex items-center gap-2">
                      {activeSectionDetail.printedPageLabel && (
                        <span className="border border-heritage-border bg-heritage-parchment/70 px-2.5 py-0.5 text-xs font-medium text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-heritage-dark-muted">
                          Trang in {activeSectionDetail.printedPageLabel}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setIsFullscreen(true)}
                        className="inline-flex items-center gap-1 border border-heritage-border bg-heritage-parchment/70 px-2.5 py-0.5 text-xs font-semibold text-caodai-vermilion hover:border-caodai-vermilion dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-caodai-yellow"
                        title="Xem toàn màn hình"
                      >
                        <Maximize2 className="h-3 w-3" />
                        <span>Toàn màn hình</span>
                      </button>
                    </div>
                  </div>

                  <h2 className="mt-2 font-serif text-2xl font-bold text-heritage-ink dark:text-heritage-dark-ink">
                    {activeSectionDetail.title}
                  </h2>

                  {/* Thẻ Nghi thức / Mục đích / Thời điểm */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeSectionDetail.ritualTags?.map((t) => (
                      <span
                        key={t}
                        className="border border-heritage-border px-2 py-0.5 text-[11px] text-heritage-muted dark:border-heritage-dark-border dark:text-heritage-dark-muted"
                      >
                        Nghi thức: {t}
                      </span>
                    ))}
                    {activeSectionDetail.timingTags?.map((t) => (
                      <span
                        key={t}
                        className="border border-heritage-border px-2 py-0.5 text-[11px] text-heritage-muted dark:border-heritage-dark-border dark:text-heritage-dark-muted"
                      >
                        Thời điểm: {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Thanh hướng dẫn khi đang bật chế độ Tùy chỉnh đánh chuông */}
                {isEditingBells && (
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border border-caodai-ochre/60 bg-heritage-parchment/70 px-4 py-3 text-xs dark:border-caodai-yellow/60 dark:bg-heritage-dark-surface">
                    <div className="flex items-center gap-2 text-heritage-ink dark:text-heritage-dark-ink">
                      <BellMalletIcon className="h-4 w-4 shrink-0 text-caodai-vermilion dark:text-caodai-yellow" />
                      <span>
                        <strong>Chế độ tùy chỉnh:</strong> Nhấp vào từng câu kinh bên dưới để bật/tắt icon chuông & chày (tự động lưu).
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {DEFAULT_BELL_MARKERS[activeSectionSlug] && (
                        <button
                          type="button"
                          onClick={handleResetSectionBells}
                          className="inline-flex items-center gap-1 border border-heritage-border bg-heritage-paper px-2.5 py-1 text-[11px] font-semibold text-heritage-ink hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Khôi phục mẫu</span>
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleClearSectionBells}
                        className="border border-heritage-border bg-heritage-paper px-2.5 py-1 text-[11px] font-semibold text-heritage-muted hover:border-caodai-vermilion hover:text-caodai-vermilion dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-muted"
                      >
                        Xóa hết
                      </button>
                      <button
                        type="button"
                        onClick={handleCopyBellConfig}
                        className="inline-flex items-center gap-1 border border-caodai-ochre bg-heritage-paper px-2.5 py-1 text-[11px] font-semibold text-caodai-ochre hover:bg-caodai-ochre hover:text-white dark:border-caodai-yellow dark:bg-heritage-dark-paper dark:text-caodai-yellow"
                        title="Sao chép toàn bộ cấu hình đánh chuông để gửi cập nhật lên trang web"
                      >
                        {copiedBells ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Sao chép dữ liệu chuông</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingBells(false)}
                        className="bg-caodai-vermilion px-3 py-1 text-[11px] font-bold text-white hover:bg-caodai-vermilion/90"
                      >
                        Xong
                      </button>
                    </div>
                  </div>
                )}

                {/* Nội dung bài kinh */}
                <div className="py-6">
                  {activeSectionDetail.content?.contentMarkdown ? (
                    renderScriptureMarkdown(
                      activeSectionDetail.content.contentMarkdown,
                      FONT_SIZES[fontSizeIdx]?.textClass ?? 'text-base leading-loose',
                      {
                        showBells,
                        isEditing: isEditingBells,
                        bellLines: activeBellLines,
                        inlineBellPhrases: INLINE_BELL_PHRASES[activeSectionSlug],
                        onToggleLine: handleToggleBellLine,
                      },
                    )
                  ) : (
                    <div className="border border-heritage-border bg-heritage-parchment/40 p-5 text-sm leading-relaxed text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-surface/40 dark:text-heritage-dark-muted">
                      <p>
                        Văn bản số hóa cho mục này đang được tiếp tục đối chiếu và cập nhật.
                      </p>
                      <p className="mt-2">
                        Quý vị có thể xem trực tiếp nguyên bản tại khung{' '}
                        <strong className="text-heritage-ink dark:text-heritage-dark-ink">
                          Bản Scan Gốc Đối Chiếu
                        </strong>{' '}
                        (PDF trang {activePdfPage}
                        {activeSectionDetail.printedPageLabel
                          ? ` — Trang sách in ${activeSectionDetail.printedPageLabel}`
                          : ''}
                        ).
                      </p>
                    </div>
                  )}
                </div>

                {activeSectionDetail.content?.editorialNote && (
                  <div className="mb-6 border-l-2 border-caodai-ochre bg-heritage-parchment/40 px-4 py-2.5 text-xs text-heritage-muted dark:border-caodai-yellow dark:bg-heritage-dark-surface/40 dark:text-heritage-dark-muted">
                    <strong>Ghi chú đối chiếu:</strong> {activeSectionDetail.content.editorialNote}
                  </div>
                )}

                {/* Trích dẫn nguồn */}
                <div className="border-t border-heritage-border pt-4 dark:border-heritage-dark-border">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
                      Trích dẫn nguồn đối chiếu
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCitation}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-caodai-ochre hover:underline dark:text-caodai-yellow"
                    >
                      {copiedCitation ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Đã sao chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Sao chép trích dẫn</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs italic text-heritage-muted dark:text-heritage-dark-muted">
                    {citationText}
                  </p>
                </div>

                {/* Điều hướng Bài trước / Bài sau */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-heritage-border pt-4 dark:border-heritage-dark-border">
                  <button
                    type="button"
                    disabled={!prevSection}
                    onClick={() => prevSection && setActiveSectionId(prevSection.id)}
                    className="inline-flex items-center gap-1.5 border border-heritage-border px-3 py-2 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre disabled:opacity-40 min-w-0 dark:border-heritage-dark-border dark:text-heritage-dark-ink"
                  >
                    <ChevronLeft className="h-4 w-4 shrink-0 text-caodai-ochre dark:text-caodai-yellow" />
                    <span className="truncate">
                      {prevSection ? getCleanSectionTitle(prevSection.title) : 'Đầu sách'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!nextSection}
                    onClick={() => nextSection && setActiveSectionId(nextSection.id)}
                    className="inline-flex items-center justify-end gap-1.5 border border-heritage-border px-3 py-2 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre disabled:opacity-40 min-w-0 text-right dark:border-heritage-dark-border dark:text-heritage-dark-ink"
                  >
                    <span className="truncate">
                      {nextSection ? getCleanSectionTitle(nextSection.title) : 'Cuối sách'}
                    </span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-caodai-ochre dark:text-caodai-yellow" />
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-heritage-muted">Vui lòng chọn một bài kinh từ mục lục.</p>
            )}
          </div>
        </section>

        {/* 3. Khung Bản Scan PDF Gốc Đối Chiếu */}
        {showScan && (
          <aside
            className={`${mobileTab === 'SCAN' ? 'block' : 'hidden lg:block'} ${
              showToc ? 'lg:col-span-4' : 'lg:col-span-6'
            }`}
          >
            <div className="border border-heritage-border bg-heritage-paper dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
              <div className="flex items-center justify-between border-b border-heritage-border bg-heritage-parchment/60 px-4 py-3 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/60">
                <div>
                  <h3 className="font-serif text-sm font-bold text-heritage-ink dark:text-heritage-dark-ink">
                    Bản Scan Gốc Đối Chiếu
                  </h3>
                  <p className="text-[11px] text-heritage-muted dark:text-heritage-dark-muted">
                    Đang mở PDF trang {activePdfPage}
                    {activeSectionDetail?.printedPageLabel
                      ? ` (Trang sách in ${activeSectionDetail.printedPageLabel})`
                      : ''}
                  </p>
                </div>
                {pdfUrlWithPage && (
                  <a
                    href={pdfUrlWithPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-caodai-ochre hover:underline dark:text-caodai-yellow"
                  >
                    Phóng to ↗
                  </a>
                )}
              </div>

              {pdfUrlWithPage ? (
                <iframe
                  key={pdfUrlWithPage}
                  src={pdfUrlWithPage}
                  title={`Bản scan gốc trang ${activePdfPage}`}
                  className="h-[680px] w-full border-0 bg-neutral-100 dark:bg-neutral-900"
                />
              ) : (
                <div className="flex h-[400px] flex-col items-center justify-center p-6 text-center text-sm text-heritage-muted dark:text-heritage-dark-muted">
                  <FileText className="mb-2 h-8 w-8 opacity-50" />
                  <p>Ấn bản này chưa đính kèm tệp PDF scan gốc.</p>
                </div>
              )}
            </div>
          </aside>
        )}
      </div>

      {/* Chế độ Đọc Toàn Màn Hình (Focus Mode): Chỉ hiển thị thuần nội dung bài kinh */}
      {isFullscreen && activeSectionDetail && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Đọc toàn màn hình: ${activeSectionDetail.title}`}
          className="fixed inset-0 z-50 flex flex-col bg-heritage-paper dark:bg-heritage-dark-paper"
        >
          {/* Thanh điều khiển trên cùng (Tối ưu gọn gàng cho điện thoại, giữ lại các nút thao tác) */}
          <header className="flex items-center justify-end border-b border-heritage-border bg-heritage-parchment/80 px-3 py-2 sm:px-6 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/90">
            <div className="flex items-center justify-end gap-2 w-full">
              {/* Chỉnh cỡ chữ ngay trong toàn màn hình */}
              <div className="flex items-center border border-heritage-border bg-heritage-paper dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
                <button
                  type="button"
                  onClick={() => setFontSizeIdx((prev) => Math.max(0, prev - 1))}
                  disabled={fontSizeIdx === 0}
                  className="px-2 py-1 text-xs text-heritage-ink disabled:opacity-40 dark:text-heritage-dark-ink"
                  title="Giảm cỡ chữ"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="border-x border-heritage-border px-2 py-1 text-xs font-medium text-heritage-muted dark:border-heritage-dark-border dark:text-heritage-dark-muted">
                  {FONT_SIZES[fontSizeIdx]?.label}
                </span>
                <button
                  type="button"
                  onClick={() => setFontSizeIdx((prev) => Math.min(FONT_SIZES.length - 1, prev + 1))}
                  disabled={fontSizeIdx === FONT_SIZES.length - 1}
                  className="px-2 py-1 text-xs text-heritage-ink disabled:opacity-40 dark:text-heritage-dark-ink"
                  title="Tăng cỡ chữ"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setShowBells((prev) => !prev)}
                aria-pressed={showBells}
                className={`inline-flex items-center gap-1.5 border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  showBells
                    ? 'border-caodai-ochre bg-heritage-paper text-caodai-vermilion dark:border-caodai-yellow dark:bg-heritage-dark-paper dark:text-caodai-yellow'
                    : 'border-heritage-border bg-heritage-paper text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-muted'
                }`}
                title="Bật/tắt biểu tượng đánh chuông"
              >
                <BellMalletIcon className="h-3.5 w-3.5" active={showBells} />
                <span className="hidden xs:inline sm:inline">{showBells ? 'Chuông: Bật' : 'Chuông: Tắt'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-1.5 border border-heritage-border bg-heritage-paper px-2.5 py-1 text-xs font-bold text-heritage-ink hover:border-caodai-vermilion hover:text-caodai-vermilion dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink shrink-0"
                title="Thu gọn (Esc)"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Thu gọn (Esc)</span>
                <span className="sm:hidden">Thu gọn</span>
              </button>
            </div>
          </header>

          {/* Khung nội dung tập trung ở giữa: chỉ phần nội dung kinh */}
          <div ref={fullscreenContentRef} className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 sm:py-12">
            <article className="mx-auto max-w-3xl border border-heritage-border bg-heritage-paper p-6 sm:p-10 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
              <div className="border-b border-heritage-border pb-4 dark:border-heritage-dark-border">
                {activeSectionDetail.tuneType && (
                  <span className="text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
                    {activeSectionDetail.tuneType}
                  </span>
                )}
                <h1 className="mt-1 font-serif text-2xl font-bold text-heritage-ink sm:text-3xl dark:text-heritage-dark-ink">
                  {activeSectionDetail.title}
                </h1>
              </div>

              <div className="py-6">
                {activeSectionDetail.content?.contentMarkdown ? (
                  renderScriptureMarkdown(
                    extractScriptureBodyOnly(activeSectionDetail.content.contentMarkdown),
                    FONT_SIZES[fontSizeIdx]?.textClass ?? 'text-base leading-loose',
                    {
                      showBells,
                      isEditing: false,
                      bellLines: activeBellLines,
                      inlineBellPhrases: INLINE_BELL_PHRASES[activeSectionSlug],
                    },
                  )
                ) : (
                  <p className="text-sm text-heritage-muted dark:text-heritage-dark-muted">
                    Mục này là tiêu đề nhóm hoặc đang được tiếp tục đối chiếu bản scan gốc (PDF trang {activePdfPage}).
                  </p>
                )}
              </div>
            </article>
          </div>

          {/* Thanh điều hướng dưới cùng: Hiển thị rõ Bài trước và Bài kế tiếp, bố cục 2 cột cố định chống vỡ dòng */}
          <footer className="border-t border-heritage-border bg-heritage-parchment/80 px-3 py-2.5 sm:px-6 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/90">
            <div className="mx-auto grid grid-cols-2 max-w-4xl gap-2 sm:gap-4">
              <button
                type="button"
                disabled={!prevReadableSection}
                onClick={() => prevReadableSection && setActiveSectionId(prevReadableSection.id)}
                className="flex items-center gap-2 border border-heritage-border bg-heritage-paper px-2.5 py-2 text-left text-xs font-semibold text-heritage-ink transition-colors hover:border-caodai-ochre disabled:opacity-40 min-w-0 dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink"
              >
                <ChevronLeft className="h-4 w-4 shrink-0 text-caodai-ochre dark:text-caodai-yellow" />
                <div className="min-w-0 flex-1">
                  <span className="block text-[10px] font-medium uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
                    Bài trước
                  </span>
                  <span className="block truncate text-xs font-semibold">
                    {prevReadableSection ? getCleanSectionTitle(prevReadableSection.title) : 'Đầu sách'}
                  </span>
                </div>
              </button>

              <button
                type="button"
                disabled={!nextReadableSection}
                onClick={() => nextReadableSection && setActiveSectionId(nextReadableSection.id)}
                className="flex items-center justify-end gap-2 border border-caodai-vermilion bg-caodai-vermilion px-2.5 py-2 text-right text-xs font-semibold text-white transition-colors hover:bg-caodai-vermilion/90 disabled:border-heritage-border disabled:bg-heritage-paper disabled:text-heritage-muted disabled:opacity-50 min-w-0 dark:disabled:border-heritage-dark-border dark:disabled:bg-heritage-dark-paper"
              >
                <div className="min-w-0 flex-1 text-right">
                  <span className="block text-[10px] font-medium uppercase tracking-wider opacity-85">
                    Bài kế tiếp
                  </span>
                  <span className="block truncate text-xs font-bold">
                    {nextReadableSection ? getCleanSectionTitle(nextReadableSection.title) : 'Cuối sách'}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}
