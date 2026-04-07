import { useEffect, useMemo, useRef, useState } from 'react'
import 'pannellum/build/pannellum.css'
import 'pannellum/build/pannellum.js'
import './trang-toan-canh-360.css'
import panoramaDesktop from '../assets/panorama/chichen-itza-360-desktop.jpg'
import panoramaMobile from '../assets/panorama/chichen-itza-360-mobile.jpg'

const CAU_HINH_PANORAMA = {
  haov: 313.71,
  vaov: 57.95,
  vOffset: 0,
}

const CAC_DIEM_CHU_GIAI = [
  {
    pitch: -0.8,
    yaw: -47,
    cssClass: 'diem-chu-giai-pannellum',
    createTooltipFunc: taoChuGiaiHotspot,
    createTooltipArgs: {
      tieuDe: 'Kim tự tháp El Castillo',
      noiDung:
        'Khối đền bậc thang giữ vai trò trung tâm trong bố cục nghi lễ và thiên văn của Chichén Itzá.',
      nhanNut: 'Mở chú giải về El Castillo',
    },
  },
  {
    pitch: -6.2,
    yaw: 22,
    cssClass: 'diem-chu-giai-pannellum',
    createTooltipFunc: taoChuGiaiHotspot,
    createTooltipArgs: {
      tieuDe: 'Không gian nghi lễ',
      noiDung:
        'Khoảng sân rộng mở cho thấy quy mô của khu nghi lễ, nơi các công trình lớn liên kết thành một trục quan sát và tụ hội.',
      nhanNut: 'Mở chú giải về không gian nghi lễ',
    },
  },
]

function dongTatCaChuGiai(ngoaiTru = null) {
  document.querySelectorAll('[data-vung-chu-giai="true"]').forEach((nut) => {
    if (nut !== ngoaiTru) {
      nut.setAttribute('data-mo', 'false')
      nut.setAttribute('aria-expanded', 'false')
    }
  })
}

function taoChuGiaiHotspot(khungHotspot, duLieu) {
  const nut = document.createElement('button')
  nut.type = 'button'
  nut.className = 'diem-chu-giai'
  nut.setAttribute('data-vung-chu-giai', 'true')
  nut.setAttribute('data-mo', 'false')
  nut.setAttribute('aria-expanded', 'false')
  nut.setAttribute('aria-label', duLieu.nhanNut)

  const vong = document.createElement('span')
  vong.className = 'diem-chu-giai__vong'
  vong.setAttribute('aria-hidden', 'true')

  const the = document.createElement('span')
  the.className = 'diem-chu-giai__the'

  const tieuDe = document.createElement('span')
  tieuDe.className = 'diem-chu-giai__tieu-de'
  tieuDe.textContent = duLieu.tieuDe

  const noiDung = document.createElement('span')
  noiDung.className = 'diem-chu-giai__noi-dung'
  noiDung.textContent = duLieu.noiDung

  the.append(tieuDe, noiDung)
  nut.append(vong, the)
  khungHotspot.append(nut)

  nut.addEventListener('click', (suKien) => {
    suKien.preventDefault()
    suKien.stopPropagation()
    const dangMo = nut.getAttribute('data-mo') === 'true'
    dongTatCaChuGiai(nut)
    nut.setAttribute('data-mo', dangMo ? 'false' : 'true')
    nut.setAttribute('aria-expanded', dangMo ? 'false' : 'true')
  })

  nut.addEventListener('mouseenter', () => {
    dongTatCaChuGiai(nut)
    nut.setAttribute('data-mo', 'true')
    nut.setAttribute('aria-expanded', 'true')
  })

  nut.addEventListener('mouseleave', () => {
    nut.setAttribute('data-mo', 'false')
    nut.setAttribute('aria-expanded', 'false')
  })

  nut.addEventListener('focus', () => {
    dongTatCaChuGiai(nut)
    nut.setAttribute('data-mo', 'true')
    nut.setAttribute('aria-expanded', 'true')
  })

  nut.addEventListener('blur', () => {
    nut.setAttribute('data-mo', 'false')
    nut.setAttribute('aria-expanded', 'false')
  })
}

