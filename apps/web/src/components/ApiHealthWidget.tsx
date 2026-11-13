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
    <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 sm:p-5 text-sm">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2.5">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-zinc-900 dark:text-zinc-100" />
          <h3 className="font-serif font-bold text-zinc-950 dark:text-zinc-50">
            Kiểm Tra Kết Nối Hệ Thống (Health Check)
          </h3>
        </div>
        <button
          onClick={fetchHealth}
          disabled={loading}
          aria-label="Làm mới trạng thái kết nối"
          className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 flex items-center space-x-1 p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Làm mới</span>
        </button>
      </div>

      {loading && !health && (
        <div className="text-xs text-zinc-600 dark:text-zinc-400 animate-pulse flex items-center space-x-2 py-1">
          <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100 animate-ping" />
          <span>Đang kiểm tra kết nối tới Backend API (cổng 4000)...</span>
        </div>
      )}

      {error && (
        <div className="flex items-start space-x-2 text-xs text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-850 p-3 rounded border border-zinc-300 dark:border-zinc-700">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
          <div>
            <span className="font-bold">Backend chưa khởi chạy hoặc chưa kết nối:</span>
            <p className="mt-0.5 text-zinc-600 dark:text-zinc-400">
              Chạy <code className="bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-xs">npm run start:dev --workspace=apps/api</code> để khởi động dịch vụ.
            </p>
          </div>
        </div>
      )}

      {health && (
        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2 text-zinc-900 dark:text-zinc-100 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              API Dịch Vụ: {health.service} ({health.status.toUpperCase()}) - Phiên bản v{health.version}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-950 p-2.5 rounded border border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-zinc-950 dark:text-zinc-50 font-medium">Thời gian kiểm tra:</span>{' '}
              {new Date(health.timestamp).toLocaleTimeString('vi-VN')}
            </div>
            <div>
              <span className="text-zinc-950 dark:text-zinc-50 font-medium">Swagger API Docs:</span>{' '}
              <a
                href="http://localhost:4000/api/docs"
                target="_blank"
                rel="noreferrer"
                className="text-zinc-950 dark:text-zinc-50 font-bold underline"
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
