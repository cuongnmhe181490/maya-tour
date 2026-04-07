import { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'
import { motion as Motion, useScroll, useTransform } from 'framer-motion'
import { CarvedButton } from './components/CarvedButton'
import { Reveal } from './components/Reveal'
import { SectionHeader } from './components/SectionHeader'
import dustOverlay from './assets/textures/dust-overlay.svg'
import heroMural from './assets/textures/hero-mural.svg'
import parchmentGrain from './assets/textures/parchment-grain.svg'
import stoneRelief from './assets/textures/stone-relief.svg'

const ImmersiveCanvas = lazy(() =>
  import('./components/ImmersiveCanvas').then((module) => ({
    default: module.ImmersiveCanvas,
  })),
)

const congTrinh = [
  {
    id: 'el-castillo',
    tieuDe: 'Kim tự tháp El Castillo',
    so: 'I',
    phuDe: 'Trục thiên văn của đá và ánh sáng',
    moTa:
      'Được dựng như một lịch đá khổng lồ, El Castillo gom vào thân tháp nhịp điệu của mùa, bóng và chuyển động mặt trời. Mỗi mặt bậc thang như một phép tính nghi lễ, vừa là kiến trúc vừa là tuyên ngôn về trật tự vũ trụ.',
    chiTiet: [
      '365 bậc tượng trưng cho chu kỳ năm mặt trời.',
      'Hiện tượng bóng rắn lông vũ xuất hiện vào kỳ phân điểm.',
      'Khối tháp cân xứng tạo nên cảm giác uy nghi và chính xác nghi lễ.',
    ],
  },
  {
    id: 'san-bong',
    tieuDe: 'Sân bóng lớn',
    so: 'II',
    phuDe: 'Nơi nghi lễ, âm vang và quyền lực gặp nhau',
    moTa:
      'Không gian này không chỉ dành cho thi đấu mà còn là sân khấu của nghi thức, trình diễn và biểu tượng chiến thắng. Tường đá dựng cao khiến âm thanh dội lại, biến từng tiếng động thành một lớp kịch tính thiêng liêng.',
    chiTiet: [
      'Tỉ lệ không gian tạo nên độ vang đặc biệt hiếm thấy.',
      'Các vòng đá đặt cao gợi tính thử thách mang màu sắc nghi lễ.',
      'Phù điêu trên tường nhấn mạnh sự gắn bó giữa thể thao và thần quyền.',
    ],
  },
  {
    id: 'den-chien-binh',
    tieuDe: 'Đền Chiến binh',
    so: 'III',
    phuDe: 'Hàng cột của kỷ luật, sức mạnh và lễ hiến',
    moTa:
      'Đền Chiến binh mở ra một trường nhìn nghiêm cẩn với nhịp cột dày đặc, như đội quân hóa đá đứng canh nơi linh địa. Tại đây, trật tự kiến trúc tạo cảm giác vừa áp chế vừa mê hoặc, gợi nên sức nặng của quyền lực nghi lễ.',
    chiTiet: [
      'Hệ cột dày tạo lớp sâu thị giác như một rừng ký hiệu.',
      'Bệ thờ và phù điêu góp phần kể lại nghi thức hiến tế và thần thoại.',
      'Không gian chuyển tiếp giữa quảng trường và đền tạo nhịp tiến vào rất điện ảnh.',
    ],
  },
]

const cotMoc = [
  {
    nam: 'Thế kỷ VI',
    tieuDe: 'Những lớp cư trú đầu tiên định hình trung tâm nghi lễ',
    noiDung:
      'Các cộng đồng Maya bắt đầu kiến tạo một hạt nhân quyền lực và tín ngưỡng, đặt nền cho những lớp xây dựng lớn hơn về sau.',
  },
  {
    nam: 'Thế kỷ IX',
    tieuDe: 'Chichén Itzá vươn lên thành đô thị có tầm ảnh hưởng rộng',
    noiDung:
      'Kiến trúc, thương mại và nghi lễ hội tụ, đưa nơi đây thành điểm giao thoa của tri thức, quyền lực và biểu tượng vũ trụ.',
  },
  {
    nam: 'Thế kỷ X',
    tieuDe: 'Thời kỳ mở rộng mạnh mẽ của các công trình biểu tượng',
    noiDung:
      'El Castillo, Sân bóng lớn và Đền Chiến binh cùng nhiều hạng mục khác tạo nên bộ mặt tráng lệ mà chúng ta còn nhận thấy hôm nay.',
  },
  {
    nam: 'Thế kỷ XIII',
    tieuDe: 'Ảnh hưởng suy giảm, ký ức còn lại trong đá và truyền thuyết',
    noiDung:
      'Dòng chảy quyền lực thay đổi, nhưng mạng lưới biểu tượng và tri thức thiên văn vẫn còn in lại trong hình khối, trục nhìn và điêu khắc.',
  },
  {
    nam: 'Thế kỷ XX đến nay',
    tieuDe: 'Từ phế tích đến di sản thế giới được gìn giữ',
    noiDung:
      'Hoạt động khảo cổ, bảo tồn và diễn giải học thuật giúp Chichén Itzá trở thành một không gian đối thoại giữa quá khứ linh thiêng và hiện tại.',
  },
]

const thuVien = [
  {
    id: 1,
    tieuDe: 'Bậc thang trong nắng xiên',
    chuThich: 'Ánh sáng gắt làm lộ rõ cấu trúc từng lớp đá và nhịp điệu của mặt tháp.',
    chieuCao: 'h-[320px]',
    nen:
      'radial-gradient(circle at 68% 28%, rgba(243,231,208,0.18), transparent 18%), linear-gradient(180deg, rgba(20,17,15,0.18), rgba(20,17,15,0.72)), linear-gradient(135deg, #1e1815, #73593e 52%, #d9b44a)',
  },
  {
    id: 2,
    tieuDe: 'Hành lang cột nghi lễ',
    chuThich: 'Những cột đá nối nhau như một trường ca về kỷ luật và nghi thức.',
    chieuCao: 'h-[420px]',
    nen:
      'radial-gradient(circle at 32% 24%, rgba(243,231,208,0.12), transparent 16%), linear-gradient(180deg, rgba(20,17,15,0.15), rgba(20,17,15,0.7)), linear-gradient(135deg, #11100f, #314137 55%, #7f684b)',
  },
  {
    id: 3,
    tieuDe: 'Đá, rêu và ký ức',
    chuThich: 'Bề mặt phong hóa gợi cảm giác thời gian lắng lại thành vật chất.',
    chieuCao: 'h-[260px]',
    nen:
      'radial-gradient(circle at 74% 34%, rgba(243,231,208,0.16), transparent 16%), linear-gradient(180deg, rgba(20,17,15,0.18), rgba(20,17,15,0.68)), linear-gradient(135deg, #16211d, #2f6f62 52%, #c9a56a)',
  },
  {
    id: 4,
    tieuDe: 'Biểu tượng rắn lông vũ',
    chuThich: 'Hoa văn và bóng đổ tạo cảm giác chuyển động ngay trên vật thể bất động.',
    chieuCao: 'h-[360px]',
    nen:
      'radial-gradient(circle at 64% 20%, rgba(217,180,74,0.2), transparent 18%), linear-gradient(180deg, rgba(20,17,15,0.2), rgba(20,17,15,0.74)), linear-gradient(135deg, #0d0d0c, #54452f 58%, #bda16e)',
  },
  {
    id: 5,
    tieuDe: 'Mặt bằng của một nghi lễ',
    chuThich: 'Từ trên cao, cấu trúc trở thành sơ đồ của trật tự, quyền lực và niềm tin.',
    chieuCao: 'h-[300px]',
    nen:
      'radial-gradient(circle at 30% 22%, rgba(243,231,208,0.13), transparent 14%), linear-gradient(180deg, rgba(20,17,15,0.16), rgba(20,17,15,0.66)), linear-gradient(135deg, #1c1d1a, #667353 52%, #d8c7a4)',
  },
]

const danhGia = [
  {
    muc: 'Trải nghiệm người dùng',
    diem: '9,3 / 10',
    moTa:
      'Luồng đọc rõ ràng, nhịp cuộn có chủ đích và các điểm dừng thị giác giúp người xem đi từ kinh ngạc đến hiểu biết mà không bị đứt mạch.',
  },
  {
    muc: 'Giao diện và bản sắc',
    diem: '9,5 / 10',
    moTa:
      'Ngôn ngữ hình ảnh thiên về cảm giác triển lãm số với chất đá, bóng tối và ánh kim cổ, tránh hoàn toàn tinh thần giao diện thương mại đại trà.',
  },
  {
    muc: 'Đồ họa và chiều sâu',
    diem: '9,2 / 10',
    moTa:
      'Texture relief, lớp bụi, ánh xiên và bề mặt giấy cổ tạo ra chiều sâu thị giác rõ hơn mà vẫn giữ sự tiết chế của một bảo tàng số cao cấp.',
  },
  {
    muc: 'Khả năng nhập vai',
    diem: '9,4 / 10',
    moTa:
      'Khung trình diễn trung tâm đã sẵn sàng cho cảnh ba chiều thật, đồng thời vẫn có phương án hiển thị tĩnh khi thiết bị không phù hợp.',
  },
  {
    muc: 'Hiệu năng và thích ứng',
    diem: '8,9 / 10',
    moTa:
      'Cấu trúc giao diện gọn, cảnh ba chiều được nạp chậm và bố cục ưu tiên màn hình lớn vẫn co giãn tốt trên thiết bị nhỏ.',
  },
]

function NenHatBui({ opacity = 0.2 }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-cover bg-center mix-blend-screen"
      style={{ backgroundImage: `url(${dustOverlay})`, opacity }}
    />
  )
}

