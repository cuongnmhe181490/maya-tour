import { Suspense, lazy, useState } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Reveal } from './components/Reveal'
import { SectionHeader } from './components/SectionHeader'
import heroDesktop from './assets/photos/el-castillo-hero-desktop.webp'
import heroMobile from './assets/photos/el-castillo-hero-mobile.webp'
import tongQuanDesktop from './assets/photos/chichen-itza-panorama-desktop.webp'
import tongQuanMobile from './assets/photos/chichen-itza-panorama-mobile.webp'
import sanBongDesktop from './assets/photos/san-bong-lon-desktop.webp'
import sanBongMobile from './assets/photos/san-bong-lon-mobile.webp'
import denChienBinhDesktop from './assets/photos/den-chien-binh-desktop.webp'
import denChienBinhMobile from './assets/photos/den-chien-binh-mobile.webp'
import ranLongVuDesktop from './assets/photos/ran-long-vu-desktop.webp'
import ranLongVuMobile from './assets/photos/ran-long-vu-mobile.webp'
import chacMoolDesktop from './assets/photos/chac-mool-desktop.webp'
import chacMoolMobile from './assets/photos/chac-mool-mobile.webp'
import panoramaSanBongDesktop from './assets/photos/panorama-san-bong-desktop.webp'
import panoramaSanBongMobile from './assets/photos/panorama-san-bong-mobile.webp'

const TrangToanCanh360 = lazy(() => import('./pages/TrangToanCanh360.jsx'))

const lienKet = {
  unesco: 'https://whc.unesco.org/en/list/483',
  danhMucAnh:
    'https://commons.wikimedia.org/wiki/Category:Chich%C3%A9n_Itz%C3%A1_in_the_2020s',
}

const boAnh = {
  hero: {
    desktop: heroDesktop,
    mobile: heroMobile,
    alt: 'El Castillo tại Chichén Itzá',
    lopAnh: 'object-center md:object-center',
  },
  tongQuan: {
    desktop: tongQuanDesktop,
    mobile: tongQuanMobile,
    alt: 'Toàn cảnh Chichén Itzá',
    lopAnh: 'object-center',
  },
  sanBongLon: {
    desktop: sanBongDesktop,
    mobile: sanBongMobile,
    alt: 'Sân bóng lớn tại Chichén Itzá',
    lopAnh: 'object-center',
  },
  denChienBinh: {
    desktop: denChienBinhDesktop,
    mobile: denChienBinhMobile,
    alt: 'Đền Chiến binh tại Chichén Itzá',
    lopAnh: 'object-center',
  },
  ranLongVu: {
    desktop: ranLongVuDesktop,
    mobile: ranLongVuMobile,
    alt: 'Chi tiết đầu rắn lông vũ tại Chichén Itzá',
    lopAnh: 'object-center',
  },
  chacMool: {
    desktop: chacMoolDesktop,
    mobile: chacMoolMobile,
    alt: 'Tượng Chac Mool tại Đền Chiến binh',
    lopAnh: 'object-center',
  },
  panoramaSanBong: {
    desktop: panoramaSanBongDesktop,
    mobile: panoramaSanBongMobile,
    alt: 'Toàn cảnh Sân bóng lớn tại Chichén Itzá',
    lopAnh: 'object-center',
  },
}

const soLieuTongQuan = [
  ['Vị trí', 'Tinum, bang Yucatán, Mexico'],
  ['Niên đại', 'Từ khoảng thế kỷ VI đến thế kỷ XIII'],
  ['Ghi danh UNESCO', 'Năm 1988, theo tiêu chí văn hóa (i), (ii), (iii)'],
  ['Cấu trúc tiêu biểu', 'El Castillo, Sân bóng lớn, Đền Chiến binh, El Caracol'],
]

