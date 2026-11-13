import { PrismaClient, RoleCode, EventCategory } from '@prisma/client';
import { seedWorshipSites } from './seed-sites';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Khởi tạo Dữ liệu Nền tảng (Seed Database) ---');

  // 1. Danh sách Vai trò cốt lõi (Theo AGENTS.md & BRD.md)
  const roles: Array<{ code: RoleCode; name: string; description: string }> = [
    {
      code: RoleCode.VISITOR,
      name: 'Khách Viếng Thăm',
      description: 'Xem tài liệu công khai, tra cứu kinh sách, lịch Đạo và cơ sở thờ tự.',
    },
    {
      code: RoleCode.MEMBER,
      name: 'Thành Viên / Tín Đồ',
      description: 'Lưu dấu trang, cá nhân hóa lịch ăn chay, đóng góp tư liệu đối chiếu.',
    },
    {
      code: RoleCode.UNIT_ADMIN,
      name: 'Quản Trị Cơ Sở / Họ Đạo',
      description: 'Quản lý thông tin Thánh Sở và lịch sinh hoạt trong phạm vi đơn vị được giao.',
    },
    {
      code: RoleCode.LIBRARY_EDITOR,
      name: 'Biên Tập Viên Thư Viện',
      description: 'Số hóa, nhập siêu dữ liệu, biên tập bản văn nháp từ bản scan gốc.',
    },
    {
      code: RoleCode.REVIEWER,
      name: 'Thẩm Định Viên',
      description: 'Thẩm định tính chính xác của bản số hóa so với ấn bản gốc trước khi xuất bản.',
    },
    {
      code: RoleCode.SYSTEM_ADMIN,
      name: 'Quản Trị Kỹ Thuật',
      description: 'Quản trị tài khoản, cấu hình kỹ thuật, sao lưu và bảo mật hệ thống.',
    },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {
        name: role.name,
        description: role.description,
      },
      create: {
        code: role.code,
        name: role.name,
        description: role.description,
      },
    });
    console.log(`✓ Đã tạo/cập nhật vai trò: [${role.code}] ${role.name}`);
  }

  // 2. Danh sách Quyền hạn nền tảng (Permissions)
  const permissions = [
    // Phân hệ Thư Viện
    { code: 'documents:read', description: 'Đọc tài liệu công khai', module: 'LIBRARY' },
    { code: 'documents:create', description: 'Tạo tài liệu và tải bản scan', module: 'LIBRARY' },
    { code: 'documents:edit', description: 'Biên tập bản văn số hóa', module: 'LIBRARY' },
    { code: 'documents:review', description: 'Thẩm định và đối chiếu bản scan', module: 'LIBRARY' },
    { code: 'documents:publish', description: 'Xuất bản ấn bản kinh văn', module: 'LIBRARY' },
    // Phân hệ Lịch Đạo
    { code: 'calendar:read', description: 'Xem lịch Đạo và ngày chay', module: 'CALENDAR' },
    { code: 'calendar:manage', description: 'Quản lý sự kiện và quy tắc lịch', module: 'CALENDAR' },
    // Phân hệ Thánh Sở
    { code: 'worship_sites:read', description: 'Xem bản đồ và danh sách Thánh sở', module: 'WORSHIP_SITES' },
    { code: 'worship_sites:manage', description: 'Quản lý thông tin cơ sở thờ tự', module: 'WORSHIP_SITES' },
    // Phân hệ Soạn Sớ Văn
    { code: 'composer:create', description: 'Soạn thảo sớ văn từ biểu mẫu', module: 'COMPOSER' },
    { code: 'composer:export', description: 'Xuất file DOCX/PDF sớ văn', module: 'COMPOSER' },
    // Phân hệ Quản trị & Audit
    { code: 'system:admin', description: 'Quản trị kỹ thuật hệ thống', module: 'SYSTEM' },
    { code: 'audit:read', description: 'Xem nhật ký thay đổi (Audit Log)', module: 'SYSTEM' },
  ];

  for (const perm of permissions) {
    await prisma.permission.upsert({
      where: { code: perm.code },
      update: {
        module: perm.module,
        description: perm.description,
      },
      create: perm,
    });
  }
  console.log(`✓ Đã khởi tạo ${permissions.length} quyền hạn nền tảng.`);

  // 3. Phân bổ quyền cho các vai trò
  const rolePermissionMap: Record<RoleCode, string[]> = {
    [RoleCode.VISITOR]: ['documents:read', 'calendar:read', 'worship_sites:read'],
    [RoleCode.MEMBER]: ['documents:read', 'calendar:read', 'worship_sites:read', 'composer:create'],
    [RoleCode.LIBRARY_EDITOR]: [
      'documents:read',
      'documents:create',
      'documents:edit',
      'calendar:read',
      'worship_sites:read',
    ],
    [RoleCode.REVIEWER]: [
      'documents:read',
      'documents:review',
      'documents:publish',
      'calendar:read',
      'worship_sites:read',
      'audit:read',
    ],
    [RoleCode.UNIT_ADMIN]: [
      'documents:read',
      'calendar:read',
      'calendar:manage',
      'worship_sites:read',
      'worship_sites:manage',
      'composer:create',
      'composer:export',
    ],
    [RoleCode.SYSTEM_ADMIN]: permissions.map((p) => p.code),
  };

  for (const [rCode, permCodes] of Object.entries(rolePermissionMap)) {
    const roleCode = rCode as RoleCode;
    const role = await prisma.role.findUnique({ where: { code: roleCode } });
    if (!role) continue;

    for (const pCode of permCodes) {
      const perm = await prisma.permission.findUnique({ where: { code: pCode } });
      if (!perm) continue;

      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: perm.id,
        },
      });
    }
    console.log(`✓ Gán ${permCodes.length} quyền cho vai trò [${roleCode}]`);
  }

  // 4. Danh sách 13 Ngày Đại Lễ & Kỷ Niệm Chính Thức Của Hội Thánh Cao Đài Ban Chỉnh Đạo (Đã thẩm định)
  console.log('--- Khởi tạo 13 Ngày Đại Lễ / Kỷ Niệm Ban Chỉnh Đạo ---');
  const religiousEvents = [
    {
      code: 'VIA_DUC_CHI_TON',
      title: 'Đại lễ Vía Đức Chí Tôn',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Vía Đức Ngọc Hoàng Thượng Đế (Đức Chí Tôn - Đấng Đại Từ Phụ).',
      rule: {
        isLunar: true,
        lunarMonth: 1,
        lunarDayStart: 8,
        lunarDayEnd: 9,
        dateRangeStr: '08 – 09/01 Âm lịch',
      },
    },
    {
      code: 'THUONG_NGUON',
      title: 'Đại lễ Thượng Nguơn',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Thượng Nguơn - Cầu an đầu năm.',
      rule: {
        isLunar: true,
        lunarMonth: 1,
        lunarDayStart: 14,
        lunarDayEnd: 15,
        dateRangeStr: '14 – 15/01 Âm lịch',
      },
    },
    {
      code: 'VIA_THAI_THUONG_DAO_TO',
      title: 'Đại lễ Vía Đức Thái Thượng Đạo Tổ',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Vía Đức Thái Thượng Đạo Tổ (Lão Tử - Đạo giáo).',
      rule: {
        isLunar: true,
        lunarMonth: 2,
        lunarDayStart: 14,
        lunarDayEnd: 15,
        dateRangeStr: '14 – 15/02 Âm lịch',
      },
    },
    {
      code: 'KY_NIEM_GIAO_TONG_DAC_DAO',
      title: 'Lễ Kỷ niệm Đức Giáo Tông Nguyễn Ngọc Tương đắc đạo',
      category: EventCategory.COMMEMORATION,
      description: 'Kỷ niệm ngày Đức Giáo Tông Nguyễn Ngọc Tương đắc đạo.',
      rule: {
        isLunar: true,
        lunarMonth: 2,
        lunarDayStart: 24,
        lunarDayEnd: 25,
        dateRangeStr: '24 – 25/02 Âm lịch',
      },
    },
    {
      code: 'KY_NIEM_GIAO_TONG_THO_PHONG',
      title: 'Lễ Kỷ niệm Đức Giáo Tông Nguyễn Ngọc Tương thọ phong lý Giáo Tông nơi Thiên Đình',
      category: EventCategory.COMMEMORATION,
      description: 'Kỷ niệm ngày Đức Giáo Tông Nguyễn Ngọc Tương thọ phong lý Giáo Tông nơi Thiên Đình.',
      rule: {
        isLunar: true,
        lunarMonth: 3,
        lunarDayStart: 13,
        lunarDayEnd: 13,
        dateRangeStr: '13/03 Âm lịch',
      },
    },
    {
      code: 'PHAT_DAN_THICH_CA',
      title: 'Đại lễ Phật Đản Đức Thích Ca Mâu Ni',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Kỷ niệm Phật Đản Đức Thích Ca Mâu Ni (Phật giáo).',
      rule: {
        isLunar: true,
        lunarMonth: 4,
        lunarDayStart: 7,
        lunarDayEnd: 8,
        dateRangeStr: '07 – 08/04 Âm lịch',
      },
    },
    {
      code: 'KY_NIEM_RA_TINH_GIAO_TONG',
      title: 'Lễ Kỷ niệm "Ra Tịnh" của Đức Giáo Tông',
      category: EventCategory.COMMEMORATION,
      description: 'Kỷ niệm ngày "Ra Tịnh" của Đức Giáo Tông Nguyễn Ngọc Tương.',
      rule: {
        isLunar: true,
        lunarMonth: 5,
        lunarDayStart: 15,
        lunarDayEnd: 15,
        dateRangeStr: '15/05 Âm lịch',
      },
    },
    {
      code: 'SINH_NHAT_GIAO_TONG',
      title: 'Đại lễ Sinh nhật Đức Giáo Tông Nguyễn Ngọc Tương',
      category: EventCategory.COMMEMORATION,
      description: 'Đại lễ Kỷ niệm ngày sinh nhật của Đức Giáo Tông Nguyễn Ngọc Tương.',
      rule: {
        isLunar: true,
        lunarMonth: 5,
        lunarDayStart: 25,
        lunarDayEnd: 26,
        dateRangeStr: '25 – 26/05 Âm lịch',
      },
    },
    {
      code: 'KY_NIEM_THUONG_CHUONG_PHAP_DANG_TIEN',
      title: 'Lễ Kỷ niệm Đức Thượng Chưởng Pháp Lê Bá Trang đăng tiên',
      category: EventCategory.COMMEMORATION,
      description: 'Kỷ niệm ngày Đức Thượng Chưởng Pháp Lê Bá Trang đăng tiên.',
      rule: {
        isLunar: true,
        lunarMonth: 5,
        lunarDayStart: 29,
        lunarDayEnd: 29,
        dateRangeStr: '29/05 Âm lịch',
      },
    },
    {
      code: 'TRUNG_NGUON',
      title: 'Đại lễ Trung Nguơn',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Trung Nguơn - Cầu siêu xá tội vong nhân.',
      rule: {
        isLunar: true,
        lunarMonth: 7,
        lunarDayStart: 14,
        lunarDayEnd: 15,
        dateRangeStr: '14 – 15/07 Âm lịch',
      },
    },
    {
      code: 'VIA_DUC_DIEU_TRI_KIM_MAU',
      title: 'Đại lễ Vía Đức Diêu Trì Kim Mẫu, Trung thu Tết nhi đồng',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Hội Yến Diêu Trì Cung và Tết Trung Thu Nhi Đồng.',
      rule: {
        isLunar: true,
        lunarMonth: 8,
        lunarDayStart: 14,
        lunarDayEnd: 15,
        dateRangeStr: '14 – 15/08 Âm lịch',
      },
    },
    {
      code: 'HA_NGUON_KHAI_DAO',
      title: 'Đại lễ Hạ Nguơn - Kỷ niệm Khai đạo',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Hạ Nguơn và Kỷ niệm Ngày Hoằng Khai Đại Đạo Tam Kỳ Phổ Độ.',
      rule: {
        isLunar: true,
        lunarMonth: 10,
        lunarDayStart: 14,
        lunarDayEnd: 15,
        dateRangeStr: '14 – 15/10 Âm lịch',
      },
    },
    {
      code: 'GIANG_SINH_GIA_TO',
      title: 'Đại lễ Giáng sinh Đức Gia Tô Giáo Chủ',
      category: EventCategory.MAJOR_HOLIDAY,
      description: 'Đại lễ Kỷ niệm Giáng sinh Đức Gia Tô Giáo Chủ (Chúa Giê-su - Kitô giáo).',
      rule: {
        isLunar: false,
        solarMonth: 12,
        solarDayStart: 24,
        solarDayEnd: 25,
        dateRangeStr: '24 – 25/12 Dương lịch',
      },
    },
  ];

  for (const item of religiousEvents) {
    const event = await prisma.religiousEvent.upsert({
      where: { code: item.code },
      update: {
        title: item.title,
        category: item.category,
        description: item.description,
        isRecurring: true,
      },
      create: {
        code: item.code,
        title: item.title,
        category: item.category,
        description: item.description,
        isRecurring: true,
      },
    });

    // Cập nhật hoặc tạo quy tắc ngày (CalendarRule)
    await prisma.calendarRule.deleteMany({
      where: { eventId: event.id },
    });

    await prisma.calendarRule.create({
      data: {
        eventId: event.id,
        isLunar: item.rule.isLunar,
        lunarMonth: item.rule.lunarMonth,
        lunarDayStart: item.rule.lunarDayStart,
        lunarDayEnd: item.rule.lunarDayEnd,
        solarMonth: item.rule.solarMonth,
        solarDayStart: item.rule.solarDayStart,
        solarDayEnd: item.rule.solarDayEnd,
        dateRangeStr: item.rule.dateRangeStr,
      },
    });

    console.log(`✓ Đã nạp sự kiện: [${item.code}] ${item.title} (${item.rule.dateRangeStr})`);
  }

  // 5. Danh sách 16 Ngày Lễ Lớn & Kỷ Niệm Của Nhà Nước Việt Nam
  console.log('--- Khởi tạo 16 Ngày Lễ Lớn & Kỷ Niệm Nhà Nước Việt Nam ---');
  const nationalHolidays = [
    {
      code: 'TET_DUONG_LICH',
      title: 'Tết Dương Lịch',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Tết Dương Lịch - Ngày đầu năm mới theo lịch Gregory (Nghỉ lễ toàn quốc).',
      rule: {
        isLunar: false,
        solarMonth: 1,
        solarDayStart: 1,
        solarDayEnd: 1,
        dateRangeStr: '01/01 Dương lịch',
      },
    },
    {
      code: 'TET_NGUYEN_DAN',
      title: 'Tết Nguyên Đán (Tết Cổ Truyền)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Tết Nguyên Đán - Lễ hội truyền thống đón năm mới lớn nhất của dân tộc Việt Nam.',
      rule: {
        isLunar: true,
        lunarMonth: 1,
        lunarDayStart: 1,
        lunarDayEnd: 3,
        dateRangeStr: '01 – 03/01 Âm lịch',
      },
    },
    {
      code: 'NGAY_THAY_THUOC_VN',
      title: 'Ngày Thầy thuốc Việt Nam',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm Ngày Thầy thuốc Việt Nam - Tôn vinh y đức và đội ngũ y bác sĩ nước nhà.',
      rule: {
        isLunar: false,
        solarMonth: 2,
        solarDayStart: 27,
        solarDayEnd: 27,
        dateRangeStr: '27/02 Dương lịch',
      },
    },
    {
      code: 'QUOC_TE_PHU_NU',
      title: 'Ngày Quốc tế Phụ nữ (8/3)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày Quốc tế Phụ nữ - Tôn vinh công lao và vẻ đẹp của người phụ nữ.',
      rule: {
        isLunar: false,
        solarMonth: 3,
        solarDayStart: 8,
        solarDayEnd: 8,
        dateRangeStr: '08/03 Dương lịch',
      },
    },
    {
      code: 'GIO_TO_HUNG_VUONG',
      title: 'Đại lễ Giỗ Tổ Hùng Vương',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày Giỗ Tổ Hùng Vương (10/3 ÂL) - Tưởng nhớ công lao dựng nước của các Vua Hùng.',
      rule: {
        isLunar: true,
        lunarMonth: 3,
        lunarDayStart: 10,
        lunarDayEnd: 10,
        dateRangeStr: '10/03 Âm lịch',
      },
    },
    {
      code: 'GIAI_PHONG_MIEN_NAM',
      title: 'Ngày Giải phóng miền Nam, Thống nhất đất nước',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm Ngày Giải phóng hoàn toàn miền Nam, thống nhất non sông (30/4/1975).',
      rule: {
        isLunar: false,
        solarMonth: 4,
        solarDayStart: 30,
        solarDayEnd: 30,
        dateRangeStr: '30/04 Dương lịch',
      },
    },
    {
      code: 'QUOC_TE_LAO_DONG',
      title: 'Ngày Quốc tế Lao động',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày Quốc tế Lao động (1/5) - Tôn vinh lực lượng lao động toàn xã hội.',
      rule: {
        isLunar: false,
        solarMonth: 5,
        solarDayStart: 1,
        solarDayEnd: 1,
        dateRangeStr: '01/05 Dương lịch',
      },
    },
    {
      code: 'TET_DOAN_NGO',
      title: 'Tết Đoan Ngọ (Giết sâu bọ)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Tết Đoan Ngọ mùng 5 tháng 5 Âm lịch - Phong tục trừ sâu bọ, cầu bình an mùa màng.',
      rule: {
        isLunar: true,
        lunarMonth: 5,
        lunarDayStart: 5,
        lunarDayEnd: 5,
        dateRangeStr: '05/05 Âm lịch',
      },
    },
    {
      code: 'THUONG_BINH_LIET_SI',
      title: 'Ngày Thương binh - Liệt sĩ',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày tri ân các anh hùng liệt sĩ, thương bệnh binh đã hy sinh vì nền độc lập tự do (27/7).',
      rule: {
        isLunar: false,
        solarMonth: 7,
        solarDayStart: 27,
        solarDayEnd: 27,
        dateRangeStr: '27/07 Dương lịch',
      },
    },
    {
      code: 'CACH_MANG_THANG_TAM',
      title: 'Ngày Cách mạng Tháng Tám thành công',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm ngày thắng lợi của Cách mạng Tháng Tám hào hùng (19/08/1945).',
      rule: {
        isLunar: false,
        solarMonth: 8,
        solarDayStart: 19,
        solarDayEnd: 19,
        dateRangeStr: '19/08 Dương lịch',
      },
    },
    {
      code: 'QUOC_KHANH_VIET_NAM',
      title: 'Đại lễ Quốc khánh nước CHXHCN Việt Nam',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm Ngày Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH (02/09/1945).',
      rule: {
        isLunar: false,
        solarMonth: 9,
        solarDayStart: 2,
        solarDayEnd: 2,
        dateRangeStr: '02/09 Dương lịch',
      },
    },
    {
      code: 'GIAI_PHONG_THU_DO',
      title: 'Ngày Giải phóng Thủ đô',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm ngày đoàn quân giải phóng tiến về tiếp quản Thủ đô Hà Nội (10/10/1954).',
      rule: {
        isLunar: false,
        solarMonth: 10,
        solarDayStart: 10,
        solarDayEnd: 10,
        dateRangeStr: '10/10 Dương lịch',
      },
    },
    {
      code: 'PHU_NU_VIET_NAM',
      title: 'Ngày Phụ nữ Việt Nam (20/10)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Kỷ niệm Ngày thành lập Hội Liên hiệp Phụ nữ Việt Nam (20/10/1930).',
      rule: {
        isLunar: false,
        solarMonth: 10,
        solarDayStart: 20,
        solarDayEnd: 20,
        dateRangeStr: '20/10 Dương lịch',
      },
    },
    {
      code: 'NHA_GIAO_VIET_NAM',
      title: 'Ngày Nhà giáo Việt Nam (20/11)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày Hiến chương Nhà giáo Việt Nam - Tôn vinh truyền thống Tôn sư trọng đạo.',
      rule: {
        isLunar: false,
        solarMonth: 11,
        solarDayStart: 20,
        solarDayEnd: 20,
        dateRangeStr: '20/11 Dương lịch',
      },
    },
    {
      code: 'QUAN_DOI_NHAN_DAN',
      title: 'Ngày Thành lập Quân đội Nhân dân Việt Nam',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Ngày hội Quốc phòng toàn dân và thành lập QĐND Việt Nam anh hùng (22/12/1944).',
      rule: {
        isLunar: false,
        solarMonth: 12,
        solarDayStart: 22,
        solarDayEnd: 22,
        dateRangeStr: '22/12 Dương lịch',
      },
    },
    {
      code: 'TET_ONG_TAO',
      title: 'Tết Táo Quân (Đưa Ông Táo về trời)',
      category: EventCategory.NATIONAL_HOLIDAY,
      description: 'Lễ cúng tiễn Táo Quân cưỡi cá chép chầu trời báo cáo việc trần gian (23 tháng Chạp).',
      rule: {
        isLunar: true,
        lunarMonth: 12,
        lunarDayStart: 23,
        lunarDayEnd: 23,
        dateRangeStr: '23/12 Âm lịch',
      },
    },
  ];

  for (const item of nationalHolidays) {
    const event = await prisma.religiousEvent.upsert({
      where: { code: item.code },
      update: {
        title: item.title,
        category: item.category,
        description: item.description,
        isRecurring: true,
      },
      create: {
        code: item.code,
        title: item.title,
        category: item.category,
        description: item.description,
        isRecurring: true,
      },
    });

    await prisma.calendarRule.deleteMany({
      where: { eventId: event.id },
    });

    await prisma.calendarRule.create({
      data: {
        eventId: event.id,
        isLunar: item.rule.isLunar,
        lunarMonth: item.rule.lunarMonth,
        lunarDayStart: item.rule.lunarDayStart,
        lunarDayEnd: item.rule.lunarDayEnd,
        solarMonth: item.rule.solarMonth,
        solarDayStart: item.rule.solarDayStart,
        solarDayEnd: item.rule.solarDayEnd,
        dateRangeStr: item.rule.dateRangeStr,
      },
    });

    console.log(`✓ Đã nạp sự kiện quốc gia: [${item.code}] ${item.title} (${item.rule.dateRangeStr})`);
  }

  await seedWorshipSites(prisma);

  console.log('--- Hoàn tất khởi tạo dữ liệu nền tảng thành công! ---');
}

main()
  .catch((e) => {
    console.error('Lỗi khi seed dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