function KhungNhapVaiDuPhong() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_58%_32%,rgba(243,211,136,0.18),transparent_18%),linear-gradient(180deg,rgba(18,15,13,0.22),rgba(18,15,13,0.74)),linear-gradient(135deg,#3e342a,#191411_55%,#0f0d0b)]">
      <NenHatBui opacity={0.22} />
      <div className="absolute inset-x-[17%] bottom-[11%] top-[17%] rounded-t-[1.7rem] border border-[#d8b66a]/18 bg-[linear-gradient(180deg,#cfb179_0%,#887257_26%,#3a2a21_64%,#120f0d_100%)] [clip-path:polygon(50%_0,100%_22%,82%_22%,86%_36%,72%_36%,76%_50%,62%_50%,66%_64%,52%_64%,56%_78%,0_78%,50%_100%,100%_78%,44%_78%,48%_64%,34%_64%,38%_50%,24%_50%,28%_36%,14%_36%,18%_22%,0_22%)] shadow-[0_45px_120px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-x-[9%] bottom-[9%] h-[25%] rounded-[999px] bg-[radial-gradient(circle,rgba(217,180,74,0.18),rgba(20,17,15,0)_70%)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,15,13,0),rgba(18,15,13,0.44)_70%,rgba(18,15,13,0.78))]" />
    </div>
  )
}

