# ADR-005: Lựa Chọn Cấu Trúc Monorepo Cho Dự Án
## Dự án: Ban Chỉnh Đạo Digital Library

| Thông tin | Chi tiết |
| :--- | :--- |
| **Trạng thái** | **ACCEPTED (Đã được Người dùng phê duyệt vào ngày 2026-11-12)** |
| **Ngày quyết định** | 2026-11-12 |
| **Người đề xuất** | Technical Lead / Solution Architect |
| **Người phê duyệt** | User / Product Owner |

---

## 1. Ngữ cảnh (Context)
Dự án bao gồm cả phần ứng dụng giao diện người dùng (Next.js Web Portal) và phần dịch vụ backend xử lý logic nghiệp vụ, cơ sở dữ liệu và bảo mật (NestJS API), cùng với cấu hình hạ tầng container (Docker Compose, PostgreSQL/PostGIS, Redis, MinIO). Cần quyết định cấu trúc lưu trữ mã nguồn để tối ưu hóa quy trình phát triển, chia sẻ kiểu dữ liệu (TypeScript types/DTOs) và duy trì tính liên tục của dự án.

## 2. Quyết định (Decision)
Thống nhất sử dụng cấu trúc **Monorepo** trong cùng một repository `CaoDai-BCD`:
```text
CaoDai-BCD/
├── apps/
│   ├── api/          # NestJS Modular Monolith API
│   └── web/          # Next.js Web Portal & Admin Console
├── packages/         # Shared libraries (DTOs, Types, Enums) - nếu cần
├── infra/            # Docker Compose & local service configurations
├── docs/             # Toàn bộ tài liệu phân tích, kiến trúc và database
├── .agents/skills/   # Hệ thống kỹ năng AI của dự án
└── .specify/         # Cấu hình GitHub Spec Kit
```

## 3. Hệ quả (Consequences)
- **Điểm lợi (Pros):**
  * Toàn bộ dự án nằm trong một kho mã nguồn duy nhất, dễ dàng quản lý phiên bản, pull request và commit đồng bộ giữa frontend và backend.
  * Chia sẻ trực tiếp các Interface/Type dữ liệu của Prisma và DTO giữa `api` và `web` mà không cần xuất bản package riêng.
  * Phù hợp hoàn hảo với quy trình chuyển đổi đa thiết bị qua Git đã quy định trong `AGENTS.md`.
- **Hạn chế:** Cần cấu hình workspace (pnpm workspaces / npm workspaces) rõ ràng để tránh xung đột dependency giữa Next.js và NestJS.

