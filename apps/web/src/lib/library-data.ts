export type LibraryDomain = 'KINH_SACH' | 'LE_NHAC_DUONG';

export interface LibraryCategory {
  id: string;
  parentId: string | null;
  slug: string;
  name: string;
  description: string | null;
  domain: LibraryDomain;
  displayOrder: number;
  publishedDocumentCount: number;
}

export interface LibraryFile {
  id: string;
  fileType: 'SCAN_ORIGINAL_PDF' | 'OPTIMIZED_PDF' | 'SCAN_IMAGE' | 'AUDIO_MP3' | 'COVER_IMAGE';
  fileName: string;
  storagePath: string;
  checksumSha256?: string | null;
  fileSizeBytes?: number | null;
  mimeType?: string | null;
}

export interface LibrarySection {
  id: string;
  parentId: string | null;
  slug: string;
  title: string;
  orderIndex: number;
  printedPageLabel?: string | null;
  pdfPageStart?: number | null;
  pdfPageEnd?: number | null;
  ritualTags: string[];
  purposeTags: string[];
  timingTags: string[];
  tuneType?: string | null;
  content?: {
    id: string;
    contentMarkdown: string;
    plainText: string;
    originalScanPageRef?: string | null;
    editorialNote?: string | null;
  } | null;
  files?: LibraryFile[];
}

export interface LibraryEdition {
  id: string;
  editionLabel: string;
  publicationYear?: number | null;
  publisher?: string | null;
  isbn?: string | null;
  registrationCode?: string | null;
  editorialTeam?: string | null;
  sourceName?: string | null;
  archiveReference?: string | null;
  usagePermission?: string | null;
  publishedAt?: string | null;
  files: LibraryFile[];
  sections?: LibrarySection[];
}

export interface LibraryDocument {
  id: string;
  slug: string;
  title: string;
  authorOrIssuingBody?: string | null;
  summary?: string | null;
  historicalOrigin?: string | null;
  isComparativeReference: boolean;
  ritualTags: string[];
  purposeTags: string[];
  timingTags: string[];
  category: {
    id: string;
    slug: string;
    name: string;
    domain?: LibraryDomain;
  };
  editions: LibraryEdition[];
}

export const FALLBACK_CATEGORIES: LibraryCategory[] = [
  {
    id: 'cat-1',
    parentId: null,
    slug: 'kinh-cung-tu-thoi',
    name: 'Kinh Cúng Tứ Thời',
    description:
      'Kinh Thiên Đạo, cúng Tứ Thời (Tý, Mẹo, Ngọ, Dậu), kinh sám hối, giải khổ, cứu khổ, quan hôn tang tế và hướng dẫn hành lễ.',
    domain: 'KINH_SACH',
    displayOrder: 1,
    publishedDocumentCount: 1,
  },
  {
    id: 'cat-2',
    parentId: null,
    slug: 'thanh-ngon',
    name: 'Thánh Ngôn',
    description: 'Thánh ngôn hiệp tuyển và lời dạy thiêng liêng của Đức Chí Tôn và Đức Phật Mẫu.',
    domain: 'KINH_SACH',
    displayOrder: 2,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-3',
    parentId: null,
    slug: 'thanh-giao',
    name: 'Thánh Giáo',
    description: 'Thánh giáo của chư vị Tiên, Phật, Thánh giáng cơ dạy đạo trong nền Đại Đạo Tam Kỳ Phổ Độ.',
    domain: 'KINH_SACH',
    displayOrder: 3,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-4',
    parentId: null,
    slug: 'giao-ly-luat-phap',
    name: 'Giáo Lý & Luật Pháp',
    description: 'Tân Luật, Pháp Chánh Truyền, Hiến Chương và tài liệu giáo lý căn bản Ban Chỉnh Đạo.',
    domain: 'KINH_SACH',
    displayOrder: 4,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-5',
    parentId: null,
    slug: 'dao-su-tieu-su',
    name: 'Đạo Sử & Tiểu Sử',
    description:
      'Lịch sử hình thành Hội Thánh Cao Đài Ban Chỉnh Đạo (Tòa Thánh Bến Tre) và tiểu sử chư chức sắc tiền bối.',
    domain: 'KINH_SACH',
    displayOrder: 5,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-6',
    parentId: null,
    slug: 'van-ban-hoi-thanh',
    name: 'Văn Bản Hội Thánh',
    description: 'Quy chế, thông tư, đạo nghị định và các văn bản hành đạo chính thức của Hội Thánh.',
    domain: 'KINH_SACH',
    displayOrder: 6,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-8',
    parentId: null,
    slug: 'khao-cuu-tham-khao',
    name: 'Khảo Cứu & Tham Khảo',
    description: 'Tài liệu nghiên cứu học thuật, chú giải thuật ngữ và tư liệu đối chiếu có ghi rõ nguồn.',
    domain: 'KINH_SACH',
    displayOrder: 7,
    publishedDocumentCount: 0,
  },
  {
    id: 'cat-7',
    parentId: null,
    slug: 'tai-lieu-le-nhac-duong',
    name: 'Tài Liệu Lễ Nhạc Đường',
    description:
      'Tài liệu chuyên biệt của Lễ Nhạc Đường: các bài Thài Xuân, Thài Nam, cổ nhạc, nghi thức thiết đàn và hành lễ tại Đền Thánh.',
    domain: 'LE_NHAC_DUONG',
    displayOrder: 8,
    publishedDocumentCount: 0,
  },
];

interface RawSectionDef {
  slug: string;
  parentSlug?: string;
  title: string;
  printedPageLabel?: string;
  pdfPageStart?: number;
  pdfPageEnd?: number;
  ritualTags?: string[];
  purposeTags?: string[];
  timingTags?: string[];
  tuneType?: string;
  contentMarkdown?: string;
  editorialNote?: string;
}

