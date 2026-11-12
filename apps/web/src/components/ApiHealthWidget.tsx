'use client';

import React, { useEffect, useState } from 'react';
import { Activity, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface HealthData {
  status: string;
  timestamp: string;
  service: string;
  version: string;
  database?: {
    status: string;
  };
}

export function ApiHealthWidget() {
  const [health, setHealth] = useState<HealthData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHealth = async () => {
    setLoading(true);
    setError(null);
    try {
      // Backend chạy mặc định ở cổng 4000 theo cấu hình NestJS
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const res = await fetch(`${apiUrl}/api/health`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: HealthData = await res.json();
      setHealth(data);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Không thể kết nối đến Backend API';
      setError(message);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="bg-heritage-parchment/60 border border-heritage-border rounded-xl p-4 sm:p-5 text-sm shadow-sm">
      <div className="flex items-center justify-between mb-3 border-b border-heritage-border/60 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-heritage-gold" />
          <h3 className="font-serif font-bold text-heritage-wood">
            Kiểm Tra Kết Nối Hệ Thống (Health Check)
          </h3>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          aria-label="Làm mới trạng thái kết nối"
          className="text-xs text-heritage-woodLight hover:text-heritage-goldDark flex items-center space-x-1 p-1 hover:bg-heritage-paper rounded transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {loading && !health && (
        <div className="text-xs text-heritage-woodLight animate-pulse flex items-center space-x-2 py-1">
          <div className="w-2 h-2 rounded-full bg-heritage-gold animate-ping" />
          <span>Đang kiểm tra kết nối tới Backend API (port 4000)...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-2 text-xs text-heritage-ruby bg-heritage-ruby/10 p-2.5 rounded-lg border border-heritage-ruby/20">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Backend chưa khởi chạy hoặc chưa kết nối:</span>
            <p className="mt-0.5 text-heritage-woodLight">
              Chạy <code className="bg-heritage-paper px-1 py-0.5 rounded text-[11px]">npm run start:dev --workspace=apps/api</code> để khởi động dịch vụ.
            </p>
          </div>
        </div>
      )}

      {health && (
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-heritage-jade">
            <CheckCircle2 className="w-4 h-4" />
            <span className="font-medium">
              API Dịch Vụ: {health.service} ({health.status.toUpperCase()}) - Phiên bản v{health.version}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-heritage-woodLight bg-heritage-paper/80 p-2 rounded border border-heritage-border/40">
            <div>
              <span className="text-heritage-wood font-medium">Thời gian kiểm tra:</span>{' '}
              {new Date(health.timestamp).toLocaleTimeString('vi-VN')}
            </div>
            <div>
              <span className="text-heritage-wood font-medium">Swagger API Docs:</span>{' '}
              <a
                href="http://localhost:4000/api/docs"
                target="_blank"
                rel="noreferrer"
                className="text-heritage-goldDark hover:underline"
              >
                /api/docs
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

