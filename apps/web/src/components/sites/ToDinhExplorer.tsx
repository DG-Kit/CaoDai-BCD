'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Building2,
  Camera,
  Compass,
  ExternalLink,
  History,
  Landmark,
  MapPin,
} from 'lucide-react';
import {
  CompactSiteItem,
  FALLBACK_COMPACT_SITES,
  FALLBACK_FEATURED_SITES,
  FeaturedSiteItem,
  SiteSectionType,
} from '../../lib/sites-data';

const SECTION_TABS: Array<{
  type: SiteSectionType;
  label: string;
  icon: React.ElementType;
}> = [
  { type: 'HISTORY', label: 'Lịch sử', icon: History },
  { type: 'ARCHITECTURE', label: 'Xây dựng & Kiến trúc', icon: Building2 },
  { type: 'DIRECTIONS', label: 'Đường đi đến', icon: Compass },
];

export function ToDinhExplorer() {
  const [featuredSites, setFeaturedSites] = useState<FeaturedSiteItem[]>(FALLBACK_FEATURED_SITES);
  const [compactSites, setCompactSites] = useState<CompactSiteItem[]>(FALLBACK_COMPACT_SITES);
  const [activeSlug, setActiveSlug] = useState<string>(
    FALLBACK_FEATURED_SITES[0]?.slug ?? 'toa-thanh-ben-tre',
  );
  const [activeSection, setActiveSection] = useState<SiteSectionType>('HISTORY');
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
    let cancelled = false;

    async function loadSites() {
      try {
        const [featRes, compRes] = await Promise.all([
          fetch(`${apiBase}/sites/featured`),
          fetch(`${apiBase}/sites/compact`),
        ]);

        if (!cancelled && featRes.ok) {
          const featJson = (await featRes.json()) as FeaturedSiteItem[];
          if (Array.isArray(featJson) && featJson.length > 0) {
            setFeaturedSites((prev) =>
              featJson.map((remote) => {
                const fallback = prev.find((f) => f.slug === remote.slug);
                return {
                  ...remote,
                  role: remote.role ?? fallback?.role ?? 'Công trình tôn giáo',
                  imageUrl: remote.imageUrl ?? fallback?.imageUrl ?? `/images/${remote.slug}.jpg`,
                  imageCaption: remote.imageCaption ?? fallback?.imageCaption ?? remote.name,
                  gallery: remote.gallery ?? fallback?.gallery,
                };
              }),
            );
          }
        }

        if (!cancelled && compRes.ok) {
          const compJson = (await compRes.json()) as CompactSiteItem[];
          if (Array.isArray(compJson) && compJson.length > 0) {
            setCompactSites(compJson);
          }
        }
      } catch {
        // Giữ nguyên dữ liệu dự phòng khi API chưa chạy
      }
    }

    loadSites();
    return () => {
      cancelled = true;
    };
  }, []);

  const currentSite = useMemo(
    () =>
      featuredSites.find((s) => s.slug === activeSlug) ??
      featuredSites[0] ??
      FALLBACK_FEATURED_SITES[0]!,
    [featuredSites, activeSlug],
  );

  const activeSections = useMemo(
    () => currentSite.sections.filter((sec) => sec.sectionType === activeSection),
    [currentSite, activeSection],
  );

  const provinces = useMemo(() => {
    const unique = Array.from(
      new Set(compactSites.map((s) => s.province).filter((p): p is string => Boolean(p))),
    );
    return ['ALL', ...unique];
  }, [compactSites]);

  const filteredCompactSites = useMemo(() => {
    if (selectedProvince === 'ALL') return compactSites;
    return compactSites.filter((s) => s.province === selectedProvince);
  }, [compactSites, selectedProvince]);

  const mapSearchQuery = encodeURIComponent(`${currentSite.name} Bến Tre Cao Đài Ban Chỉnh Đạo`);

  const gallery = useMemo(() => {
    if (currentSite.gallery && currentSite.gallery.length > 0) {
      return currentSite.gallery;
    }
    return [
      {
        url: currentSite.imageUrl || `/images/${currentSite.slug}.jpg`,
        caption: currentSite.imageCaption || currentSite.name,
      },
    ];
  }, [currentSite]);

  const currentGalleryItem = gallery[activeImageIndex] ?? gallery[0];
  const imageSrc = currentGalleryItem?.url ?? `/images/${currentSite.slug}.jpg`;
  const imageCaption = currentGalleryItem?.caption ?? currentSite.imageCaption;
  const hasImageError = Boolean(failedImages[imageSrc]);

  return (
    <div className="space-y-12">
      {/* 1. Danh sách 7 công trình trọng tâm tại Tòa Thánh Bến Tre */}
      <section aria-label="Danh sách các công trình tại Tòa Thánh Bến Tre">
        <div className="mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-caodai-ochre dark:text-caodai-yellow">
            Hội Thánh Cao Đài Ban Chỉnh Đạo
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold text-heritage-ink dark:text-heritage-dark-ink">
            Quần Thể 7 Công Trình Trọng Tâm
          </h2>
          <p className="mt-1 text-sm text-heritage-muted dark:text-heritage-dark-muted">
            Chọn một công trình bên dưới để tra cứu chi tiết về lịch sử, đặc điểm kiến trúc và hướng dẫn đường đi đến.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredSites.map((site, idx) => {
            const isActive = site.slug === currentSite.slug;
            return (
              <button
                key={site.slug}
                type="button"
                onClick={() => {
                  setActiveSlug(site.slug);
                  setActiveImageIndex(0);
                }}
                className={`group flex flex-col justify-between border p-4 text-left transition-colors ${
                  isActive
                    ? 'border-caodai-ochre bg-heritage-parchment dark:border-caodai-yellow dark:bg-heritage-dark-surface'
                    : 'border-heritage-border bg-heritage-paper hover:border-caodai-ochre/70 dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:hover:border-caodai-yellow/60'
                }`}
              >
                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs font-medium uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
                    <span>0{idx + 1}</span>
                    <Landmark
                      className={`h-4 w-4 ${
                        isActive
                          ? 'text-caodai-ochre dark:text-caodai-yellow'
                          : 'text-heritage-muted dark:text-heritage-dark-muted'
                      }`}
                    />
                  </div>
                  <h3 className="font-serif text-base font-semibold leading-snug text-heritage-ink dark:text-heritage-dark-ink">
                    {site.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-caodai-ochre dark:text-caodai-yellow">
                    {site.role}
                  </p>
                </div>
                <div className="mt-3.5 h-0.5 w-full bg-heritage-border/50 dark:bg-heritage-dark-border/50">
                  <div
                    className={`h-full transition-all ${
                      isActive ? 'w-full bg-caodai-ochre dark:bg-caodai-yellow' : 'w-0'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Khung nội dung chi tiết công trình đang chọn */}
        <div className="mt-6 border border-heritage-border bg-heritage-paper p-6 sm:p-8 dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
          <div className="grid grid-cols-1 gap-8 border-b border-heritage-border pb-8 lg:grid-cols-12 dark:border-heritage-dark-border">
            {/* Thông tin tiêu đề & địa chỉ */}
            <div className="lg:col-span-7">
              <span className="inline-block border border-caodai-ochre/40 bg-caodai-ochre/10 px-2.5 py-0.5 text-xs font-medium text-caodai-ochre dark:border-caodai-yellow/40 dark:bg-caodai-yellow/10 dark:text-caodai-yellow">
                {currentSite.role}
              </span>
              <h3 className="mt-2.5 font-serif text-2xl font-bold text-heritage-ink sm:text-3xl dark:text-heritage-dark-ink">
                {currentSite.name}
              </h3>

              {currentSite.otherNames.length > 0 && (
                <p className="mt-2 text-sm text-heritage-muted dark:text-heritage-dark-muted">
                  Tên gọi khác:{' '}
                  <span className="font-medium text-heritage-ink dark:text-heritage-dark-ink">
                    {currentSite.otherNames.join(' · ')}
                  </span>
                </p>
              )}

              <div className="mt-4 flex flex-col gap-2 text-sm text-heritage-muted dark:text-heritage-dark-muted">
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-caodai-ochre dark:text-caodai-yellow" />
                  <span>
                    <strong className="font-medium text-heritage-ink dark:text-heritage-dark-ink">
                      Địa chỉ hiện hành:
                    </strong>{' '}
                    {currentSite.currentAddress}
                  </span>
                </p>
                {currentSite.historicAddress && (
                  <p className="pl-6">
                    <strong className="font-medium text-heritage-ink dark:text-heritage-dark-ink">
                      Địa danh lịch sử:
                    </strong>{' '}
                    {currentSite.historicAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Khung hình ảnh công trình */}
            <div className="lg:col-span-5">
              <div className="border border-heritage-border bg-heritage-parchment/50 dark:border-heritage-dark-border dark:bg-heritage-dark-surface/40">
                {!hasImageError ? (
                  <img
                    src={imageSrc}
                    alt={imageCaption || currentSite.name}
                    onError={() =>
                      setFailedImages((prev) => ({
                        ...prev,
                        [imageSrc]: true,
                      }))
                    }
                    className="aspect-[16/10] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[16/10] w-full flex-col items-center justify-center px-6 text-center">
                    <Camera className="mb-2.5 h-7 w-7 text-caodai-ochre/70 dark:text-caodai-yellow/70" />
                    <p className="font-serif text-sm font-semibold text-heritage-ink dark:text-heritage-dark-ink">
                      Hình ảnh {currentSite.name}
                    </p>
                    <p className="mt-1 text-xs text-heritage-muted dark:text-heritage-dark-muted">
                      Đặt tệp ảnh tại{' '}
                      <code className="font-mono text-[11px]">public{imageSrc}</code>
                    </p>
                  </div>
                )}
              </div>

              {/* Gallery thumbnails nếu có nhiều góc ảnh */}
              {gallery.length > 1 && !hasImageError && (
                <div className="mt-2.5 flex items-center justify-center gap-2">
                  {gallery.map((item, idx) => (
                    <button
                      key={item.url}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-11 w-16 overflow-hidden border transition-all ${
                        idx === activeImageIndex
                          ? 'border-caodai-ochre ring-2 ring-caodai-ochre/60 dark:border-caodai-yellow dark:ring-caodai-yellow/60'
                          : 'border-heritage-border opacity-70 hover:opacity-100 dark:border-heritage-dark-border'
                      }`}
                      title={item.caption || `Ảnh ${idx + 1}`}
                    >
                      <img
                        src={item.url}
                        alt={item.caption || `Ảnh ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {imageCaption && !hasImageError && (
                <p className="mt-2 text-center text-xs italic text-heritage-muted dark:text-heritage-dark-muted">
                  {imageCaption}
                </p>
              )}
            </div>
          </div>

          {/* 3 Tab nội dung: Lịch sử / Xây dựng / Đường đi đến */}
          <div className="mt-6 flex flex-wrap border-b border-heritage-border dark:border-heritage-dark-border">
            {SECTION_TABS.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeSection === tab.type;
              return (
                <button
                  key={tab.type}
                  type="button"
                  onClick={() => setActiveSection(tab.type)}
                  className={`inline-flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                    isSelected
                      ? 'border-caodai-ochre text-caodai-ochre dark:border-caodai-yellow dark:text-caodai-yellow'
                      : 'border-transparent text-heritage-muted hover:text-heritage-ink dark:text-heritage-dark-muted dark:hover:text-heritage-dark-ink'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Nội dung từng mục */}
          <div className="mt-6 space-y-6">
            {activeSections.map((sec) => (
              <article key={sec.id} className="space-y-3">
                <h4 className="font-serif text-xl font-semibold text-heritage-ink dark:text-heritage-dark-ink">
                  {sec.title}
                </h4>

                <div className="whitespace-pre-line text-base leading-relaxed text-heritage-ink/90 dark:text-heritage-dark-ink/90">
                  {sec.contentMarkdown}
                </div>

                {sec.sourceCitation && (
                  <p className="border-l-2 border-caodai-ochre/60 pl-3 text-xs text-heritage-muted dark:border-caodai-yellow/60 dark:text-heritage-dark-muted">
                    Nguồn tham khảo: {sec.sourceCitation}
                  </p>
                )}
              </article>
            ))}

            {activeSection === 'DIRECTIONS' && (
              <div className="border-t border-heritage-border pt-5 dark:border-heritage-dark-border">
                {currentSite.directionsSummary && (
                  <p className="mb-4 text-sm leading-relaxed text-heritage-ink/90 dark:text-heritage-dark-ink/90">
                    <strong className="font-semibold">Tóm tắt chỉ đường:</strong>{' '}
                    {currentSite.directionsSummary}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapSearchQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-caodai-ochre bg-caodai-ochre/10 px-4 py-2 text-sm font-medium text-caodai-ochre transition-colors hover:bg-caodai-ochre hover:text-white dark:border-caodai-yellow dark:bg-caodai-yellow/10 dark:text-caodai-yellow dark:hover:bg-caodai-yellow dark:hover:text-heritage-dark-paper"
                >
                  <Compass className="h-4 w-4" />
                  Mở chỉ đường trên Google Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. Phân mục thu gọn: Danh mục Thánh Thất trực thuộc */}
      <section
        aria-label="Danh mục Thánh Thất thu gọn"
        className="border-t border-heritage-border pt-10 dark:border-heritage-dark-border"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-heritage-muted dark:text-heritage-dark-muted">
              Mục thu gọn
            </p>
            <h2 className="mt-1 font-serif text-xl font-bold text-heritage-ink dark:text-heritage-dark-ink">
              Một Số Thánh Thất Trực Thuộc Tiêu Biểu
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-heritage-muted dark:text-heritage-dark-muted">
              Để bảo đảm tính bảo mật và riêng tư cho các cơ sở địa phương, chuyên mục này chỉ giới thiệu tóm tắt tên gọi và địa bàn hành chính khái quát.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="province-filter"
              className="text-xs font-medium text-heritage-muted dark:text-heritage-dark-muted"
            >
              Địa bàn:
            </label>
            <select
              id="province-filter"
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="border border-heritage-border bg-heritage-paper px-3 py-1.5 text-sm text-heritage-ink focus:border-caodai-ochre focus:outline-none dark:border-heritage-dark-border dark:bg-heritage-dark-paper dark:text-heritage-dark-ink"
            >
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov === 'ALL' ? 'Tất cả địa bàn' : prov}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 divide-y divide-heritage-border border border-heritage-border bg-heritage-paper dark:divide-heritage-dark-border dark:border-heritage-dark-border dark:bg-heritage-dark-paper">
          {filteredCompactSites.map((item) => (
            <div
              key={item.slug}
              className="flex flex-col justify-between gap-2 px-4 py-3 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-medium text-heritage-ink dark:text-heritage-dark-ink">{item.name}</p>
                <p className="text-xs text-heritage-muted dark:text-heritage-dark-muted">
                  {item.currentAddress}
                </p>
              </div>
              {item.province && (
                <span className="self-start border border-heritage-border px-2.5 py-0.5 text-xs text-heritage-muted sm:self-auto dark:border-heritage-dark-border dark:text-heritage-dark-muted">
                  {item.province}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
