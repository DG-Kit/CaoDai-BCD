/**
 * @file Core Business Types & Enums for Ban Chinh Dao Digital Library
 * @description Chia sẻ giữa apps/api và apps/web
 */

// 1. Phân quyền và Vai trò (Scoped RBAC)
export enum UserRole {
  VISITOR = 'VISITOR',
  MEMBER = 'MEMBER',
  UNIT_ADMIN = 'UNIT_ADMIN',
  LIBRARY_EDITOR = 'LIBRARY_EDITOR',
  REVIEWER = 'REVIEWER',
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
}

// 2. Trạng thái xác minh dữ liệu (Bắt buộc cho mọi thực thể)
export enum VerificationStatus {
  UNVERIFIED = 'UNVERIFIED',
  VERIFIED = 'VERIFIED',
  OFFICIALLY_CONFIRMED = 'OFFICIALLY_CONFIRMED',
}

// 3. Vòng đời biên tập tài liệu thư viện
export enum DocumentEditionStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  IN_REVIEW = 'IN_REVIEW',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

// 4. Loại cơ sở thờ tự vật lý
export enum WorshipSiteType {
  TOA_THANH = 'TOA_THANH',
  THANH_THAT = 'THANH_THAT',
  NHA_TU = 'NHA_TU',
  DIEN_THO = 'DIEN_THO',
}

// 5. Chế độ ăn chay (Trai kỳ)
export enum FastingSchedule {
  NONE = 'NONE',
  LUC_TRAI = 'LUC_TRAI',
  THAP_TRAI = 'THAP_TRAI',
  THIEN_NGUON = 'THIEN_NGUON',
}

// 6. Loại tệp đính kèm trong ấn bản
export enum DocumentFileType {
  SCAN_ORIGINAL_PDF = 'SCAN_ORIGINAL_PDF',
  OPTIMIZED_PDF = 'OPTIMIZED_PDF',
  AUDIO_MP3 = 'AUDIO_MP3',
  IMAGE_COVER = 'IMAGE_COVER',
}
