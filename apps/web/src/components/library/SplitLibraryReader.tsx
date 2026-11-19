'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Info,
  List,
  Minus,
  Plus,
} from 'lucide-react';
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

const FONT_SIZES = [
  { label: 'Nhỏ', textClass: 'text-sm leading-relaxed' },
  { label: 'Vừa', textClass: 'text-base leading-loose' },
  { label: 'Lớn', textClass: 'text-lg leading-loose' },
  { label: 'Rất lớn', textClass: 'text-xl leading-loose' },
];

function renderScriptureMarkdown(markdown: string, textClass: string) {
  const lines = markdown.split('\n');
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
        return <p key={idx}>{renderInlineFormatting(line)}</p>;
      })}
    </div>
  );
}

function renderInlineFormatting(text: string): React.ReactNode {
  // Xử lý đơn giản **bold**, *(italic)* và <u>underline</u> giữ nguyên văn bản gốc
  const parts = text.split(/(\*\*.*?\*\*|\*[^*]+?\*|<u>.*?<\/u>)/g);
  return parts.map((part, idx) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={idx} className="font-bold text-heritage-wood dark:text-heritage-dark-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={idx} className="italic text-heritage-muted dark:text-heritage-dark-muted">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('<u>') && part.endsWith('</u>')) {
      return (
        <span key={idx} className="underline underline-offset-4">
          {part.slice(3, -4)}
        </span>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
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
  const [showScan, setShowScan] = useState<boolean>(true);
  const [showEditionInfo, setShowEditionInfo] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'TEXT' | 'SCAN'>('TEXT');
  const [fontSizeIdx, setFontSizeIdx] = useState<number>(1);
  const [copiedCitation, setCopiedCitation] = useState<boolean>(false);

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
        </div>

        <div className="flex flex-wrap items-center gap-2">
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
              <h2 className="border-b border-heritage-border pb-2.5 font-serif text-sm font-bold uppercase tracking-wider text-heritage-ink dark:border-heritage-dark-border dark:text-heritage-dark-ink">
                Mục Lục Ấn Bản
              </h2>
              <nav className="mt-3 max-h-[650px] space-y-0.5 overflow-y-auto pr-1">
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
                    {activeSectionDetail.printedPageLabel && (
                      <span className="border border-heritage-border bg-heritage-parchment/70 px-2.5 py-0.5 text-xs font-medium text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-heritage-dark-muted">
                        Trang in {activeSectionDetail.printedPageLabel}
                      </span>
                    )}
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

                {/* Nội dung bài kinh */}
                <div className="py-6">
                  {activeSectionDetail.content?.contentMarkdown ? (
                    renderScriptureMarkdown(
                      activeSectionDetail.content.contentMarkdown,
                      FONT_SIZES[fontSizeIdx]?.textClass ?? 'text-base leading-loose',
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
                <div className="mt-6 flex items-center justify-between gap-3 border-t border-heritage-border pt-4 dark:border-heritage-dark-border">
                  <button
                    type="button"
                    disabled={!prevSection}
                    onClick={() => prevSection && setActiveSectionId(prevSection.id)}
                    className="inline-flex items-center gap-1.5 border border-heritage-border px-3 py-2 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre disabled:opacity-40 dark:border-heritage-dark-border dark:text-heritage-dark-ink"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="max-w-[140px] truncate">
                      {prevSection ? prevSection.title : 'Đầu sách'}
                    </span>
                  </button>

                  <button
                    type="button"
                    disabled={!nextSection}
                    onClick={() => nextSection && setActiveSectionId(nextSection.id)}
                    className="inline-flex items-center gap-1.5 border border-heritage-border px-3 py-2 text-xs font-semibold text-heritage-ink hover:border-caodai-ochre disabled:opacity-40 dark:border-heritage-dark-border dark:text-heritage-dark-ink"
                  >
                    <span className="max-w-[140px] truncate">
                      {nextSection ? nextSection.title : 'Cuối sách'}
                    </span>
                    <ChevronRight className="h-4 w-4" />
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
    </div>
  );
}
