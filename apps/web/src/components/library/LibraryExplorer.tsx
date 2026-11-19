'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  FileText,
  Filter,
  Search,
  Sparkles,
  Tag,
  X,
} from 'lucide-react';
import {
  FALLBACK_CATEGORIES,
  FALLBACK_DOCUMENTS,
  LibraryCategory,
  LibraryDocument,
} from '@/lib/library-data';

export function LibraryExplorer() {
  const [categories, setCategories] = useState<LibraryCategory[]>(FALLBACK_CATEGORIES);
  const [documents, setDocuments] = useState<LibraryDocument[]>(FALLBACK_DOCUMENTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTag, setSelectedTag] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    let cancelled = false;

    async function fetchLibraryData() {
      setLoading(true);
      try {
        const [catRes, docRes] = await Promise.all([
          fetch(`${apiBase}/library/categories`),
          fetch(`${apiBase}/library/documents?limit=50`),
        ]);

        if (!cancelled && catRes.ok) {
          const catJson = (await catRes.json()) as LibraryCategory[];
          if (Array.isArray(catJson) && catJson.length > 0) {
            setCategories(catJson);
          }
        }

        if (!cancelled && docRes.ok) {
          const docJson = (await docRes.json()) as { items?: LibraryDocument[] };
          if (Array.isArray(docJson.items) && docJson.items.length > 0) {
            setDocuments(docJson.items);
          }
        }
      } catch {
        // Giữ nguyên dữ liệu dự phòng chuẩn khi API chưa chạy
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchLibraryData();
    return () => {
      cancelled = true;
    };
  }, []);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    documents.forEach((doc) => {
      doc.ritualTags?.forEach((t) => tagSet.add(t));
      doc.purposeTags?.forEach((t) => tagSet.add(t));
    });
    return Array.from(tagSet);
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return documents.filter((doc) => {
      if (selectedCategory !== 'ALL' && doc.category?.slug !== selectedCategory) {
        return false;
      }
      if (selectedTag !== 'ALL') {
        const hasTag =
          doc.ritualTags?.includes(selectedTag) ||
          doc.purposeTags?.includes(selectedTag) ||
          doc.timingTags?.includes(selectedTag);
        if (!hasTag) return false;
      }
      if (q !== '') {
        const inTitle = doc.title.toLowerCase().includes(q);
        const inSummary = doc.summary?.toLowerCase().includes(q) ?? false;
        const inAuthor = doc.authorOrIssuingBody?.toLowerCase().includes(q) ?? false;
        const inTags =
          doc.ritualTags?.some((t) => t.toLowerCase().includes(q)) ||
          doc.purposeTags?.some((t) => t.toLowerCase().includes(q)) ||
          doc.timingTags?.some((t) => t.toLowerCase().includes(q));
        const inSections =
          doc.editions?.some((ed) =>
            ed.sections?.some(
              (sec) =>
                sec.title.toLowerCase().includes(q) ||
                sec.content?.plainText?.toLowerCase().includes(q),
            ),
          ) ?? false;
        if (!inTitle && !inSummary && !inAuthor && !inTags && !inSections) {
          return false;
        }
      }
      return true;
    });
  }, [documents, selectedCategory, selectedTag, searchQuery]);

  const clearFilters = () => {
    setSelectedCategory('ALL');
    setSelectedTag('ALL');
    setSearchQuery('');
  };

  return (
    <div className="space-y-8">
      {/* Thanh Tìm Kiếm Toàn Văn */}
      <div className="border border-heritage-border bg-heritage-paper p-5 sm:p-6 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-heritage-muted dark:text-heritage-dark-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm tên bộ kinh, bài kinh (vd: Niệm Hương, Khai Kinh, Giải Khổ, Cầu An)..."
              className="w-full border border-heritage-border bg-heritage-parchment/50 py-2.5 pl-10 pr-10 text-sm text-heritage-ink placeholder:text-heritage-muted focus:border-caodai-ochre focus:outline-none dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-heritage-dark-ink dark:placeholder:text-heritage-dark-muted"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-heritage-muted hover:text-heritage-ink dark:text-heritage-dark-muted"
                aria-label="Xóa từ khóa"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {(selectedCategory !== 'ALL' || selectedTag !== 'ALL' || searchQuery !== '') && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1.5 border border-heritage-border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-heritage-ink hover:border-caodai-vermilion hover:text-caodai-vermilion dark:border-heritage-dark-border dark:text-heritage-dark-ink"
            >
              <X className="h-3.5 w-3.5" />
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Lọc theo thẻ Nghi thức & Mục đích */}
        {allTags.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-heritage-border/60 pt-4 dark:border-heritage-dark-border/60">
            <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
              <Tag className="h-3.5 w-3.5 text-caodai-ochre dark:text-caodai-yellow" />
              Nghi thức & Mục đích:
            </span>
            <button
              type="button"
              onClick={() => setSelectedTag('ALL')}
              className={`border px-2.5 py-1 text-xs font-medium transition-colors ${
                selectedTag === 'ALL'
                  ? 'border-caodai-ochre bg-caodai-ochre text-white dark:border-caodai-yellow dark:bg-caodai-yellow dark:text-heritage-dark-paper'
                  : 'border-heritage-border bg-heritage-parchment/40 text-heritage-muted hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-surface/40 dark:text-heritage-dark-muted'
              }`}
            >
              Tất cả
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`border px-2.5 py-1 text-xs font-medium transition-colors ${
                  selectedTag === tag
                    ? 'border-caodai-ochre bg-caodai-ochre text-white dark:border-caodai-yellow dark:bg-caodai-yellow dark:text-heritage-dark-paper'
                    : 'border-heritage-border bg-heritage-parchment/40 text-heritage-muted hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-surface/40 dark:text-heritage-dark-muted'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bố cục chính: Cột Danh Mục (Trái) + Danh Sách Tác Phẩm (Phải) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cột 9 Danh mục chuẩn */}
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="border border-heritage-border bg-heritage-paper p-5 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
            <div className="mb-3 flex items-center gap-2 border-b border-heritage-border pb-3 dark:border-heritage-dark-border">
              <Filter className="h-4 w-4 text-caodai-ochre dark:text-caodai-yellow" />
              <h2 className="font-serif text-base font-bold text-heritage-ink dark:text-heritage-dark-ink">
                Danh Mục Thư Viện
              </h2>
            </div>

            <nav className="space-y-1" aria-label="Danh mục kinh sách">
              <button
                type="button"
                onClick={() => setSelectedCategory('ALL')}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                  selectedCategory === 'ALL'
                    ? 'bg-heritage-parchment font-semibold text-caodai-vermilion dark:bg-heritage-dark-surface dark:text-caodai-yellow'
                    : 'text-heritage-ink hover:bg-heritage-parchment/50 dark:text-heritage-dark-ink dark:hover:bg-heritage-dark-surface/50'
                }`}
              >
                <span>Tất cả chuyên mục</span>
                <span className="text-xs text-heritage-muted dark:text-heritage-dark-muted">
                  {documents.length}
                </span>
              </button>

              {categories.map((cat) => {
                const isActive = selectedCategory === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? 'bg-heritage-parchment font-semibold text-caodai-vermilion dark:bg-heritage-dark-surface dark:text-caodai-yellow'
                        : 'text-heritage-ink hover:bg-heritage-parchment/50 dark:text-heritage-dark-ink dark:hover:bg-heritage-dark-surface/50'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    <span className="shrink-0 text-xs text-heritage-muted dark:text-heritage-dark-muted">
                      {cat.publishedDocumentCount}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Danh sách Tác Phẩm */}
        <div className="lg:col-span-8 xl:col-span-9">
          {loading ? (
            <div className="border border-heritage-border bg-heritage-paper p-8 text-center text-sm text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-muted">
              Đang tải danh mục tư liệu...
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="border border-heritage-border bg-heritage-paper p-10 text-center dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-caodai-ochre/60 dark:text-caodai-yellow/60" />
              <h3 className="font-serif text-lg font-semibold text-heritage-ink dark:text-heritage-dark-ink">
                Chưa có tư liệu phù hợp
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-heritage-muted dark:text-heritage-dark-muted">
                {searchQuery
                  ? `Không tìm thấy tác phẩm hoặc bài kinh nào khớp với từ khóa "${searchQuery}".`
                  : 'Chuyên mục này đang được Ban Biên Tập tiếp tục sưu tầm, số hóa và đối chiếu từ bản scan gốc.'}
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 border border-caodai-ochre px-4 py-2 text-xs font-semibold uppercase tracking-wider text-caodai-ochre hover:bg-caodai-ochre hover:text-white dark:border-caodai-yellow dark:text-caodai-yellow"
              >
                Xem tất cả tác phẩm hiện có
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredDocuments.map((doc) => {
                const latestEdition = doc.editions?.[0];
                return (
                  <article
                    key={doc.slug}
                    className="border border-heritage-border bg-heritage-paper p-6 transition-colors hover:border-caodai-ochre dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:hover:border-caodai-yellow"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
                        <Sparkles className="h-3.5 w-3.5" />
                        {doc.category?.name}
                      </span>
                      {latestEdition?.publicationYear && (
                        <span className="text-xs font-medium text-heritage-muted dark:text-heritage-dark-muted">
                          Ấn bản năm {latestEdition.publicationYear}
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 font-serif text-xl font-bold text-heritage-ink sm:text-2xl dark:text-heritage-dark-ink">
                      <Link
                        href={`/library/${doc.slug}`}
                        className="hover:text-caodai-vermilion dark:hover:text-caodai-yellow"
                      >
                        {doc.title}
                      </Link>
                    </h3>

                    {doc.authorOrIssuingBody && (
                      <p className="mt-1 text-xs font-medium text-heritage-muted dark:text-heritage-dark-muted">
                        Ban hành: {doc.authorOrIssuingBody}
                      </p>
                    )}

                    {doc.summary && (
                      <p className="mt-3 text-sm leading-relaxed text-heritage-ink/90 dark:text-heritage-dark-ink/90">
                        {doc.summary}
                      </p>
                    )}

                    {/* Các thẻ phân loại nghi thức & mục đích */}
                    {(doc.ritualTags?.length > 0 || doc.timingTags?.length > 0) && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {doc.ritualTags?.map((tag) => (
                          <span
                            key={tag}
                            className="border border-heritage-border bg-heritage-parchment/60 px-2 py-0.5 text-xs text-heritage-muted dark:border-heritage-dark-border dark:bg-heritage-dark-surface dark:text-heritage-dark-muted"
                          >
                            {tag}
                          </span>
                        ))}
                        {doc.timingTags?.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="border border-heritage-border/70 px-2 py-0.5 text-xs text-heritage-muted dark:border-heritage-dark-border dark:text-heritage-dark-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-heritage-border/70 pt-4 dark:border-heritage-dark-border/70">
                      <div className="flex items-center gap-2 text-xs text-heritage-muted dark:text-heritage-dark-muted">
                        <FileText className="h-4 w-4 text-caodai-ochre dark:text-caodai-yellow" />
                        <span>
                          {latestEdition?.editionLabel || `${doc.editions?.length || 1} ấn bản`}
                        </span>
                      </div>

                      <Link
                        href={`/library/${doc.slug}`}
                        className="inline-flex items-center gap-1.5 bg-caodai-vermilion px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-caodai-vermilion/90"
                      >
                        <span>Đọc & Đối chiếu bản gốc</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