const congTrinhTieuBieu = [
  {
    id: 'el-castillo',
    nhan: 'Công trình 01',
    tieuDe: 'El Castillo',
    phuDe: 'Khối kiến trúc biểu tượng của Chichén Itzá',
    moTa:
      'El Castillo, còn gọi là Đền Kukulcán, là công trình dễ nhận ra nhất trong toàn bộ khu di tích. Tỷ lệ bậc thang, thế đứng của khối tháp và phần điện thờ trên đỉnh khiến nơi này trở thành tâm điểm của hầu hết tư liệu về Chichén Itzá.',
    chiTiet: [
      'Đây là công trình thường được dùng để giải thích mối liên hệ giữa kiến trúc và chu kỳ thời gian.',
      'Các cạnh tháp và phần chân tháp gắn trực tiếp với hình tượng rắn lông vũ Kukulcán.',
      'Khi nhìn từ quảng trường, công trình tạo một trục thị giác rất rõ và rất ổn định.',
    ],
    hinh: boAnh.hero,
    chuThich: 'El Castillo trong ánh sáng ban ngày, ảnh tư liệu đã nội địa hóa từ Wikimedia Commons.',
  },
  {
    id: 'san-bong-lon',
    nhan: 'Công trình 02',
    tieuDe: 'Sân bóng lớn',
    phuDe: 'Không gian nghi lễ với quy mô hiếm thấy',
    moTa:
      'Sân bóng lớn gây ấn tượng bởi chiều dài, độ mở và cảm giác sân khấu rất rõ khi đứng dọc trục nhìn. Đây là nơi người xem có thể cảm nhận trực tiếp quy mô không gian và vai trò của các bức tường đá trong việc định hình nghi lễ công cộng.',
    chiTiet: [
      'Mặt bằng dài và thoáng khác biệt rõ so với những cấu trúc đền tháp xung quanh.',
      'Các vòng đá và phù điêu trên tường là những chi tiết thường xuất hiện trong nghiên cứu chuyên khảo.',
      'Không gian này cho thấy mối liên hệ giữa kiến trúc, nghi thức và quyền lực cộng đồng.',
    ],
    hinh: boAnh.sanBongLon,
    chuThich: 'Sân bóng lớn tại Chichén Itzá, ảnh tư liệu đã nội địa hóa từ Wikimedia Commons.',
  },
  {
    id: 'den-chien-binh',
    nhan: 'Công trình 03',
    tieuDe: 'Đền Chiến binh',
    phuDe: 'Hệ cột đá và các lớp không gian giàu chiều sâu khảo cổ',
    moTa:
      'So với El Castillo, Đền Chiến binh cho cảm giác khảo cổ rõ hơn vì nhiều lớp cột, bậc và bề mặt phong hóa vẫn còn đọc được rất tốt khi quan sát gần. Đây là một trong những điểm phù hợp nhất để cảm nhận chất liệu đá và mật độ chi tiết điêu khắc của Chichén Itzá.',
    chiTiet: [
      'Hệ cột dày tạo chiều sâu không gian rất mạnh khi nhìn theo các góc chéo.',
      'Công trình này thường được nhắc đến cùng các yếu tố nghi lễ và biểu tượng chiến binh.',
      'Các bề mặt còn lại giúp người xem thấy rõ dấu vết phong hóa thực của di tích.',
    ],
    hinh: boAnh.denChienBinh,
    chuThich: 'Đền Chiến binh, ảnh tư liệu đã nội địa hóa từ Wikimedia Commons.',
  },
]

const dienGiai = [
  {
    tieuDe: 'Trục ánh sáng theo mùa',
    noiDung:
      'El Castillo thường được giải thích như một cấu trúc gắn với diễn biến ánh sáng trong năm, đặc biệt ở thời điểm phân điểm khi bóng đổ trên cạnh tháp được nhìn nhận như một phần của nghi lễ hình tượng.',
  },
  {
    tieuDe: 'Biểu tượng rắn lông vũ',
    noiDung:
      'Chi tiết đầu rắn ở chân tháp là một trong những hình ảnh biểu tượng nhất của Chichén Itzá, giúp nối kiến trúc với tín ngưỡng Kukulcán trong trí nhớ đại chúng và trong nhiều tài liệu nghiên cứu.',
  },
  {
    tieuDe: 'Kiến trúc như công cụ diễn giải thời gian',
    noiDung:
      'Điểm đáng chú ý không nằm ở một công thức duy nhất, mà ở cách cư dân Maya dùng chính kiến trúc để gắn nghi lễ, quan sát và đời sống biểu tượng vào không gian công cộng.',
  },
]

