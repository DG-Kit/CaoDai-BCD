import { PrismaClient, RoleCode } from '@prisma/client';

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