const RAW_SECTIONS: RawSectionDef[] = [
  // ==========================================
  // PHẦN I: KINH CÚNG TỨ THỜI
  // ==========================================
  {
    slug: 'phan-1-kinh-cung-tu-thoi',
    title: 'PHẦN I: KINH CÚNG TỨ THỜI',
    printedPageLabel: '1–48',
    pdfPageStart: 3,
    pdfPageEnd: 50,
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown:
      'Phần I gồm trọn bộ **Kinh Thiên Đạo** dùng trong Tứ Thời cúng Thầy (Tý, Mẹo, Ngọ, Dậu) và các nghi thức cơ bản tại gia (Trai Kỳ, Cách Thờ Phượng Trong Nhà, Cách Lạy).\n\nChọn từng bài kinh ở mục lục để đọc văn bản số hóa kèm trang bản scan gốc tương ứng.',
  },
  {
    slug: '1-niem-huong',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '1. Niệm Hương',
    printedPageLabel: '3',
    pdfPageStart: 5,
    tuneType: 'Giọng Nam Ai',
    ritualTags: ['Cúng Tứ Thời'],
    timingTags: ['Tý - Mẹo - Ngọ - Dậu'],
    contentMarkdown: `*(Giọng Nam Ai)*

Đạo gốc bởi lòng thành tín hiệp,
Lòng nương nhang khói tiếp truyền ra;
Mùi hương lư ngọc bay xa,
Kỉnh thành cầu nguyện, Tiên gia chứng lòng.
Xin Thần, Thánh ruổi dong cỡi hạc,
Xuống phàm trần vội gác xe Tiên;
Ngày nay đệ tử khẩn nguyền,
Chín từng Trời Đất thông truyền chứng (1) tri.
Lòng sở vọng gắng ghi đảo cáo,
Nhờ Ơn Trên bổ báo phước lành. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**

---
**(1)** Có bản ghi là: Chín từng Trời, Đất thông truyền <u>chiếu</u> tri`,
    editorialNote: 'Giữ nguyên dấu chú thích dị bản (1) theo đúng bản in trang 3.',
  },
  {
    slug: '2-khai-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '2. Khai Kinh',
    printedPageLabel: '4',
    pdfPageStart: 6,
    tuneType: 'Giọng Nam Ai',
    ritualTags: ['Cúng Tứ Thời'],
    timingTags: ['Tý - Mẹo - Ngọ - Dậu'],
    contentMarkdown: `*(Giọng Nam Ai)*

Biển trần khổ vơi vơi trời nước,
Ánh Thái Dương giọi trước phương Đông;
Tổ Sư Thái Thượng Đức Ông,
Ra tay dẫn độ, dày công giúp đời.
Trong Tam Giáo có lời khuyến dạy,
Gốc bởi lòng làm phải làm lành;
Trung dung Khổng Thánh chỉ rành,
Từ Bi Phật dặn: lòng thành lòng nhơn.
Phép Tiên Đạo: tu chơn dưỡng tánh,
Một cội sanh ba nhánh in nhau;
Làm người rõ thấu lý sâu,
Sửa lòng trong sạch tụng cầu Thánh Kinh. ■

---
### ❖ Nghi thức khi dứt bài kinh:
- Không có lạy, chỉ có xá cúi đầu xuống sau 3 tiếng chuông.`,
  },
  {
    slug: '3-ngoc-hoang-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '3. Ngọc Hoàng Kinh (Ngọc Hoàng Thượng Đế)',
    printedPageLabel: '5–6',
    pdfPageStart: 7,
    pdfPageEnd: 8,
    tuneType: 'Giọng Nam Xuân',
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown: `*(Giọng Nam Xuân)*

Đại La Thiên Đế,
Thái cực Thánh Hoàng.
Hóa dục quần sanh,
Thống ngự vạn vật.
Diệu diệu “Huỳnh Kim Khuyết”,
Nguy nguy “Bạch Ngọc Kinh”.
Nhược thiệt, nhược hư, bất ngôn nhi mặc tuyên đại hóa,
Thị không thị sắc, vô vi nhi dịch sử quần linh,
Thời thừa Lục long, du hành bất tức,
Khí phân Tứ tượng, oát triền vô biên.
Càn kiện cao minh, vạn loại thiện ác tất kiến,
Huyền phạm quảng đại, nhứt toán họa phước lập phân.
Thượng chưởng tam thập lục Thiên, tam thiên thế giới.
Hạ ốc thất thập nhị Địa, tứ đại Bộ Châu.
Tiên Thiên Hậu Thiên, tịnh dục Đại Từ Phụ.
Kim ngưỡng, cổ ngưỡng, phổ tế Tổng Pháp Tông.
Nãi Nhựt Nguyệt Tinh Thần chi Quân,
Vi Thánh, Thần, Tiên, Phật chi Chủ.
Trạm tịch chơn Đạo,
Khôi mịch tôn nghiêm.
Biến hóa vô cùng, lũ truyền Bửu Kinh dĩ giác thế.
Linh oai mạc trắc, thường thi Thần giáo dĩ lợi sanh.
Hồng oai, hồng từ, vô cực, vô thượng.
Đại Thánh, Đại Nguyện, Đại Tạo, Đại Bi,
Huyền Khung Cao Thượng Đế,
Ngọc Hoàng
Tích phước
Hựu tội
Đại Thiên Tôn. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '4-phat-giao-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '4. Phật Giáo Kinh (Thích Giáo)',
    printedPageLabel: '7',
    pdfPageStart: 9,
    tuneType: 'Giọng Nam Xuân',
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown: `**Chí tâm qui mạng lễ**
*(Giọng Nam Xuân)*

Hỗn độn Tôn Sư,
Càn Khôn Chủ Tể.
Qui thế giới ư nhứt khí chi trung,
Ốc trần hườn ư song thủ chi nội.
Huệ đăng bất diệt, chiếu Tam thập lục Thiên, chi quang minh,
Đạo Pháp trường lưu, khai Cửu thập nhị tào chi mê muội.
Đạo cao vô cực,
Giáo xiển Hư linh.
Thổ khí thành hồng, nhi nhứt trụ xang (1) Thiên,
Hóa kiếm thành xích, nhi tam phân thác Địa.
Công tham Thái cực, phá nhứt khiếu chi huyền quang.
Tánh hiệp vô vi, thống tam tài chi bí chỉ.
Đa thi huệ trạch,
Vô lượng độ nhơn,
Đại bi, đại nguyện,
Đại thánh, đại từ
Tiên Thiên Chánh Đạo,
Nhiên Đăng Cổ Phật.
Vô vi Xiển giáo Thiên Tôn. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ NHIÊN ĐĂNG CỔ PHẬT VÔ VI XIỂN GIÁO THIÊN TÔN.**

---
**(1)** Có bản ghi là: Thổ khí thành hồng, nhi nhứt trụ <u>xanh</u> Thiên.`,
  },
  {
    slug: '5-tien-giao-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '5. Tiên Giáo Kinh (Tiên Giáo)',
    printedPageLabel: '8–9',
    pdfPageStart: 10,
    pdfPageEnd: 11,
    tuneType: 'Giọng Nam Xuân',
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown: `**Chí tâm qui mạng lễ**
*(Giọng Nam Xuân)*

Tiên Thiên khí hóa,
Thái Thượng Đạo Quân.
Thánh bất khả tri,
Công bất khả nghị.
Vô vi cư Thái cực chi tiền,
Hữu thỉ siêu quần chơn chi thượng.
Đạo cao nhứt khí,
Diệu hóa Tam Thanh,
Đức hoán Hư Linh,
Pháp siêu quần Thánh.
Nhị ngoạt thập ngũ, phân tánh giáng sanh,
Nhứt thân ức vạn, diệu huyền thần biến.
Tử khí Đông lai, quảng truyền Đạo Đức,
Lưu sa Tây độ, pháp hóa Tướng Tông.
Sản Tất Viên, Phương Sóc chi bối, Đơn tích duy mang,
Khai Thiên, Địa, Nhơn, Vật chi tiên, Đạo kinh hạo kiếp.
Càn Khôn oát vận, nhựt nguyệt chi quang.
Đạo pháp bao la, Cửu Hoàng Tỷ Tổ.
Đại Thiên, Thế Giới, dương tụng từ ân.
Vĩnh kiếp quần sanh, ngưỡng kỳ huệ đức.
Đại Thần, Đại Thánh,
Chí Cực, Chí Tôn.
Tiên Thiên Chánh nhứt,
Thái Thượng Đạo Quân,
Chưởng Giáo Thiên Tôn. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ THÁI THƯỢNG ĐẠO TỔ TAM THANH ỨNG HÓA THIÊN TÔN.**`,
  },
  {
    slug: '6-thanh-giao-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '6. Thánh Giáo Kinh (Nho Giáo)',
    printedPageLabel: '10',
    pdfPageStart: 12,
    tuneType: 'Giọng Nam Xuân',
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown: `**Chí tâm qui mạng lễ**
*(Giọng Nam Xuân)*

Quế Hương nội điện,
Văn Thỉ thượng cung.
Cửu thập ngũ hồi, chưởng thiện quả ư thi thơ chi phố,
Bá thiên vạn hóa, bồi quế thọ ư, âm chất chi điền.
Tự lôi trữ bính, linh ư Phụng lãnh,
Chí như ý từ, tường ư Ngao trụ.
Khai nhơn tâm tất bổn, ư đốc thân chi hiếu,
Thọ quốc mạch tất tiên, ư trí chúa chi trung.
Ứng mộng bảo sanh,
Thùy từ mẫn khổ,
Đại Nhơn, Đại Hiếu,
Đại Thánh, Đại Từ.
Thần Văn Thánh Võ,
Hiếu Đức Trung Nhơn,
Vương Tân sách phụ,
Nho tông khai hóa.
Văn Tuyên tư lộc,
Hoằng nhơn Đế Quân.
Trừng chơn chánh quang,
Bửu quang từ tế Thiên Tôn. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ KHỔNG THÁNH TIÊN SƯ HƯNG NHO THẠNH THẾ THIÊN TÔN.**`,
  },
  {
    slug: '7-dang-hoa',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '7. Dâng Hoa',
    printedPageLabel: '11',
    pdfPageStart: 13,
    ritualTags: ['Cúng Tứ Thời', 'Dâng Tam Bửu'],
    contentMarkdown: `Từ Bi giá ngự rạng môn thiền,
Đệ tử mừng nay hữu huệ duyên;
Năm sắc hoa tươi xin kỉnh lễ,
Cúi mong **Thượng Đế** rưới ân Thiên. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 1 lạy 4 gật.
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '8-dang-ruou',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '8. Dâng Rượu',
    printedPageLabel: '11',
    pdfPageStart: 13,
    ritualTags: ['Cúng Tứ Thời', 'Dâng Tam Bửu'],
    contentMarkdown: `Thiên ân huệ chiếu giáng thiền minh,
Thành kỉnh Trường Xuân chước tửu quỳnh;
Lạc hứng khấu cung giai miễn lễ,
Thoát tai bá tánh ngưỡng ân sinh. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 1 lạy 4 gật.
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '9-dang-tra',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '9. Dâng Trà',
    printedPageLabel: '11',
    pdfPageStart: 13,
    ritualTags: ['Cúng Tứ Thời', 'Dâng Tam Bửu'],
    contentMarkdown: `Mai xuân nguyệt cúc vị trà hương,
Kỉnh lễ thành tâm hiến bửu tương;
Ngưỡng vọng Từ Bi gia tế phước,
Khai minh Đại Đạo hộ thanh bường. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 1 lạy 4 gật.
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '10-ngu-nguyen',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '10. Ngũ Nguyện',
    printedPageLabel: '11',
    pdfPageStart: 13,
    ritualTags: ['Cúng Tứ Thời'],
    contentMarkdown: `*(Khi đọc bài dâng Tam Bửu rồi, thì đọc năm câu nguyện sau đây:)*

**Nam Mô**
- **Nhứt nguyện :** Đại Đạo hoằng khai.
- **Nhì nguyện :** Phổ độ chúng sanh.
- **Tam nguyện :** Xá tội đệ tử.
- **Tứ nguyện :** Thiên hạ thái bình.
- **Ngũ nguyện :** Thánh Thất an ninh.

---
### ❖ Nghi thức lạy và câu niệm khi dứt bài Ngũ Nguyện:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**

*(Khi có đọc Sớ: Đọc sớ xong cũng lạy 3 lạy 12 gật, mỗi lạy 4 gật, mỗi gật niệm: **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**).*`,
  },
  {
    slug: '11-giai-kho',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '11. Giải Khổ',
    printedPageLabel: '12',
    pdfPageStart: 14,
    purposeTags: ['Giải khổ', 'Giải oan'],
    contentMarkdown: `Dưới Chí Tôn có quyền Giáo chủ,
Hạo Ngươn Tiên sẵn đủ cơ mầu;
Máy linh định phép cao sâu,
Ma Ha nước báu giải sầu trần oan.
Đạo khí phục diệt tan trần lụy,
Hộ yêu ma giảm mị trừ tà;
Hiển linh giúp thế gần xa,
Giải vòng nghiệp báo ta bà độ dân.
Biển khổ vốn vùi thân linh hiển,
Biết ăn năn niệm tiếng Cao Đài;
Vĩnh sanh phép báu trao tay,
Đắp thân y bát chờ ngày cởi lao.
Hiệp Đạo đặng đưa vào Thiên vị,
Miếng đỉnh chung có quý chi đây;
Vì thương mới đến nỗi nầy,
Hoá thân xuống tục lẫn bầy hồng gian.
Lập Đạo đặng chỉ đàng chơn giả,
Máy Thiên Cơ định quả là đây;
Cả kêu con dại trần nầy,
Mau mau quày gót tìm Thầy giải oan. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**

*(Mỗi khi cúng Thầy rồi đọc kinh này để giải tâm cho được mát mẻ, cho thêm trong sạch sáng láng).*`,
  },
  {
    slug: '12-doat-nghiet',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '12. Đoạn Nghiệt',
    printedPageLabel: '13',
    pdfPageStart: 15,
    timingTags: ['Mỗi buổi tối sau khi cúng'],
    contentMarkdown: `Ánh Thái Cực biến sanh Thái Bạch,
Hiện Kim Tinh trọng trách Linh Tiêu;
Quyền năng vâng thửa Thiên Triều,
Càn khôn thế giới, dắt dìu Tinh Quân.
Đạo khí ngưng mấy từng vây phủ,
Lạc quan vào làm chủ quy tâm;
Đoạn trần tuyệt dứt lỗi lầm,
Hiệp phần tái tạo, tay cầm huệ căn.
Pháp Tiêu Diêu bủa giăng cứu độ,
Cõi ta bà dạy dỗ muôn sanh;
Hỗn Ngươn định Hội dữ lành,
Ba mươi sáu cõi, chơn thành triều ngưng.
Thâu vạn vật, chuyển luân Tạo Hóa,
Ngoài Cung Hư chơn giả tận tường;
Hạo Thiên hội hiệp không nhường,
Trừ tâm trần dục đến đường Vĩnh sanh.
Thâu tam quang hòa danh như ý,
Hạc thanh chầu Chơn vị qui Tôn;
Trừ thân tục, xuất Chơn hồn,
Nước hằng sống ngự vĩnh tồn Cửa Không. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ LÝ THÁI BẠCH TIÊN TRƯỞNG KIM GIÁO TÔNG ĐẠI ĐẠO TAM KỲ PHỔ ĐỘ.**

*(Kinh này đọc mỗi buổi tối, khi cúng rồi để cầu dứt lần dây oan nghiệt buộc trần).*`,
  },
  {
    slug: '13-chuyen-phap-loi-am',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '13. Chuyển Pháp Lôi Âm',
    printedPageLabel: '14',
    pdfPageStart: 16,
    contentMarkdown: `Linh Tiêu chuyển Pháp Linh tái tạo,
Hiệp Tam Thanh lập Đạo, dìu Đời;
Hoá thân vì trẻ đến nơi,
Dựng Phong Vân hội, định đời Thuấn, Nghiêu,
Sợ con dại lầm yêu, mến quỷ,
Xuống ẩn thân liệu chỉ đường đi;
Biết con vì thế lỗi nghì,
Thương con giấu dạng trong kỳ tuyển Tiên.
Kìa Bạch Ngọc chia quyền, chuyển thế,
Sai Phật, Tiên phổ tế hồng trần;
Giây thiêng liêng buộc gần, xa,
Áo tơi, nón lá, ta bà khắp trong.
Chỉ dạy trẻ, mà không gần trẻ,
Phướn siêu sanh, hai lẽ định phân;
Thuyền linh giục rước nhiều lần,
Đưa con trông đặng một lần chầu Tiên.
Con biết mặt thêm phiền não dạ,
Nên tránh con, làm lạ cùng con;
Khuyên nhìn nước hãy xem non,
Đó là tin nhạn con còn gặp Cha. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '14-chuyen-luat-bach-ngoc',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '14. Chuyển Luật Bạch Ngọc',
    printedPageLabel: '15',
    pdfPageStart: 17,
    contentMarkdown: `Trên Lạn Uyển vườn Tiên thơm nực,
Hội quần Tiên định luật cứu đời;
Pháp thân chuyển tạo cơ Trời,
Quyền năng sẵn có trợ đời Chơn Quân.
Hội Cửu Tiêu ba từng cửa mở,
Phướn siêu sanh một thuở quy linh;
Chí công thọ sắc Thiên Đình,
Cửu Nương là lối hiệp hình Tinh quân.
Định vị đặng chín tầng thâu phục,
Trở máy linh thay lúc loạn ly;
Thương đời khổ não nhiều khi,
Chuyển ngươn tận diệt qua kỳ Thượng ngươn.
Nhờ Di Lạc không hờn không giận,
Lý Giáo Tông độ tận chúng sanh;
Quan Âm chấp phướn qui danh,
Tiên Quan dẫn lối lập thành Ngôi Hư.
Rộng cửa mở thùy từ dẫn bạn,
Thượng Phẩm Tiên ẩn dạng Vô Hư;
Quạt Linh Tiêu, rước khách từ,
Nhập Ngôi Vô Cực diệt trừ trần oan. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CÁI THIÊN TIÊN QUAN TỪ BI PHỔ TẾ THIÊN TÔN.**`,
  },
  {
    slug: '15-phat-mau-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '15. Phật Mẫu Kinh (Kinh Phật Mẫu)',
    printedPageLabel: '16–18',
    pdfPageStart: 18,
    pdfPageEnd: 20,
    purposeTags: ['Cúng Phật Mẫu'],
    contentMarkdown: `Từ hỗn độn Chí Tôn hạ chỉ,
Cho Thiếp quyền quản khí Hư Vô;
Lấy Âm quang tạo khách tăng đồ,
Muôn vật cả lo cho sanh hóa.
Nuôi nấng lấy xác thân hòa hỏa,
Thuận Âm Dương căn quả hữu vi;
Chưa ai vào đến cõi trần nầy,
Chẳng thọ lấy Chơn Thần tay Thiếp.
Sanh dưỡng đã biết bao căn kiếp,
Rồi dắt dìu cho hiệp với Cha;
Kìa mớm cơm, vú sữa cũng là,
Sanh một kiếp người ta đáng mấy.
Dầu hài cốt trăm năm cũng vậy,
Khối tình thương chẳng lấy chi nhiều;
Huống tạo Thiên đùm bọc chắt chiu,
Sanh một đứa liều ngàn thế kỷ.
Chịu mất trẻ cũng vì tà mị,
Cướp con thương bỏ vị quên ngôi;
Ôi ! Thương đòi phen phải chịu ngậm ngùi,
Thấy thân trẻ, nổi trôi biển khổ.
Trân trọng lấy hình hài dơ ố,
Còn Thiêng Liêng vô số tiếc thương;
Hằng trông mong con đặng phi thường,
Đem vào đặng con đường hằng sống.
Kể từ trước Thiếp là hình bóng,
Biết thương con chẳng mộng con thương;
Đạo dìu Đời, bởi Thiếp lo lường,
Trên mới thuận khoan thương phổ tế.
Kể từ trước Đạo còn bị bế,
Mẹ thương con chẳng thế dắt dìu;
Nay cõi trần nghiệp chướng giảm tiêu,
Ngọc Hư định đã nhiều phép cứu.
Thiếp từ đặng Phái Vàng Chí Bửu,
Lịnh Chí Tôn khai mối Tam Kỳ;
Hằng ngày lo cho đám nữ nhi,
Chẳng đủ trí sánh bì nam tử.
Ơn nhờ có con là Long Nữ,
Đến thay thân Thiên Sứ Từ Hàng;
Đùm bọc em ráng bước một đàng,
Đặng cho Mẹ dễ dàng cứu rỗi.
Kìa Cực Lạc Niết Bàn đem đổi,
Lấy thân phàm làm mối giải oan.
Mẹ trông con về cảnh an nhàn,
Ở trần thế muôn ngàn sầu thảm;
Cõi Thiên vị cho con còn dám,
Huống dạy khuyên mô phạm căn tu.
Chỉ tiếc con chẳng rõ hiền ngu,
Đặng tự định công phu trọn phận;
Con thì đứa đường đời lẩn bẩn,
Con thì hay trở giận cơ mầu.
Máy huyền vi nào hiểu cao sâu,
Cứ đeo đẳng mạch sầu nguồn thảm;
Con ví biết mình cao bực phẩm,
Thì phải toan cho dám phế đời.
Các em con chỉ để con ngươi,
Coi con bước, mấy đời nối gót;
Lời cần yếu Mẹ than cho trót,
Muốn dạy em, con chớ xa chừng.
Phải hằng ngày ở dựa bên lưng,
Nhắc từ chuyện, khuyên răn từ việc.
Cửu Nương vốn nhọc nhằn chẳng tiếc,
Chỉ trách con chưa biết nhập trường.
Phải biết rằng lòng Mẹ hằng thương. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ DIÊU TRÌ KIM MẪU VÔ CỰC ĐẠI TỪ TÔN.**

#### ❖ Nghi cúng lễ Vía Phật Mẫu:
1. NAM MÔ PHẬT; NAM MÔ PHÁP; NAM MÔ TĂNG.
2. NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.
3. NAM MÔ DIÊU TRÌ KIM MẪU VÔ CỰC ĐẠI TỪ TÔN.
4. NAM MÔ ĐẠI ĐẠO TAM KỲ PHỔ ĐỘ LÝ GIÁO TÔNG TỪ BI CỨU THẾ THIÊN TÔN.
5. NAM MÔ CỬU VỊ TIÊN NƯƠNG TỪ BI PHỔ HÓA CHÚNG SANH.
6. NAM MÔ CHƯ PHẬT TIÊN THÁNH THẦN.`,
  },
  {
    slug: '16-cuu-nuong-kinh',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '16. Cửu Nương Kinh (Kinh Cửu Vị Tiên Nương)',
    printedPageLabel: '19–20',
    pdfPageStart: 21,
    pdfPageEnd: 22,
    purposeTags: ['Cúng Phật Mẫu', 'Cửu Vị Tiên Nương'],
    contentMarkdown: `Đơn hoa khai Chín từng Linh hiển,
Phép Tiêu Diêu Linh điển dạy truyền;
Chí thành mắt thấy diệu huyền,
Thanh Vân giá ngự nhãn tiền dạy khuyên.
Hoa Nhứt Nương bảo nguyên tâm tánh,
Xui giục người xa lánh trần côi;
Mở đường trí độ qui hồi,
Cẩm Nương là lối đắp bồi quả căn.
Người trần khổ như lằn điển chớp,
Mảnh thân phàm là lớp tội tình;
Chí công về cõi Thiên Đình,
Gấm Nương là bạn đứng nhìn Cung Diêu.
Tuyến Tứ Nương giữ điều hoà nhã,
Liễu Ngũ Nương giải quả trừ căn;
Thường lo trợ bạn liễu bồ,
Giúp Văn Tô Huệ thêu đồ Thiên Cung.
Huệ Lục Nương thung dung độ thế,
Hạnh gương bày lưu để trần ai;
Mỏi trông mắt ngó nữ tài,
Hỡi người rạng mặt trên đài Thiên Hương.
Lễ Thất Nương nhịn đường nhường bước,
Hớn Bát Nương đứng trước đài Tiên;
Để tay dìu dắt nữ hiền,
Cửu Nương quyết độ dứt miền trầm luân.
Huệ Kiếm năng xây từng Đạo Đức,
Cởi lòng mê rày dứt trái oan;
Cầu xin Phật Mẫu cứu nàn,
Cho con đoạt vị lên đàng Thiên cung. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CỬU VỊ TIÊN NƯƠNG TỪ BI PHỔ HÓA CHÚNG SANH.**`,
  },
  {
    slug: '17-kinh-cau-sieu',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '17. Kinh Cầu Siêu (Sám Cầu Siêu)',
    printedPageLabel: '21',
    pdfPageStart: 23,
    purposeTags: ['Cầu siêu'],
    contentMarkdown: `*(Thông dụng cho các lễ Cầu Siêu)*

Đầu vọng bái Cao Đài Thượng Đế,
A Di Đà Phật tế chúng dân.
Quan Thế Âm lân mẫn ân cần,
Vớt lê thứ khổ trần đọa lạc.
Đại Thánh Địa Tạng Vương Bồ Tát,
Bố từ bi tế bạt vong hồn.
Cứu khổ nàn Thái Ất Thiên Tôn,
Miền âm cảnh ngục môn khai giải.
Ơn Đông Nhạc Đế Quân quảng đại,
Hộ kẻ lành chế cải tai ương.
Chốn dạ đài Thập Điện Từ Vương,
Thấy hình khổ lòng thương thảm thiết.
Giảm hình phạt bớt đường ly tiết,
Xá Linh Quang tiêu diệt tiền khiên.
Đặng nhẹ nhàng thẳng đến cung Tiên,
Nơi phước địa ở yên tu luyện.
Xin Trời Phật chứng lòng sở nguyện,
Hộ thương sanh u hiển khương ninh. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**

*(Chuẩn Đề Đạo Nhơn)*`,
  },
  {
    slug: '18-kinh-sam-hoi',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '18. Kinh Sám Hối',
    printedPageLabel: '22–43',
    pdfPageStart: 24,
    pdfPageEnd: 45,
    purposeTags: ['Sám hối', 'Tu tâm sửa tánh'],
    timingTags: ['Thường ngày'],
    contentMarkdown: `**1.** Cuộc danh lợi là phần thưởng quý,
Đấng Hóa Công xét kỹ ban ơn;
Lòng đừng so thiệt tính hơn,
Ngày đêm than thở dạ hờn ích chi.

**2.** Người sang cả là vì duyên trước,
Kẻ không phần luống ước cầu may;
Sang giàu chẳng khác như mây,
Khi tan khi hiệp đổi xây không thường.

**3.** Việc sanh tử như đường chớp nhoáng,
Bóng quang âm ngày tháng dập dồn;
Giữ cho trong sạch linh hồn,
Rèn lòng sửa nết đức tồn hậu lai.

**4.** Điều họa phước không hay tìm tới,
Tại mình vời nên mới theo mình;
Cũng như bóng nọ tùy hình,
Dữ lành hai lẽ công bình thưởng răn.

**5.** Khi vận thới lung lăng chẳng kể,
Lúc suy vi bày lễ khẩn cầu;
Sao bằng ở phải buổi đầu,
Thần minh chánh trực có đâu tư vì.

**6.** Người làm phước có khi mắc nạn,
Kẻ lăng loàn đặng mạng giàu sang;
Ấy là nợ trước còn mang,
Duyên kia chưa dứt còn đang thưởng đền.

**7.** Nếu vội trách người trên thì đọa,
Cũng có khi tai họa trả liền;
Đó là báo ứng nhãn tiền,
Màu thì mình chịu lâu truyền cháu con.

**8.** Lo danh vọng hao mòn thân thể,
Ham làm giàu của để bằng non;
Một mai nhắm mắt đâu còn,
Đem vàng chuộc mạng đổi lòn đặng chăng.

**9.** Trên đầu có bủa giăng Thần Thánh,
Xét xem người tánh hạnh dữ hiền;
Làm lành đặng hưởng phước duyên,
Trong lòng nham hiểm lộc quyền giảm thâu.

**10.** Đừng tính kế độc sâu trong dạ
Mà gổ ganh oán chạ thù vơ;
Trái oan nào khác mối tơ,
Rối rồi không gỡ bao giờ cho ra.

**11.** Thấy hình khổ dạ ta đâu nỡ,
Khuyên làm lành trừ đỡ tội căn;
Quấy rồi phải biết ăn năn,
Ở cho nhân hậu chế răn lòng tà.

**12.** Hãy có dạ kỉnh già thương khó,
Chớ đem lòng lấp ngỏ tài hiền;
Xót thương đến kẻ tật nguyền,
Đỡ nâng yếu thế binh quyền mồ côi.

**13.** Làm con phải trau dồi hiếu Đạo,
Trước là lo trả thảo mẹ cha;
Lòng thành thương tưởng ông bà,
Nước nguồn cây cội mới là tu mi.

**14.** Giá trong sạch nữ nhi trượng tiết,
Giữ cho tròn trinh liệt mới mầu;
Ở sao đáng phận đạo dâu,
Thờ chồng tiết hạnh mới hầu gái ngoan.

**15.** Đừng có cậy giàu sang chẳng nể,
Không kiêng chồng khi dễ công cô;
Ấy là những gái hung đồ,
Xúi chồng tranh cạnh hồ đồ sân si.

**16.** Tánh ngoan ngạnh không vì cô bác,
Thói lăng loàn bạn tác khinh khi;
Ngày sau đọa chốn Âm Ty.
Gông kềm khảo kẹp ít gì rên la.

**17.** Người tai mắt Đạo nhà khá giữ,
Nghĩa anh em cư xử thuận hòa;
Vẹn tròn Đạo cả giềng ba,
Kỉnh anh mến chị thì là phận em.

**18.** Trên thương dưới xét xem kẻ nhỏ,
Lúc lâm nàn chớ bỏ lánh xa;
Cũng là một gốc sanh ra,
Gồm bao nâng đỡ ruột rà thương nhau.

**19.** Người trung trực lo âu nợ nước,
Hưởng lộc vua tìm chước an bang;
Chớ làm con giặc tôi loàn,
Thuế sưu đóng đủ đừng toan kế tà.

**20.** Phận làm tớ thật thà trung tín,
Với chủ nhà trọn kính trọn ngay;
Áo cơm no ấm hằng ngày,
Của người châu cấp ơn dày nghĩa sâu.

**21.** Đừng gặp việc câu mâu biếng nhác,
Mà quên lời phú thác dặn dò;
Trước người giả bộ siêng lo,
Sau lưng gian trá so đo tấc lòng.

**22.** Phải chừa thói loài ong tay áo,
Bớt học đòi khỉ dạo dòm nhà;
Gìn lòng ngay thẳng thật thà,
Nói năng minh chánh lời ra phải gìn.

**23.** Chớ quyệt ngữ mà khinh kẻ dại,
Đừng gian mưu hãm hại người hiền;
Anh em bằng hữu kết nguyền,
Một lòng tin cậy phải kiêng phải vì.

**24.** Chẳng thấy khó mà khi mà thị,
Gặp người giàu mà vị mà nâng;
Dầu khi gặp lúc gian truân,
Cũng đồng giúp ích chớ đừng mặt ngơ.

**25.** Làm người phải kỉnh thờ Thần, Thánh,
Giữ lời nguyền tâm tánh tưởng tin;
Hễ là niệm Phật tụng kinh,
Rèn lòng sửa nết khá in như nguyền.

**26.** Chừa thói xấu đảo điên trong dạ,
Muôn việc chi chẳng khá sai lời;
Dối người nào khác dối Trời,
Trời đâu dám dối ra đời ngỗ ngang.

**27.** Chớ lầm tưởng trong hang vắng tiếng,
Mà dễ duôi sanh biếng lăng loàn;
Con người có trí khôn ngoan,
Tánh linh hơn vật biết đàng lễ nghi.

**28.** Phải cho biết kỉnh vì trên trước,
Đừng buông lời lấn lướt hồ đồ;
Thuận cùng chú bác cậu cô,
Bà con chòm xóm ra vô khiêm nhường.

**29.** Thấy già yếu hẹp đường nhượng tránh,
Đừng chỗ đông buông tánh quá vui;
Cợt người ra dạ dễ duôi.
Sanh điều xích mích đâu nguôi dạ hờn.

**30.** Khi tế tự chớ lờn chớ dễ,
Việc quan, hôn thủ lễ nghiêm trang;
Gìn lòng chẳng khá lăng loàn,
Lễ nghi vẹn giữ vững vàng chớ quên.

**31.** Giàu sang ấy Ơn Trên giúp sức,
Phước ấm no túc thực túc y;
Thấy người gặp lúc tai nguy,
Ra tay tế độ ấy thì lòng nhơn.

**32.** Thương đồng loại cũng hơn thí bạc,
Thấy trên đường miểng bát, miểng chai;
Hoặc là đinh nhọn, chông gai,
Mau tay lượm lấy đoái hoài kẻ sau.

**33.** Ấy làm phước khỏi hao khỏi tốn,
Chẳng có đâu mòn vốn thâm tiền;
Bắt cầu đắp sửa đường liền,
Kẻ qua người lại bước yên gọn gàng.

**34.** Thi ân hậu bạc ngàn khó sánh,
Ráng tập thành sửa tánh từ hòa;
Việc lành chẳng khá bỏ qua,
Tuy rằng nhỏ nhít cũng là công phu.

**35.** Năng làm phải, nhựt nhu ngoạt nhiễm,
Lâu ngày dồn tính đếm có dư;
Phước nhiều tội hóa tiêu trừ,
Phép Trời thưởng phạt không tư chẳng vì.

**36.** Thấy lỗi mọn chớ nghi chẳng ngại,
Thường dạn làm tội lại hằng hà;
Vì chưng tựu thiểu thành đa,
Họa tai báo ứng chẳng qua mảy hào.

**37.** Giữa bụi thế giữ sao khỏi vấy,
Biết ăn năn xét lấy sửa lòng;
Làm người nhơn nghĩa xử xong,
Rủi cho gặp lúc long đong chẳng sờn.

**38.** Hễ biết nghĩa thọ ơn chẳng bội,
Giúp cho người chớ vội khoe ra;
Việc chi cũng có chánh tà,
Làm điều phải nghĩa lánh xa vạy vò.

**39.** Khi gặp chuyện khá dò xét cạn,
Liệu sức mình cho hãn sẽ làm;
Chớ đừng thấy của dấy tham,
Giục người làm quấy ắt cam đồng hình.

**40.** Ở ngay thẳng Thần minh bảo hộ,
Nết xéo xiên gặp chỗ rạc tù;
Trong đời rất hiếm võ phu,
Lường cân, tráo đấu, dối tu cúng chùa.

**41.** Còn hơi hóp tranh đua bay nhảy,
Nhắm mắt rồi phủi thảy lợi danh;
Lương tâm thường xét cho rành,
Của không phải nghĩa chớ sanh lòng tà.

**42.** Người quân tử chẳng thà chịu khổ,
Đâu làm điều nhục Tổ hổ Tông;
Đứa ngu thấy của thì mong,
Không gìn tội lỗi phép công nước nhà.

**43.** Bày chước độc, xúi ra việc quấy,
Tổn cho người mà lấy lợi riêng;
Hễ nghe khua động đồng tiền,
Sửa ngay làm vạy không kiêng chút nào.

**44.** Người nghèo khổ biết sao than kể,
Kẻ lễ nhiều cậy thế ỷ quyền;
Làm quan tính kế đảo điên,
Gạt thâu gia sản, đất điền của dân.

**45.** Thả tôi tớ thôn lân húng hiếp,
Bức gái lành, ép thiếp đòi hầu;
Trong lòng mưu chước rất sâu,
Mai sau suy sụp đáo đầu ra chi.

**46.** Gái xướng kỹ, trai thì du đẳng,
Phá tan hoang gia sản suy vi;
Làm người phải khá xét suy,
Của rơi chớ lượm, tham thì phải thâm.

**47.** Còn một nỗi gian dâm đại tội,
Lấy vợ người làm lỗi tiết trinh;
Tuy là Trời Đất rộng thinh,
Mắt dường sao nháng chiếu minh lòng người.

**48.** Lương tâm biết hổ ngươi chừa lỗi,
Mới biệt phân sừng đội lông mang;
Việc lành, việc dữ đồn vang,
Tuy là bóng khuất xương tan tiếng còn.

**49.** Gái tiết hạnh giữ tròn danh giá,
Chớ học đòi mèo mả gà đồng;
Làm điều nhục Tổ hổ Tông,
Tiếng nhơ giặt rửa biển sông đặng nào.

**50.** Trai trung hiếu sửa trau ba mối,
Đừng buông lung lầm lỗi năm hằng;
Hung hoang tội báo nghiệt căn,
Kẻ chê người thị không bằng cỏ cây.

**51.** Khá tiết kiệm hằng ngày no đủ,
Tánh siêng năng lam lũ làm ăn.
Lòng đừng biếng nhác kiêu căng,
Của tiền lãng phí không ngằn phải tiêu.

**52.** Lòng Trời Đất thương đều muôn vật,
Đức háo sanh Tiên, Phật một màu;
Thượng cầm, hạ thú lao xao,
Côn trùng, thảo mộc, loài nào chẳng linh.

**53.** Nó cũng muốn như mình đặng sống,
Nỡ lòng nào tuyệt giống dứt nòi;
Bền công kinh sách xem coi,
Vô can sát mạng thiệt thòi rất oan.

**54.** Chớ kiếm thế gọi ngoan xảo trá;
Lưới rập chim, thuốc cá, đốt rừng,
Thương thay phá noãn lẫy lừng,
Tội căn báo ứng biết chừng nào an.

**55.** Lại có kẻ hung hoang ác nghiệt,
Cướp giựt rồi chém giết mạng người;
Đoàn năm, lũ bảy dạo chơi,
Hiếp người lương thiện, phá đời hại dân.

**56.** Tua khá tưởng thương lần nòi giống,
Hãy xét vì mạng sống khó cầu;
Cũng đừng bài bạc lận nhau,
Rủ ren rù quến, lấy xâu ăn đầu.

**57.** Phải hiểu biết máy sâu họa kín,
Thánh, Thần đâu tư lịnh bỏ qua;
Thường ngày tuần khắp xét tra,
Phạt người hung ác đọa sa A Tỳ.

**58.** Sống dương thế hành thì căn bịnh,
Xui tai nàn dấp dính theo mình;
Ăn năn khử ám hồi minh,
Từ Bi Trời Phật rộng tình xét cho.

**59.** Đừng cố oán thầm lo gây họa,
Đem lòng thù hăm dọa rấp đường;
Đốt nhà, tháo cống, phá mương,
Nước tràn lụt ngập ruộng vườn tan hoang.

**60.** Thêm liều mạng đặng toan đổ tội,
Cho người hiền chịu lỗi vương mang.
Khi hồn lìa khỏi trần gian,
Hóa ra ngạ quỷ cơ hàn khổ thân.

**61.** Đời nhiều kẻ khi Thần thị Thánh,
Ám muội lòng tánh hạnh gổ ganh;
Thấy ai làm phải làm lành,
Xiểm gièm cho đặng khoe danh của mình.

**62.** Lại còn có tánh tình hiểm độc,
Xúi phân chia thân tộc ruột rà;
Làm cho chồng vợ lìa xa,
Cả đời nghiệp báo oan gia chẳng rời.

**63.** Muốn tránh đặng khỏi nơi tội quá,
Lánh kẻ tà chẳng khá nên gần;
Thí tiền, thí bạc, chẩn bần,
Người đau thí thuốc, Thánh, Thần phước ban.

**64.** Đêm thanh vắng chớ toan mưu dối,
Xúi trẻ thơ lầm lỗi ngỗ ngang;
Âm Đài gông trống sẵn sàng,
Chờ khi thác xuống cổ mang hành hình.

**65.** Các thơ truyện huê tình xé hủy,
Kẻo để đời làm lụy luân thường;
Nói lời tục tĩu không nhường,
Tội hành cắt lưỡi trăm đường ghê thay !.

**66.** Lại có kẻ miệng ngay lòng vạy,
Tới làm chùa, dối cậy in kinh;
Ăn gian xới bớt cho mình,
Dầu qua dương pháp, luật hình Diêm Vương.

**67.** Thêm những sãi giả nương cửa Phật,
Của thập phương châu cấp thê nhi;
Ngày sau đọa lạc Âm Ty,
Gông kềm khảo kẹp chẳng khi nào rời.

**68.** Thấy giấy chữ rớt rơi lượm lấy,
Đốt ra tro bỏ chảy dòng sông;
Thủy triều vận tải biển Đông,
Lòng hằng dường ấy phước đồng ăn chay.

**69.** Chịu cực khổ đắng cay biết mấy,
Cuốc, cày, bừa, gieo, cấy, gặt, đong.
Làm ra lúa gạo dày công,
Dầm mưa dang nắng kẻ nông nhọc nhằn.

**70.** Nhờ Viêm Đế đức cao ân nặng,
Tìm lúa khoai người đặng no lòng.
Ngày ngày vọng niệm chớ vong,
Chẳng nên hủy hoại mới phòng khỏi hoang.

**71.** Chớ hiểm độc dạ lang lần lựa,
Nhơn thất mùa bế vựa gắt gao;
Chờ khi lúa phát giá cao,
Khai ra bán mắc Trời nào dung cho !.

**72.** Ơn trợ giúp khá lo đền báo,
Giữ vẹn tròn nghĩa Đạo với Đời;
Túng cùng vay mượn của người,
Vui lòng tính trả vốn lời cho kham.

**73.** Chớ oán chạ tham lam ngược ngạo,
Bội nghĩa ân trở tráo chước sâu;
Luân hồi thưởng phạt rất mầu,
Chuyển thân tái thế ngựa trâu công đền.

**74.** Người phú túc vun nền âm đức,
Lấy lòng nhơn giúp sức trợ nghèo;
Chớ sanh chước hiểm hẹp eo,
Lời tăng quá vốn kẻ nghèo xiết than.

**75.** Làm mặt phải bạc ngàn cúng Phật,
Ép kẻ nghèo cố đất cầm vườn;
Phật Trời nhơn vật đồng thương,
Có đâu hưởng của bất lương mà mời.

**76.** Phận làm chủ lấy lời nhỏ nhẹ,
Mà nghiêm trừng mấy kẻ tôi đòi;
Đừng lòng nham hiểm hẹp hòi,
Buông lời chửi rủa đòn roi không từ.

**77.** Tánh độc ác tội dư tích trữ,
Chốn Âm Cung luật xử nặng nề;
Đánh đòn khảo kẹp gớm ghê,
Hành hình khổ não chẳng hề nới tay.

**78.** Miền Âm cảnh nhiều thay hình lạ,
Chốn dương trần tội quá dẫy đầy;
Thánh Hiền kinh sách dạy bày,
Lòng người ám muội lỗi gây ra hoài.

**79.** Kẻ lỗ mãng chê bai khinh dễ,
Rằng thác rồi còn kể ra chi;
Nhãn tiền trả quả tức thì,
Tội dư con cháu một khi đền bồi.

**80.** Chớ quấy tưởng luân hồi phi lý,
Mà hung hăng chẳng nghĩ chẳng suy;
Thi hài như gỗ biết gì,
Linh hồn là chủ thông tri việc đời.

**81.** Lúc chung mạng dứt hơi, hồn xuất,
Quỷ vô thường sẵn chực đem đi;
Dắt hồn đến chốn Âm Ty,
Xét xem công quả chẳng ly mảy hào.

**82.** Người lương thiện ra vào thông thả,
Kẻ tội nhiều đày đọa rất minh;
Phật, Trời phép lạ hiển linh,
Hành cho tan xác hườn hình như xưa.

**83.** Con bất hiếu xay cưa đốt giã,
Mổ bụng ra phanh rã tim gan;
Chuyển thân trở lại trần gian,
Sanh làm trâu chó đội mang lông sừng.

**84.** Kìa những gái lẫy lừng hạnh xấu,
Bỏ vạc đồng đốt nấu thảm kinh;
Vì chưng trinh tiết chẳng gìn,
Có chồng còn lại ngoại tình với trai.

**85.** Kẻ tham lợi cột mai, cột mối,
Chuốt trau lời giả dối ngọt ngon;
Dỗ dành, rù quến gái non,
Làm hư hoại tiết cháu con nhà người.

**86.** Lòng lang độc vui cười hớn hở,
Chốn Diêm Đình phạt quở trừng răn;
Gông kềm khảo kẹp lăng xăng,
Hành cho đáng kiếp tội căn đã làm.

**87.** Ngục đao kiếm cầm giam phạm ác,
Tánh gian dâm hành phạt gớm ghê;
Giáo gươm bén nhọn tư bề,
Chém đâm máu chảy tràn trề ngục môn.

**88.** Hành đến chết hườn hồn sống lại,
Cho đầu thai ở tại thanh lâu;
Ngày đêm đưa rước chực hầu,
Công bình Thiên Đạo phép mầu Chí linh.

**89.** Móc nhọn vắt treo mình nhỏng nhảnh,
Cối đạp đồng rất mạnh giã dần;
Ấy là phạt kẻ lường cân,
Đo gian, đong thiếu, Thánh Thần chẳng kiêng.

**90.** Bầy chó dữ mang xiềng chạy đại,
Thấy tội nhơn xúm lại phân thây;
Hình nầy phạt kẻ dại ngây,
Khinh khi Tam Giáo đọa đày thế ni.

**91.** Ao nước nóng sôi thì sục sục,
Dầm cho người rã rục thịt xương;
Cũng vì lòng dạ vô lương,
Đệ huynh bất mục chẳng thương đồng bào.

**92.** Nhiều gộp núi như đao chơm chởm,
Thấy dùn mình tán đởm rất ghê;
Thây người máu chảy dầm dề,
Tiếng la than khóc tư bề rùm tai.

**93.** Phạt những kẻ sửa ngay ra vạy,
Tớ phản thầy, quan lại bất trung;
Hành rồi giam lại Âm cung,
Ngày đêm đánh khảo trăng cùm xiềng gông.

**94.** Hình bào lạc cột đồng vòi vọi,
Đốt lửa hồng ánh giọi chói lòa;
Trói người vào đó xát chà,
Vì chưng hung bạo đốt nhà bắn săn.

**95.** Có cọp dữ nhăn răng đưa vấu,
Gặp tội nhơn quào quấu xé thây;
Ấy vì lòng dạ chẳng ngay,
Giết người lấy của bị nay hình này.

**96.** Ao rộng lớn chứa đầy huyết phẩn,
Xô người vào, lặn lội nhờm thây;
Tanh hôi mình mẩy dẫy đầy,
Trồi lên hụp xuống gậy cây đánh đầu.

**97.** Để hành kẻ chứa xâu, lường của,
Trù ếm người, chửi rủa Tổ Tông;
Đồ dơ giặt đổ rạch sông,
Đương khi uế trược thẳng xông chỗ thờ.

**98.** Vào bếp núc lúc nhơ không kể,
Phơi áo quần chẳng nể tam quan;
Buông lời tục tĩu dâm loàn,
Lâu mau, nặng nhẹ, chịu mang tội nầy.

**99.** Ao rộng sâu chứa đầy giòi tửa,
Hơi tanh hôi thường bữa lẫy lừng;
Gạo cơm hủy hoại quen chừng,
Phạt ăn dơ dáy mới ưng tội hình.

**100.** Cột trói ngược quá kinh rất lạ,
Quỷ Dạ Xoa đánh vả kẹp cưa;
Vì chưng chửi gió mắng mưa,
Kêu tên Thần, Thánh chẳng chừa chẳng kiêng.

**101.** Bàn chông nhọn liền liền đánh khảo,
Tra tội nhơn, gian giảo, ngược ngang;
Hành người bế dịch, trợ hoang,
Thừa năm hạn đói mưu toan bức nghèo.

**102.** Thành Uổng Tử cheo leo gớm ghiếc,
Cầm hồn oan rên siết khóc than;
Dương gian ngỗ nghịch lăng loàn,
Liều mình tự vận không màng thảo ngay.

**103.** Xuống Địa Ngục đọa đày hành mãi,
Đúng số rồi còn phải luân hồi;
Hóa Công xem xét đền bồi,
Lành siêu dữ đọa thêm nhồi tội căn.

**104.** Cầu Nại Hà bắt ngang sông lớn,
Tội nhơn qua óc rởn dùn mình;
Hụt chơn ván lại gập ghình,
Nhào đầu xuống đó cua kình rỉa thây.

**105.** Nhiều thứ rắn mặt mày dữ tợn,
Ngóng cổ trông mắt trợn dòm người.
Gắp thây nuốt sống ăn tươi,
Vì bày thưa kiện móc bươi xúi lời;

**106.** Trong núi lửa bay hơi tanh khét,
Linh hồn người đầy nghẹt trong ngoài;
Phạt răn quến gái, dụ trai,
Bày ra thuốc độc, phá thai tuyệt loài.

**107.** Người ở thế mấy ai khỏi lỗi;
Biết lạc lầm sám hối tội căn;
Tu tâm sửa tánh ăn năn,
Ba giềng nắm chặt, năm hằng chớ lơi.

**108.** Ngặt có kẻ tưởng Trời tin Phật,
Mà trong lòng chẳng thật kỉnh thành;
Lâm nguy nguyện vái làm lành,
Tai qua rồi lại dạ đành phụ vong.

**109.** Chớ thái quá đừng lòng bất cập,
Phép tu hành luyện tập nhiều ngày;
Làm lành, xem phải, nói ngay,
Giữ ba điều ấy thiệt rày phước duyên.

**110.** Lời kệ sám di truyền khuyến thiện,
Câu văn từ luận biện thật thà;
Chẳng dùng những tiếng sâu xa,
E không hiểu thấu diễn ra ích gì ?,

**111.** Chớ buông tiếng thị phi khinh dễ,
Ráng làm lành phước để cháu con;
Làm người nhơn nghĩa giữ tròn,
Muôn năm bóng khuất tiếng còn bay xa. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CHƯ PHẬT TIÊN THÁNH THẦN.**

---
★ *Kinh này tụng thường ngày để mà ăn năn xin tội và sửa lòng theo kinh dạy, tránh điều quấy, cứ làm điều phải luôn luôn.*`,
  },
  {
    slug: 'bai-khen-ngoi-kinh-sam-hoi',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: 'Bài Khen Ngợi Kinh Sám Hối',
    printedPageLabel: '44',
    pdfPageStart: 46,
    purposeTags: ['Sám hối', 'Khuyến thiện'],
    timingTags: ['Thường ngày'],
    contentMarkdown: `Nghe lời khuyến thiện rất may,
Nguyện lòng niệm Phật, ăn chay, làm lành.
Ngày ngày tập sửa tánh thành,
Đêm đêm tự tỉnh, tu hành ăn năn.
Một là hối ngộ tội căn,
Hai là cầu đặng siêu thăng Cửu Huyền.
Đương sanh hạnh hưởng phước duyên,
Trong nhà già, trẻ miên miên thái bình.
Sau dầu đến chốn Diêm Đình,
Linh hồn trong sạch nhẹ mình thảnh thơi.
Luân hồi trở lại trên đời,
Tiền công thì cũng Phật, Trời thưởng ban.
Cầu xin trăm họ bình an,
Nước giàu, dân mạnh thanh nhàn muôn năm. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 12 gật (mỗi lạy 4 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT.**`,
  },
  {
    slug: '19-kinh-cuu-kho',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: '19. Kinh Cứu Khổ',
    printedPageLabel: '45',
    pdfPageStart: 47,
    purposeTags: ['Cứu khổ', 'Giải tai ương'],
    contentMarkdown: `**Nam mô Đại Từ Đại Bi Quảng Đại Linh Quan Thế Âm Bồ Tát (3 lần).**

Nam mô cứu khổ, cứu nạn, Quan Thế Âm Bồ Tát, Bá thiên vạn ức Phật, hằng hà sa số Phật; Vô lượng công đức Phật. Phật cáo A Nan ngôn, thử kinh Đại Thánh năng cứu ngục tù, năng cứu trọng bịnh, năng cứu tam tai bá nạn khổ.

Nhược hữu nhơn tụng đắc nhứt thiên biến, nhứt thân ly khổ nạn; tụng đắc nhứt vạn biến hiệp gia ly khổ nạn.

Nam mô Phật lực oai, Nam mô Phật lực hộ (1), sử nhơn vô ác tâm linh nhơn thân đắc độ, Hồi Quang Bồ Tát, Hồi Thiện Bồ Tát, A Nậu Đại Thiên Vương Chánh Điện Bồ Tát, Ma Kheo, Ma Kheo Thanh Tịnh Tỳ Kheo, quan sự đắc tán, tùng sự đắc hữu, chư Đại Bồ Tát, ngũ bá A La Hớn, cứu hộ đệ tử...

Nhứt thân ly khổ nạn, tự ngôn Quan Thế Âm Anh Lạc, bất tu giải cần đọc thiên vạn biến, tai nạn tự nhiên đắc giải thoát. Tín thọ phụng hành tức thuyết chơn ngôn viết: Kim Bà Kim Bà Đế, Cầu Ha Cầu Ha Đế, Đà La Ni Đế, Ni Ha La Đế, Tỳ Lê Ni Đế, Ma Ha Dà Đế, Chơn Lăng Càn Đế, Ta Bà Ha. ■

---
### ❖ Nghi thức lạy và câu niệm:
- **Cách lạy:** Lạy 3 lạy 9 gật (mỗi lạy 3 gật).
- **Câu niệm:** Mỗi gật niệm 1 câu:
  > **NAM MÔ CỨU KHỔ CỨU NẠN QUAN THẾ ÂM BỒ TÁT.**

---
**(1)** Có bản ghi: Nam mô Phật <u>luật</u> oai, Nam mô Phật <u>luật</u> hộ`,
  },
  {
    slug: 'noi-dung-phu-trai-ky',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: 'Nội dung phụ: Trai Kỳ',
    printedPageLabel: '46',
    pdfPageStart: 48,
    ritualTags: ['Trai giới'],
    contentMarkdown: `Nhập môn rồi thì phải tập trai giới, ban đầu ít nữa phải giữ lục trai, lần lần tập đến thập trai, thiên ngươn và trường trai được càng tốt.

- **Lục trai:** là ăn chay các ngày 1, 8, 14, 15, 23 và 30. (Như tháng thiếu thì ăn ngày 29 thế cho bữa 30).
- **Thập trai:** là ăn chay ngày mồng 1, 8, 14, 15, 18, 23, 24, 28, 29 và 30 (tháng thiếu ăn thêm ngày 27).
- **Thiên ngươn:** là ngày 1, 4, 6, 8, 9, 14, 15, 16, 18, 19, 23, 24, 25, 28, 29, 30 (tháng thiếu ăn thêm ngày 27). ■`,
  },
  {
    slug: 'noi-dung-phu-tho-phuong',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: 'Nội dung phụ: Cách Thờ Phượng Trong Nhà',
    printedPageLabel: '47',
    pdfPageStart: 49,
    ritualTags: ['Thờ phượng tại gia'],
    contentMarkdown: `Lập vị **THƯỢNG ĐẾ** thì phải lựa chọn chỗ cho thiệt xứng đáng. Tốt hơn là lựa giữa nhà và lập trang thờ cho cao. Phải giữ cho thiệt tinh khiết và treo màn cho khuất tịch chỗ thờ phượng. Giữa trang thì để **THÁNH TƯỢNG THIÊN NHÃN**, phía dưới Thánh Tượng có ba trấn là:
1. Ở giữa Lý Thái Bạch về Đạo Tiên.
2. Bên tả *(trong ngó ra)* Quan Thánh Đế Quân về Đạo Thánh.
3. Bên hữu Quan Thế Âm Bồ Tát về Đạo Phật.
Ba vị này thay mặt cho Tam Giáo trong **ĐẠI ĐẠO TAM KỲ PHỔ ĐỘ**.

**Nơi bàn thờ:** phía trong ở giữa để một cái đèn Thái Cực chong ngày đêm, bên tả hoa, bên hữu quả. Kế ba ly rượu và hai chén: 1 chén trà bên hữu, 1 chén nước lã bên tả. Phía ngoài: giữa lư hương, 2 bên để cặp đèn Nhựt Nguyệt. ■`,
  },
  {
    slug: 'noi-dung-phu-cach-lay',
    parentSlug: 'phan-1-kinh-cung-tu-thoi',
    title: 'Nội dung phụ: Cách Lạy',
    printedPageLabel: '48',
    pdfPageStart: 50,
    ritualTags: ['Nghi thức hành lễ'],
    contentMarkdown: `Chấp hai tay lại như cách dưới đây: Tay trái bắt **ẤN TÝ (1)**, rồi nắm lại. Kế đó, bàn tay mặt úp ngoài, ngón cái tay mặt bấm vào gốc ngón trỏ tay trái.
Để hai tay như vậy và đưa lên trán, xá sâu một xá, rồi quỳ xuống, đưa tay lên giữa trán mà niệm **“Nam mô Phật”**; đưa qua bên trái niệm **“Nam mô Pháp”**; đưa qua bên mặt niệm **“Nam mô Tăng”**, rồi đưa xuống trước ngực mà niệm:
- **Nam mô Cao Đài Tiên Ông Đại Bồ Tát.**
Và cúi đầu xuống niệm luôn Tam Trấn là:
- **Nam Mô Thái Bạch Kim Tinh.**
- **Nam Mô Quan Thế Âm Bồ Tát.**
- **Nam mô Quan Thánh Đế Quân.**
- **Nam mô Chư Phật, Chư Tiên, Chư Thánh, Chư Thần.**
*(Mỗi niệm mỗi cúi đầu xuống).*

Niệm rồi quỳ đó, đọc xong bài kinh cúng thầy lạy xuống 3 lạy, mỗi lạy gật đầu 4 cái, cộng là 12 gật, nhớ mỗi gật niệm **“Nam Mô Cao Đài Tiên Ông Đại Bồ Tát Ma Ha Tát”**.
- Lạy Phật và Tiên thì 3 lạy, mỗi lạy gật đầu 3 cái là 9 gật.
- Lạy Thần, Thánh 3 lạy không gật.
- Lạy vong phàm 4 lạy không gật.
Khi lạy thì hai bàn tay úp xuống và hai ngón cái gác tréo nhau nhưng đầu ngón cái tay phải không được rời khỏi khuyết Dần. ■

---
**(1)** Bắt ấn Tý nghĩa là: Bấm đầu ngón tay cái vào gốc ngón áp út, ngón tay cái của tay mặt bấm vào gốc ngón trỏ.`,
  },

  // ==========================================
  // PHẦN II: QUAN HÔN TANG TẾ
  // ==========================================
  {
    slug: 'phan-2-quan-hon-tang-te',
    title: 'PHẦN II: QUAN HÔN TANG TẾ',
    printedPageLabel: '49–127',
    pdfPageStart: 51,
    pdfPageEnd: 129,
    ritualTags: ['Quan Hôn Tang Tế'],
  },
  {
    slug: 'ii-a-loi-tua',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'A. Lời Tựa',
    printedPageLabel: '51',
    pdfPageStart: 53,
    contentMarkdown: `Để tiếp theo quyển tài liệu “Lễ Nhạc Đường”, Hội Thánh cho ban hành quyển kinh “Quan - Hôn - Tang - Tế” gồm những bài kinh cho các lễ về Nhơn Đạo.

Hầu hết những bài kinh này đã được thông dụng từ buổi đầu khai Đạo đến nay Hội Thánh soạn lại, sắp đặt theo thứ tự từng lễ từ sanh đến tử để cho các vị Quản lý và Nhân viên Phòng Lễ được dễ dàng trong hành sự.

Đối với một số bài kinh về Nhơn Đạo, sau nầy tuỳ sự tiến hóa của Đạo: Hội Thánh thiết tưởng cũng có chỗ cần xem xét chỉnh đốn lại đôi chút.

Vậy từ nay đến khi có lịnh của Hội Thánh, quyển kinh “Quan - Hôn - Tang - Tế” này được áp dụng trong các lễ về Nhơn Đạo cho được thống nhứt trong toàn Đạo. ■

**Hội Thánh**`,
  },

  // B. KINH SANH
  {
    slug: 'ii-b-kinh-sanh',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'B. KINH SANH',
    printedPageLabel: '53–57',
    pdfPageStart: 55,
    pdfPageEnd: 59,
    ritualTags: ['Kinh Sanh'],
  },
  {
    slug: 'b1-tam-thanh',
    parentSlug: 'ii-b-kinh-sanh',
    title: '1. Tắm Thánh',
    printedPageLabel: '53',
    pdfPageStart: 55,
    contentMarkdown: `Những vạn vật Âm Dương tạo hóa,
Dầu cỏ cây, hoa quả biến sanh;
Con người đứng phẩm tối linh,
Nửa Người, nửa Phật nơi mình anh nhi.
Đại Từ Phụ từ bi tạo hóa,
Tượng mảnh thân giống cả Càn khôn;
Vẹn toàn đủ xác, đủ hồn,
Xây cơ, chuyển thế bảo tồn Vạn Linh.
Xin gìn giữ Thánh hình thanh bạch,
Xin xá ân, rửa sạch tiền khiên;
Căn xưa ví dữ cũng hiền,
Dầu qua cửa tội cũng quyền cao siêu.
Công nuôi dưỡng, nâng niu khó nhọc.
Phép Thương yêu cũng học nơi Thầy;
Sanh nơi đây, ở nơi đây,
Trăm năm là tuổi, đủ đầy mạng căn.
Chốn hồng trần quen lằn gió bụi,
Cảnh phù ba may rủi cũng duyên;
Đã toan dốc kiếm diệu huyền,
Sanh sanh là phận, hiền hiền là công.
Đừng thối chí ngã lòng trở gót,
Để cho Đời chua xót tình thương;
Trăm năm thọ khảo vĩnh trường
Thuận căn, thuận mạng, đôi đường cao thăng. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'b2-vao-hoc',
    parentSlug: 'ii-b-kinh-sanh',
    title: '2. Vào Học',
    printedPageLabel: '54',
    pdfPageStart: 56,
    contentMarkdown: `Đại Từ Phụ xin thương khai khiếu,
Giúp trẻ thơ học hiểu văn từ;
Gần điều nên, lánh lẽ hư,
Nương gươm Thần huệ đoạn trừ nghiệt căn.
Dò đường Thánh khó khăn chẳng nại,
Tùng khuôn hồng nhỏ dại lớn khôn;
Buộc yêu thương bạn đồng môn,
Nghĩa nhân vẹn giữ xác hồn trăm năm.
Nguyện Tam cang gìn tâm trọn Đạo,
Nguyện Ngũ thường hiếu thảo làm khuôn;
Nguyện nên hương hỏa Tông đường,
Nguyện thương lê thứ trong trường công danh.
Cầu khẩn Đấng Chơn Linh nhập thể,
Đủ thông minh học lễ học văn;
May duyên gặp hội Phong Vân,
Thuyền thơ ngọn gió cát đằng xuôi đưa. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'b3-an-com',
    parentSlug: 'ii-b-kinh-sanh',
    title: '3. Ăn Cơm',
    printedPageLabel: '55',
    pdfPageStart: 57,
    contentMarkdown: `Giữa vạn vật con người một giống,
Phải uống ăn nuôi sống thân phàm;
Từ Bi ngũ cốc đã ban,
Dưỡng nuôi con trẻ châu toàn mảnh thân.
Công Thần Nông hóa dân buổi trước,
Dạy khôn ngoan học chước canh điền;
Nhớ Ơn bảo mạng Huyền Thiên,
Con mong mượn xác đoạt quyền vĩnh sanh. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'b4-an-com-roi',
    parentSlug: 'ii-b-kinh-sanh',
    title: '4. Ăn Cơm Rồi',
    printedPageLabel: '55',
    pdfPageStart: 57,
    contentMarkdown: `Nguyện nhớ Ơn nông canh nhằn nhọc,
Nguyện Ơn người lúa thóc giã, xay;
Ngậm cơm, Ơn ngậm hằng ngày,
Nên người, con nguyện ra tài lợi sanh.
Con cầu xin mảnh hình tráng kiện,
Giúp nên công xây chuyển cơ Đời;
Trên theo Phép luật Đạo Trời,
Dưới thương sanh chúng một lời đinh ninh. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'b5-di-ngu',
    parentSlug: 'ii-b-kinh-sanh',
    title: '5. Đi Ngủ',
    printedPageLabel: '56',
    pdfPageStart: 58,
    contentMarkdown: `Các vật dục xảy qua một buổi,
Cả hành vi lầm lỗi khôn ngừa;
Sấp mình cúi lạy xin thưa,
Ơn Trên Từ Phụ cho chừa tội khiên.
Trong giấc mộng nghỉ yên hồn phách,
Đấng Thiêng Liêng năng mách bảo giùm;
Bồng Lai, Cực Lạc chỉ chừng,
Đẩy đưa xác tục, dựa gần Cõi Linh. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'b6-thuc-day',
    parentSlug: 'ii-b-kinh-sanh',
    title: '6. Thức Dậy',
    printedPageLabel: '57',
    pdfPageStart: 59,
    contentMarkdown: `Vừa mở mắt giựt mình thức dậy,
Con mang ơn cúi lạy Từ Bi;
Tử sanh, sanh tử là chi,
Gẫm trong giấc mộng cũng bì như nhau.
Đây tới sáng xôn xao dưới Thế,
Những đua chen kiếm kế sanh nhai;
Có thân giữa Chốn đọa đày,
Đếm Ba vạn sáu ngàn ngày khó khăn.
Xin Từ Phụ ra ân Tế Độ,
Tăng Huyền Linh giác ngộ chí thành;
Rõ phước đức, biết tội tình,
Nắm tâm đắp vững mặt thành Càn Khôn.
Trên nhờ có Chí Tôn che chở,
Thần, Thánh, Tiên, Phật hộ thân hèn;
Đường tu nối bước cho quen,
Xa trần tăm tối, cận đèn Thiêng liêng. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },

  // C. HÔN NHƠN
  { slug: 'ii-c-hon-nhon', parentSlug: 'phan-2-quan-hon-tang-te', title: 'C. HÔN NHƠN', printedPageLabel: '58–63', pdfPageStart: 60, pdfPageEnd: 65, ritualTags: ['Hôn Nhơn'] },
  {
    slug: 'c1-gia-quan',
    parentSlug: 'ii-c-hon-nhon',
    title: '1. Gia Quan',
    printedPageLabel: '58',
    pdfPageStart: 60,
    contentMarkdown: `Ngày nay Thiên quý chi kỳ,
Gia quan điểm ngạch kịp kỳ thành nhơn.
Phước như Đông hải, Nam sơn,
Trời ban trí lực nhơn nhơn yêu vì.
Tánh lành gồm đủ lễ nghi,
Tam cang, Ngũ lý, học y vào lòng.
Phước nhà tánh trẻ vẹn trong,
Xứng câu hồ thỉ, tang bồng rạng danh.
Vào nền phong nhã, trâm anh,
Trời cao nhỏ phước để dành ngày sau.
Lớn khôn lộc cả công cao,
An bang tế thế tên vào sử xanh.
Tơ duyên Nguyệt Lão sẵn dành,
Ơn nhà, nợ nước xử rành phận trai.
Cầu cho nước trị lâu dài,
Muôn dân lạc nghiệp hiền tài trổ tên. ■`,
  },
  {
    slug: 'c2-gia-ke',
    parentSlug: 'ii-c-hon-nhon',
    title: '2. Gia Kê',
    printedPageLabel: '59',
    pdfPageStart: 61,
    contentMarkdown: `Ngày nay Nhị thất chi thì,
Hoạ mi đối ảnh mừng kỳ Cặp kê;
Noi gương Cử án Tề mi,
Gái tài Mạnh Thị vui bề gia phong.
Ngôn, Dung, Công, Hạnh trau lòng,
Làu làu Tiết giá khuê phòng rạng gương.
Nhà nhà đặng gái hiền lương,
Tơ duyên sau cũng gặp phường trâm anh.
Tuổi xanh Ngũ lý chuyên rành,
Ơn Trên ban thưởng, phước dành hậu lai.
Ước sau sánh đặng trai tài,
Phao cầu xạ tước duyên hài xứng đôi.
Nền Nhơn bến Đức vun bồi,
Cầu cho bá tánh gặp Hồi Phong niên. ■`,
  },
  {
    slug: 'c3-vu-quy',
    parentSlug: 'ii-c-hon-nhon',
    title: '3. Vu Quy',
    printedPageLabel: '60',
    pdfPageStart: 62,
    contentMarkdown: `Đầu vọng bái Cao Đài Thượng Đế,
Chứng cho con làm lễ Vu Quy;
Ngày nay tùng phụ trọn nghì,
Đến mai xuất giá phải đi theo chồng.
Xin Thượng Đế rộng lòng thương trẻ,
Hộ cho con mạnh khỏe đến già;
Con xin làm lễ ông bà,
Cùng cha với mẹ ruột rà anh em.
Ơn cha mẹ ngày đêm hoạn dưỡng,
Trả chưa tròn nghĩa trượng cù lao;
Thiên thành số định biết sao,
Nhỏ nương cha mẹ lớn giao Tấn Tần.
Phận bồ liễu an phần xuất giá,
Chúc song thân phước cả non sông;
Ra đi giọt lệ nhỏ ròng,
Phận làm nhi nữ Tam tùng phải vâng.
Đầu cúi lạy chín tầng minh phán,
Hộ lưỡng thân hạc táng linh qui;
Mai con dời gót ra đi,
Gìn câu phu xướng phụ tuỳ từ đây. ■`,
  },
  {
    slug: 'c4-loi-nguyen-cau-hon',
    parentSlug: 'ii-c-hon-nhon',
    title: '4. Lời Nguyện Cầu Hôn',
    printedPageLabel: '61',
    pdfPageStart: 63,
    contentMarkdown: `Mười hai lạy khẩn cầu Thượng Đế,
Chứng hai con làm Lễ Thành Hôn;
Từ đây Tần Tấn nhứt môn,
Gióng dây cầm sắt ôn tồn êm tai.
Trên Thượng Đế phước dày rưới xuống,
Dưới hai con nhờ lượng hải hà;
Cùng nhau kết tóc đến già,
Vui câu tùy xướng thuận hòa dưới trên.
Trai nguyện dốc giữ bền ngay thảo,
Gái hằng lo trọn Đạo thờ chồng;
Trăm năm tình mặn nghĩa nồng,
Vui niềm cang lệ hiệp đồng phụng loan.
Thề chẳng thấy giàu sang mà chuộng,
Thề không xem hèn mọn mà vong;
Trước sau lòng giữ một lòng,
Ngọt, bùi, cay, đắng cũng đồng sớt chia.
Câu kế đại xưa kia đã trọng,
Nhờ Ơn Trên lượng rộng đoái thương;
Cầu cho nối chút Lửa Hương,
Con con, cháu cháu nghĩa phương lâu dài. ■

**NAM MÔ THƯỢNG ĐẾ CAO ĐÀI**`,
  },
  {
    slug: 'c5-sam-hon-phoi',
    parentSlug: 'ii-c-hon-nhon',
    title: '5. Sám Hôn Phối',
    printedPageLabel: '62',
    pdfPageStart: 64,
    contentMarkdown: `Ơn Trời đất âm, dương khí hạp.
Đức Hóa Sanh rậm rạp cỏ cây;
Máy Kiền Khôn nhựt nguyệt vần xây,
Trợ thời tiết tháng ngày điều nhuận.
Hơi nước lửa lẫy lừng tiếp ứng,
Muôn vật đều cảm hứng thục yên;
Nam, nữ thành giai ngẫu nhơn duyên,
Tử, tôn đặng diên niên thạnh phát.
Vọng Thượng Đế Cao Đài hỷ lạc,
Cùng Phật, Tiên, Bồ Tát từ bi.
Nguyện Tơ Hồng Nguyệt Lão chứng tri,
Xe chỉ thắm kịp thì kết phát.
Giúp Hai Họ hòa hài vĩnh đạt,
Thành thất gia hiệp tác xướng tùy;
Cầu trăm năm tường triệu hùng bi,
Con cháu đặng Vĩnh thuỳ Phước khánh. ■`,
  },
  {
    slug: 'c6-giao-boi',
    parentSlug: 'ii-c-hon-nhon',
    title: '6. Giao Bôi',
    printedPageLabel: '63',
    pdfPageStart: 65,
    contentMarkdown: `Giờ hiệp cẩn giao bôi phụng chước,
Thơ chung tư ca lược miên trường;
Mừng thay môn đệ đôi đường,
Tình chung giữ vẹn lửa hương phỉ nguyền.
Bề ân ái tương liên tương đối,
Đường Đạo, Đời một mối tương thân.
Cùng nhau vui phận Châu Trần,
Sanh con đẻ cháu hưởng phần lộc ban;
Nhắm sau trước một đàng kế thế,
Giữ đạo tâm, cang lệ miên trường;
Mấy lời ca tụng thành chương,
Mừng đôi bạn trẻ kiết tường song song.
Trăm năm đẹp vợ thuận chồng,
Cám tình Nguyệt Lão tơ hồng xe dây. ■`,
  },

  // D. KINH LÃO
  { slug: 'ii-d-kinh-lao', parentSlug: 'phan-2-quan-hon-tang-te', title: 'D. KINH LÃO', printedPageLabel: '64–67', pdfPageStart: 66, pdfPageEnd: 69, ritualTags: ['Kinh Lão'] },
  {
    slug: 'd1-dao-tue',
    parentSlug: 'ii-d-kinh-lao',
    title: '1. Đáo Tuế',
    printedPageLabel: '64',
    pdfPageStart: 66,
    contentMarkdown: `Người sanh trăm tuổi chi kỳ,
Mừng nay hưởng đặng ngoại kỳ... mươi.
Tinh thần còn đặng tốt tươi,
Nhờ Ơn Trời, Phật thương Người thiện căn.
Cầu cho phước lộc cao thăng,
Vui niềm phú quý, gia tăng tuổi già.
Mỹ tai! Hề thiện mỹ tai!
Thọ dư bách tuế Thiên Thai trở về.
Gia đàng thuận thảo phu thê,
Năm đời thọ hưởng vinh huê thái bình.
Cầu cho quốc vận khương ninh,
Mưa hoà gió thuận, dân tình bình yên. ■`,
  },
  {
    slug: 'd2-con-chau-chuc-mung',
    parentSlug: 'ii-d-kinh-lao',
    title: '2. Con Cháu Chúc Mừng',
    printedPageLabel: '65',
    pdfPageStart: 67,
    contentMarkdown: `Năm ....... tháng ....... ngày .......,
Khắp cháu con cả thảy trong nhà;
Cúi dâng Tiên tửu, Tiên trà,
Cầu cho .......... đặng phước già sống lâu.
Ơn Trời, Phật cao sâu non, biển,
Chứng minh người phước thiện vẹn toàn;
Trong nhà đặng chữ bình an,
Ngoài sân đơn quế, chi lan tươi màu.
Con chúc Cha (Mẹ) mái đầu tóc bạc,
Cháu cầu Ông (Bà) tuổi hạc, da mồi;
Cầu cho tám, chín, mười mươi,
Càng cao thể vị, càng tươi lân đình.
Trên nhờ có Thánh minh chiếu giám,
Dưới cầu Ông (Bà) hạc táng, linh qui;
Trong ngoài vẹn vẻ đình vi,
Quế hòe tươi tốt, lan chi sum vầy.
Cầu Trời, Phật họ .......... vạn tuế,
Tu hành thì hộ vệ chẳng sai;
Muôn năm áo mão cân đai,
Ngàn năm tu niệm Phật Đài khỏe thân.
Đệ tử chí tâm qui mạng lễ,
Xin Cao Minh phổ tế vẹn toàn;
Cầu cho trăm họ bình an,
Nước giàu, dân mạnh thanh nhàn muôn năm. ■`,
  },
  {
    slug: 'd3-bai-thai-le-dao-tue',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Bài Thài Lễ Đáo Tuế: Từng Hương (Trầm)',
    printedPageLabel: '66',
    pdfPageStart: 68,
    contentMarkdown: `Trầm đàn khói kết năm mây,
Mùi hương phưởng phất, hây hây chín từng.
Thơm tho rực rỡ khắp nơi,
Gia trung phú quý, thảnh thơi sang giàu. ■`,
  },
  {
    slug: 'd4-tung-so',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Từng Sơ',
    printedPageLabel: '66',
    pdfPageStart: 68,
    contentMarkdown: `Mừng nay thân phụ (mẫu) tuổi cao,
Ơn Trên Cúc Dục, Cù Lao, Sanh Thành.
Da mồi, tóc bạc khiết tinh,
Dạy con, lẫn cháu hiển vinh một nhà. ■`,
  },
  {
    slug: 'd5-tung-a',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Từng Á',
    printedPageLabel: '66',
    pdfPageStart: 68,
    contentMarkdown: `Vui mừng Đạo Đức âu ca,
Tề gia lương thiện, chói lòa thuở nay.
Quỳnh tương chén ngọc khắp bay,
Kính dâng một tiệc hết ngày tân toan. ■`,
  },
  {
    slug: 'd6-tung-chung',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Từng Chung',
    printedPageLabel: '67',
    pdfPageStart: 69,
    contentMarkdown: `Lục (Thất, Bát,...) tuần tuổi thọ lẻ xuân,
Cháu, con đông đủ vui mừng phụ (mẫu) thân;
Sống thời lấy lễ tiệc dưng,
Ba từng chay lạt, đền phần thảo ngay. ■`,
  },
  {
    slug: 'd7-tung-huu-thuc',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Từng Hựu Thực',
    printedPageLabel: '67',
    pdfPageStart: 69,
    contentMarkdown: `Mùi dưng náo nức Quỳnh tương,
Thọ diên hựu thực, ba xuân cho tròn;
Tiệc mừng vui với sông, non,
Tuổi qui, tác hạc, cháu con vui vầy.
Vô cương, phước thọ từ đây,
Trời còn thêm tuổi, Đất dày ngàn thu. ■`,
  },
  {
    slug: 'd8-hien-tra',
    parentSlug: 'ii-d-kinh-lao',
    title: 'Hiến Trà',
    printedPageLabel: '67',
    pdfPageStart: 69,
    contentMarkdown: `Hây hây tuyết điểm trà phang,
Ô long phưởng phất ngọc lan ngọt ngào;
Kính dưng trà đạm thanh thao,
Cháu, con lớn nhỏ sang giàu vầy vui. ■`,
  },

  // E. KINH BỆNH
  { slug: 'ii-e-kinh-benh', parentSlug: 'phan-2-quan-hon-tang-te', title: 'E. KINH BỆNH', printedPageLabel: '68–70', pdfPageStart: 70, pdfPageEnd: 72, ritualTags: ['Kinh Bịnh'] },
  {
    slug: 'e1-cau-cho-con-lanh-binh',
    parentSlug: 'ii-e-kinh-benh',
    title: '1. Cầu Cho Con Lành Bịnh',
    printedPageLabel: '68',
    pdfPageStart: 70,
    contentMarkdown: `Trên Thượng Đế - Đấng công bình,
Dưới trần có nạn cầu xin ơn lành.
Trẻ thơ lâm tật biến sanh,
Ngưỡng trông đức cả, độ lành bịnh căn.
Nguyền xin cho trẻ thơ măng,
Thánh, Thần ủng hộ phước tăng, họa lìa.
Hết lòng khẩn nguyện sớm khuya,
Phận làm Cha, Mẹ ước chia khổ nàn.
Ơn Trên xin nhận lời than,
Cho thuyên bệnh trẻ, cho an tinh thần.
Chí Tôn rưới chút mưa ân,
Khẩn cầu cho trẻ mạnh lành như xưa.
Mai sau việc dữ biết chừa,
Mở lòng trẻ dại mến ưa điều lành.
Nén hương xin thấu Cung xanh,
Kinh cầu liền đọc, Ơn lành liền ban.
Thành tâm Trời chứng rõ ràng,
Con người thiện nguyện, mọi đàng vẹn xong. ■`,
  },
  {
    slug: 'e2-cau-cho-minh-lanh-binh',
    parentSlug: 'ii-e-kinh-benh',
    title: '2. Cầu Cho Mình Lành Bịnh',
    printedPageLabel: '69',
    pdfPageStart: 71,
    contentMarkdown: `Trên Ngọc Đế chánh minh xử phán,
Hành bịnh tôi rất đáng vô hồi;
Phép công thưởng, phạt đền bồi,
Trả cho xong tội mới rồi tai khiên,
Ân hóa dục linh thiêng chiếu giám.
Đức Từ Bi thứ giảm bịnh căn;
Nếu như tội rất dữ dằn,
Phạt thêm đau đớn nhọc nhằn cũng cam.
Tỉnh ngộ rõ luật Trời linh cảm,
Khổ hình vương đâu dám thở than;
Bịnh căn biết nặng tội mang,
Tôi nguyền sửa lỗi, thệ đoan làm lành. ■`,
  },
  {
    slug: 'e3-cau-cho-nguoi-lanh-binh',
    parentSlug: 'ii-e-kinh-benh',
    title: '3. Cầu Cho Người Lành Bịnh',
    printedPageLabel: '70',
    pdfPageStart: 72,
    contentMarkdown: `Trên Ngọc Đế mắt Thần soi khắp,
Trí công minh sửa phạt phàm gian;
Tên ................ phạm tội mắc nàn,
Họ ................ căn bịnh rên than muôn phần.
Nguyền Thượng Đế oai Thần tế độ,
Lòng xót thương ủng hộ phước tăng;
Dung cho thuyên giảm bịnh căn,
Chúng sanh rõ biết ăn năn làm lành.
Cầu Thần, Thánh háo sanh bố đức,
Giúp chúng tôi gắng sức, trợ đời;
Có lòng tin tưởng Phật, Trời,
Cứu an thân thể, thảnh thơi linh hồn.
Xui kẻ bịnh tâm tồn, nhẫn nại,
Bền chặt gìn, chẳng hoại lòng Thiền;
Bịnh nhơn đặng mãn tai khiên,
Chịu điều khổ não, chẳng phiền, chẳng than.
Phải khó nhọc đền bồi vận hạn,
Kết quả rồi, mới hãn phép công. ■`,
  },

  // F. KINH TỬ
  { slug: 'ii-f-kinh-tu', parentSlug: 'phan-2-quan-hon-tang-te', title: 'F. KINH TỬ', printedPageLabel: '71–80', pdfPageStart: 73, pdfPageEnd: 82, ritualTags: ['Kinh Tử'] },
  {
    slug: 'f1-cau-hon-luc-hap-hoi',
    parentSlug: 'ii-f-kinh-tu',
    title: '1. Cầu Hồn Lúc Hấp Hối',
    printedPageLabel: '71–72',
    pdfPageStart: 73,
    contentMarkdown: `Lòng thành kính môn sanh khấu bái,
Nhờ Ơn Trên hà hải độ nàn;
Nam Mô Thượng Đế Ngọc Hoàng,
Nam Mô Phật Tổ Tây Phang chứng lòng.
Mong Thái Thượng Đức Ông độ dẫn,
Cầu Kim Tinh đoái phận ngu phàm;
Nam Mô Nam Hải Quan Âm,
Từ bi cứu khổ ân thâm muôn đời.
Quan Thánh Đế lắm lời khuyến dạy,
Khuyên làm lành nhân ngãi vẹn toàn;
Nam Mô Chư Phật, Chư Tôn,
Cứu người bệnh ngặt, đương cơn mê mờ.
Nguyện xác khỏi hành hà khổ cực,
Cầu lâm chung hồn xuất dễ dàng;
Từ nay lìa khỏi trần gian,
Nương mây theo gió, nhẹ nhàng phi thăng.
Mãn kiếp đọa trầm luân khổ hải,
Cầu ngôi xưa trở lại Tiêu Diêu;
Mong ơn Địa Tạng độ siêu,
Âm Tào, Đông Nhạc giảm tiêu tội hình.
Kìa Bạch Ngọc rộng thinh cửa mở;
Chờ rước Người sạch nợ luân hồi;
Cầu cho Hồn đặng nhẹ khơi,
Phướn thần theo dõi đến nơi Thiên Đình. ■`,
  },
  {
    slug: 'f2-dua-linh-hon',
    parentSlug: 'ii-f-kinh-tu',
    title: '2. Đưa Linh Hồn',
    printedPageLabel: '72',
    pdfPageStart: 74,
    contentMarkdown: `Có câu sống gởi, thác về,
Nhớ chừng Tiên cảnh là quê thanh nhàn.
Rày mừng sanh thuận, tử an,
Hồn ra khỏi xác nhẹ nhàng phi thăng.
Tường vân bốn hướng bao giăng,
Thanh tao tiếng hạc, tiếng đàn Hư không.
Cõi trần giữ sạch bụi hồng,
Công tròn, quả đủ vui lòng hườn nguyên.
Anh em một dạ kỉnh Thiền,
Đồng đưa Hồn Phách lánh miền trần ai. ■

**NAM MÔ THƯỢNG ĐẾ CAO ĐÀI**`,
  },
  {
    slug: 'f3-tuyet-khi',
    parentSlug: 'ii-f-kinh-tu',
    title: '3. Tuyệt Khí',
    printedPageLabel: '73',
    pdfPageStart: 75,
    contentMarkdown: `Trái oan nay đã an bày,
Linh hồn nương chốn Phật Đài lo tu.
Cũng nhờ một lúc công phu,
Nay về ở chốn non vu hưởng nhàn.
Hồn ra khỏi xác hân hoan,
Nương theo câu kệ tầm đàng Phật phang.
Lưỡng biên Thổ Địa, Thành Hoàng,
Khu tà, trục quỷ vẹt đàng cho qua.
Tới lui đôi bực Tỳ bà,
Nhớ chừng Tiên cảnh là nhà thuở xưa.
Trầm luân cuộc thế nên chừa,
Huỳnh Đình tụng niệm Phật đưa trở về.
Tường vân bạch hạc giao kề,
Sơn đầu tòng bá cỏ huê đượm nhuần.
Tràng phang, Bửu cái tay nưng,
Tây Phương nương gió trông chừng ruổi dung.
Có câu Nhơn nguyện Thiên tùng,
Trần gian lánh khỏi thung dung Phật Đài. ■`,
  },
  {
    slug: 'f4-nhap-mach',
    parentSlug: 'ii-f-kinh-tu',
    title: '4. Nhập Mạch',
    printedPageLabel: '74',
    pdfPageStart: 76,
    contentMarkdown: `Dây oan nghiệt buộc ràng trái chủ,
Nương Huyền Linh sạch giữ thất tình;
Càn Khôn bước tới Thượng Đình,
Giải xong xác tục, mượn hình Chí Tôn.
Khối vật chất vô hồn viết tử,
Đất biến hình tự thử quy căn;
Đừng vì thân ái nghĩa nhân,
Xôn xao thoát khỏi xa lần Bến mê.
Hồn Trời hóa trở về Thiên cảnh,
Xác Đất sanh đến lịnh phục hồi;
Từ đây Cực Lạc an ngôi,
Lánh nơi trược khí hưởng mùi siêu thăng. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'f5-cau-sieu-nguoi-moi-tu-tran',
    parentSlug: 'ii-f-kinh-tu',
    title: '5. Cầu Siêu Người Mới Từ Trần',
    printedPageLabel: '74–75',
    pdfPageStart: 76,
    contentMarkdown: `Nay đệ tử lòng thành khấu bái,
Vọng Hoàng Thiên quảng đại từ bi.
Ân đức oai thâm diệu huyền vi,
Chúa nhơn vật chiếu tri Tam giới.
Trên bố đức Bốn phương khắp rãi,
Dưới muôn loài quỳ lạy ngưỡng trông.
Thức lòng phàm đặng rõ phép công,
Đường sanh, tử diệt đồng hữu mạng.
Cuộc chuyển thế đền bồi khổ nạn,
Đấng Thượng Khung xử đoán phân minh.
Vớt vong hồn nơi chốn U minh,
Tiếp duyên phước đăng trình Cõi Thọ.
Cho gặp gỡ lục thân thuở nọ,
Quyến luyến tình chẳng bỏ lòng thương.
Nhờ Ơn Trên giúp kẻ Trần Dương,
Còn mê muội chưa tường tội phước.
Mau thức tỉnh ăn năn lỗi trước,
Tưởng Phật, Trời lần bước hồi đầu.
Nhờ Ơn lành giải hóa tâm sầu,
Đặng sáng biết đảo cầu Trời, Phật.
Lòng lương thiện noi đàng chánh thật,
Khỏi vương mang bệnh tật vào mình.
Mong Từ Bi quảng đại, hiển linh,
Độ kẻ mới tách mình, lìa xác.
Nương yến sáng, hào quang thông đạt,
Soi tỏ tường lờ lạt âm cung.
Thoát khỏi nơi thầm tối hiểm hung,
Tùng Tiên, Phật thung dung khoái lạc.
Dạ thành kính Thần minh chiếu tạc,
Hộ thân tâm an lạc hòa bình. ■`,
  },
  {
    slug: 'f6-cao-tu-to',
    parentSlug: 'ii-f-kinh-tu',
    title: '6. Cáo Từ Tổ',
    printedPageLabel: '76',
    pdfPageStart: 78,
    contentMarkdown: `Nhơn sanh thiên số chi kỳ,
Người sau, kẻ trước đồng quy một đàng.
Mãn căn trở lại Tiên bang,
Tiêu diêu khoái lạc, tránh đàng mê tân.
Hôm nay ... ... qui thần,
Là ngày rảnh nợ hồng trần du Tiên.
Cúi xin Thất Tổ, Cửu Huyền,
Thương lòng con thảo, cháu hiền thọ tang.
Quả hoa điện hiến Linh Sàng,
Tiên Linh chiếu cố tọa bàn chứng minh.
Lễ nghi quảy hiếu cung trình,
Có linh xin hưởng chút tình thảo thân. ■`,
  },
  {
    slug: 'f7-thinh-vong',
    parentSlug: 'ii-f-kinh-tu',
    title: '7. Thỉnh Vong',
    printedPageLabel: '77',
    pdfPageStart: 79,
    contentMarkdown: `Mừng thay rảnh đặng cuộc trần,
Tiêu diêu Cõi thọ, tinh thần thêm tươi.
Vườn xuân đào lý vui cười,
Chào mừng bạn cũ khỏi mười ngục quan.
Linh hồn trở lại Tiên bang,
Thỏa lòng hứng cảnh, Thiên đàng viếng thăm.
Vui vầy cùng bạn tri âm,
Nhớ khi ở thế bạn cầm trước mai.
Khi xưa thờ Đức Cao Đài,
Nay về Tiên cảnh, Bệ giai chực hầu.
Trải xem trong cuộc bể dâu,
Tu hành là Đạo đứng đầu Nhơn gian.
Xem qua trong máy Hành tàng,
Một ngày Cõi thọ, là ngàn thế gian.
Giờ nay đăng chúc huy hoàng,
Tửu, trà, hoa, quả bỉ bàng kính dưng.
Tỏ trong ... ... chúc mừng.
Mừng vong linh đặng rảnh phần trả vay.
Cầu xin Thượng Đế Cao Đài,
Cho hồn ... ... cấp lai kỷ tiền. ■`,
  },
  {
    slug: 'f8-thanh-phuc',
    parentSlug: 'ii-f-kinh-tu',
    title: '8. Thành Phục',
    printedPageLabel: '78',
    pdfPageStart: 80,
    contentMarkdown: `Noi theo Văn Lễ hiến dưng,
Lòng thành rượu rót ba từng mời khuyên.
Giờ nay cưỡi hạc du Tiên,
Gia đàng, quyến thuộc, lòng Thiền quảy tang.
Âm, Dương phân cách đôi đàng,
Kẻ còn, người mất nghĩ càng dở dang.
Trăm năm trong cuộc trần hoàn,
Bơ vơ chiết nhạn rẽ hàng kêu sương.
Linh hồn nguyện đến Tây Phương,
Tiêu diêu khoái lạc thoát đường trần ai.
Tử sanh cổ vãng, kim lai,
Dương gian là cảnh, Thiên Đài là quê.
Mãn căn đúng số trở về,
Trả, vay rảnh việc an bày tầm Tiên,
Lễ nghi kỉnh bái Án tiền,
Chứng minh gia quyến lòng Thiền thọ tang. ■`,
  },
  {
    slug: 'f9-trieu-tich',
    parentSlug: 'ii-f-kinh-tu',
    title: '9. Triêu Tịch',
    printedPageLabel: '79–80',
    pdfPageStart: 81,
    contentMarkdown: `Nơi Biển khổ tưng bừng sóng bủa,
Chốn kỳ viên mây tủa mịt mù;
Người đời mấy bực danh nhu,
Vô thường đến lúc công phu lỡ làng.
Đường tử biệt nghĩ càng bát ngát,
Nguyện Linh hồn an lạc non Tiên;
Nhìn xem Linh cửu thêm phiền,
Thương người mạng bạc huỳnh tuyền vội lui.
Cuộc sống thác ngậm ngùi, ngùi tủi,
Nẻo mất còn chạnh buổi phù sanh;
Khó đo mấy Tạo dữ lành,
Âm Dương cách biệt không đành lấp ngơ,
Nhớ Linh xưa tánh tình ăn ở,
Dưới, trên hòa, lớn, nhỏ đồng thương;
Hiền lành ngợi khắp thôn hương,
Dưới dìu kẻ khó, trên nhường người cao.
Lúc ở thế xử tròn Nhơn Đạo,
Nay từ trần an bảo, cựu Ngôi;
Thương ôi! Nước chảy hoa trôi,
Sao đời, vật đổi mấy hồi tang thương.
Người tạm thế như cơn sóng lượn,
Kẻ lâm trần mường tượng ngút sương;
Kể sao cho xiết đoạn trường,
Ngựa qua cửa sổ, hai đường biệt ly!
Thảm thiết than, than rồi lại nghĩ,
Giấc mộng trần cũng tỷ vân phi;
Có câu thố tử hồ bi,
Vật còn thương loại, huống gì người yêu.
Khuyên đoái tưởng ......... hiền ......... hiếu,
.................. đa thiểu xin thương;
Tạm dùng dưa, muối, rau, tương,
Trà thô, rượu lạt, lòng thương chứng cùng.
Lần tay tính ngày qua, tháng lụn.
Ôi, thôi rồi một cụm khói chan;
Khói chan mù mịt Linh Sàng,
Tưởng nơi nguồn cội, dạ còn xót xa.
Nỗi vắng mặt khó mà khuây lãng,
Biết cậy ai phân đoán hỏi han;
Hôm nay hội diện thân bằng,
.................. đưa linh cửu lên đàng hết trông.
Tử, sanh nhơn nghĩa diệc đồng,
Hồn linh thăm viếng dặn lòng chớ quên. ■`,
  },

  // G. KINH ĐIẾU
  { slug: 'ii-g-kinh-dieu', parentSlug: 'phan-2-quan-hon-tang-te', title: 'G. KINH ĐIẾU', printedPageLabel: '81–90', pdfPageStart: 83, pdfPageEnd: 92, ritualTags: ['Kinh Điếu'] },
  {
    slug: 'g1-dieu-tang',
    parentSlug: 'ii-g-kinh-dieu',
    title: '1. Điếu Tang',
    printedPageLabel: '81',
    pdfPageStart: 83,
    contentMarkdown: `Nợ trần thế ngày nay đã rảnh,
Nương mây lành lên cảnh Thiên Thai;
Là nơi hưởng lộc lâu dài,
Lánh vòng thế tục, sắc tài ái ân.
Công phu khuya sớm ân cần,
Hồn linh nay đặng về gần Phật, Tiên.
Khi xưa gặp lúc Chơn Truyền,
Nay về chầu chực bệ tiền khỏe thân.
Giờ nay Đạo ... ... qui thần,
Anh em, bậu bạn bội phần mừng thương,
Mừng là thấy cõi Tây Phương,
Thương là đang lúc giữa đường rẽ phân.
Tuy là chẳng phải đồng thân,
Cùng nhau đồng Đạo, nghĩa nhân mặn nồng.
Tử, sanh do tại Thiên công,
Những ngày vắng mặt bận lòng nhớ thương.
Tạm dùng Lễ mọn rau, tương,
Trà thô đạm bạc, lòng thương chứng cùng;
Giữ bền hai chữ thủy chung,
Ngày sau Tiên cảnh trùng phùng đệ, huynh. ■`,
  },
  {
    slug: 'g2-cha-me-quy-lieu',
    parentSlug: 'ii-g-kinh-dieu',
    title: '2. Cha Mẹ Quy Liễu',
    printedPageLabel: '82–83',
    pdfPageStart: 84,
    contentMarkdown: `Ơn Cúc dục Cù lao mang nặng,
Lỡ thân côi mưa nắng khôn ngừa.
Âm dương cách bóng sớm trưa,
Thon von phận bạc khôn vừa hiếu thân.
Đầu cúi lạy phụ (mẫu) thân linh hiển,
Lễ muối, dưa là miếng hiếu tâm;
Ven Trời gởi chút tình thâm,
Động lòng thương nhớ tuôn dầm lệ sa.
Xin đoái tưởng ruột rà máu mủ;
Cõi Hư linh bao phủ ân hồng.
Cảnh Thiên noi bước Hóa công,
Nắm phan tiếp dẫn vào vòng Như Lai.
Chốn Hư linh chờ ngày hội hiệp,
Dầu căn xưa, quả kiếp dường bao;
Thà cam vui chốn Động Đào,
Đừng vì nhớ trẻ trở vào Phàm gian.
Nuốt tiếng than đôi hàng lã chã,
Tưởng đến điều nhơn quả mà đau;
Xem thân tuổi hạc càng cao,
E ra tử biệt Thiên Tào định phân.
Nối Hương Lửa Nhơn Luân Đạo trọng,
Con gìn câu chết, sống trọn nghì;
Sấp mình cúi lạy Từ Bi,
Tiền khiên phụ mẫu, Tam Kỳ xá ân.
Xin phụ (mẫu) thân định thần, định tánh,
Noi khuôn linh, nẻo Thánh đưa chơn;
Thong dong Cõi Thọ nương hồn,
Chờ con lập đức giúp huờn ngôi xưa.
Chung ly biệt con đưa tay rót,
Mối thương tâm chưa ngớt đeo sầu;
Cha ở đâu? Mẹ nơi đâu?
Tâm tang kính gởi một bầu lệ châu. ■`,
  },
  {
    slug: 'g3-to-phu-quy-lieu',
    parentSlug: 'ii-g-kinh-dieu',
    title: '3. Tổ Phụ Quy Liễu',
    printedPageLabel: '83–84',
    pdfPageStart: 85,
    contentMarkdown: `Giọt máu mủ lưu truyền tại Thế,
Con những mong truyền kế lửa hương;
Nguyện cùng Thất Tổ xin thương,
Cho bền gang tấc, noi đường thảo ngay,
Xưa đã đặng phước may gặp Đạo,
Nay phò trì con, cháu tu tâm;
Dâng gươm Huệ kiếm xin cầm,
Chặt lìa trái chủ đặng tầm ngôi Thiên.
Dầu tội chướng ở miền Địa giới,
Dầu oan gia ở ngoại Càn Khôn;
Dầu mang xác tục hay hồn,
Nhớ cầu Từ Phụ Chí Tôn cứu nàn.
Dầu đoạt vị ở an Tiên cảnh,
Dầu tái sanh nơi cảnh siêu phàm;
Nương thuyền Bát Nhã cho an,
Dìu đường con cháu vào đàng nghĩa nhân.
Kìa lố bóng Hồng Ân bao phủ,
Cả thế gian đầy đủ Đạo mầu;
Âm Dương đôi nẻo như nhau,
Cửu Huyền Thất Tổ giữ câu phò trì.
Chốn Tây Phương đường đi thong thả,
Cõi Diêm cung tha quả vong căn;
Tiêu diêu định tánh nắm phan,
Dò theo Cực Lạc đôi đường siêu thăng,
Nhớ nỗi Hiếu khó ngăn nét thảm,
Tưởng nguồn Ân đốt nén tâm hương;
Tấc lòng đoài đoạn đau thương,
Chơn mây vái với Hương Hồn hiển linh. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'g4-chong-quy-lieu',
    parentSlug: 'ii-g-kinh-dieu',
    title: '4. Chồng Quy Liễu',
    printedPageLabel: '85–86',
    pdfPageStart: 87,
    contentMarkdown: `Niềm ân ái thân hòa làm một,
Nghĩa sơ giao khắc cốt ghi xương;
Nhắn mưa gởi gió đưa thương,
Từ đây thiếp tỏ đoạn trường với ai.
Càng nhớ đến những ngày hội ngộ,
Càng ngổn ngang mối nợ tình chung;
Đã đành bẻ gãy chữ đồng,
Hiển linh chứng chiếu tấm lòng tiết trinh.
Dầu sống sót cũng đành gọi thác;
Vui chi còn man mác tơ duyên,
Thiệt thòi cam phận thuyền quyên,
Chứa chan giọt lệ cửu tuyền cuộn trôi.
Chàng đã đặng phủi rồi nợ thế,
Xin hiển linh giúp kẻ góa thân;
Chở che khỏi kiếp phong trần,
Gìn gương Liệt nữ Hồng quần để soi.
Chàng dầu đặng thảnh thơi cảnh trí,
Hộ vợ con giữ kỹ Nhơn luân;
Chàng dầu vinh hiển cảnh Thần,
Gởi trong giấc mộng đặng gần cùng nhau.
Chàng dầu hưởng Thiên Tào huyền phép,
Đỡ đường trần chật hẹp thân côi;
Chàng dầu Cung Ngọc an ngôi,
Xin thương thân thiếp nợ đời còn mang.
Gởi Hồn Phách cho chàng định số,
Gởi Kiếp Căn chàng mở dây oan;
Thiếp cam bao tóc thờ chàng,
Rót chung ly biệt đôi hàng lụy sa. ■`,
  },
  {
    slug: 'g5-vo-quy-lieu',
    parentSlug: 'ii-g-kinh-dieu',
    title: '5. Vợ Quy Liễu',
    printedPageLabel: '86–87',
    pdfPageStart: 88,
    contentMarkdown: `Tưởng tơ tóc cùng nhau trọn Đạo,
Theo tùng phu sửa áo, nâng khăn;
Âm Dương đôi nẻo chia phân,
Túy sơn, vân mộng đặng gần cùng nhau.
Khi để bước phòng đào lạnh ngắt,
Mảnh tàn y dường nhắc nghi dung;
Thấy cơn tử biệt não nùng,
Hương thề tắt ngọn, lạnh lùng tơ duyên.
Càng nhớ đến lời nguyền buổi trước,
Thẹn non sông chưa ngớt tình nồng;
Phụ phàng chi bấy Hóa công,
Lòng nào mà lại cắt lòng không đau.
Nối Tông Tổ biết bao nghĩa trọng,
Cơ nghiệp còn lưu mộng tang du;
Mập mờ nhắn nguyệt đêm thu,
Kẻ còn, người mất, ai sầu hơn ai ?
Vói nhắn khách dạ đài có tưởng,
Vậy bóng hình để tướng nơi nao;
Hay là lạc bước Nguồn Đào,
Để thương cho mặt anh hào đeo mang.
Ngồi quạnh quẽ đèn tàn một bóng,
Chịu góa thân tuyết đóng song thu;
Bước Tiên nàng đã ngao du,
Đoái tình thương kẻ ôm sầu khóc duyên.
Hay nàng đặng nhập miền Cực Lạc,
Đoái tưởng người chưa thoát trầm luân;
Ngước trông níu ngọn phất trần,
Chổi Tiên quét sạch nợ nần oan gia.
Dâng mảnh tâm gọi là của lễ,
Chén ly tình là lệ ái ân;
Dầu chi cũng nghĩa chí thân,
Khối tình còn có một lần đấy thôi. ■`,
  },
  {
    slug: 'g6-huynh-de-man-phan',
    parentSlug: 'ii-g-kinh-dieu',
    title: '6. Huynh Đệ Mãn Phần',
    printedPageLabel: '88–89',
    pdfPageStart: 90,
    contentMarkdown: `Niềm thủ túc đã đành vĩnh biệt,
Càng nhớ nhau càng tiếc tình nồng;
Thân nhau từ buổi lọt lòng,
Chén cơm, hột muối cũng đồng chia nhau.
Câu chọc ruột còn đau đớn bấy,
Huống Âm Dương hết thấy mặt nhau;
Rẽ phân cốt nhục đồng bào,
Cảnh Tiên cõi tục lẽ nào không thương.
Thương những thuở huyên đường ôm ấp,
Thương những khi co đắp chung mền;
Thương hồi thơ bé tuổi tên,
Thương cơn khôn lớn giữ bền nghĩa nhau.
Rủi Thiên số Nam Tào đã định,
Giải căn sinh xa lánh trần ai;
Khá tua theo bóng Cao Đài,
Nương mây thoát tục ra ngoài Càn Khôn.
Khối tình ái hương hồn dầu nhớ,
Tránh oan gia giải nợ trầm luân;
Viếng thăm hôm sớm (1) ...... Thân
Trọn câu Thần tỉnh, ân cần cung Tiên.
Gởi Tổ Phụ (2) ...... hiền cung phụng,
Gởi sắp em còn sống nơi đời;
Rót chung ly biệt lưng vơi,
Mảnh lòng tha thiết đưa người bạn xưa. ■

---
*(1) Song/ Phụ/ Mẫu*  
*(2) Anh/ Chị/ Em*`,
  },
  {
    slug: 'g7-ba-con-quy-lieu',
    parentSlug: 'ii-g-kinh-dieu',
    title: '7. Bà Con Quy Liễu',
    printedPageLabel: '89–90',
    pdfPageStart: 91,
    contentMarkdown: `Khi dương thế không phân phải quấy,
Nay Hư linh đã thấy hành tàng;
Chí Tôn xá tội giải oan,
Thánh, Thần, Tiên, Phật cứu nàn độ căn.
Đã từng chịu khó khăn kiếp sống,
Định tâm thần giải mộng Nam Kha;
Càn khôn để bước ta bà,
Đoạt cơ thoát tục tạo nhà Cõi Thiên.
Ơn Tạo Hóa tha tiền khiên trước,
Đưa linh phan tiếp rước nguyên nhân;
Tiên phong phủi ngọn phất trần.
Liên đài đỡ gót đến gần Tây phương.
Cửa Cực Lạc đón đường thẳng tới,
Tầm không môn đặng đợi Như Lai;
Hào quang chiếu diệu Cao Đài,
May duyên nay đã gặp ngày siêu sanh.
Trụ nguyên tánh hồn linh nhàn lạc,
Cõi Đào Nguyên cưỡi hạc, thừa long;
Lánh xa trược chất bụi hồng,
Cung Tiên sớm tối vui lòng thung dung.
Nơi Cung Ngọc học thông Đạo cả,
Chốn Hư Vô Tạo Hóa tìm cơ;
Trên đường Thánh Đức lần dò,
Trường sanh mầu nhiệm nơi lò Hoá công.
Khá từ bỏ nơi dòng bể khổ,
Diệt trần tình Cam Lộ tẩy nhơ;
Ngân kiều Bát Nhã qua bờ,
Đưa duyên để bước kịp giờ siêu thăng. ■`,
  },

  // H. KINH TỐNG CHUNG
  { slug: 'ii-h-kinh-tong-chung', parentSlug: 'phan-2-quan-hon-tang-te', title: 'H. KINH TỐNG CHUNG', printedPageLabel: '91–100', pdfPageStart: 93, pdfPageEnd: 102, ritualTags: ['Kinh Tống Chung'] },
  {
    slug: 'h1-cao-dao-lo',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '1. Cáo Đạo Lộ',
    printedPageLabel: '91',
    pdfPageStart: 93,
    contentMarkdown: `Vọng Ngũ phương Đạo lộ chứng tri,
Cùng trị nhựt thần kỳ ủng hộ.
Nay di cữu táng an phần mộ,
Trục tà ma cản lộ lăng loàn.
Cho cốt hài thong thả lên đàng,
Vong linh đặng an nhàn Cực Lạc.
Lòng thành kỉnh, Thần minh chiếu tạc,
Giúp Hương Hồn kỵ hạc đăng Tiên.
E trược phàm uế khí nhiễm truyền,
Xin chư vị Linh tiền viễn tị. ■`,
  },
  {
    slug: 'h2-cao-thuy-than',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '2. Cáo Thủy Thần',
    printedPageLabel: '91',
    pdfPageStart: 93,
    contentMarkdown: `Nguyện cầu Hải Nhược Vương hầu,
Phò trì linh cữu kịp chầu táng an.
Trải qua Bích thủy, Lưu giang,
Trời thanh, gió tịnh đưa Thoàn minh sanh.
Tam bôi mỹ tửu Cung trình,
Thanh trà, hoa quả tạ tình Thần Linh. ■`,
  },
  {
    slug: 'h3-cao-minh-sanh-thien-ban',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '3. Cáo Minh Sanh (Thiên Bàn)',
    printedPageLabel: '92',
    pdfPageStart: 94,
    contentMarkdown: `Nhơn sanh bách tuế vi kỳ,
Sang, hèn, thanh, trược đồng quy chung đàng;
Hồn ra khỏi xác chia hàng,
Người tu đặng hưởng, kẻ gian sa hầm.
Nghĩ cho trong giấc trăm năm,
Ngày qua tháng lại tợ dầm khói chan.
Hôm nay Linh cữu lên đàng,
Cúi xin Thượng Đế Thiên Bàn chứng tri.
Nay nhờ Trời, Phật từ bi,
Hồng ân Thiên tải, hồn quy Thiên đàng. ■`,
  },
  {
    slug: 'h4-cao-minh-sanh-tu-to',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '4. Cáo Minh Sanh (Từ Tổ)',
    printedPageLabel: '93',
    pdfPageStart: 95,
    contentMarkdown: `Nay con, cháu đền Ơn Cúc Dục,
Lễ thô sơ kính chúc trai từ;
Cù Lao Ân Đức nan thù,
Lễ phô tế phẩm điện vu linh tòa.
Đồng kính cáo Ông, Bà, Cô, Bác,
Chứng chút tình đạm bạc thô sơ;
Trăm năm giữ dạ trọn thờ,
Ngày đêm Hương Hỏa chớ lơ lãng lòng.
Cuộc trần thế tồn, vong mạc trắc,
Lễ hiển u Nam, Bắc phân kỳ;
Tuy là hai ngã biệt ly,
Chơn Linh sau cũng gặp kỳ Linh Tiêu.
Tu công đức kỳ siêu Tông Tổ,
Cầu Từ Bi cứu độ Cửu Huyền;
Người mà thiện quả, thiện duyên,
Muôn năm dựa cảnh Phật, Tiên hưởng nhàn. ■`,
  },
  {
    slug: 'h5-dong-quan',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '5. Động Quan',
    printedPageLabel: '94',
    pdfPageStart: 96,
    contentMarkdown: `Ngày nay từ giã rẽ hai phang,
Linh cữu mộ phần đặng táng an.
U hiển cách nhau tình vắng bặt,
Hồn nương Cõi Thọ hưởng thanh nhàn. ■`,
  },
  {
    slug: 'h6-tong-linh-cuu',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '6. Tống Linh Cữu',
    printedPageLabel: '94–95',
    pdfPageStart: 96,
    contentMarkdown: `Cõi phàm vay trả trái oan,
Dập dìu kẻ đến, rộn ràng người lui.
Tách nhau lòng thảm, dạ ngùi,
Cạn suy, kỹ xét thầm vui cho người,
Nợ đời phủi sạch thảnh thơi,
Lánh miền khổ não, tầm nơi thanh nhàn.
Bồng Lai phước địa ở an,
Dứt dây oan nghiệt buộc ràng xưa nay.
Nguyện cầu Thượng Đế Cao Đài,
A Di Đà Phật thứ tai giảm nàn.
Độ hồn lìa chốn trần gian,
Đem về Cõi Thọ, an nhàn tu thân.
Quan Âm Bồ Tát ân cần,
Tầm thinh cứu khổ, giải lần tai nguy.
U minh Đại Thánh từ bi,
Đức ân Địa Tạng liên trì tiếp vong.
Từ Vương Thập Điện rộng lòng,
Xả cho hồn đặng thoát vòng trầm luân.
Âm Tào Động Nhạc Đế Quân,
Vớt người lương thiện, khỏi chưng tội hình.
Thần Quan hộ mạng anh linh,
Giúp vong trí sáng, biết nhìn đường ngay.
Phước Thần Phướn báu cầm tay,
Sắc vưng Tam Giáo hộ rày linh quan.
Mong ơn Thổ Địa, Thành Hoàng,
Khu tà, trục quỷ vẹt đàng chông gai.
Phách hồn lánh nẻo Diêm đài,
Thoát ly Địa phủ, Thiên Thai hầu gần.
Tiêu diêu tịnh dưỡng tinh thần,
Trau dồi Công đức, tế dân, trợ đời.
Ngưỡng trông sở nguyện như lời,
Hiển U hai ngả gặp nơi phước lành. ■`,
  },
  {
    slug: 'h7-dua-linh',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '7. Đưa Linh',
    printedPageLabel: '96',
    pdfPageStart: 98,
    contentMarkdown: `Nam mô Thượng Đế Cao Đài,
Nam mô Phật Tổ Như Lai chứng lòng.
Nam mô Thái Thượng Đức Ông,
Nam mô Thái Bạch dày công độ đời.
Nam mô Nam Hải Như Lai,
Quan Âm Bồ Tát trừ tai cứu nàn.
Nam mô Quan Thánh Đế Quân,
Nam mô chư Phật, chư Thần, Thánh, Tiên.
Nam mô Tam Giáo hiệp truyền,
Tam Kỳ Phổ Độ sẵn thuyền chực đưa.
Nam mô Ngọc Đế Đại từ,
Tội căn xin đặng giảm trừ chế châm.
Cầu xin ân đức cao thâm,
Độ vong nguyện khỏi đọa trầm Âm ty.
Nam mô Địa Tạng chứng tri,
Nam mô nhờ đức Từ Bi dẫn hồn.
Nam mô chư Phật, chư Tôn,
Cầu vong đặng nhập Thiên môn buổi này. ■`,
  },
  {
    slug: 'h8-cao-hau-tho',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '8. Cáo Hậu Thổ',
    printedPageLabel: '97',
    pdfPageStart: 99,
    contentMarkdown: `Mong Hậu thổ huệ từ chiếu cố,
Cùng Ngũ phương, Ngũ Thổ Địa Thần;
Hộ cốt hài an táng mộ phần,
Vô tư tải đức ân che chở.
Xác phàm đặng thảnh thơi muôn thuở,
Vọng oai linh nâng đỡ, phò trì;
Tấm lòng thành Trời, Phật chứng tri,
Độ u hiển giai kỳ thạnh vượng.
Gia quyến đặng miên miên phước chưởng,
Cầu vong linh trực thượng Tiên bang. ■`,
  },
  {
    slug: 'h9-ha-rong',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '9. Hạ Rộng',
    printedPageLabel: '97',
    pdfPageStart: 99,
    contentMarkdown: `Phù sanh nhứt mộng kỷ nhơn tri,
Bách tuế quang âm vấn thị thùy.
Thế cuộc tồn vong tầm mạc trắc,
Ta hồ vĩnh biệt thử chung qui. ■`,
  },
  {
    slug: 'h10-tu-gia-mo-phan',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '10. Từ Giã Mộ Phần',
    printedPageLabel: '98',
    pdfPageStart: 100,
    contentMarkdown: `Tống chung nay đã an bài,
Hồn lên Cõi Thọ cốt hài gởi đây,
Nợ trần nay đã hết gây.
Chẳng còn tính việc lưng, đầy thế gian,
Trăm năm chung cuộc nghĩ càng,
Âm Dương nhị lộ hai đàng khó trông.
Tử sanh Thiên số nan thông,
Người về Tiên cảnh, kẻ trông Dương trần,
Xác phàm tuy đã rẽ phân,
Linh hồn khuyên nhớ, ân cần viếng thăm.
Phân tay chi xiết thương tâm,
Mộ vân xuân thọ khôn tầm Người xưa. ■`,
  },
  {
    slug: 'h11-dan-vong',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '11. Dẫn Vong',
    printedPageLabel: '98–99',
    pdfPageStart: 100,
    contentMarkdown: `Oai Phật, Trời anh linh phổ tế.
Lòng Từ Bi cứu thế, hộ dân;
Độ hồn lìa khỏi hồng trần,
Xét xem công quả, cân phân thưởng đền.
Giảm tội lỗi Ơn Trên chế lượng,
Thanh Phước Thần cầm phướn dẫn đàng;
Mong nhờ hộ mạng Thần Quan,
Giúp vong nhẹ gót băng ngàn cõi Tiên.
Đặng siêu độ trần duyên oan trái,
Sáng lương tâm chừa cải tiền khiên;
Ban ơn giúp sức Thiêng Liêng,
Ở yên chín suối tầm miền Bồng Lai. ■`,
  },
  {
    slug: 'h12-an-linh-sang',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '12. An Linh Sàng',
    printedPageLabel: '99–100',
    pdfPageStart: 101,
    contentMarkdown: `Âm Dương nay đã chia đàng,
Sớm trưa vắng dạng, dạ càng xốn xang.
Muối, dưa tạm trước linh sàng,
Trà thô, rượu lạt gia đàng kính dưng.
Đọc câu ly biệt ngập ngừng,
Âm Dương nhớ đến trăm phần bi ai.
Từ đây Linh Vị an bày,
Chứng minh gia quyến, ngày nay bái quỳ.
Thân gia đưa đón kịp kỳ,
Mừng cho hồn đặng hồi quy Thiên đàng.
Có câu sanh thuận, tử an,
Nhưng buồn Dương thế, Suối vàng cách phân.
Có thương đến viếng mộ phần,
Le the ngọn cỏ, người thân khó tầm.
Từ đây vĩnh biệt trăm năm,
Hồn khôn khuyên nhớ viếng thăm gia đàng. ■`,
  },
  {
    slug: 'h13-tu-gia-vong-linh',
    parentSlug: 'ii-h-kinh-tong-chung',
    title: '13. Từ Giã Vong Linh',
    printedPageLabel: '100',
    pdfPageStart: 102,
    contentMarkdown: `Nay viên mãn dâng trà bốn lạy,
Thỉnh Hương Hồn khấn bái Phật, Trời.
Cầu Từ Bi ân đức độ đời,
Tiêu giảm tội khỏi nơi khổ não.
Chúng tôi đã thành tâm khẩn đảo,
Vọng Siêu thăng môn Đạo lâu đài. ■`,
  },

  // I. KINH LÀM TUẦN
  { slug: 'ii-i-kinh-lam-tuan', parentSlug: 'phan-2-quan-hon-tang-te', title: 'I. KINH LÀM TUẦN', printedPageLabel: '101–112', pdfPageStart: 103, pdfPageEnd: 114, ritualTags: ['Kinh Làm Tuần', 'Tuần Cửu'] },
  {
    slug: 'i1-khai-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '1. Khai Cửu',
    printedPageLabel: '101',
    pdfPageStart: 103,
    contentMarkdown: `Đã quá chín từng Trời đến vị.
Thần đặng an, tinh khí cũng an;
Tầng Trời gắng bước lên thang,
Trông mây, nhìn lại cảnh nhàn buổi xưa.
Cõi thảm khổ cũng vừa qua khỏi,
Quên Trần ai, mong mỏi Động Đào;
Ngó chi khổ hải sóng xao,
Đoạn tình yểm dục, đặng vào cõi Thiên.
Giọt lụy của Cửu Huyền dầu đổ,
Chớ đau lòng thuận nợ trầm luân;
Nắm cây Huệ Kiếm, gươm thần,
Dứt tan sự thế, nợ trần từ đây. ■`,
  },
  {
    slug: 'i2-kinh-nhut-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '2. Kinh Nhứt Cửu',
    printedPageLabel: '102',
    pdfPageStart: 104,
    contentMarkdown: `Vườn Lạn Uyển sanh hoa đã héo,
Khối hình hài đã chịu rã tan;
Bảy dây oan nghiệt hết ràng,
Bợn trần rửa sạch muôn ngàn đau thương.
Kìa Thiên cảnh con đường vòi vọi,
Ánh Hồng Quân đương chói Ngọc Lầu;
Cung Thiềm gắng bước cho mau,
Thoát ba Thần phẩm đứng đầu Tam Thiên.
Khá tỉnh giấc tiền duyên nhớ lại,
Đoạn cho rồi oan trái buổi sanh;
Đem mình nương bóng Chí Linh,
Định tâm chí Thánh, mới nhìn ngôi xưa.
Hồn định tĩnh, đã vừa định tĩnh.
Phách anh linh, ắt phải anh linh;
Quản bao Thập ác Lục hình,
Giải thi, thoát khổ diệt hình, đoạn căn. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'i3-kinh-nhi-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '3. Kinh Nhị Cửu',
    printedPageLabel: '103',
    pdfPageStart: 105,
    contentMarkdown: `Tây Vương Mẫu Vườn Đào ướm chín,
Chén trường sanh có lịnh ngự ban;
Tiệc Hồng đã dọn sẵn sàng,
Chơn Thần khá đến hội bàn (1) chư Linh.
Đã thấy đủ Thiên Đình huyền pháp,
Cỡi giác thân lên đạp Ngân Kiều;
Đẩu tinh chiếu thấu Nguyên tiêu,
Kim quang kiệu đỡ đến triều Ngọc Hư.
Khí trong trẻo dường như băng tuyết,
Thần im lìm dường nét Thiều quang;
Xa chừng thế giới Địa hoàng,
Cõi Thiên đẹp thấy nhẹ nhàng cao thăng. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**

---
**(1)** Có bản ghi là: *Chơn Thần khá đến hội hàng chư Linh*`,
  },
  {
    slug: 'i4-kinh-tam-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '4. Kinh Tam Cửu',
    printedPageLabel: '104',
    pdfPageStart: 106,
    contentMarkdown: `Cõi Thanh Thiên lên miền Bồng Đảo,
Động Thiên Thai bảy Lão đón đường;
Cam Lồ rưới giọt nhành dương,
Thất tình Lục dục như dường tiêu tan.
Cung Đẩu Suất nhặt khoan tiếng nhạc,
Đệ Lịnh bài cánh hạc đưa linh;
Tiêu Thiều lấp tiếng dục tình,
Bờ dương bóng phụng đưa mình, nâng thân.
Cung Như Ý Lão Quân tiếp khách,
Hội Thánh Minh giao sách Trường xuân;
Thanh quang rỡ rỡ đôi (1) ngàn,
Chơn Hồn khoái lạc lên đàng vọng Thiên. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**

---
**(1)** Có bản ghi là: *Thanh quang rỡ rỡ đòi ngàn*`,
  },
  {
    slug: 'i5-kinh-tu-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '5. Kinh Tứ Cửu',
    printedPageLabel: '105',
    pdfPageStart: 107,
    contentMarkdown: `Sắc Huỳnh chiếu rọi vàng đường hạc,
Cõi Huỳnh Thiên nhẹ thoát chơn Tiên;
Năm rồng đỡ nổi đầu thuyền,
Vào Cung Tuyệt Khổ kiến Huyền Thiên Quân.
Trừ quái khí roi Thần chớp nhoáng
Bộ Lôi Công giải tán trược quang;
Cửa Lầu Bát Quái chun ngang,
Hỏa tinh tam muội thiêu tàn oan gia.
Đạp Thái Sơn nhảy qua Đẩu Suất.
Định Kim Câu đến trực Thiên môn;
Chơn Thần đã nhập Càn Khôn,
Thâu quyền Độ Thế bảo tồn chúng sanh. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'i6-kinh-ngu-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '6. Kinh Ngũ Cửu',
    printedPageLabel: '106',
    pdfPageStart: 108,
    contentMarkdown: `Ánh hồng chiếu đường mây rỡ rỡ,
Cõi Xích Thiên vội mở ải quan;
Thiên Quân diêu động linh phan,
Cả miền Thánh vức nhộn nhàng tiếp nghinh.
Đài Chiếu Giám Cảnh Minh nhẹ bước,
Xem rõ ràng tội phước căn sinh;
Lần vào Cung Ngọc Diệt Hình,
Khai Kinh Vô Tự đặng nhìn quả duyên.
Đắc Văn Sách thông Thiên, đạt Địa,
Phép huyền công trụ nghĩa hóa thân;
Kỵ Kim Quang kiến Lão Quân,
Dựa xe Như ý, oai Thần tiễn thăng. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'i7-kinh-luc-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '7. Kinh Lục Cửu',
    printedPageLabel: '107',
    pdfPageStart: 109,
    contentMarkdown: `Bạch Y Quan mở đàng rước khách,
Cõi Kim Thiên nhẹ tách Tiên xa;
Vào Cung Vạn Pháp xem qua,
Cho tường cựu nghiệp mấy tòa thiên nhiên.
Cung Lập Khuyết tìm duyên định ngự,
Lãnh Kim Sa đặng dự Như Lai;
Minh Vương Khổng Tước cao bay,
Đem Chơn Thần đến tận đài Huệ Hương.
Mùi ngào ngọt thơm luôn Thánh thể,
Trừ tiêu tàn ô uế sinh quang;
Tiêu Thiều trổi tiếng nhặt khoan,
Đưa linh thẳng đến Niết Bàn mới thôi. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
  {
    slug: 'i8-kinh-that-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '8. Kinh Thất Cửu',
    printedPageLabel: '108',
    pdfPageStart: 110,
    contentMarkdown: `Nhẹ phơ phới dồi dào không khí,
Hạo Nhiên Thiên đã chí muôn quang;
Đẹp xinh cảnh vật đôi ngàn,
Hào quang chiếu diệu, khai đàng thăng Thiên.
Cung Chưởng Pháp xây quyền Tạo Hóa,
Kiến Chuẩn Đề thạch xá giải thi;
Già Lam dẫn nẻo Tây Quy,
Kim chung mở lối kịp kỳ kỵ sen.
Động Phổ Hiền Thần, Tiên hội hiệp,
Dỡ Kim Cô đưa tiếp linh quang;
Im lìm kìa cõi Niết Bàn,
Lôi Âm trống thúc, lên đàng Thượng Tiêu (1). ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**

---
**(1)** Có bản ghi là: *Lôi Âm trống thúc, lên đàng Thượng <u>Thiên</u>*`,
  },
  {
    slug: 'i9-kinh-bat-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '9. Kinh Bát Cửu',
    printedPageLabel: '109',
    pdfPageStart: 111,
    contentMarkdown: `Hơi Tiên tửu nực nồng thơm ngọt,
Phi Tưởng Thiên để gót tới nơi;
Mùi trần khi đã xa khơi,
Say sưa bầu khí, bồi hồi chung phong.
Cung Tận Thức thần thông biến hóa,
Phổ Đà Sơn giải quả Từ Hàng;
Cởi Kim Hầu đến Tịch San,
Đẩu vân nương phép Niết Bàn đến xem.
Cung Diệt Hữu (1) ngọc rèm đã xủ,
Nghiệp hữu hình tượng đủ vô vi;
Hồ Tiên vội rót tức thì,
Nước Cam Lồ rửa ai bi kiếp người. ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**

---
**(1)** Có bản ghi là: *Cung Diệt <u>Bửu</u>*`,
  },
  {
    slug: 'i10-kinh-cuu-cuu',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '10. Kinh Cửu Cửu',
    printedPageLabel: '110',
    pdfPageStart: 112,
    contentMarkdown: `Vùng thoại khí Bát hồn vận chuyển,
Tạo hóa Thiên sanh biến vô cùng;
Hội Bàn Đào, Diêu Trì Cung,
Phục sinh đào hạnh, rượu hồng thưởng ban.
Cung Bắc Đẩu xem căn quả số,
Học triều nghi vào ở Linh Tiêu;
Ngọc Hư Cung sắc lệnh kêu,
Thưởng phong, trừng trị, phân điều đọa thăng (1).
Nơi Kim Bồn vàn vàn Ngươn Chất,
Tạo hình hài các bậc nguyên nhân;
Cung Trí Giác trụ Tinh Thần,
Huờn Hư mầu nhiệm thoát trần đăng Tiên (2). ■

**NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**

---
**(1)** *“Vùng Thoại khí ...... đọa thăng”: 8 câu này do Cửu Nương giáng cơ.*
**(2)** *“Nơi Kim Bồn ...... đăng Tiên”: 4 câu này do Phật Mẫu giáng cơ.*`,
  },
  {
    slug: 'i11-tieu-tuong',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '11. Tiểu Tường',
    printedPageLabel: '111',
    pdfPageStart: 113,
    contentMarkdown: `Biển trần khổ nay đà lánh khỏi,
Nhẹ linh hồn lên cõi Thiên Thai;
Ngày Tiên, tháng Phật rộng dài,
Thung dung dưới bóng Cao Đài ấm thân.
Nay nhờ Thượng Đế ban ân,
Non Tiên bước tới Hồng trần khỏi vương.
Người đời mấy cuộc tang thương,
Bịnh, già, sống, thác bốn đường tân tao;
Tử, sanh Thiên số nan đào,
Dày công tu luyện khỏi vào trầm luân.
Tiểu tường nay đã đến tuần,
Trà thô rượu lạt ba từng mời khuyên.
Chứng cho gia quyến thảo hiền,
Trai đàn thiết lập, lòng Thiền cầu siêu;
Cõi Trên nhàn lạc tiêu diêu,
Hiển linh xin nhớ dắt dìu cháu, con.
Sự vong như thể sự tồn,
Xác phàm tuy mất, Linh hồn còn y.
Hôm nay mở cuộc siêu kỳ,
Cầu cho Hồn Phách đồng quy Thiên đàng. ■`,
  },
  {
    slug: 'i12-dai-tuong',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '12. Đại Tường',
    printedPageLabel: '112',
    pdfPageStart: 114,
    contentMarkdown: `Nợ trần thế ngày nay đã rảnh,
Nương mây lành Tiên cảnh dời chơn;
Chẳng còn tính thiệt so hơn,
Theo chầu Thượng Đế linh đơn cứu đời.
Linh hồn nay đặng thảnh thơi,
Trần gian con cháu bồi hồi nhớ trông.
Hằng ngày tưởng đến âm dung,
Ba năm trọn thảo chung cùng quảy tang.
Giờ nay thiết lập trai đàn,
Đại Tường hiến lễ Đạo tràng cầu siêu.
Muối, dưa tạm dụng ít nhiều,
Chứng minh gia quyến Tịch, Triêu kỉnh thành.
Lễ dưng cung hiến sẵn dành,
Trừ tang, tập phước đức lành vô cương. ■`,
  },
  {
    slug: 'i13-thinh-tien-linh',
    parentSlug: 'ii-i-kinh-lam-tuan',
    title: '13. Thỉnh Tiên Linh (ông bà)',
    printedPageLabel: '112',
    pdfPageStart: 114,
    contentMarkdown: `Một dạ kính thành đốt nén hương,
Kính mời Thất Tổ đáo Từ Đường;
Tiên Linh Nội, Ngoại cùng Cô, Bác,
Chứng thảo cháu, con đến Cõi dương. ■`,
  },

  // J. KINH KỴ LẠP
  { slug: 'ii-j-kinh-ky-lap', parentSlug: 'phan-2-quan-hon-tang-te', title: 'J. KINH KỴ LẠP', printedPageLabel: '113–118', pdfPageStart: 115, pdfPageEnd: 120, ritualTags: ['Kinh Kỵ Lạp'] },
  {
    slug: 'j1-ky-com',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '1. Kỵ Cơm',
    printedPageLabel: '113',
    pdfPageStart: 115,
    contentMarkdown: `Làm con khó đặng trọn thờ,
Tam niên nhủ bộ, chẳng giờ khắc khuây.
Lửa hương dạ nhớ hằng ngày,
Cù lao cúc dục so tày núi sông.
Có câu sanh, tử giữ đồng,
Âm Dương tuy cách tấc lòng nào phai.
Hôm nay Lễ kỵ đến ngày,
Cao lương mỹ vị đặt bày kính dưng.
Trà thô, rượu lạt ba từng,
Tiên Linh xin chứng ngỏ mừng cháu con.
Hiếu trung muôn kiếp bền còn,
Vùa hương bát nước, giữ tròn chẳng sai.
Cầu cho vượt cảnh Thiên Thai,
Thung dung khoái lạc, lâu dài khỏe thân.
Lòng thành cạn tỏ nguồn ân,
Tiên Linh xin chứng ân cần vãng lai.
Chúc cho lạc nghiệp cảnh đài,
Chứng minh con, cháu hôm nay khẩn cầu. ■`,
  },
  {
    slug: 'j2-gio-hoi-bao-an-tu',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '2. Giỗ Hội (Báo ân từ)',
    printedPageLabel: '114',
    pdfPageStart: 116,
    contentMarkdown: `Muôn năm khó đặng trọn thờ,
Nhớ công Phổ Độ chẳng giờ khắc khuây.
Lửa hương dạ nhớ hằng ngày,
Mồ vân xuân thọ, so tày núi sông.
Có câu sanh tử giữ đồng,
Âm Dương tuy cách tấc lòng nào phai.
Hôm nay giỗ Hội đến ngày,
Hương đăng, hoa quả đặt bày kính dưng.
Trà thô, rượu lạt ba từng,
Tiên Linh xin chứng mấy từng lòng son.
Thủy chung muôn kiếp bền còn,
Vùa hương, bát nước giữ tròn chẳng sai.
Cầu cho vượt cảnh Thiên Thai,
Thung dung khoái lạc lâu dài khỏe thân.
Lòng thành cạn tỏ nguồn ân,
Tiên Linh xin chứng ân cần vãng lai.
Chúc cho lạc nghiệp Cảnh Đài,
Chứng minh đồng Đạo hôm nay khẩn cầu. ■`,
  },
  {
    slug: 'j3-gio-hoi-thong-dung',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '3. Giỗ Hội (Thông dụng)',
    printedPageLabel: '115–116',
    pdfPageStart: 117,
    contentMarkdown: `Non Khưu lãnh muôn năm lạc nghiệp,
Biển trần ai một kiếp rảnh rồi;
Nay đà trở lại cựu ngôi,
Thỏa lòng hứng cảnh phủi rồi trần gian.
Khỏi vương cuộc thế trái oan,
Huỳnh Đình lo tụng Thiên Đàng lần lên.
Nay nhờ Đức Phật bề trên,
Mở lòng sáng láng quên nền mê tân.
Cuộc trần ràng buộc ái ân,
Bịnh, già, sống, thác bốn lần gian nan.
Giờ nay đủ mặt thân bằng,
Án từ thiết lập trai đàn cầu siêu.
Chúc Chư Linh đặng tiêu diêu,
Bồng Lai bước tới, động Kiều lần qua.
Hai nơi vốn thiệt quê nhà,
Trần gian là chốn trẻ, già lộn quanh.
Nay đà thoát khỏi tử, sanh,
Phú, bần, quý, tiện, dữ, lành khỏi vương.
Lễ dưng chúc Thọ vô cương,
Cao lương mỹ vị, rau, tương thế hành.
Có câu sự tử như sanh,
Án từ Lễ mọn, lòng thành kính dưng.
Tam bôi mỹ tửu sơ tuần,
Cúi đầu bốn lạy Lễ mừng đoàn viên.
Muôn năm Tiên cảnh nhàn yên,
Tiêu diêu khoái lạc lánh miền trầm luân.
Rượu châm tam trản nhị tuần,
Cầu xin cạn hưởng ngỏ mừng lòng son.
Thủy chung hai chữ giữ tròn,
Âm Dương tuy cách nghĩa còn bền dai.
Dặn lòng mựa chớ đơn sai,
Tình thương đồng Đạo vãng lai Linh sàng.
Nay đà rảnh cuộc thương tang,
Chúc cho Quý Phách Thiên Đàng lần lên.
Bồng Lai nhược thủy vững bền,
Luyện đơn, nấu thuốc làm nền Tiên gia.
Cảnh Tiên biết thuở nào già,
Muôn năm vui hưởng, Thiên Tòa hân hoan.
Ngày nay .................... đã an,
Thanh trà đạm bạc Lễ toàn kính dưng.
Lòng thành kính lạy ba từng,
Chứng minh .......... mấy tuần thô sơ.
Xuân, Thu Tế Tự trọn thờ,
Kỉnh thành, nghĩa trọng ngày giờ chẳng quên. ■`,
  },
  {
    slug: 'j4-hien-hoa-thong-dung',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '4. Hiến Hoa (Thông dụng)',
    printedPageLabel: '117',
    pdfPageStart: 119,
    contentMarkdown: `Cảnh vị người sầu hoa lợt lạt,
Vật theo tiết đổi, nguyệt mê man.
Dạ bàng hoàng mấy đoạn tân toan! ■`,
  },
  {
    slug: 'j5-hien-hoa-cha-me',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '5. Hiến Hoa (Dùng cho cha mẹ)',
    printedPageLabel: '117',
    pdfPageStart: 119,
    contentMarkdown: `Ngoảnh mặt nhà thung (huyên) màu tuyết lợt,
Nghiêng trông non hộ (tỵ) khói mây lồng.
Một giấc nồng không đợi, không trông! ■`,
  },
  {
    slug: 'j6-hien-qua-thong-dung',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '6. Hiến Quả (Thông dụng)',
    printedPageLabel: '117',
    pdfPageStart: 119,
    contentMarkdown: `Hai chữ Tài Thành Ơn rất nặng,
Một câu Báo Đáp Nghĩa Ơn sâu.
Buộc chuỗi sầu lụy nhỏ thâm bầu! ■`,
  },
  {
    slug: 'j7-hien-qua-cha-me',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '7. Hiến Quả (Dùng cho cha mẹ)',
    printedPageLabel: '118',
    pdfPageStart: 120,
    contentMarkdown: `Phẩm vật tạm đền Ơn Cúc Dục,
Thời trân xin đáp Nghĩa Sinh Thành.
Dã kỉnh thành thấu đến Cao Xanh! ■`,
  },
  {
    slug: 'j8-hien-tuu-tra-thong-dung',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '8. Hiến Tửu Trà (Thông dụng)',
    printedPageLabel: '118',
    pdfPageStart: 120,
    contentMarkdown: `Rượu lạt, trà thô đền Nghĩa cả,
Rau khe, nước suối đáp Ơn dày.
Dạ ai hoài Trời Đất có hay! ■`,
  },
  {
    slug: 'j9-hien-tuu-tra-cha-me',
    parentSlug: 'ii-j-kinh-ky-lap',
    title: '9. Hiến Tửu Trà (Dùng cho cha mẹ)',
    printedPageLabel: '118',
    pdfPageStart: 120,
    contentMarkdown: `Chín chữ chưa đền Ơn Cúc Dục,
Ba năm chưa trả Nghĩa Cù Lao.
Biết làm sao sống thác chiêm bao! ■`,
  },

  // K. KINH CÚNG CÔ HỒN
  {
    slug: 'ii-k-kinh-cung-co-hon',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'K. KINH CÚNG CÔ HỒN',
    ritualTags: ['Kinh Cúng Cô Hồn', 'Cầu Vong', 'Thập Loại Cô Hồn'],
  },
  {
    slug: 'k1-cau-vong',
    parentSlug: 'ii-k-kinh-cung-co-hon',
    title: '1. Cầu Vong',
    ritualTags: ['Kinh Cúng Cô Hồn', 'Cầu Vong'],
    contentMarkdown: `Buồn thay chi xiết nỗi buồn,
Người đời sống thác tơ luồng gió qua.
Vừng mây lửng đửng ác tà,
Cỏ cây tươi tốt ngân hà rạng trông.
Sum sê hạt gáy non bồng,
Hồn linh nương gió xích tòng ở an.
Là ngày bước tới tiên bang,
Lánh nơi thế trượt tầm đàng thanh tân.
Cũng là huyết mạch chí thân,
Dương gian âm cảnh ân cần vãng lai.
Chư nho vâng lịnh Cao Đài,
Triệu luôn hồn phách cấp lai kỷ tiền. ■`,
  },
  {
    slug: 'k2-kinh-cung-thap-loai-co-hon',
    parentSlug: 'ii-k-kinh-cung-co-hon',
    title: '2. Kinh Cúng Thập Loại Cô Hồn',
    ritualTags: ['Kinh Cúng Cô Hồn', 'Thập Loại Cô Hồn'],
    contentMarkdown: `Cầu Thượng Đế từ bi ân xá,
Xin Diêm đình vội thả hồn oan;
Nguyện cầu Phật Tổ Tây Phang,
Quan Âm Bồ Tát độ toàn tội nhơn.
Có câu thiên địa tuần hườn,
Lộn quanh trở lại chánh chơn một đàng;
Khi xưa dương thế thác oan,
Xuống thành Uổng tử khôn toan trở về.
Chịu làm ngạ quỉ thảm thê,
Trái oan chưa dứt không bề hườn căn;
Độ hồn mau biết ăn năn,
Đem về đạo chánh siêu thăng Thiên đàng.
Hoặc cho trở lại thế gian,
Xử tròn nợ trước tầm đàng quy tôn;
Thương thay thập loại cô hồn,
Bơ vơ lưỡng cảnh dập dồn tuyết sương;
Ngày đêm dưới hố trên đường,
Nhiễu nhương lấn ấp phố phường dọ ăn.
Chịu làm cô độc vô căn,
Phái lưu chẳng có thân bằng cũng không.
Nhớ câu nhựt nguyệt quang đồng,
Cúi xin Bồ Tát rộng lòng cứu nguy.
Độ hồn trở lại qui y,
Hoặc hồi dương thế kịp kỳ Long Hoa;
Cầu cho nước trị dân hòa,
Nơi nơi lạc nghiệp trẻ già bình an. ■`,
  },

  // J. KINH TẾ CHIẾN SĨ
  {
    slug: 'ii-j2-kinh-te-chien-si',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'J. KINH TẾ CHIẾN SĨ',
    printedPageLabel: '119–122',
    pdfPageStart: 121,
    pdfPageEnd: 124,
    ritualTags: ['Kinh Tế Chiến Sĩ', 'Kinh Cúng Chiến Sĩ'],
  },
  {
    slug: 'l1-thinh-chien-si',
    parentSlug: 'ii-j2-kinh-te-chien-si',
    title: '1. Thỉnh Vong Cúng Chiến Sĩ',
    printedPageLabel: '119',
    pdfPageStart: 121,
    ritualTags: ['Kinh Tế Chiến Sĩ', 'Thỉnh Vong'],
    contentMarkdown: `Buồn thay chi xiết nỗi buồn,
Người đời sống, thác tợ luồng gió qua.
Vừng mây lững đững ác tà,
Cỏ cây tươi tốt, Ngân Hà rạng trong.
Sum suê hạc gáy non bồng,
Linh Hồn nương gió xích tòng ở an.
Đem mình bồi đắp giang san,
Thất cơ chiến địa sa tràng bỏ thân.
Cũng là Nghĩa dõng chân chần,
Chư Linh hiển hích ân cần vãng lai.
Chư nho vâng lịnh Cao Đài
Thỉnh Hồn Chiến sĩ cấp lai kỷ tiền. ■`,
  },
  {
    slug: 'l2-cung-vong-chien-si',
    parentSlug: 'ii-j2-kinh-te-chien-si',
    title: '2. Cúng Vong Chiến Sĩ',
    printedPageLabel: '120',
    pdfPageStart: 122,
    ritualTags: ['Kinh Tế Chiến Sĩ', 'Cúng Vong Chiến Sĩ'],
    contentMarkdown: `Muôn năm Nghĩa dõng trọn thờ,
Nhớ Công Chiến sĩ chẳng giờ khắc khuây.
Nhiệt tâm cảm xúc hằng ngày,
Mồ vân xuân thọ so tài núi sông.
Có câu sanh tử giữ đồng,
Âm Dương tuy cách tấm lòng nào phai.
Hôm nay thiết Lễ một ngày,
Hương đăng hoa quả đặt bày kính dưng.
Trà thô rượu lạt ba tuần,
Chư linh xin chứng ngỏ mừng lòng son.
Thủy chung muôn kiếp bền còn,
Tấm lòng ái quốc giữ tròn chẳng sai.
Cầu cho vượt cảnh Thiên thai,
Thung dung khoái lạc lâu dài khỏe thân.
Lòng thành cạn tỏ Nguồn Ân,
Chư Vong hiển hích ân cần vãng lai.
Chúc cho lạc nghiệp Cảnh Đài,
Chứng minh bổn Đạo hôm nay khẩn cầu. ■`,
  },
  {
    slug: 'l3-kinh-te-chien-si',
    parentSlug: 'ii-j2-kinh-te-chien-si',
    title: '3. Kinh Tế Chiến Sĩ',
    printedPageLabel: '121–122',
    pdfPageStart: 123,
    pdfPageEnd: 124,
    ritualTags: ['Kinh Tế Chiến Sĩ'],
    contentMarkdown: `Kìa nghi ngút mùi Hương phưởng phất,
Nọ đèn chong lây lất gió bay.
Hoa chưng Lễ phúng dưng bày,
Trà hồng rượu lạt hôm nay lòng thành.
Cầu xin Hồn Hùng Anh Chiến sĩ,
Nơi sa trường sanh kỷ tử qui.
Xưa kia một đấng Nam Nhi,
Vì Dân vì Nước ra đi chiến trường.
Đem xương trắng giang san bồi đắp,
Đổ máu hồng quyết lập đời tân.
Noi gương Tiền bối Công thần,
Mang gươm vác súng chân lần thấp cao.
Đầu đội nặng sương bao tuyết phủ,
Khi mưa đêm gió rũ lạnh lùng.
Biết bao nhiêu cảnh não nùng,
Gia đình lìa bỏ vì trung Nước Nhà.
Nay nhắc đến dởng mà thương tiếc,
Đã từ trần ly biệt song thân.
Nhớ xưa còn ở nơi trần,
Anh Hùng Chiến sĩ lắm lần gian nan.
Băng rừng núi hố hang hiểm trở,
Tuông bụi bờ tay đỡ chơn nương.
Xông pha nơi chốn chiến trường,
Lưng đai túi đạn vai thường súng mang.
Đầu vọng bái trước bàn Tổ Quốc,
Chứng tấm lòng thành thật lễ cầu.
Hương Hồn Chiến sĩ đâu đâu,
Nghe chuông Siêu Độ ngõ hầu nương chơn.
Nơi Thánh Thất nghe đờn diệu trổi,
Cầu Linh Hồn nhẹ tới phi thiên.
Xưa kia một đấng tu hiền,
Trung quân ái Quốc sử biên tên đề.
Nay nhắc đến tái tê thiết thảm,
Vì Nước Nhà dũng cảm hy sinh.
Quyết tâm độc lập cho thành,
Xông tên lướt đạn Hùng Anh lâm nàn.
Cùng người nghịch chiến trường lìa xác,
Nên Hương Hồn vất lạc thẩn thơ.
Về nơi Chùa Miễu phụng thờ,
Hương Hồn Chiến sĩ hưởng nhờ khói hương.
Tình đồng loại đồng thương toan liệu,
Lập trai đàn Đại, Tiểu cầu siêu.
Nguyện cho Hồn đặng tiêu diêu,
Về miền Cực Lạc Linh Tiêu an nhàn. ■`,
  },

  // A. VỌNG THÀI XUÂN CÚNG THẦY
  {
    slug: 'ii-m-vong-thai-xuan-cung-thay',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'A. VỌNG THÀI XUÂN CÚNG THẦY',
    printedPageLabel: '123–124',
    pdfPageStart: 125,
    pdfPageEnd: 126,
    ritualTags: ['Vọng Thài', 'Cúng Thầy', 'Thài Xuân'],
  },
  {
    slug: 'm1-hien-tung-hoa',
    parentSlug: 'ii-m-vong-thai-xuan-cung-thay',
    title: '1. Hiến Từng Hoa',
    printedPageLabel: '123',
    pdfPageStart: 125,
    ritualTags: ['Vọng Thài', 'Thài Xuân', 'Hiến Hoa'],
    contentMarkdown: `Từ (ừ ư) bi (y) giá (ừ) ngự (ứ y) rạng (ứ) môn (ừ) thiền (ừ),
Đệ (ừ) tử (ứ y) mừng (a) nay (y) hữu (ứ) huệ (ừ ư) duyên (y),
Năm (ừ) sắc (ứ y) Hoa (a) tươi (y) xin (ừ) Kỉnh (ừ) lễ (ứ y),
Cúi (ừ ư) mong (y) Thượng (ừ) Đế (Ứ y) rưới (ứ) ân (ừ ư) Thiên (y). ■`,
  },
  {
    slug: 'm2-hien-tung-tuu',
    parentSlug: 'ii-m-vong-thai-xuan-cung-thay',
    title: '2. Hiến Từng Tửu',
    printedPageLabel: '123',
    pdfPageStart: 125,
    ritualTags: ['Vọng Thài', 'Thài Xuân', 'Hiến Tửu'],
    contentMarkdown: `Thiên (ừ ư) ân (y) huệ (ừ) chiếu (ứ y) giáng (ứ) Thiền (ừ ư) minh (y),
Thành (ừ) kỉnh (ứ y) trường (a) xuân (y) chước (ứ) Tửu (ừ) quỳnh (ừ);
Lạc (ừ) hứng (ứ y) khấu (ứ ư) cung (y) giai (ừ) miễn (ừ) lễ (ứ y);
Thoát (ừ ư) tai (y) Bá (ừ) tánh (ứ y) ngưỡng (ứ ư) ân (ư) sinh (y). ■`,
  },
  {
    slug: 'm3-hien-tung-tra',
    parentSlug: 'ii-m-vong-thai-xuan-cung-thay',
    title: '3. Hiến Từng Trà',
    printedPageLabel: '124',
    pdfPageStart: 126,
    ritualTags: ['Vọng Thài', 'Thài Xuân', 'Hiến Trà'],
    contentMarkdown: `Mai (ừ ư) xuân (ứ y) nguyệt (ừ) cúc (ứ y) vị (ứ) Trà (a) hương (y),
Kỉnh (ừ) lễ (ứ y) thành (a) tâm (y) hiến (ứ) Bửu (ừ ư) Tương (y);
Ngưỡng (ừ) vọng (ứ ư) Từ (a) Bi (y) gia (ừ) tế (ừ) phước (ứ y),
Khai (ừ ư) minh (y) Đại (ừ) Đạo (ứ y) hộ (ứ) thanh (ừ) bường (ừ). ■`,
  },

  // B. VỌNG THÀI NAM CÚNG VONG (Thông Dụng)
  {
    slug: 'ii-n-vong-thai-nam-cung-vong',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'B. VỌNG THÀI NAM CÚNG VONG (Thông Dụng)',
    printedPageLabel: '124–125',
    pdfPageStart: 126,
    pdfPageEnd: 127,
    ritualTags: ['Vọng Thài', 'Cúng Vong', 'Thài Nam'],
  },
  {
    slug: 'n1-tung-so',
    parentSlug: 'ii-n-vong-thai-nam-cung-vong',
    title: '1. Từng Sơ',
    printedPageLabel: '124',
    pdfPageStart: 126,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Cúng Vong'],
    contentMarkdown: `Cảnh (ứ ư) vị (ư) người (ừ) sầu (ừ) hoa (ư) lợt (ứ ừ) lạt (ứ ư),
Vật (ư) theo (ừ) tiết (ứ ừ) đổi (ứ ư), nguyệt (ư) mê (ư) man (ư);
Dạ (ứ ừ) bàng (ừ) hoàng (ừ) mấy (ứ ừ) đoạn (ứ ư) tân (ư) toan (ư)! ■`,
  },
  {
    slug: 'n2-tung-a',
    parentSlug: 'ii-n-vong-thai-nam-cung-vong',
    title: '2. Từng Á',
    printedPageLabel: '125',
    pdfPageStart: 127,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Cúng Vong'],
    contentMarkdown: `Phẩm (ứ ừ) vật (ứ ư) tạm (ứ) đền (ứ) Ơn (ư) Cúc (ứ ừ) Dục (ứ ư),
Thời (ừ) trân (ư) xin (ư ừ) đáp (ứ ư) Nghĩa (ư) Sinh (ừ) Thành (ừ);
Dạ (ư) kỉnh (ừ) thành (ừ) thấu (ứ ừ) đến (ứ ư) Cao (ư) Xanh (ư)! ■`,
  },
  {
    slug: 'n3-tung-chung',
    parentSlug: 'ii-n-vong-thai-nam-cung-vong',
    title: '3. Từng Chung',
    printedPageLabel: '125',
    pdfPageStart: 127,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Cúng Vong'],
    contentMarkdown: `Rượu (ứ ừ) lạt (ư), Trà (ừ) thô (ư) đền (ừ) Nghĩa (ứ ừ) cả (ứ ư),
Rau (ư) khe (ư), nước (ứ ừ) suối (ứ) đáp (ư) Ơn (ừ) dày (ừ).
Dạ (ư) ai (ừ) hoài (ừ) Trời (ừ) Đất (ứ ư) có (ư) hay (ư)! ■`,
  },

  // C. VỌNG THÀI NAM CÚNG VONG CHIẾN SĨ
  {
    slug: 'ii-o-vong-thai-nam-chien-si',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'C. VỌNG THÀI NAM CÚNG VONG CHIẾN SĨ',
    printedPageLabel: '125–126',
    pdfPageStart: 127,
    pdfPageEnd: 128,
    ritualTags: ['Vọng Thài', 'Cúng Vong Chiến Sĩ', 'Thài Nam'],
  },
  {
    slug: 'o1-tung-so',
    parentSlug: 'ii-o-vong-thai-nam-chien-si',
    title: '1. Từng Sơ',
    printedPageLabel: '125',
    pdfPageStart: 127,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Chiến Sĩ'],
    contentMarkdown: `Cảnh (ứ ừ) vị (ư) người (ừ) sầu (ừ) Hoa (ư) lợt (ứ ừ) lạc (ứ ư)
Vật (ư) theo (ư) tiết (ứ ừ) đỗi (ứ ư) nguyệt (ư) mê (ư) mang (ư)
Dạ (ứ ừ) bàng (ừ) hoàng (ừ) mấy (ứ ừ) đoạn (ứ ư) tân (ư) toán (ư)! ■`,
  },
  {
    slug: 'o2-tung-a',
    parentSlug: 'ii-o-vong-thai-nam-chien-si',
    title: '2. Từng Á',
    printedPageLabel: '126',
    pdfPageStart: 128,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Chiến Sĩ'],
    contentMarkdown: `Phẩm (ừ ừ) vật (ứ ư) tạm (ứ) đền (ứ) Ơn (ư) Chiến (ứ ừ) sĩ (ứ ư),
Thời (ừ) trân (ư) xin (ư ừ) đáp (ứ ư) Nghĩa (ư) Công (ừ) thành (ừ);
Dạ (ư) kỉnh (ừ) thành (ừ) thấu (ứ ừ) đến (ứ ư) Cao (ư) Xanh (ư)! ■`,
  },
  {
    slug: 'o3-tung-chung',
    parentSlug: 'ii-o-vong-thai-nam-chien-si',
    title: '3. Từng Chung',
    printedPageLabel: '126',
    pdfPageStart: 128,
    ritualTags: ['Vọng Thài', 'Thài Nam', 'Chiến Sĩ'],
    contentMarkdown: `Rượu (ứ ừ) lạt (ư), Trà (ừ) thô (ư) đền (ừ) Nghĩa (ứ ừ) cả (ứ ư),
Rau (ư) khe (ư), nước (ứ ừ) suối (ứ) đáp (ư) Ơn (ừ) dày (ừ).
Dạ (ư) ai (ừ) hoài (ừ) Trời (ừ) Đất (ứ ư) có (ư) hay (ư)! ■`,
  },

  // K. LỜI NGUYỆN
  {
    slug: 'ii-p-loi-nguyen',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'K. LỜI NGUYỆN',
    printedPageLabel: '126–127',
    pdfPageStart: 128,
    pdfPageEnd: 129,
    ritualTags: ['Lời Nguyện', 'Đại Đồng', 'Đoàn Kết'],
    contentMarkdown: `Chúng con thảy là con Thượng Đế,
Nguyện thân này trọn để thờ Cha;
Hiệp nhau nâng nỗi Đạo nhà,
Sắt đinh là chí, trung hòa là tâm.
Nguyện giải mối lạc lầm phân rẽ,
Đem anh em bốn bể chung nhà;
Phụng thờ mối Đạo, thờ Cha,
Phụng thờ mối Đạo cộng hòa toàn linh.
Chúng con nguyện hy sinh tư kỷ,
Gìn một lòng chung thủy cùng nhau;
Bắt tay kết chặt tâm bào,
Thuận cơ hồi bổn hợp màu qui nguyên.
Lý vốn một Đạo nguyên một thể,
Tấm tình thương lấp bể tang thương;
Trời Thanh bảy ức năm trường,
Đưa cơ Tuyệt Khổ giải đường mê tân.
Chúng con nguyện nên thân con thảo,
Nguyện một lòng vẹn đạo em ngoan;
Nguyện làm anh, xứng dìu đàng,
Con đò Tái Tạo lên đàng Vĩnh Sanh. ■

---
### ❖ Câu niệm:
> **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },

  // L. KINH CẦU AN
  {
    slug: 'ii-q-kinh-cau-an',
    parentSlug: 'phan-2-quan-hon-tang-te',
    title: 'L. KINH CẦU AN',
    printedPageLabel: '127',
    pdfPageStart: 129,
    ritualTags: ['Kinh Cầu An', 'Cầu An', 'Hòa Bình'],
    contentMarkdown: `Đầu cúi lạy Ơn Trên Từ Phụ,
Chuyển Chơn Linh đổi dữ ra lành.
Vạn bang chấm dứt chiến tranh,
Hành Cơ tuyệt khổ độ sanh muôn loài.
Đời đời cảm đội Ơn Thầy. ■

---
### ❖ Câu niệm:
> **NAM MÔ CAO ĐÀI TIÊN ÔNG ĐẠI BỒ TÁT MA HA TÁT**`,
  },
];

export const FALLBACK_SECTIONS: LibrarySection[] = RAW_SECTIONS.map((raw, index) => ({
  id: `sec-${raw.slug}`,
  parentId: raw.parentSlug ? `sec-${raw.parentSlug}` : null,
  slug: raw.slug,
  title: raw.title,
  orderIndex: index + 1,
  printedPageLabel: raw.printedPageLabel,
  pdfPageStart: raw.pdfPageStart,
  pdfPageEnd: raw.pdfPageEnd ?? raw.pdfPageStart,
  ritualTags: raw.ritualTags ?? [],
  purposeTags: raw.purposeTags ?? [],
  timingTags: raw.timingTags ?? [],
  tuneType: raw.tuneType ?? null,
  content: raw.contentMarkdown
    ? {
        id: `cnt-${raw.slug}`,
        contentMarkdown: raw.contentMarkdown,
        plainText: raw.contentMarkdown
          .replace(/[*_#`>]/g, '')
          .replace(/<u>|<\/u>/g, '')
          .replace(/\s+/g, ' ')
          .trim(),
        originalScanPageRef: `Trang in ${raw.printedPageLabel} (PDF trang ${raw.pdfPageStart})`,
        editorialNote: raw.editorialNote ?? null,
      }
    : null,
}));

export const FALLBACK_DOCUMENTS: LibraryDocument[] = [
  {
    id: 'doc-1',
    slug: 'kinh-cung-tu-thoi-va-quan-hon-tang-te',
    title: 'Kinh Cúng Tứ Thời và Quan - Hôn - Tang - Tế',
    authorOrIssuingBody:
      'Hội Thánh Cao Đài Ban Chỉnh Đạo (Dưới quyền ủng hộ của Đức Giáo Tông Nguyễn Ngọc Tương)',
    summary:
      'Bộ kinh hành lễ căn bản và trọn vẹn của Hội Thánh Cao Đài Ban Chỉnh Đạo, gồm hai phần: Kinh Cúng Tứ Thời (Kinh Thiên Đạo, Trai kỳ, Cách thờ phượng, Cách lạy) và Kinh Quan - Hôn - Tang - Tế (Kinh Sanh, Hôn Nhơn, Kinh Lão, Kinh Bệnh, Kinh Tử, Điếu, Tống Chung, Làm Tuần, Kỵ Lạp).',
    historicalOrigin:
      'Ban hành năm thứ 97 Đại Đạo Tam Kỳ Phổ Độ (2022) bởi Hội Thánh Cao Đài Ban Chỉnh Đạo tại Tòa Thánh Bến Tre (100C Trương Định, P.6, TP. Bến Tre), được Hội Thánh sửa bản in để áp dụng thống nhứt trong toàn Đạo.',
    isComparativeReference: false,
    ritualTags: ['Cúng Tứ Thời', 'Quan Hôn Tang Tế', 'Hành lễ tại gia', 'Làm tuần cửu'],
    purposeTags: ['Cúng Thầy', 'Cúng Phật Mẫu', 'Cầu an', 'Cầu siêu', 'Sám hối', 'Giải oan'],
    timingTags: ['Tý - Mẹo - Ngọ - Dậu', 'Sóc Vọng', 'Buổi tối', 'Sanh / Hôn / Tang / Tế'],
    category: {
      id: 'cat-1',
      slug: 'kinh-cung-tu-thoi',
      name: 'Kinh Cúng Tứ Thời',
    },
    editions: [
      {
        id: 'ed-1',
        editionLabel: 'Ấn bản Nhà Xuất Bản Tôn Giáo — Năm 2022 (ĐĐTKPĐ Năm thứ 97)',
        publicationYear: 2022,
        publisher: 'Nhà Xuất Bản Tôn Giáo (In tại Cty TNHH In Tiến Phúc, TP. Bến Tre)',
        isbn: '978-604-61-8816-2',
        registrationCode: 'Số ĐKXB: 3126-2022/CXBIPH/07-122/TG | QĐXB: 547/QĐ-NXBTG (19/9/2022)',
        editorialTeam:
          'Sửa bản in (Hội Thánh Cao Đài Ban Chỉnh Đạo): Bảo Pháp Lữ Minh Châu, Hiến Đạo Tô Văn Tích, Bảo Đàn Thái Nguyễn Hồng Phước. Đơn vị liên kết: Ông Huỳnh Văn Phụ, Trưởng ban Thường trực, số 100C Trương Định, P.6, TP. Bến Tre.',
        sourceName: 'Bản in ấn tống (Không bán — 5.000 bản, khổ 14,5 x 20,5 cm)',
        archiveReference: 'Bản scan PDF gốc 144 trang đối chiếu trực tiếp',
        usagePermission: 'PUBLIC_READ',
        publishedAt: '2022-10-01T00:00:00Z',
        files: [
          {
            id: 'file-1',
            fileType: 'SCAN_ORIGINAL_PDF',
            fileName: 'Kinh Cung Tu Thoi Va Quan Hon Tang Te.pdf',
            storagePath: '/scans/kinh-cung-tu-thoi-quan-hon-tang-te-2022.pdf',
            checksumSha256: '5DFEB3D3617291BAABDCE7E5781A8FE50FF937598903812DFDC7DEDF9ED452E8',
            fileSizeBytes: 29611202,
            mimeType: 'application/pdf',
          },
        ],
        sections: FALLBACK_SECTIONS,
      },
    ],
  },
];