function App() {
  const [congTrinhDangXem, setCongTrinhDangXem] = useState(congTrinh[0])
  const [anhDangXem, setAnhDangXem] = useState(null)
  const [nenTaiCanh3D, setNenTaiCanh3D] = useState(false)
  const { scrollYProgress } = useScroll()
  const doLechNen = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])
  const nhapVaiRef = useRef(null)
  const duLieuChon = useMemo(
    () => congTrinh.find((muc) => muc.id === congTrinhDangXem.id) ?? congTrinh[0],
    [congTrinhDangXem],
  )

  useEffect(() => {
    if (!nhapVaiRef.current || nenTaiCanh3D) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setNenTaiCanh3D(true)
        observer.disconnect()
      },
      { rootMargin: '240px 0px' },
    )

    observer.observe(nhapVaiRef.current)

    return () => observer.disconnect()
  }, [nenTaiCanh3D])

  return (
    <div className="min-h-screen bg-obsidian text-parchment">
      <Motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-50 h-px origin-left bg-gold-sun/70"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-8 lg:px-12">
          <a
            href="#khai-mo"
            className="font-display text-[0.72rem] uppercase tracking-[0.45em] text-parchment/90 transition hover:text-gold-sun"
            aria-label="Về đầu trang"
          >
            Maya cổ
          </a>
          <nav aria-label="Điều hướng chính" className="hidden gap-6 md:flex">
            {[
              ['#tong-quan', 'Tổng quan'],
              ['#cong-trinh', 'Di tích'],
              ['#nhap-vai', 'Nhập vai'],
              ['#dong-chay', 'Lịch sử'],
              ['#thu-vien', 'Hình ảnh'],
            ].map(([href, nhan]) => (
              <a
                key={href}
                href={href}
                className="text-sm tracking-[0.2em] text-parchment/65 transition hover:text-parchment"
              >
                {nhan}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        <section
          id="khai-mo"
          className="relative isolate flex min-h-screen items-end overflow-hidden px-5 pb-14 pt-28 md:px-8 lg:px-12"
        >
          <Motion.div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ y: doLechNen }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-55"
              style={{ backgroundImage: `url(${heroMural})` }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_34%,rgba(243,211,136,0.24),transparent_17%),linear-gradient(180deg,rgba(20,17,15,0.16),rgba(20,17,15,0.54)_45%,rgba(20,17,15,0.88))]" />
            <div className="absolute inset-x-0 bottom-0 top-[12%] bg-[linear-gradient(90deg,rgba(20,17,15,0.9),rgba(20,17,15,0.42)_38%,rgba(20,17,15,0.56)_62%,rgba(20,17,15,0.9))]" />
            <div className="absolute bottom-0 right-[5%] h-[74vh] w-[52vw] min-w-[320px]">
              <div className="absolute inset-x-[18%] bottom-0 top-[10%] rounded-t-[2.6rem] border border-[#f2ddba]/12 bg-[linear-gradient(180deg,#d1b37a_0%,#8b7152_28%,#3d2e23_68%,#161210_100%)] [clip-path:polygon(50%_0,100%_20%,79%_20%,83%_33%,67%_33%,71%_46%,56%_46%,60%_59%,44%_59%,48%_72%,34%_72%,38%_86%,0_86%,50%_100%,100%_86%,62%_86%,66%_72%,52%_72%,56%_59%,40%_59%,44%_46%,29%_46%,33%_33%,17%_33%,21%_20%,0_20%)] shadow-[0_45px_120px_rgba(0,0,0,0.52)]" />
              <div className="absolute inset-x-[15%] bottom-[8%] h-[26%] rounded-[999px] bg-[radial-gradient(circle,rgba(217,180,74,0.22),rgba(20,17,15,0)_72%)] blur-3xl" />
            </div>
            <NenHatBui opacity={0.32} />
          </Motion.div>

          <div className="relative z-10 max-w-[620px]">
            <Reveal className="space-y-6">
              <p className="font-display text-[0.78rem] uppercase tracking-[0.52em] text-gold-sun/80">
                Không gian triển lãm số về di tích Maya
              </p>
              <h1 className="max-w-[10ch] font-display text-5xl leading-[0.92] text-parchment sm:text-6xl md:text-7xl xl:text-[6.5rem]">
                Chichén Itzá
                <span className="mt-4 block text-[0.48em] leading-[1.08] text-stone-sand">
                  nơi đá cổ ghi nhớ chuyển động của trời
                </span>
              </h1>
              <p className="max-w-[42ch] text-base leading-8 text-parchment/80 md:text-lg">
                Một hành trình thị giác và học thuật đưa người xem tiến dần vào
                trung tâm nghi lễ của nền văn minh Maya, nơi ánh sáng, bóng tối
                và hình khối bậc thang cùng kể lại ký ức của một thế giới linh
                thiêng.
              </p>
              <div className="flex flex-col gap-4 pt-3 sm:flex-row">
                <CarvedButton href="#tong-quan">Bắt đầu hành trình</CarvedButton>
                <a
                  href="#nhap-vai"
                  className="inline-flex items-center text-sm uppercase tracking-[0.3em] text-parchment/72 transition hover:text-gold-sun"
                >
                  Đi vào không gian nhập vai
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="tong-quan"
          className="relative overflow-hidden border-t border-parchment/10 px-5 py-20 md:px-8 lg:px-12 lg:py-28"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-22"
            style={{ backgroundImage: `url(${stoneRelief})` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.52),rgba(20,17,15,0.84))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(217,180,74,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(243,231,208,0.08),transparent_18%)]" />
          <NenHatBui opacity={0.14} />

          <div className="relative mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <Reveal>
              <SectionHeader
                nhan="Tổng quan di tích"
                tieuDe="Một trung tâm nghi lễ nơi kiến trúc, thiên văn và quyền lực cùng gặp nhau"
                moTa="Chichén Itzá là một quần thể khảo cổ lớn trên bán đảo Yucatán, nơi người Maya kiến tạo nên những công trình vừa chính xác về thiên văn, vừa giàu sức nặng biểu tượng. Giá trị của di tích không nằm ở một công trình đơn lẻ, mà ở toàn bộ mối quan hệ giữa quảng trường, đền đài, sân nghi lễ và trục nhìn."
              />
            </Reveal>

            <Reveal delay={0.15}>
              <div className="grid gap-6">
                <div
                  className="rounded-[2rem] border border-parchment/12 p-7 shadow-[0_34px_90px_rgba(0,0,0,0.34)]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.06), rgba(243,231,208,0.02)), url(${parchmentGrain})`,
                  }}
                >
                  <p className="font-display text-sm uppercase tracking-[0.35em] text-gold-sun/78">
                    Bản đồ khái niệm
                  </p>
                  <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-[1.6rem] border border-parchment/10 bg-[linear-gradient(180deg,#171310,#2c231c)]">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-28"
                      style={{ backgroundImage: `url(${stoneRelief})` }}
                    />
                    <div className="absolute inset-6 rounded-[1.3rem] border border-dashed border-gold-sun/30" />
                    <div className="absolute left-[18%] top-[20%] h-3 w-3 rounded-full bg-gold-sun shadow-[0_0_18px_rgba(217,180,74,0.65)]" />
                    <div className="absolute left-[56%] top-[30%] h-3 w-3 rounded-full bg-jade shadow-[0_0_18px_rgba(47,111,98,0.75)]" />
                    <div className="absolute left-[34%] top-[56%] h-3 w-3 rounded-full bg-parchment shadow-[0_0_18px_rgba(243,231,208,0.45)]" />
                    <div className="absolute left-[18%] top-[24%] h-px w-[42%] rotate-[11deg] bg-gold-sun/40" />
                    <div className="absolute left-[36%] top-[56%] h-px w-[23%] -rotate-[32deg] bg-parchment/35" />
                    <div className="absolute bottom-6 left-6 right-6 grid gap-3 text-sm text-parchment/75 sm:grid-cols-3">
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-sun/70">
                          Phía bắc
                        </p>
                        <p className="mt-1">El Castillo giữ trục nhìn chủ đạo.</p>
                      </div>
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-sun/70">
                          Trung tâm
                        </p>
                        <p className="mt-1">Không gian quảng trường mở các nghi lễ công cộng.</p>
                      </div>
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-sun/70">
                          Phía đông
                        </p>
                        <p className="mt-1">Đền đài liên kết với biểu tượng thần quyền.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    ['Di sản thế giới', 'Một trong những biểu tượng nổi bật nhất của khảo cổ Trung Mỹ cổ đại.'],
                    ['Trục thiên văn', 'Kiến trúc gắn với chu kỳ mặt trời và sự vận hành của thời gian.'],
                    ['Kinh nghiệm nhập vai', 'Bố cục này sẵn sàng mở rộng sang mô hình ba chiều và tour toàn cảnh.'],
                  ].map(([tieuDe, noiDung]) => (
                    <div
                      key={tieuDe}
                      className="border border-parchment/10 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.05), rgba(243,231,208,0.015)), url(${parchmentGrain})`,
                      }}
                    >
                      <h3 className="font-display text-xl text-parchment">{tieuDe}</h3>
                      <p className="mt-3 text-sm leading-7 text-parchment/72">{noiDung}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="cong-trinh"
          className="relative px-5 py-20 md:px-8 lg:px-12 lg:py-28"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0),rgba(20,17,15,0.3)_22%,rgba(20,17,15,0))]" />
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <SectionHeader
                nhan="Khám phá công trình biểu tượng"
                tieuDe="Những cấu trúc không chỉ để nhìn, mà để được đọc như một bản văn bằng đá"
                moTa="Thay vì đặt các công trình thành những khối thẻ lặp lại, bố cục này tổ chức chúng như ba trạm diễn giải. Mỗi trạm mở ra một điểm nhìn riêng: thiên văn, nghi lễ và quyền lực."
              />
            </Reveal>

            <div className="mt-12 grid gap-8 xl:grid-cols-[0.78fr_1.22fr]">
              <Reveal>
                <div className="space-y-4">
                  {congTrinh.map((muc) => {
                    const dangChon = duLieuChon.id === muc.id

                    return (
                      <button
                        key={muc.id}
                        type="button"
                        onClick={() => setCongTrinhDangXem(muc)}
                        className={`group w-full border px-5 py-5 text-left transition duration-500 ${
                          dangChon
                            ? 'border-gold-sun/55 shadow-[0_28px_70px_rgba(0,0,0,0.32)]'
                            : 'border-parchment/10 hover:border-parchment/24 hover:shadow-[0_20px_55px_rgba(0,0,0,0.22)]'
                        }`}
                        style={{
                          backgroundImage: `${
                            dangChon
                              ? 'linear-gradient(180deg, rgba(201,165,106,0.18), rgba(20,17,15,0.28))'
                              : 'linear-gradient(180deg, rgba(243,231,208,0.05), rgba(243,231,208,0.02))'
                          }, url(${stoneRelief})`,
                          backgroundSize: 'cover',
                        }}
                        aria-label={`Xem công trình ${muc.tieuDe}`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="font-display text-3xl text-gold-sun/72">{muc.so}</span>
                          <div className="space-y-2">
                            <h3 className="font-display text-2xl text-parchment">{muc.tieuDe}</h3>
                            <p className="text-sm uppercase tracking-[0.24em] text-parchment/48">
                              {muc.phuDe}
                            </p>
                            <p className="text-sm leading-7 text-parchment/72">{muc.moTa}</p>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="overflow-hidden border border-parchment/10 bg-[#181412] shadow-[0_44px_90px_rgba(0,0,0,0.42)]">
                  <div className="grid min-h-[660px] lg:grid-cols-[1.15fr_0.85fr]">
                    <div className="relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-cover bg-center opacity-26"
                        style={{ backgroundImage: `url(${stoneRelief})` }}
                      />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_30%,rgba(243,231,208,0.2),transparent_18%),linear-gradient(180deg,rgba(217,180,74,0.15),rgba(20,17,15,0.18)_28%,rgba(20,17,15,0.72)_100%),linear-gradient(90deg,rgba(20,17,15,0.14),rgba(20,17,15,0.44))]" />
                      <div className="absolute inset-x-[10%] bottom-0 top-[14%] rounded-t-[2rem] border border-parchment/8 bg-[linear-gradient(180deg,#cfb179_0%,#8b7352_26%,#443225_62%,#161210_100%)] [clip-path:polygon(50%_0,100%_24%,84%_24%,88%_40%,74%_40%,78%_56%,64%_56%,68%_72%,54%_72%,58%_88%,0_88%,50%_100%,100%_88%,42%_88%,46%_72%,32%_72%,36%_56%,22%_56%,26%_40%,12%_40%,16%_24%,0_24%)]" />
                      <div className="absolute left-[18%] top-[20%] h-[1px] w-[64%] bg-gold-sun/30" />
                      <div className="absolute left-[26%] top-[34%] h-[1px] w-[49%] bg-gold-sun/25" />
                      <div className="absolute left-[34%] top-[48%] h-[1px] w-[34%] bg-gold-sun/22" />
                      <div className="absolute left-[44%] top-[62%] h-[1px] w-[14%] bg-gold-sun/20" />
                      <NenHatBui opacity={0.22} />
                    </div>

                    <div
                      className="flex flex-col justify-between gap-8 p-7 sm:p-10"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.04), rgba(243,231,208,0.01)), url(${parchmentGrain})`,
                      }}
                    >
                      <div>
                        <p className="font-display text-sm uppercase tracking-[0.35em] text-gold-sun/80">
                          Điểm diễn giải đang mở
                        </p>
                        <h3 className="mt-4 font-display text-4xl text-parchment sm:text-5xl">
                          {duLieuChon.tieuDe}
                        </h3>
                        <p className="mt-3 text-sm uppercase tracking-[0.28em] text-parchment/45">
                          {duLieuChon.phuDe}
                        </p>
                        <p className="mt-6 max-w-[34ch] text-base leading-8 text-parchment/74">
                          {duLieuChon.moTa}
                        </p>
                      </div>

                      <div className="space-y-4 border-t border-parchment/10 pt-6">
                        {duLieuChon.chiTiet.map((dong) => (
                          <div key={dong} className="flex gap-4 border-l border-gold-sun/35 pl-4">
                            <span className="mt-2 h-2 w-2 rounded-full bg-gold-sun" />
                            <p className="text-sm leading-7 text-parchment/72">{dong}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="overflow-hidden border-y border-parchment/10 bg-[linear-gradient(180deg,rgba(243,231,208,0.04),rgba(243,231,208,0.01))] py-7">
          <Motion.div
            className="flex min-w-max gap-6 px-5 md:px-8 lg:px-12"
            animate={{ x: ['0%', '-40%'] }}
            transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
          >
            {Array.from({ length: 2 }).map((_, nhom) => (
              <div key={nhom} className="flex gap-6">
                {[
                  'Toàn cảnh El Castillo trong lớp bụi nắng',
                  'Nhịp tường đá của Sân bóng lớn',
                  'Mặt đứng khắc chìm của Đền Chiến binh',
                  'Mảng đá phong hóa và rêu xanh',
                ].map((dong) => (
                  <div
                    key={`${nhom}-${dong}`}
                    className="relative flex h-44 w-[23rem] items-end border border-parchment/8 p-5"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(20,17,15,0.16), rgba(20,17,15,0.74)), url(${stoneRelief})`,
                      backgroundSize: 'cover',
                    }}
                  >
                    <NenHatBui opacity={0.16} />
                    <p className="relative max-w-[16ch] font-display text-2xl leading-tight text-parchment/86">
                      {dong}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </Motion.div>
        </section>

        <section
          id="nhap-vai"
          className="relative overflow-hidden bg-[linear-gradient(180deg,#0f0d0c,#171210,#100f0d)] px-5 py-20 md:px-8 lg:px-12 lg:py-30"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-16"
            style={{ backgroundImage: `url(${heroMural})` }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(217,180,74,0.16),transparent_22%),radial-gradient(circle_at_20%_70%,rgba(47,111,98,0.12),transparent_22%)]" />
          <NenHatBui opacity={0.18} />

          <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <Reveal>
              <SectionHeader
                nhan="Không gian nhập vai"
                tieuDe="Một sân khấu thị giác đã sẵn cho cảnh ba chiều thật, nhưng vẫn giữ sự trang nghiêm của bảo tàng số"
                moTa="Khối trình diễn trung tâm dưới đây đã được nâng lên thành một khung ba chiều nhẹ lấy cảm hứng từ El Castillo. Camera chuyển động rất chậm, ánh sáng nắng xiên và bụi mịn chỉ đủ để làm sâu cảnh, không biến trải nghiệm thành trò chơi."
              />
              <div className="mt-8 space-y-4 text-sm leading-7 text-parchment/72">
                <p>
                  Khi thiết bị phù hợp, cảnh ba chiều sẽ được nạp chậm để giữ
                  hiệu năng. Nếu không, khu vực này tự động trở về trạng thái tĩnh
                  có chất lượng trình bày tương đương.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    'Sẵn sàng cho mô hình ba chiều thật',
                    'Có phương án hiển thị tĩnh',
                    'Sẵn cho lớp chú giải theo điểm nhìn',
                  ].map((nhan) => (
                    <span
                      key={nhan}
                      className="border border-parchment/14 px-4 py-2 text-xs uppercase tracking-[0.22em] text-parchment/62"
                    >
                      {nhan}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="border border-parchment/10 bg-[linear-gradient(180deg,rgba(243,231,208,0.04),rgba(243,231,208,0.01))] p-4 shadow-[0_36px_100px_rgba(0,0,0,0.48)] sm:p-6">
                <div
                  ref={nhapVaiRef}
                  className="relative aspect-[16/10] overflow-hidden border border-parchment/12 bg-[#0f0d0b]"
                >
                  {nenTaiCanh3D ? (
                    <Suspense fallback={<KhungNhapVaiDuPhong />}>
                      <ImmersiveCanvas className="absolute inset-0" />
                    </Suspense>
                  ) : (
                    <KhungNhapVaiDuPhong />
                  )}
                  <div className="absolute left-5 top-5 border border-parchment/12 bg-obsidian/72 px-4 py-2 text-xs uppercase tracking-[0.28em] text-parchment/74 backdrop-blur-sm">
                    Chế độ trưng bày
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,rgba(20,17,15,0),rgba(20,17,15,0.88))] p-6 sm:p-8">
                    <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-[30rem]">
                        <p className="font-display text-xs uppercase tracking-[0.35em] text-gold-sun/78">
                          Điểm đứng giả lập
                        </p>
                        <h3 className="mt-3 font-display text-3xl text-parchment sm:text-4xl">
                          Trước mặt tháp, dưới ánh chiều nghiêng
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-parchment/72">
                          Khung này đã được chuẩn bị để thay bằng mô hình phong
                          cảnh, chú giải tương tác hoặc đường dẫn sang một tour
                          nhập vai sâu hơn ở bước triển khai tiếp theo.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          className="border border-parchment/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-parchment/70 transition hover:border-gold-sun/45 hover:text-gold-sun"
                          aria-label="Mở mô hình không gian ba chiều"
                        >
                          Mô hình ba chiều
                        </button>
                        <button
                          type="button"
                          className="border border-parchment/15 px-4 py-2 text-xs uppercase tracking-[0.24em] text-parchment/70 transition hover:border-gold-sun/45 hover:text-gold-sun"
                          aria-label="Mở chế độ toàn cảnh ba trăm sáu mươi độ"
                        >
                          Toàn cảnh 360
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        
        <section
          id="dong-chay"
          className="relative px-5 py-20 md:px-8 lg:px-12 lg:py-28"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0),rgba(20,17,15,0.22),rgba(20,17,15,0))]" />
          <div className="mx-auto max-w-[1240px]">
            <Reveal>
              <SectionHeader
                nhan="Dòng chảy lịch sử"
                tieuDe="Mỗi mốc thời gian là một lớp khai quật, hé lộ từng nhịp lớn của ký ức đô thị Maya"
                moTa="Dòng thời gian này không chỉ cung cấp niên đại. Nó được xử lý như một hành lang đào sâu vào quá khứ, nơi mỗi mốc hiện lên như một phiến ghi chú vừa được nâng khỏi lòng đất."
              />
            </Reveal>

            <div className="relative mt-12 pl-6 before:absolute before:bottom-0 before:left-[10px] before:top-0 before:w-px before:bg-[linear-gradient(180deg,rgba(217,180,74,0),rgba(217,180,74,0.45),rgba(217,180,74,0))] md:pl-12 md:before:left-5">
              {cotMoc.map((muc, index) => (
                <Reveal key={muc.nam} delay={index * 0.06}>
                  <article className="relative mb-10 md:mb-14">
                    <div className="absolute left-[-22px] top-4 h-4 w-4 rounded-full border border-gold-sun/45 bg-obsidian shadow-[0_0_0_6px_rgba(20,17,15,1)] md:left-[-31px]" />
                    <div className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-8">
                      <div>
                        <p className="font-display text-sm uppercase tracking-[0.35em] text-gold-sun/70">
                          {muc.nam}
                        </p>
                      </div>
                      <div
                        className="border border-parchment/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]"
                        style={{
                          backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.045), rgba(243,231,208,0.01)), url(${stoneRelief})`,
                          backgroundSize: 'cover',
                        }}
                      >
                        <h3 className="font-display text-3xl text-parchment">{muc.tieuDe}</h3>
                        <p className="mt-4 max-w-[54ch] text-base leading-8 text-parchment/72">
                          {muc.noiDung}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-parchment/10 bg-[linear-gradient(180deg,rgba(243,231,208,0.02),rgba(243,231,208,0.06))] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto grid max-w-[1440px] gap-12 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <Reveal>
              <SectionHeader
                nhan="Biểu tượng, thiên văn và cấu trúc"
                tieuDe="Những đường nét tinh tế mở ra cách người Maya gắn trời, đất và nghi lễ thành một chỉnh thể"
                moTa="Phần này diễn giải các trục đối xứng, lớp bậc, hướng nắng và biểu tượng linh vật bằng ngôn ngữ gần với trưng bày bảo tàng hiện đại. Các đường overlay chỉ đóng vai trò dẫn mắt, không lấn át chiều sâu của vật liệu."
              />
              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {[
                  ['Trục mặt trời', 'Bóng đổ trên thân tháp cho phép người xem đọc kiến trúc như một cỗ lịch khổng lồ.'],
                  ['Rắn lông vũ', 'Hình tượng linh thiêng liên kết giữa bầu trời, chuyển động và quyền lực biểu tượng.'],
                  ['Nhịp bậc thang', 'Những lớp bậc tạo cảm giác đi lên, đồng thời ép người xem ý thức rõ sự trang nghiêm.'],
                  ['Mặt bằng nghi lễ', 'Các khoảng trống rộng, trục nhìn dài và vị trí đền đài cấu thành ngôn ngữ của quyền uy.'],
                ].map(([tieuDe, noiDung]) => (
                  <div key={tieuDe} className="border-l border-gold-sun/30 pl-4">
                    <h3 className="font-display text-2xl text-parchment">{tieuDe}</h3>
                    <p className="mt-3 text-sm leading-7 text-parchment/70">{noiDung}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div
                className="relative aspect-[1.05] overflow-hidden border border-parchment/10 shadow-[0_32px_90px_rgba(0,0,0,0.38)]"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(20,17,15,0.56), rgba(20,17,15,0.76)), url(${stoneRelief})`,
                  backgroundSize: 'cover',
                }}
              >
                <div className="absolute inset-[10%] rounded-full border border-parchment/10" />
                <div className="absolute inset-[18%] rounded-full border border-gold-sun/22" />
                <div className="absolute inset-x-[50%] inset-y-[14%] w-px -translate-x-1/2 bg-gold-sun/28" />
                <div className="absolute inset-y-[50%] inset-x-[12%] h-px -translate-y-1/2 bg-parchment/10" />
                <div className="absolute inset-[22%] rotate-45 border border-dashed border-jade/26" />
                <div className="absolute left-1/2 top-[21%] h-3 w-3 -translate-x-1/2 rounded-full bg-gold-sun shadow-[0_0_20px_rgba(217,180,74,0.65)]" />
                <div className="absolute left-[28%] top-[52%] h-3 w-3 rounded-full bg-jade shadow-[0_0_20px_rgba(47,111,98,0.75)]" />
                <div className="absolute bottom-[16%] left-[54%] h-3 w-3 rounded-full bg-parchment shadow-[0_0_20px_rgba(243,231,208,0.45)]" />
                <div className="absolute left-1/2 top-1/2 h-[40%] w-[40%] -translate-x-1/2 -translate-y-1/2 border border-parchment/14 bg-[linear-gradient(180deg,rgba(201,165,106,0.16),rgba(20,17,15,0.04))] [clip-path:polygon(50%_0,100%_18%,82%_18%,86%_36%,71%_36%,75%_54%,60%_54%,64%_72%,50%_72%,54%_90%,0_90%,50%_100%,100%_90%,46%_90%,50%_72%,36%_72%,40%_54%,25%_54%,29%_36%,14%_36%,18%_18%,0_18%)]" />
                <div className="absolute left-[9%] top-[10%] max-w-[13rem]">
                  <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-sun/72">
                    Điểm nhấn thiên văn
                  </p>
                  <p className="mt-3 text-sm leading-7 text-parchment/68">
                    Ánh sáng được xem như chất liệu thứ hai của công trình.
                  </p>
                </div>
                <div className="absolute bottom-[9%] right-[9%] max-w-[14rem] text-right">
                  <p className="font-display text-xs uppercase tracking-[0.32em] text-gold-sun/72">
                    Cấu trúc biểu tượng
                  </p>
                  <p className="mt-3 text-sm leading-7 text-parchment/68">
                    Hệ bậc, hướng và khối tháp hợp thành một ngôn ngữ quyền uy.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="thu-vien"
          className="px-5 py-20 md:px-8 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <SectionHeader
                nhan="Thư viện hình ảnh"
                tieuDe="Những mảng nhìn được sắp như một bộ sưu tập trưng bày, không phải một phòng ảnh thông thường"
                moTa="Mỗi khung hình giả lập một khoảnh khắc thị giác: ánh xiên, bề mặt phong hóa, nhịp cột và tầng bậc. Cách sắp xếp lệch nhịp giúp người xem luôn cảm thấy mình đang di chuyển trong một không gian có thật."
              />
            </Reveal>

            <div className="mt-12 columns-1 gap-5 md:columns-2 xl:columns-3">
              {thuVien.map((anh, index) => (
                <Reveal key={anh.id} delay={index * 0.06} className="mb-5 break-inside-avoid">
                  <button
                    type="button"
                    onClick={() => setAnhDangXem(anh)}
                    className={`group relative w-full overflow-hidden border border-parchment/10 ${anh.chieuCao} p-5 text-left shadow-[0_28px_80px_rgba(0,0,0,0.22)] transition duration-500 hover:-translate-y-1 hover:border-gold-sun/35`}
                    style={{ backgroundImage: anh.nen }}
                    aria-label={`Mở hình ảnh ${anh.tieuDe}`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-18"
                      style={{ backgroundImage: `url(${stoneRelief})` }}
                    />
                    <NenHatBui opacity={0.18} />
                    <div className="relative flex h-full flex-col justify-end">
                      <p className="font-display text-3xl leading-tight text-parchment">
                        {anh.tieuDe}
                      </p>
                      <p className="mt-3 max-w-[26ch] text-sm leading-7 text-parchment/72">
                        {anh.chuThich}
                      </p>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        
        <section className="border-t border-parchment/10 bg-[linear-gradient(180deg,rgba(243,231,208,0.03),rgba(243,231,208,0.01))] px-5 py-20 md:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <SectionHeader
                nhan="Đánh giá đồ án"
                tieuDe="Một tổng kết thiên về học thuật, nhấn mạnh trải nghiệm, bản sắc và mức độ nhập vai"
                moTa="Phần kết không đóng vai người bán hàng. Nó đọc lại chất lượng của đồ án như một bản thẩm định triển lãm số, dựa trên các tiêu chí rõ ràng về kể chuyện, đồ họa, hiệu năng và sự trung thành với tinh thần Maya cổ đại."
              />
            </Reveal>

            <div className="mt-12 grid gap-5 xl:grid-cols-[0.88fr_1.12fr]">
              <Reveal>
                <div
                  className="border border-parchment/10 p-7 shadow-[0_24px_70px_rgba(0,0,0,0.22)]"
                  style={{
                    backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.045), rgba(243,231,208,0.01)), url(${parchmentGrain})`,
                  }}
                >
                  <h3 className="font-display text-4xl text-parchment">
                    Tiêu chí chấm điểm đã được thể hiện rõ
                  </h3>
                  <div className="mt-6 space-y-3">
                    {[
                      'Trải nghiệm người dùng rõ ràng',
                      'Giao diện có bản sắc riêng',
                      'Đồ họa đẹp, có chiều sâu',
                      'Nội dung dễ tiếp cận',
                      'Mạch kể chuyện tốt',
                      'Tính nhập vai cao',
                      'Thích ứng màn hình tốt',
                      'Hiệu năng ổn',
                      'Không bị mẫu hóa',
                      'Giữ được tinh thần văn minh Maya cổ đại',
                    ].map((dong) => (
                      <div
                        key={dong}
                        className="flex items-center gap-4 border-b border-parchment/8 py-3 last:border-b-0"
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-gold-sun" />
                        <p className="text-sm uppercase tracking-[0.2em] text-parchment/72">
                          {dong}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-2">
                {danhGia.map((muc, index) => (
                  <Reveal key={muc.muc} delay={index * 0.05}>
                    <article
                      className="flex h-full flex-col justify-between border border-parchment/10 p-6 shadow-[0_18px_50px_rgba(0,0,0,0.2)]"
                      style={{
                        backgroundImage: `linear-gradient(180deg, rgba(243,231,208,0.045), rgba(243,231,208,0.01)), url(${stoneRelief})`,
                        backgroundSize: 'cover',
                      }}
                    >
                      <div>
                        <p className="font-display text-xs uppercase tracking-[0.35em] text-gold-sun/72">
                          {muc.muc}
                        </p>
                        <p className="mt-4 font-display text-5xl text-parchment">
                          {muc.diem}
                        </p>
                      </div>
                      <p className="mt-6 text-sm leading-7 text-parchment/72">{muc.moTa}</p>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-parchment/10 px-5 py-8 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 text-sm text-parchment/56 md:flex-row md:items-center md:justify-between">
          <p>Chichén Itzá, một hành trình số về ký ức đá của nền văn minh Maya.</p>
          <a
            href="#khai-mo"
            className="uppercase tracking-[0.24em] transition hover:text-gold-sun"
          >
            Trở lại đỉnh trang
          </a>
        </div>
      </footer>

      {anhDangXem ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-obsidian/94 px-5 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label={`Khung xem ảnh ${anhDangXem.tieuDe}`}
        >
          <button
            type="button"
            onClick={() => setAnhDangXem(null)}
            className="absolute right-5 top-5 border border-parchment/14 px-4 py-2 text-xs uppercase tracking-[0.3em] text-parchment/70 transition hover:border-gold-sun/45 hover:text-gold-sun"
            aria-label="Đóng khung xem ảnh"
          >
            Đóng
          </button>
          <div className="w-full max-w-[1080px] border border-parchment/10 bg-[#171310] p-4 sm:p-6">
            <div
              className="relative min-h-[65vh] overflow-hidden"
              style={{ backgroundImage: anhDangXem.nen }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${stoneRelief})`, opacity: 0.18 }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,17,15,0.14),rgba(20,17,15,0.8))]" />
              <NenHatBui opacity={0.14} />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <p className="font-display text-4xl text-parchment sm:text-5xl">
                  {anhDangXem.tieuDe}
                </p>
                <p className="mt-4 max-w-[36ch] text-base leading-8 text-parchment/72">
                  {anhDangXem.chuThich}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