function chonPanorama() {
  if (typeof window === 'undefined') {
    return panoramaDesktop
  }

  return window.innerWidth <= 768 ? panoramaMobile : panoramaDesktop
}

function NutDieuKhien({ onClick, nhan, ariaLabel, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      className="inline-flex min-w-[3rem] items-center justify-center border border-white/18 bg-black/35 px-4 py-3 text-sm font-medium text-white transition hover:border-white/36 hover:bg-white/12 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {nhan}
    </button>
  )
}

export default function TrangToanCanh360() {
  const coSanPannellum =
    typeof window !== 'undefined' && typeof window.pannellum?.viewer === 'function'
  const khungViewerRef = useRef(null)
  const viewerRef = useRef(null)
  const [daTaiXong, setDaTaiXong] = useState(false)
  const [loiTai] = useState(() => !coSanPannellum)
  const [toanManHinh, setToanManHinh] = useState(false)
  const [hfovHienTai, setHfovHienTai] = useState(110)
  const duongDanPanorama = useMemo(() => chonPanorama(), [])

  useEffect(() => {
    const tieuDeCu = document.title
    document.title = 'Toàn cảnh 360 | Chichén Itzá'

    return () => {
      document.title = tieuDeCu
    }
  }, [])

  useEffect(() => {
    const khungViewer = khungViewerRef.current
    if (!khungViewer || !coSanPannellum) return undefined

    let daHuy = false

    const viewer = window.pannellum.viewer(khungViewer, {
      type: 'equirectangular',
      panorama: duongDanPanorama,
      autoLoad: true,
      showControls: false,
      mouseZoom: true,
      draggable: true,
      keyboardZoom: false,
      compass: false,
      backgroundColor: [0.04, 0.03, 0.03],
      pitch: -2,
      yaw: -28,
      hfov: 110,
      minHfov: 55,
      maxHfov: 120,
      hotSpots: CAC_DIEM_CHU_GIAI,
      ...CAU_HINH_PANORAMA,
    })

    viewerRef.current = viewer

    const capNhatHfov = () => {
      if (!daHuy && viewerRef.current) {
        setHfovHienTai(viewerRef.current.getHfov())
      }
    }

    const xuLyTaiXong = () => {
      if (daHuy) return
      setDaTaiXong(true)
      capNhatHfov()
    }

    const xuLyResize = () => {
      viewer.resize()
      capNhatHfov()
    }

    const xuLyDongChuGiai = () => {
      dongTatCaChuGiai()
    }

    const xuLyToanManHinh = () => {
      setToanManHinh(Boolean(document.fullscreenElement))
      xuLyResize()
    }

    viewer.on('load', xuLyTaiXong)
    viewer.on('zoomchange', capNhatHfov)
    window.addEventListener('resize', xuLyResize)
    khungViewer.addEventListener('pointerdown', xuLyDongChuGiai)
    document.addEventListener('fullscreenchange', xuLyToanManHinh)

    return () => {
      daHuy = true
      window.removeEventListener('resize', xuLyResize)
      khungViewer.removeEventListener('pointerdown', xuLyDongChuGiai)
      document.removeEventListener('fullscreenchange', xuLyToanManHinh)
      viewer.destroy()
      viewerRef.current = null
    }
  }, [coSanPannellum, duongDanPanorama])

  const thayDoiMucPhong = (delta) => {
    const viewer = viewerRef.current
    if (!viewer) return
    const mucMoi = Math.max(55, Math.min(120, viewer.getHfov() + delta))
    viewer.setHfov(mucMoi, 250)
    setHfovHienTai(mucMoi)
  }

  const batTatToanManHinh = async () => {
    const khung = khungViewerRef.current?.parentElement
    if (!khung) return

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }

      await khung.requestFullscreen()
    } catch {
      return
    }
  }

  return (
    <div className="min-h-screen bg-[#0f0d0b] text-white">
      <div className="grid min-h-screen lg:grid-cols-[340px_minmax(0,1fr)]">
        <aside className="flex flex-col justify-between border-b border-white/10 bg-black/28 px-5 py-6 backdrop-blur-sm lg:border-b-0 lg:border-r lg:px-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                Toàn cảnh 360
              </p>
              <h1 className="font-display text-3xl leading-tight text-white">
                Quan sát Chichén Itzá bằng một panorama tư liệu tương tác
              </h1>
              <p className="text-sm leading-7 text-white/70">
                Kéo để xoay góc nhìn, dùng các nút bên dưới để phóng to, thu nhỏ hoặc mở toàn
                màn hình. Trải nghiệm này dùng ảnh panorama equirectangular, không dùng mô hình
                ba chiều.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                Điều khiển
              </p>
              <div className="flex flex-wrap gap-3">
                <NutDieuKhien
                  onClick={() => thayDoiMucPhong(-10)}
                  nhan="Phóng to"
                  ariaLabel="Phóng to toàn cảnh"
                  disabled={!daTaiXong || loiTai}
                />
                <NutDieuKhien
                  onClick={() => thayDoiMucPhong(10)}
                  nhan="Thu nhỏ"
                  ariaLabel="Thu nhỏ toàn cảnh"
                  disabled={!daTaiXong || loiTai}
                />
                <NutDieuKhien
                  onClick={batTatToanManHinh}
                  nhan={toanManHinh ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
                  ariaLabel={toanManHinh ? 'Thoát toàn màn hình' : 'Mở toàn màn hình'}
                  disabled={loiTai}
                />
              </div>
              <p className="text-sm leading-7 text-white/56">
                Mức nhìn hiện tại: {Math.round(hfovHienTai)}°
              </p>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-5">
            <p className="text-sm leading-7 text-white/56">
              Ảnh panorama tham chiếu từ Wikimedia Commons, tác giả Trldp, giấy phép CC BY-SA
              4.0. Dữ kiện khái quát của website tiếp tục tham chiếu từ UNESCO.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/"
                className="inline-flex items-center justify-center border border-white/18 px-4 py-3 text-sm font-medium text-white transition hover:border-white/36 hover:bg-white/10"
              >
                Quay lại trang chính
              </a>
              <a
                href="https://commons.wikimedia.org/wiki/File:Panorama_of_Chich%C3%A9n_Itza_with_Temple_of_Kukulc%C3%A1n.jpg"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-sm font-medium text-white/72 transition hover:border-white/30 hover:text-white"
              >
                Xem nguồn panorama
              </a>
            </div>
          </div>
        </aside>

        <main className="relative min-h-[70vh]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,0.16),rgba(9,8,7,0.28))]" />
          <div className="relative h-full min-h-[70vh] lg:min-h-screen">
            <div ref={khungViewerRef} className="h-full min-h-[70vh] lg:min-h-screen" />

            {!daTaiXong && !loiTai ? (
              <div className="pointer-events-none absolute inset-x-5 top-5 z-10 max-w-sm border border-white/10 bg-black/40 px-4 py-3 text-sm leading-7 text-white/78 backdrop-blur-sm">
                Đang tải toàn cảnh 360…
              </div>
            ) : null}

            {loiTai ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/72 px-6 text-center">
                <div className="max-w-md space-y-4">
                  <h2 className="font-display text-3xl text-white">Không thể mở toàn cảnh 360</h2>
                  <p className="text-sm leading-7 text-white/72">
                    Trình xem không khởi tạo được trên thiết bị hiện tại. Bạn có thể quay lại
                    trang chính và tiếp tục xem các ảnh tư liệu tĩnh.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-obsidian"
                  >
                    Quay lại trang chính
                  </a>
                </div>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,rgba(8,8,7,0),rgba(8,8,7,0.66))] px-5 py-5 lg:px-8">
              <div className="max-w-[42rem] space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  Góc nhìn toàn cảnh
                </p>
                <p className="text-sm leading-7 text-white/72">
                  Panorama ghi lại góc nhìn rộng của khu di tích, trong đó El Castillo nằm về
                  phía trái khung hình và Sân bóng lớn hiện ra ở phía xa bên phải.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