const thuVien = [
  {
    id: 1,
    tieuDe: 'El Castillo nhìn từ quảng trường',
    chuThich: 'Khối tháp hiện lên như tâm điểm thị giác của toàn bộ quần thể.',
    hinh: boAnh.hero,
    lop: 'md:col-span-2',
  },
  {
    id: 2,
    tieuDe: 'Toàn cảnh khu di tích',
    chuThich: 'Góc nhìn rộng giúp thấy rõ cách các cấu trúc lớn liên kết với nhau.',
    hinh: boAnh.tongQuan,
    lop: 'md:col-span-2',
  },
  {
    id: 3,
    tieuDe: 'Sân bóng lớn',
    chuThich: 'Trục nhìn dài và hai bức tường đá tạo cảm giác quy mô rất rõ.',
    hinh: boAnh.sanBongLon,
    lop: 'md:col-span-1',
  },
  {
    id: 4,
    tieuDe: 'Đền Chiến binh',
    chuThich: 'Hệ cột và bề mặt đá cho thấy rõ chiều sâu khảo cổ của công trình.',
    hinh: boAnh.denChienBinh,
    lop: 'md:col-span-1',
  },
  {
    id: 5,
    tieuDe: 'Chi tiết rắn lông vũ',
    chuThich: 'Một trong những hình tượng biểu tượng quan trọng nhất của Chichén Itzá.',
    hinh: boAnh.ranLongVu,
    lop: 'md:col-span-1',
  },
  {
    id: 6,
    tieuDe: 'Chac Mool tại Đền Chiến binh',
    chuThich: 'Chi tiết điêu khắc thường xuất hiện trong tư liệu khảo cổ về khu vực này.',
    hinh: boAnh.chacMool,
    lop: 'md:col-span-1',
  },
]

const nguonTuLieu = [
  {
    ten: 'El Castillo, ảnh tư liệu năm 2024',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Chichen_Itza_Visitors_-_El_Castillo,_June_2024.jpg',
  },
  {
    ten: 'Toàn cảnh Chichén Itzá',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Panorama_of_Chich%C3%A9n_Itza_with_Temple_of_Kukulc%C3%A1n.jpg',
  },
  {
    ten: 'Great Ball Court - Chichen Itza 2024',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Great_Ball_Court_-_Chichen_Itza_2024.jpg',
  },
  {
    ten: 'Temple of the Warriors - Chichen Itza 2024',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Temple_of_the_Warriors_-_Chichen_Itza_2024.jpg',
  },
  {
    ten: 'Feathered Serpent Jaws - Chichen Itza 2024',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Feathered_Serpent_Jaws_-_Chichen_Itza_2024.jpg',
  },
  {
    ten: 'Chac Mool tại Đền Chiến binh',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Temple_of_the_Warriors_Chichen_Itza,_Mexico_-_Chac_Mool_at_top_of_stairs.jpg',
  },
  {
    ten: 'Panorama of Great Ball Court',
    tacGia: 'Wikimedia Commons',
    lienKet:
      'https://commons.wikimedia.org/wiki/File:Panorama_of_Great_Ball_Court_-_Chichen_Itza_Archaeological_Site_-_Yucatan_-_Mexico.jpg',
  },
]

function NutLienKet({ href, children, toi = false }) {
  const laLienKetNgoai = href.startsWith('http')

  return (
    <a
      href={href}
      target={laLienKetNgoai ? '_blank' : undefined}
      rel={laLienKetNgoai ? 'noreferrer' : undefined}
      className={`inline-flex items-center justify-center border px-5 py-3 text-sm font-medium tracking-[0.04em] transition ${
        toi
          ? 'border-white/30 bg-white/10 text-white hover:bg-white hover:text-obsidian'
          : 'border-weathered-stone/30 text-obsidian hover:border-obsidian hover:bg-obsidian hover:text-parchment'
      }`}
    >
      {children}
    </a>
  )
}

