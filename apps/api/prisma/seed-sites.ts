import {
  PrismaClient,
  SiteSectionType,
  SiteType,
  VerificationStatus,
  VisibilityLevel,
} from '@prisma/client';

interface SeedSection {
  sectionType: SiteSectionType;
  title: string;
  contentMarkdown: string;
  sortOrder: number;
  sourceCitation: string;
  verificationStatus: VerificationStatus;
}

interface SeedSite {
  slug: string;
  name: string;
  otherNames: string[];
  siteType: SiteType;
  isFeaturedLandmark: boolean;
  visibilityLevel: VisibilityLevel;
  displayOrder: number;
  province: string;
  currentAddress: string;
  historicAddress?: string;
  directionsSummary?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
  imageCaption?: string;
  verificationStatus: VerificationStatus;
  sourceNote: string;
  sections?: SeedSection[];
}

export async function seedWorshipSites(prisma: PrismaClient) {
  console.log('--- Khởi tạo Dữ liệu Tòa Thánh Bến Tre & Danh mục Thánh Thất thu gọn ---');

  // 1. Tạo đơn vị tổ chức gốc: Hội Thánh Cao Đài Ban Chỉnh Đạo
  const rootUnit = await prisma.organizationUnit.upsert({
    where: { id: '00000000-0000-4000-8000-000000000001' },
    update: {
      name: 'Hội Thánh Cao Đài Ban Chỉnh Đạo',
      unitType: 'HOI_THANH',
    },
    create: {
      id: '00000000-0000-4000-8000-000000000001',
      name: 'Hội Thánh Cao Đài Ban Chỉnh Đạo',
      unitType: 'HOI_THANH',
    },
  });

  const featuredSites: SeedSite[] = [
    {
      slug: 'toa-thanh-ben-tre',
      name: 'Tòa Thánh Bến Tre (Thánh thất An Hội cũ)',
      otherNames: ['Thánh thất An Hội cũ', 'Tòa Thánh Bến Tre', 'Tổ đình Hội Thánh Cao Đài Ban Chỉnh Đạo'],
      siteType: SiteType.TOA_THANH,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 1,
      province: 'Bến Tre',
      currentAddress: 'Số 100C đường Trương Định, Phường 6, TP. Bến Tre, tỉnh Bến Tre',
      historicAddress: 'Làng An Hội, tổng Bảo An, tỉnh Bến Tre',
      directionsSummary:
        'Tọa lạc tại số 100C đường Trương Định, Phường 6, TP. Bến Tre. Từ đại lộ Đồng Khởi rẽ vào đường Trương Định khoảng 500m là đến cổng Tòa Thánh.',
      imageUrl: '/images/toa-thanh-ben-tre.jpg',
      imageCaption: 'Mặt tiền Tòa Thánh Bến Tre với hai tháp Kim Chung - Ngọc Cổ và bảo tháp tiền đình',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Hồ sơ Di tích Lịch sử - Văn hóa cấp tỉnh (2017) & Tư liệu Hội Thánh Cao Đài Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Lịch sử hình thành & Các mốc son phát triển',
          contentMarkdown:
            'Tòa Thánh Bến Tre (tên chính thức là Tổ đình Hội Thánh Cao Đài Ban Chỉnh Đạo) là trung tâm thờ tự tối cao và cơ quan điều hành đạo vụ của hệ phái Cao Đài Ban Chỉnh Đạo — một trong những hội thánh lớn và có ảnh hưởng sâu rộng trong nền Đại Đạo Tam Kỳ Phổ Độ.\n\nQuá trình hình thành và phát triển của Tòa Thánh ghi dấu các mốc lịch sử quan trọng:\n\n• **Năm 1928 — Khởi dựng Thánh thất An Hội:** Ban đầu, cơ sở được tạo lập bằng vật liệu đơn sơ (cây lá) tại làng An Hội dưới sự dìu dắt của vị chức sắc tiền bối uy tín là Đầu sư Nguyễn Ngọc Tương (về sau được suy tôn ngôi Giáo Tông) cùng các vị đạo tâm khi trở về quê hương Bến Tre gầy dựng nếp tu học thuần thành.\n\n• **Ngày 20/11/1934 (14 tháng 10 năm Giáp Tuất) — Khai sáng Ban Chỉnh Đạo:** Trước bối cảnh phân hóa nội bộ của đạo kỳ bấy giờ, một đại hội trọng thể quy tụ hàng ngàn tín đồ và chức sắc từ nhiều tỉnh thành Nam Bộ đã long trọng diễn ra tại Thánh thất An Hội. Đại hội chính thức tuyên ngôn thành lập **Ban Chỉnh Đạo** với chủ trương chấn hưng kỷ cương, giữ gìn trọn vẹn Tân Luật và Pháp Chánh Truyền buổi sơ khai, đề cao tinh thần thuần túy tu hành và phụng sự nhân sanh.\n\n• **Đầu năm 1935 — Lập thành Tòa Thánh Bến Tre:** Tại Đại hội Vạn Linh diễn ra ở Thánh thất An Hội, toàn thể chức sắc và đạo chúng đã nhất tâm công cử, suy tôn Đầu sư Nguyễn Ngọc Tương lên ngôi vị **Giáo Tông** lãnh đạo Hội Thánh. Kể từ thời điểm này, Thánh thất An Hội chính thức được tôn lập thành **Tòa Thánh Bến Tre**, trở thành Tổ Đình trung ương của Ban Chỉnh Đạo.\n\n• **Năm 1947 — Kiến thiết Đền Thánh kiên cố:** Để đáp ứng nhu cầu hành đạo ngày càng phát triển, Hội Thánh đã khởi công xây dựng ngôi Đền Thánh (Bửu Điện) quy mô bề thế bằng bê tông cốt thép, tạo dựng diện mạo tôn nghiêm, vững chãi tồn tại đến ngày nay.\n\n• **Năm 2017 — Vinh danh Di tích cấp tỉnh:** Với những giá trị đặc sắc về kiến trúc, văn hóa và lịch sử phụng đạo yêu nước, quần thể Tòa Thánh Bến Tre (diện tích bảo vệ hơn 7.000 m²) đã được Ủy ban Nhân dân tỉnh Bến Tre chính thức xếp hạng là **Di tích Lịch sử - Văn hóa cấp tỉnh**.',
          sortOrder: 1,
          sourceCitation: 'Hồ sơ Di tích cấp tỉnh (UBND tỉnh Bến Tre, 2017) & Kỷ yếu Ban Chỉnh Đạo',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Quy hoạch quần thể & Kiến trúc Tam Đài đặc trưng',
          contentMarkdown:
            'Tòa Thánh Bến Tre tọa lạc trong một khuôn viên rợp bóng cây xanh cổ thụ rộng hơn 7.000 m², mang lại cảm giác u nhã và trang nghiêm. Ngôi Đền Thánh trung tâm được kiến trúc theo mô thức **Tam Đài** truyền thống của Đạo Cao Đài, biểu trưng cho cấu thể vũ trụ và tam thể con người:\n\n• **Hiệp Thiên Đài (Mặt tiền - biểu tượng Chơn thần):**\n  - Nổi bật ở mặt trước là hai tháp cao vút đăng đối: bên trái là **tháp Ngọc Cổ** (lầu trống), bên phải là **tháp Kim Chung** (lầu chuông).\n  - Điểm mỹ thuật thanh thoát đặc trưng của Ban Chỉnh Đạo là các tầng tháp được thiết kế thu nhỏ dần lên đỉnh nóc nhọn gắn biểu tượng chữ Vạn cát tường, không trổ ban công nhô ra như một số chi phái khác, tạo nên nét đẹp đĩnh đạc và tĩnh lặng.\n  - Đây là khu vực hành lễ tiếp nhận thông công giáo lý và phụ trách pháp luật đạo sự.\n\n• **Cửu Trùng Đài (Thân giữa - biểu tượng Thể xác & Cơ quan hành chính):**\n  - Không gian Chánh điện dài rộng thênh thang, nền gạch được nâng dần thành nhiều cấp tượng trưng cho Cửu phẩm thần tiên và các nấc thang tiến hóa tâm linh của hành giả.\n  - Hệ thống cột tròn, bao lam, hoành phi, câu đối và bàn thờ được chạm trổ hoa văn rồng mây, hoa sen tinh mỹ theo phong cách mộc mỹ thuật Nam Bộ truyền thống, toàn bộ được **sơn son thếp vàng** lộng lẫy.\n\n• **Bát Quái Đài (Hậu điện - biểu tượng Linh hồn & Cõi thiêng liêng):**\n  - Cấu trúc hình bát giác tám cạnh trang nghiêm nơi thâm sâu của Đền Thánh. Nơi đây thiết lập gian thờ linh thiêng phụng thờ **Thiên Nhãn** (con mắt Thượng Đế thấu suốt cõi càn khôn) cùng Quả Càn Khôn, Tam Giáo Đạo Tổ (Thích Ca, Thái Thượng Lão Quân, Khổng Tử) và Ngũ Chi Đại Đạo, hướng đạo tâm về nguồn cội vô vi thanh tịnh.',
          sortOrder: 1,
          sourceCitation: 'Khảo cứu kiến trúc Tòa Thánh Bến Tre & Bản vẽ thiết kế Bửu Điện',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Vị trí địa lý & Hướng dẫn đường đi đến',
          contentMarkdown:
            '• **Địa chỉ chính xác:** Số 100C đường Trương Định, Phường 6, thành phố Bến Tre, tỉnh Bến Tre.\n• **Tọa độ định vị:** Gần giao lộ giữa đại lộ Đồng Khởi và đường Trương Định, cách trung tâm hành chính tỉnh Bến Tre khoảng 1 km.\n\n• **Hướng dẫn di chuyển chi tiết:**\n  - *Từ TP. Hồ Chí Minh và các tỉnh miền Đông:* Lưu thông theo đường cao tốc TP.HCM – Trung Lương (hoặc Quốc lộ 1A) đến ngã ba Trung Lương (Tiền Giang), chuyển sang Quốc lộ 60 qua cầu Rạch Miễu vào địa phận TP. Bến Tre. Tiếp tục đi thẳng theo đại lộ Đồng Khởi, rẽ trái vào đường Trương Định khoảng 500m là thấy cổng chính Tòa Thánh.\n  - *Từ các tỉnh miền Tây (Trà Vinh, Vĩnh Long, Cần Thơ):* Đi theo Quốc lộ 60 qua cầu Cổ Chiên hoặc cầu Hàm Luông tiến vào nội ô TP. Bến Tre, theo hướng đường Đồng Khởi để rẽ vào Trương Định.\n\n• **Quy định thăm viếng & Chiêm bái:**\n  - Tòa Thánh mở cửa hằng ngày đón tiếp đồng đạo và khách hành hương chiêm bái, đặc biệt đông đúc vào các thời cúng Tứ thời (Tý, Mẹo, Ngọ, Dậu), các ngày Sóc Vọng (mùng 1, ngày rằm âm lịch) và các dịp Đại lễ Khai Đạo, Vía Đức Cao Đài, Hội Yến Diêu Trì.\n  - Quý khách viếng thăm vui lòng mặc trang phục lịch sự, chỉnh tề, giữ trật tự nơi tôn nghiêm và liên hệ Ban tiếp tân tại cổng Tòa Thánh nếu cần được hướng dẫn tham quan quần thể.',
          sortOrder: 1,
          sourceCitation: 'Cổng thông tin địa giới TP. Bến Tre & Nội quy Ban Cai quản Tòa Thánh',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'dieu-tri-buu-dien',
      name: 'Diêu Trì Bửu Điện',
      otherNames: ['Điện Thờ Phật Mẫu', 'Báo Ân Từ'],
      siteType: SiteType.DIEN_THO_PHAT_MAU,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 2,
      province: 'Bến Tre',
      currentAddress: 'Khuôn viên Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Tọa lạc trang nghiêm trong khuôn viên Tòa Thánh Bến Tre, cạnh khu Đền Thánh chính.',
      imageUrl: '/images/dieu-tri-buu-dien.jpg',
      imageCaption: 'Diêu Trì Bửu Điện (Điện Thờ Phật Mẫu) tại Tòa Thánh Bến Tre',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Tư liệu lịch sử & nghi lễ Hội Thánh Cao Đài Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Lịch sử hình thành & Ý nghĩa phụng thờ',
          contentMarkdown:
            'Diêu Trì Bửu Điện (còn gọi là Điện Thờ Phật Mẫu) là công trình tâm linh trọng yếu trong quần thể Tòa Thánh Bến Tre, được kiến lập từ những năm đầu sau khi thành lập Ban Chỉnh Đạo (1934 – 1935).\n\nTrong giáo lý Cao Đài, nếu Đền Thánh là nơi phụng thờ Thầy (Đức Thượng Đế Càn Khôn) biểu thị cho nguyên lý Dương quang vô vi, thì Diêu Trì Bửu Điện là nơi phụng thờ Mẹ (Đức Đại Từ Mẫu Diêu Trì Kim Mẫu cùng Cửu Vị Tiên Nương) biểu thị cho tình thương bao la dưỡng dục muôn loài.\n\nNơi đây là trung tâm cử hành các nghi thức thờ Mẫu thiêng liêng suốt bốn mùa, tiêu biểu nhất là **Đại Lễ Hội Yến Diêu Trì Cung** vào rằm tháng Tám (tháng 8 Âm lịch) hằng năm — ngày hội lớn quy tụ hàng chục ngàn đồng đạo và khách thập phương chiêm bái, thọ hưởng ân huệ thiêng liêng.',
          sortOrder: 1,
          sourceCitation: 'Tư liệu nghi lễ Ban Chỉnh Đạo & Kỷ yếu Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Kiến trúc thanh nhã & Bài trí thờ tự',
          contentMarkdown:
            'Kiến trúc Diêu Trì Bửu Điện mang phong cách thanh thoát, nhu hòa, tạo cảm giác ấm áp, an lành cho bất kỳ ai đặt chân vào chiêm bái:\n\n• **Chánh điện thờ Mẫu:** Gian thờ trung tâm an vị bức thánh tượng và loan giá phụng thờ Đức Diêu Trì Kim Mẫu ngự trên tòa sen, hai bên là bàn thờ Cửu Vị Tiên Nương và chư vị nữ Phật.\n\n• **Nghệ thuật bài trí:** Hệ thống hoành phi, bao lam, liễn đối được chạm khắc hoa văn tinh xảo theo truyền thống mỹ thuật cổ truyền Nam Bộ, phủ sơn son thếp vàng trang trọng.\n\n• **Cảnh quan thanh tịnh:** Điện thờ nép mình dưới những hàng cây cổ thụ mát rượi, mặt sân lát gạch sạch sẽ, kết nối liên hoàn với Đền Thánh và các khu tu học xung quanh.',
          sortOrder: 1,
          sourceCitation: 'Hồ sơ kiến trúc thờ tự Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Hướng dẫn hành hương',
          contentMarkdown:
            '• **Vị trí:** Nằm ngay trong khuôn viên Tòa Thánh Bến Tre (số 100C đường Trương Định, Phường 6, TP. Bến Tre).\n• **Hướng dẫn tiếp cận:** Từ cổng chính Tòa Thánh, di chuyển dọc theo lối đi rợp mát bóng cây về phía bên cạnh Đền Thánh để vào Diêu Trì Bửu Điện.\n• **Thời điểm chiêm bái đẹp nhất:** Các thời cúng hằng ngày, ngày sóc vọng (mùng 1, ngày rằm) và đặc biệt là dịp Đại Lễ Hội Yến Diêu Trì Cung vào ngày 14 – 15 tháng Tám âm lịch với các gian hàng trưng bày quả phẩm và rước cộ tiên trang trọng.',
          sortOrder: 1,
          sourceCitation: 'Sơ đồ hướng dẫn Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'vuon-ky-tho',
      name: 'Vườn Kỳ Thọ',
      otherNames: ['Khuôn viên Vườn Kỳ Thọ', 'Vườn Trước Hoa Kỳ Thọ'],
      siteType: SiteType.VUON_KY_THO,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 3,
      province: 'Bến Tre',
      currentAddress: 'Khuôn viên Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Nằm trong quần thể Tòa Thánh Bến Tre, kết nối giữa khu vực thờ tự và khu tịnh thất chuyên tu.',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Tư liệu cảnh quan tâm linh & di tích tu học Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Ý nghĩa tên gọi Kỳ Thọ & Di tích Thiên Lý Mật Truyền',
          contentMarkdown:
            'Vườn Kỳ Thọ (còn được gọi là Vườn Trước Hoa Kỳ Thọ) là địa danh tâm linh đặc biệt quan trọng trong quần thể Tòa Thánh Bến Tre:\n\n• **Điển tích tên gọi:** Tên "Kỳ Thọ" bắt nguồn từ điển tích Phật giáo *Vườn Kỳ Thọ Cấp Cô Độc (Tịnh xá Kỳ Viên)* — nơi Đức Thích Ca Mâu Ni từng ngự thuyết pháp cho chư đại đệ tử, biểu trưng cho cõi tịnh lương, trường thọ và bền vững của đạo đức chơn truyền.\n\n• **Dấu ấn tu luyện của Đức Giáo Tông Nguyễn Ngọc Tương:** Vào năm 1939, Hội Thánh đã cho kiến tạo căn nhà **Thiên Lý Mật Truyền** tại khu vực này để Đức Giáo Tông Nguyễn Ngọc Tương nhập đại tịnh, chuyên tâm công phu tịnh luyện các pháp môn Thượng thừa thâm sâu, dìu dắt linh hồn Hội Thánh vượt qua những năm tháng cam go.\n\n• **Nơi an nghỉ thiêng liêng:** Khu vực Vườn Kỳ Thọ còn là nơi tọa lạc bửu tháp tôn nghiêm của Đức Giáo Tông và các bậc tiền khai, chức sắc cao cấp của Hội Thánh sau khi quy liễu.',
          sortOrder: 1,
          sourceCitation: 'Tư liệu lịch sử Ban Chỉnh Đạo & Kỷ yếu Đức Giáo Tông Nguyễn Ngọc Tương',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Cảnh quan thiên nhiên & Không gian tĩnh tọa',
          contentMarkdown:
            'Vườn Kỳ Thọ được quy hoạch thành một khu vườn thiền thanh tịnh, tách biệt với nhịp sống ồn ào bên ngoài:\n\n• **Cổ thụ bóng mát:** Vườn lưu giữ nhiều cây cổ thụ quý giá, cây kiểng bonsai và thảm cỏ xanh mướt, tạo bầu không khí thanh khiết, trong lành quanh năm.\n\n• **Lối tản bộ & Bửu tháp:** Các lối đi lát gạch len lỏi dưới tán cây dẫn lối đến khu vực Bửu tháp tôn kính và các điểm tịnh tọa ngoài trời dành cho hành giả suy ngẫm đạo lý, dưỡng khí an thần.\n\n• **Sự giao hòa đạo - đời:** Cảnh sắc nơi đây hài hòa giữa nét trang nghiêm tôn giáo và vẻ mộc mạc, hiền hòa của đất rừng sông nước Bến Tre.',
          sortOrder: 1,
          sourceCitation: 'Quy hoạch cảnh quan quần thể Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Quy định tịnh dưỡng',
          contentMarkdown:
            '• **Vị trí:** Phía sau và lân cận khu vực Đền Thánh trong khuôn viên Tòa Thánh Bến Tre.\n• **Hướng dẫn:** Từ Đền Thánh di chuyển ra phía sau khuôn viên theo lối đi râm mát để đến Vườn Kỳ Thọ và khu Bửu tháp.\n• **Quy định khi thăm viếng:** Vì đây là không gian tâm linh thanh tịnh và nơi an nghỉ của chư bậc tiền bối, quý khách và đồng đạo viếng cảnh cần đi nhẹ, nói khẽ, giữ gìn vệ sinh và không hái hoa, bẻ cành.',
          sortOrder: 1,
          sourceCitation: 'Nội quy khuôn viên Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'nha-tu-trung-thua-nam',
      name: 'Nhà tu Trung thừa Nam',
      otherNames: ['Khu Nhà Tu Trung Thừa (Nam phái)'],
      siteType: SiteType.NHA_TU_TRUNG_THUA_NAM,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 4,
      province: 'Bến Tre',
      currentAddress: 'Khuôn viên Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Nằm trong phân khu cơ sở tu học dành riêng cho nam phái tại Tòa Thánh Bến Tre.',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Điều lệ Nhà tu Trung Thừa & Tư liệu tu học Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Vị trí bậc Trung thừa & Lịch sử cơ sở',
          contentMarkdown:
            'Trong đường lối tu tiến Tam Thừa (Hạ thừa – Trung thừa – Thượng thừa) của Hội Thánh Cao Đài Ban Chỉnh Đạo, bậc Trung thừa giữ vai trò chiếc cầu nối quan trọng giữa đời sống cư sĩ tại gia và con đường xuất thế tịnh luyện:\n\n• **Ý nghĩa tu học:** Dành cho người hành giả phát nguyện hiến thân "nửa đời, nửa đạo" — vừa chu toàn trách nhiệm gia đình xã hội, vừa dành phần lớn tâm lực và thời gian sống tập thể tại Nhà tu để học đạo, giữ từ 10 ngày chay (thập trai) trở lên.\n\n• **Lịch sử thiết lập:** Nhà tu Trung thừa Nam được thành lập theo *Điều lệ Nhà tu Trung Thừa* do Tòa Thánh Bến Tre ban hành dưới sự chỉ đạo của Đức Giáo Tông Nguyễn Ngọc Tương. Trải qua các thời kỳ, nơi đây đã đào tạo và bồi dưỡng nhiều thế hệ chức sắc, chức việc nam phái có đạo hạnh vững vàng phụng sự Hội Thánh.',
          sortOrder: 1,
          sourceCitation: 'Điều lệ Nhà tu Trung Thừa (Tòa Thánh Bến Tre)',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Kiến trúc công trình & Nếp sống tu tập',
          contentMarkdown:
            'Công trình Nhà tu Trung thừa Nam được xây dựng theo phong cách đạm bạc, bền chắc và tiện nghi cho sinh hoạt cộng đồng tu sĩ:\n\n• **Bố cục chức năng:** Gồm giảng đường học tập kinh điển giáo lý, các dãy phòng nghỉ tập thể thoáng mát, khu nhà ăn tịnh chay và gian thờ cúng công phu sớm tối.\n\n• **Nếp sống tu học thường nhật:** Tinh thần tại Nhà tu đề cao kỷ luật nghiêm trang, huynh đệ tương thân tương ái. Hằng ngày, hành giả thực hành kinh kệ Tứ thời, học giáo lý và trực tiếp tham gia lao tác công quả, làm từ thiện xã hội trợ giúp đồng bào khó khăn.',
          sortOrder: 1,
          sourceCitation: 'Quy chế tu học Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Liên hệ tiếp đón',
          contentMarkdown:
            '• **Vị trí:** Phân khu tu học nam phái trong khuôn viên Tòa Thánh Bến Tre (số 100C đường Trương Định, Phường 6, TP. Bến Tre).\n• **Hướng dẫn:** Từ cổng Tòa Thánh đi theo trục đường nội bộ dẫn sang khu vực tu học nam phái.\n• **Quy định tiếp khách:** Đồng đạo và khách hành hương có nguyện vọng tìm hiểu nếp tu Trung thừa vui lòng liên hệ Ban Cai quản hoặc văn phòng tiếp đón Tòa Thánh để được bố trí hướng dẫn.',
          sortOrder: 1,
          sourceCitation: 'Hướng dẫn nội bộ Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'nha-tu-trung-thua-nu',
      name: 'Nhà tu Trung thừa Nữ',
      otherNames: ['Khu Nhà Tu Trung Thừa (Nữ phái)'],
      siteType: SiteType.NHA_TU_TRUNG_THUA_NU,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 5,
      province: 'Bến Tre',
      currentAddress: 'Khuôn viên Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Nằm trong phân khu cơ sở tu học riêng biệt dành cho nữ phái tại Tòa Thánh Bến Tre.',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Điều lệ Nhà tu Trung Thừa & Kỷ yếu nữ phái Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Truyền thống nữ phái & Nền tảng tu học',
          contentMarkdown:
            'Nhà tu Trung thừa Nữ là mái nhà chung dành riêng cho nữ hành giả và nữ chức sắc tu học, rèn luyện đạo hạnh trong lòng Hội Thánh Cao Đài Ban Chỉnh Đạo:\n\n• **Bình đẳng nam nữ trong giáo lý:** Đạo Cao Đài đặc biệt đề cao sự bình đẳng phẩm giá nam nữ trong đường tu. Nhà tu Trung thừa Nữ ra đời tạo điều kiện cho giới phụ nữ phát tâm tu dưỡng, cống hiến trọn vẹn cho đạo pháp mà không bị định kiến xã hội ràng buộc.\n\n• **Công hạnh phụng sự:** Các thế hệ nữ tu tại đây nổi tiếng với đức tính cần kiệm, nhẫn nại, đảm đang các công việc hậu cần tế lễ, may mặc phẩm phục đạo, bào chế nam dược từ thiện và chăm sóc chu đáo các kỳ đại lễ tại Tòa Thánh.',
          sortOrder: 1,
          sourceCitation: 'Tư liệu nữ phái Hội Thánh Cao Đài Ban Chỉnh Đạo',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Kiến trúc thanh nhã & Không gian sinh hoạt',
          contentMarkdown:
            'Khuôn viên Nhà tu Trung thừa Nữ được quy hoạch khép kín, bảo đảm sự riêng tư, ấm cúng và an toàn tuyệt đối:\n\n• **Kiến trúc hài hòa:** Dãy nhà trệt lợp ngói mát mẻ, phòng ốc ngăn nắp, sân trước có vườn hoa cảnh thanh nhã và giàn cây xanh tươi tốt.\n\n• **Phân khu sinh hoạt:** Bao gồm gian thờ phụng Phật Mẫu và Thượng Đế, phòng học nữ công đạo hạnh, phòng nghỉ tập thể và khu nhà bếp tịnh trai chuẩn bị ẩm thực thuần chay.',
          sortOrder: 1,
          sourceCitation: 'Hồ sơ cơ sở tu học nữ phái Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Lưu ý viếng thăm',
          contentMarkdown:
            '• **Vị trí:** Phân khu nữ phái trong khuôn viên Tòa Thánh Bến Tre (số 100C đường Trương Định, Phường 6, TP. Bến Tre).\n• **Quy định tiếp khách:** Do đặc thù là chốn tu học thanh tịnh của nữ giới, khách thập phương muốn viếng thăm cần có sự giới thiệu của Ban tiếp đón hoặc đăng ký tại văn phòng Tòa Thánh.',
          sortOrder: 1,
          sourceCitation: 'Nội quy Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'nha-tu-thuong-thua-nam',
      name: 'Nhà tu Thượng thừa Nam',
      otherNames: ['Khu Nhà Tu Thượng Thừa (Nam phái)', 'Tịnh Thất Thượng Thừa Nam'],
      siteType: SiteType.NHA_TU_THUONG_THUA_NAM,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 6,
      province: 'Bến Tre',
      currentAddress: 'Khu vực nội viện Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Khu vực chuyên tu thanh tịnh dành cho nam phái bậc Thượng thừa trong nội viện Tòa Thánh Bến Tre.',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Tân pháp tịnh luyện Thượng thừa & Tư liệu Tòa Thánh Bến Tre',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Cứu cánh giải thoát & Pháp môn Thượng thừa',
          contentMarkdown:
            'Nhà tu Thượng thừa Nam là thánh địa chuyên tu tôn nghiêm bậc nhất dành cho các bậc đại đức nam phái đã xả thân trọn vẹn cho đạo pháp:\n\n• **Đặc thù phẩm bậc:** Hành giả Thượng thừa là những vị đã trải qua nhiều năm tu học thử thách, giữ gìn giới luật tinh nghiêm, thực hành **trường trai tuyệt đối** và dứt bỏ mọi duyên sự thế tục để chuyên tâm hành trì giáo lý vô vi.\n\n• **Dấu ấn chơn truyền:** Kế thừa truyền thống nhập tịnh của Đức Giáo Tông Nguyễn Ngọc Tương từ thập niên 1930, Nhà tu Thượng thừa là nơi lưu giữ và thực hành các phương pháp luyện mạng tu tánh, dưỡng khí an thần hướng đến cứu cánh giải thoát tâm linh.',
          sortOrder: 1,
          sourceCitation: 'Tân pháp tịnh luyện & Kỷ yếu Ban Chỉnh Đạo',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Cấu trúc Tịnh thất & Môi trường yên tĩnh',
          contentMarkdown:
            'Khu vực Nhà tu Thượng thừa Nam được xây dựng hoàn toàn biệt lập sâu trong nội viện:\n\n• **Tịnh thất cá nhân:** Mỗi hành giả có một thất nhỏ bài trí tối giản (bàn tĩnh tọa, giường đơn, kinh văn), loại bỏ mọi tiện nghi không cần thiết để tâm trí không bị xao nhãng.\n\n• **Cách âm và thông khí tự nhiên:** Tường dày, cửa thông gió đón gió mát tự nhiên nhưng ngăn cách tối đa tiếng ồn xung quanh, tạo điều kiện lý tưởng cho công phu thiền định sớm khuya.',
          sortOrder: 1,
          sourceCitation: 'Hồ sơ kiến trúc tịnh thất Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Quy tắc nghiêm ngặt',
          contentMarkdown:
            '• **Vị trí:** Nằm sâu trong khu vực nội viện Tòa Thánh Bến Tre (số 100C đường Trương Định, Phường 6, TP. Bến Tre).\n• **Quy chế bảo vệ sự thanh tịnh:** Đây là khu vực cấm làm ồn và giới hạn người ra vào. Khách vãng lai và tín đồ thường nhật không được tự ý vào khu vực này để bảo đảm điều kiện tịnh luyện nghiêm ngặt của chư tu sĩ.',
          sortOrder: 1,
          sourceCitation: 'Quy định nội viện Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
    {
      slug: 'nha-tu-thuong-thua-nu',
      name: 'Nhà tu Thượng thừa Nữ',
      otherNames: ['Khu Nhà Tu Thượng Thừa (Nữ phái)', 'Tịnh Thất Thượng Thừa Nữ'],
      siteType: SiteType.NHA_TU_THUONG_THUA_NU,
      isFeaturedLandmark: true,
      visibilityLevel: VisibilityLevel.PUBLIC_FEATURED,
      displayOrder: 7,
      province: 'Bến Tre',
      currentAddress: 'Khu vực nội viện Tòa Thánh Bến Tre, số 100C đường Trương Định, Phường 6, TP. Bến Tre',
      historicAddress: 'Khuôn viên làng An Hội, tỉnh Bến Tre',
      directionsSummary:
        'Khu vực chuyên tu thanh tịnh dành cho nữ phái bậc Thượng thừa trong nội viện Tòa Thánh Bến Tre.',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Tư liệu chuyên tu nữ phái Hội Thánh Cao Đài Ban Chỉnh Đạo',
      sections: [
        {
          sectionType: SiteSectionType.HISTORY,
          title: 'Thánh đức nữ tu & Con đường Thượng thừa',
          contentMarkdown:
            'Nhà tu Thượng thừa Nữ là biểu tượng sáng ngời cho đạo hạnh tu chứng của giới phụ nữ trong Hội Thánh Cao Đài Ban Chỉnh Đạo:\n\n• **Chí nguyện xuất trần:** Dành cho quý nữ tu sĩ sau bao năm tháng công quả phụng sự đã dốc trọn lòng son hướng về cõi tịnh, giữ trường trai giới luật nghiêm cẩn, chuyên tâm thiền định và trau dồi phẩm hạnh thánh thiện.\n\n• **Giá trị văn hóa tôn giáo:** Sự tồn tại của khu chuyên tu Thượng thừa Nữ khẳng định truyền thống giải thoát bình đẳng, nơi nữ giới đạt tới các tầng phẩm vị tâm linh cao quý nhất của nền Đại Đạo.',
          sortOrder: 1,
          sourceCitation: 'Tư liệu chuyên tu nữ phái Ban Chỉnh Đạo',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.ARCHITECTURE,
          title: 'Không gian tịnh thất & Môi trường thanh khiết',
          contentMarkdown:
            'Công trình được thiết kế biệt lập, kín đáo và trang nhã:\n\n• **Tịnh thất trang nghiêm:** Các phòng tịnh luyện được bố trí riêng biệt, thoáng đãng, đón ánh sáng tự nhiên và hương hoa thanh mát từ khu vườn cây bao quanh.\n\n• **Tiện nghi đạm bạc:** Không gian phản ánh đúng tinh thần tri túc, mộc mạc của người tu chân chánh, giúp tâm hồn hành giả hoàn toàn hòa quyện vào sự an lạc tĩnh lặng.',
          sortOrder: 1,
          sourceCitation: 'Hồ sơ kiến trúc chuyên tu Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
        {
          sectionType: SiteSectionType.DIRECTIONS,
          title: 'Đường đi đến & Quy tắc tiếp cận',
          contentMarkdown:
            '• **Vị trí:** Thuộc khu vực nội viện nữ phái Tòa Thánh Bến Tre (số 100C đường Trương Định, Phường 6, TP. Bến Tre).\n• **Quy định tiếp cận:** Khu vực cấm viếng thăm tự do. Mọi liên hệ đều phải thông qua Ban Cai quản và người phụ trách nội viện nhằm giữ gìn sự yên tĩnh tuyệt đối cho việc tu luyện.',
          sortOrder: 1,
          sourceCitation: 'Nội quy nội viện Tòa Thánh Bến Tre',
          verificationStatus: VerificationStatus.VERIFIED,
        },
      ],
    },
  ];

  for (const siteData of featuredSites) {
    const { sections, ...siteFields } = siteData;
    const site = await prisma.worshipSite.upsert({
      where: { slug: siteFields.slug },
      update: {
        ...siteFields,
        orgUnitId: rootUnit.id,
      },
      create: {
        ...siteFields,
        orgUnitId: rootUnit.id,
      },
    });

    if (sections && sections.length > 0) {
      await prisma.siteDetailSection.deleteMany({
        where: { siteId: site.id },
      });
      await prisma.siteDetailSection.createMany({
        data: sections.map((sec) => ({
          ...sec,
          siteId: site.id,
        })),
      });
    }
    console.log(`✓ Đã nạp công trình trọng tâm: ${site.name} (${site.slug})`);
  }

  // 2. Danh mục Thánh Thất thu gọn (PUBLIC_COMPACT)
  const compactSites: SeedSite[] = [
    {
      slug: 'thanh-that-thu-do-ha-noi',
      name: 'Thánh Thất Thủ Đô Hà Nội',
      otherNames: [],
      siteType: SiteType.THANH_THAT,
      isFeaturedLandmark: false,
      visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
      displayOrder: 10,
      province: 'Hà Nội',
      currentAddress: 'TP. Hà Nội',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Cơ sở tiêu biểu thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
    },
    {
      slug: 'thanh-that-binh-hoa-tphcm',
      name: 'Thánh Thất Bình Hòa',
      otherNames: [],
      siteType: SiteType.THANH_THAT,
      isFeaturedLandmark: false,
      visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
      displayOrder: 11,
      province: 'TP. Hồ Chí Minh',
      currentAddress: 'TP. Hồ Chí Minh',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Cơ sở tiêu biểu thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
    },
    {
      slug: 'thanh-that-thien-hoa-phu-yen',
      name: 'Thánh Thất Thiện Hòa',
      otherNames: [],
      siteType: SiteType.THANH_THAT,
      isFeaturedLandmark: false,
      visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
      displayOrder: 12,
      province: 'Phú Yên',
      currentAddress: 'Tỉnh Phú Yên',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Cơ sở tiêu biểu thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
    },
    {
      slug: 'thanh-that-an-hoi-ben-tre',
      name: 'Thánh Thất An Hội',
      otherNames: [],
      siteType: SiteType.THANH_THAT,
      isFeaturedLandmark: false,
      visibilityLevel: VisibilityLevel.PUBLIC_COMPACT,
      displayOrder: 13,
      province: 'Bến Tre',
      currentAddress: 'TP. Bến Tre, tỉnh Bến Tre',
      verificationStatus: VerificationStatus.VERIFIED,
      sourceNote: 'Cơ sở tiêu biểu thuộc Hội Thánh Cao Đài Ban Chỉnh Đạo.',
    },
  ];

  for (const compact of compactSites) {
    const { sections, ...compactFields } = compact;
    await prisma.worshipSite.upsert({
      where: { slug: compactFields.slug },
      update: {
        ...compactFields,
        orgUnitId: rootUnit.id,
      },
      create: {
        ...compactFields,
        orgUnitId: rootUnit.id,
      },
    });
    console.log(`✓ Đã nạp Thánh Thất thu gọn: ${compact.name} (${compact.province})`);
  }
}