function HinhTuLieu({
  hinh,
  alt,
  className = '',
  lopAnh = '',
  sizes = '100vw',
  eager = false,
  onClick,
}) {
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={hinh.mobile} />
      <img
        alt={alt ?? hinh.alt}
        src={hinh.desktop}
        className={`h-full w-full object-cover ${lopAnh || hinh.lopAnh || ''} ${className}`}
        loading={eager ? 'eager' : 'lazy'}
        fetchPriority={eager ? 'high' : 'auto'}
        decoding="async"
        sizes={sizes}
        onClick={onClick}
      />
    </picture>
  )
}

function KhungTaiToanCanh() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-center text-white">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
          Toàn cảnh 360
        </p>
        <p className="font-display text-3xl leading-tight">Đang mở không gian quan sát toàn cảnh…</p>
      </div>
    </div>
  )
}

function TrangChu() {
  const [anhDangXem, setAnhDangXem] = useState(null)

  return (
    <div className="bg-parchment text-obsidian">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/12 bg-black/22 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-4 md:px-8 lg:px-12">
          <a
            href="#khai-mo"
            className="font-display text-lg tracking-[0.04em] text-white"
            aria-label="Về đầu trang"
          >
            Chichén Itzá
          </a>
          <nav aria-label="Điều hướng chính" className="hidden items-center gap-6 md:flex">
            {[
              ['#tong-quan', 'Tổng quan'],
              ['#cong-trinh', 'Công trình tiêu biểu'],
              ['#thien-van', 'Thiên văn và biểu tượng'],
              ['#thu-vien', 'Thư viện ảnh'],
              ['#nhap-vai', 'Toàn cảnh'],
            ].map(([href, nhan]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-white/78 transition hover:text-white"
              >
                {nhan}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section id="khai-mo" className="relative min-h-screen overflow-hidden bg-obsidian text-white">
          <div className="absolute inset-0">
            <HinhTuLieu
              hinh={boAnh.hero}
              eager
              sizes="100vw"
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,9,8,0.16),rgba(11,9,8,0.54)_48%,rgba(11,9,8,0.84))]" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-[1280px] items-end px-5 pb-14 pt-28 md:px-8 lg:px-12">
            <Motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[610px] space-y-6"
            >
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-white/74">
                Di tích khảo cổ Maya tại bán đảo Yucatán
              </p>
              <h1 className="max-w-[11ch] font-display text-4xl leading-tight text-white sm:text-5xl lg:text-[3.8rem]">
                Chichén Itzá, một trung tâm nghi lễ còn in rất rõ trên đá.
              </h1>
              <p className="max-w-[42rem] text-base leading-8 text-white/82 md:text-lg">
                Trang giới thiệu này ưu tiên ảnh thật, dữ kiện khảo cổ và nhịp đọc rõ ràng
                để người xem tiếp cận Chichén Itzá như một di tích thật, thay vì như một
                bản dựng ý tưởng thị giác.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <NutLienKet href="#tong-quan" toi>
                  Khám phá di tích
                </NutLienKet>
                <NutLienKet href="#thu-vien" toi>
                  Xem thư viện ảnh
                </NutLienKet>
              </div>
            </Motion.div>
          </div>
        </section>

        <section id="tong-quan" className="border-b border-[#d9cfbf] bg-parchment px-5 py-20 md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1280px] space-y-12">
            <Reveal>
              <SectionHeader
                nhan="Tổng quan"
                tieuDe="Một thành phố tiền Colombo được UNESCO ghi danh vì giá trị kiến trúc và lịch sử nổi bật"
                moTa="Theo hồ sơ của UNESCO World Heritage Centre, Chichén Itzá là một trung tâm linh thiêng lớn của bán đảo Yucatán, nơi nhiều lớp cư dân để lại dấu ấn qua gần một thiên niên kỷ. Giá trị của di tích nằm ở sự kết hợp giữa kiến trúc Maya, ảnh hưởng Toltec và hệ biểu tượng gắn với bầu trời, lịch pháp và nghi lễ."
              />
            </Reveal>

            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-start">
              <Reveal>
                <figure className="space-y-4">
                  <div className="aspect-[16/10] overflow-hidden bg-[#ddd3c4]">
                    <HinhTuLieu
                      hinh={boAnh.tongQuan}
                      sizes="(max-width: 1023px) 100vw, 60vw"
                    />
                  </div>
                  <figcaption className="max-w-[60ch] text-sm leading-7 text-weathered-stone">
                    Toàn cảnh Chichén Itzá với El Castillo là điểm nhấn trung tâm. Cách các
                    cấu trúc lớn phân bố cho thấy đây là một quần thể có tổ chức không gian
                    rất rõ ràng, chứ không phải các công trình rời rạc.
                  </figcaption>
                </figure>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="space-y-8 border-t border-obsidian/14 pt-6">
                  <dl className="space-y-5">
                    {soLieuTongQuan.map(([nhan, giaTri]) => (
                      <div key={nhan} className="border-b border-black/8 pb-5">
                        <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-weathered-stone">
                          {nhan}
                        </dt>
                        <dd className="mt-2 text-base leading-8 text-obsidian">{giaTri}</dd>
                      </div>
                    ))}
                  </dl>

                  <div className="space-y-4">
                    <p className="text-sm leading-7 text-weathered-stone">
                      Tọa độ UNESCO công bố: 20°40′57.86″ Bắc, 88°34′7.154″ Tây. Phần dữ kiện
                      trên trang được rút gọn để người xem đọc nhanh, nhưng vẫn giữ trục thông
                      tin cơ bản về vị trí, niên đại và giá trị nổi bật của di tích.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <NutLienKet href={lienKet.unesco}>Xem hồ sơ UNESCO</NutLienKet>
                      <NutLienKet href={lienKet.danhMucAnh}>Xem danh mục ảnh gốc</NutLienKet>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="cong-trinh" className="bg-[#f8f4ec] px-5 py-20 md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1280px] space-y-10">
            <Reveal>
              <SectionHeader
                nhan="Công trình tiêu biểu"
                tieuDe="Ba điểm nhìn nên bắt đầu nếu muốn hiểu Chichén Itzá như một di tích thật"
                moTa="Phần này tổ chức theo lối editorial: ảnh lớn đi trước, mô tả ngắn theo sau, tránh cảm giác thẻ giao diện hoặc khối trưng bày nhân tạo."
              />
            </Reveal>

            <div className="space-y-14">
              {congTrinhTieuBieu.map((muc, index) => (
                <Reveal key={muc.id} delay={index * 0.08}>
                  <article className="grid gap-8 border-t border-black/10 pt-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
                    <figure className={`${index % 2 === 1 ? 'lg:order-2' : ''} space-y-4`}>
                      <div className="aspect-[16/10] overflow-hidden bg-[#ddd2c1]">
                        <HinhTuLieu
                          hinh={muc.hinh}
                          sizes="(max-width: 1023px) 100vw, 62vw"
                          className="cursor-zoom-in transition duration-500 hover:scale-[1.02]"
                          onClick={() => setAnhDangXem(muc)}
                        />
                      </div>
                      <figcaption className="text-sm leading-7 text-weathered-stone">
                        {muc.chuThich}
                      </figcaption>
                    </figure>

                    <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} space-y-5`}>
                      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-weathered-stone">
                        {muc.nhan}
                      </p>
                      <div className="space-y-3">
                        <h3 className="font-display text-3xl leading-tight text-obsidian">
                          {muc.tieuDe}
                        </h3>
                        <p className="text-base font-medium leading-7 text-weathered-stone">
                          {muc.phuDe}
                        </p>
                      </div>
                      <p className="text-base leading-8 text-obsidian">{muc.moTa}</p>
                      <ul className="space-y-3 text-sm leading-7 text-weathered-stone">
                        {muc.chiTiet.map((chiTiet) => (
                          <li key={chiTiet} className="flex gap-3">
                            <span className="mt-[0.9rem] h-1.5 w-1.5 shrink-0 rounded-full bg-stone-sand" />
                            <span>{chiTiet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="thien-van" className="border-y border-black/8 bg-white px-5 py-20 md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)] lg:items-start">
            <Reveal>
              <figure className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden bg-[#ddd2c1]">
                  <HinhTuLieu
                    hinh={boAnh.ranLongVu}
                    sizes="(max-width: 1023px) 100vw, 36vw"
                  />
                </div>
                <figcaption className="text-sm leading-7 text-weathered-stone">
                  Chi tiết đầu rắn lông vũ ở chân tháp là một trong những hình ảnh quen thuộc
                  nhất khi nhắc đến Chichén Itzá.
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="space-y-8">
                <SectionHeader
                  nhan="Thiên văn và biểu tượng"
                  tieuDe="Điểm đặc sắc của Chichén Itzá nằm ở cách kiến trúc chuyển hóa quan sát và tín ngưỡng thành hình khối"
                  moTa="Các diễn giải phổ biến về di tích thường tập trung vào chuyển động của ánh sáng, hình tượng Kukulcán và cách kiến trúc trở thành công cụ diễn đạt thời gian trong không gian nghi lễ."
                />

                <div className="space-y-6 border-t border-black/10 pt-6">
                  {dienGiai.map((muc) => (
                    <div key={muc.tieuDe} className="grid gap-2 md:grid-cols-[220px_minmax(0,1fr)]">
                      <h3 className="font-display text-xl text-obsidian">{muc.tieuDe}</h3>
                      <p className="text-base leading-8 text-weathered-stone">{muc.noiDung}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="thu-vien" className="bg-[#f8f4ec] px-5 py-20 md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1280px] space-y-10">
            <Reveal>
              <SectionHeader
                nhan="Thư viện ảnh"
                tieuDe="Ảnh thật giữ vai trò chính, còn giao diện chỉ làm nhiệm vụ dẫn đọc"
                moTa="Các ảnh trong thư viện đã được nội địa hóa về repo và tối ưu lại cho web. Chạm vào từng ảnh để xem lớn hơn."
              />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {thuVien.map((anh) => (
                <Reveal key={anh.id} delay={anh.id * 0.03} className={anh.lop}>
                  <figure className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setAnhDangXem(anh)}
                      aria-label={`Xem lớn ảnh ${anh.tieuDe}`}
                      className="block aspect-[4/3] w-full overflow-hidden bg-[#ddd2c1] text-left"
                    >
                      <HinhTuLieu
                        hinh={anh.hinh}
                        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
                        className="transition duration-500 hover:scale-[1.02]"
                      />
                    </button>
                    <figcaption className="space-y-1">
                      <p className="font-display text-xl text-obsidian">{anh.tieuDe}</p>
                      <p className="text-sm leading-7 text-weathered-stone">{anh.chuThich}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="nhap-vai" className="bg-obsidian px-5 py-20 text-white md:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(280px,0.75fr)_minmax(0,1.25fr)] lg:items-end">
            <Reveal>
              <div className="space-y-6">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/60">
                  Toàn cảnh
                </p>
                <div className="space-y-4">
                  <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
                    Phần nhập vai được giữ ở dạng panorama tư liệu để ưu tiên độ tin cậy của hình ảnh
                  </h2>
                  <p className="max-w-[58ch] text-base leading-8 text-white/74">
                    Mô hình ba chiều low-poly không còn xuất hiện trên website. Ở giai đoạn
                    này, một khung nhìn toàn cảnh bằng tư liệu thật đem lại cảm giác chân
                    thực và phù hợp hơn với mục tiêu giới thiệu di sản.
                  </p>
                </div>
                <p className="text-base leading-8 text-white/76">
                  Nếu có thêm bộ quét hiện trường hoặc panorama độ phân giải cao hơn ở bước
                  sau, khu vực này vẫn có thể mở rộng tiếp mà không cần quay lại hướng mô
                  phỏng đồ họa.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <NutLienKet href={lienKet.unesco} toi>
                    Mở hồ sơ di sản
                  </NutLienKet>
                  <NutLienKet href="/toan-canh-360" toi>
                    Xem toàn cảnh 360
                  </NutLienKet>
                  <NutLienKet href={lienKet.danhMucAnh} toi>
                    Mở bộ ảnh tư liệu
                  </NutLienKet>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <figure className="space-y-4">
                <div className="aspect-[16/9] overflow-hidden bg-[#27211b]">
                  <HinhTuLieu
                    hinh={boAnh.panoramaSanBong}
                    sizes="(max-width: 1023px) 100vw, 64vw"
                  />
                </div>
                <figcaption className="max-w-[64ch] text-sm leading-7 text-white/68">
                  Toàn cảnh Sân bóng lớn. Loại ảnh này phù hợp hơn với một website giới thiệu
                  di tích thật vì giúp định vị không gian rõ ràng mà không tạo cảm giác minh
                  họa hay concept art.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section id="nguon-tu-lieu" className="border-t border-black/8 bg-[#efe8dc] px-5 py-16 md:px-8 lg:px-12">
          <div className="mx-auto max-w-[1280px] space-y-8">
            <Reveal>
              <SectionHeader
                nhan="Nguồn tư liệu"
                tieuDe="Nguồn ảnh và dữ kiện được ghi rõ để giữ tính minh bạch của website"
                moTa="Phần dữ kiện khái quát trên trang tham chiếu từ hồ sơ UNESCO World Heritage Centre. Toàn bộ ảnh đang hiển thị đã được nội địa hóa về repo từ Wikimedia Commons để không phụ thuộc nguồn ngoài ở thời gian chạy."
              />
            </Reveal>

            <div className="grid gap-8 lg:grid-cols-[minmax(260px,0.7fr)_minmax(0,1.3fr)]">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-weathered-stone">
                  Nguồn dữ kiện
                </p>
                <a
                  href={lienKet.unesco}
                  target="_blank"
                  rel="noreferrer"
                  className="block border border-black/10 bg-white/40 px-5 py-4 text-base leading-8 text-obsidian transition hover:border-obsidian"
                >
                  UNESCO World Heritage Centre, hồ sơ Chichén Itzá
                </a>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-weathered-stone">
                  Nguồn hình ảnh
                </p>
                <ul className="space-y-3">
                  {nguonTuLieu.map((muc) => (
                    <li key={muc.ten} className="border border-black/8 bg-white/40 px-5 py-4">
                      <a
                        href={muc.lienKet}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-obsidian transition hover:text-jade"
                      >
                        {muc.ten}
                      </a>
                      <p className="mt-1 text-sm leading-7 text-weathered-stone">
                        Nguồn: {muc.tacGia}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/8 bg-[#e9e0d2] px-5 py-8 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 text-sm leading-7 text-weathered-stone md:flex-row md:items-end md:justify-between">
          <p className="max-w-[60ch]">
            Website giữ định hướng tư liệu di sản thật: ảnh là trung tâm, giao diện tiết chế,
            dữ kiện ngắn gọn và nguồn tham chiếu được công khai.
          </p>
          <div className="flex gap-5">
            <a href={lienKet.unesco} target="_blank" rel="noreferrer" className="transition hover:text-obsidian">
              UNESCO
            </a>
            <a href={lienKet.danhMucAnh} target="_blank" rel="noreferrer" className="transition hover:text-obsidian">
              Wikimedia Commons
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {anhDangXem ? (
          <Motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Xem lớn ảnh ${anhDangXem.tieuDe}`}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 px-4 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="Đóng ảnh"
              className="absolute inset-0 cursor-default"
              onClick={() => setAnhDangXem(null)}
            />

            <Motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-[1100px] space-y-4"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-display text-2xl text-white">{anhDangXem.tieuDe}</p>
                  <p className="mt-1 text-sm leading-7 text-white/68">{anhDangXem.chuThich}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAnhDangXem(null)}
                  className="border border-white/22 px-4 py-2 text-sm text-white transition hover:bg-white hover:text-obsidian"
                >
                  Đóng
                </button>
              </div>

              <div className="max-h-[78vh] overflow-hidden bg-[#16120f]">
                <HinhTuLieu
                  hinh={anhDangXem.hinh}
                  alt={anhDangXem.tieuDe}
                  sizes="100vw"
                  className="max-h-[78vh] w-full object-contain"
                />
              </div>
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const laTrangToanCanh =
    typeof window !== 'undefined' && window.location.pathname === '/toan-canh-360'

  if (laTrangToanCanh) {
    return (
      <Suspense fallback={<KhungTaiToanCanh />}>
        <TrangToanCanh360 />
      </Suspense>
    )
  }

  return <TrangChu />
}
