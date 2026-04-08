import { useEffect, useMemo, useRef, useState } from 'react'
import 'pannellum/build/pannellum.css'
import 'pannellum/build/pannellum.js'
import './trang-toan-canh-360.css'
import elCastilloDesktop from '../assets/panorama-tour/scene-el-castillo-desktop.jpg'
import elCastilloMobile from '../assets/panorama-tour/scene-el-castillo-mobile.jpg'
import sanBongDesktop from '../assets/panorama-tour/scene-san-bong-desktop.jpg'
import sanBongMobile from '../assets/panorama-tour/scene-san-bong-mobile.jpg'

const THIET_BI_DI_DONG = 768

const BO_CANH = {
  'el-castillo': {
    id: 'el-castillo',
    nhan: 'Điểm đứng 01',
    tieuDe: 'Quảng trường El Castillo',
    moTa:
      'Góc nhìn rộng về quảng trường trung tâm, nơi El Castillo giữ vai trò mốc thị giác chủ đạo của toàn khu di tích.',
    thongTinNguon:
      'Panorama tư liệu từ Wikimedia Commons, tác giả Trldp, giấy phép CC BY-SA 4.0.',
    lienKetNguon:
      'https://commons.wikimedia.org/wiki/File:Panorama_of_Chich%C3%A9n_Itza_with_Temple_of_Kukulc%C3%A1n.jpg',
    panorama: {
      desktop: elCastilloDesktop,
      mobile: elCastilloMobile,
    },
    cauHinh: {
      pitch: -2,
      yaw: -28,
      hfov: 116,
      minPitch: -14,
      maxPitch: 13,
      haov: 313.71,
      vaov: 57.95,
      vOffset: 0,
    },
  },
  'san-bong-lon': {
    id: 'san-bong-lon',
    nhan: 'Điểm đứng 02',
    tieuDe: 'Trục nhìn Sân bóng lớn',
    moTa:
      'Điểm đứng này đưa người xem tiến gần hơn vào trục không gian dài của Sân bóng lớn, nơi tỷ lệ và chiều sâu trở nên rõ ràng hơn.',
    thongTinNguon:
      'Panorama tư liệu từ Wikimedia Commons, tác giả Bernard Gagnon, giấy phép CC BY-SA 4.0.',
    lienKetNguon:
      'https://commons.wikimedia.org/wiki/File:Panorama_of_Great_Ball_Court_-_Chichen_Itza_Archaeological_Site_-_Yucatan_-_Mexico.jpg',
    panorama: {
      desktop: sanBongDesktop,
      mobile: sanBongMobile,
    },
    cauHinh: {
      pitch: -1.5,
      yaw: 12,
      hfov: 115,
      minPitch: -13,
      maxPitch: 12,
      haov: 318,
      vaov: 59.5,
      vOffset: 0,
    },
  },
}

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

function taoHotspotDieuHuong(khungHotspot, duLieu) {
  const khung = document.createElement('span')
  khung.className = `diem-dieu-huong diem-dieu-huong--${duLieu.huong}`
  khung.setAttribute('aria-hidden', 'true')

  const muiTen = document.createElement('span')
  muiTen.className = 'diem-dieu-huong__mui-ten'

  const nhan = document.createElement('span')
  nhan.className = 'diem-dieu-huong__nhan'
  nhan.textContent = duLieu.nhan

  khung.append(muiTen, nhan)
  khungHotspot.append(khung)
}

function chonPanorama(boPanorama) {
  if (typeof window === 'undefined') {
    return boPanorama.desktop
  }

  return window.innerWidth <= THIET_BI_DI_DONG ? boPanorama.mobile : boPanorama.desktop
}

function taoHotspotChoCanh(idCanh) {
  if (idCanh === 'el-castillo') {
    return [
      {
        pitch: -0.8,
        yaw: -47,
        cssClass: 'diem-chu-giai-pannellum',
        createTooltipFunc: taoChuGiaiHotspot,
        createTooltipArgs: {
          tieuDe: 'Kim tự tháp El Castillo',
          noiDung:
            'Khối đền bậc thang này chi phối gần như toàn bộ trục nhìn của quảng trường trung tâm.',
          nhanNut: 'Mở chú giải về El Castillo',
        },
      },
      {
        type: 'scene',
        pitch: -5,
        yaw: 34,
        sceneId: 'san-bong-lon',
        targetPitch: -1.5,
        targetYaw: 12,
        targetHfov: 115,
        cssClass: 'diem-dieu-huong-pannellum',
        createTooltipFunc: taoHotspotDieuHuong,
        createTooltipArgs: {
          nhan: 'Tiến lên',
          huong: 'tien',
        },
      },
    ]
  }

  return [
    {
      pitch: -3.8,
      yaw: 8,
      cssClass: 'diem-chu-giai-pannellum',
      createTooltipFunc: taoChuGiaiHotspot,
      createTooltipArgs: {
        tieuDe: 'Không gian nghi lễ',
        noiDung:
          'Khoảng sân dài cùng hai bức tường đá giúp người xem cảm nhận rõ tỷ lệ của khu nghi lễ công cộng.',
        nhanNut: 'Mở chú giải về Sân bóng lớn',
      },
    },
    {
      type: 'scene',
      pitch: -4.2,
      yaw: -48,
      sceneId: 'el-castillo',
      targetPitch: -2,
      targetYaw: -28,
      targetHfov: 116,
      cssClass: 'diem-dieu-huong-pannellum',
      createTooltipFunc: taoHotspotDieuHuong,
      createTooltipArgs: {
        nhan: 'Lùi lại',
        huong: 'lui',
      },
    },
  ]
}

function taoCauHinhTour() {
  return Object.fromEntries(
    Object.values(BO_CANH).map((canh) => [
      canh.id,
      {
        type: 'equirectangular',
        panorama: chonPanorama(canh.panorama),
        hotSpots: taoHotspotChoCanh(canh.id),
        ...canh.cauHinh,
      },
    ]),
  )
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

function NutCanh({ dangChon, nhan, tieuDe, moTa, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full border px-4 py-4 text-left transition ${
        dangChon
          ? 'border-[#d5b77a]/60 bg-white/10 text-white'
          : 'border-white/10 bg-black/18 text-white/78 hover:border-white/24 hover:bg-white/8'
      }`}
      aria-label={`Chuyển tới ${tieuDe}`}
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/42">{nhan}</p>
      <p className="mt-2 font-display text-xl leading-tight text-white">{tieuDe}</p>
      <p className="mt-2 text-sm leading-7 text-white/62">{moTa}</p>
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
  const [hfovHienTai, setHfovHienTai] = useState(116)
  const [idCanhHienTai, setIdCanhHienTai] = useState('el-castillo')
  const cauHinhTour = useMemo(() => taoCauHinhTour(), [])
  const canhHienTai = BO_CANH[idCanhHienTai] ?? BO_CANH['el-castillo']

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
      default: {
        firstScene: 'el-castillo',
        autoLoad: true,
        showControls: false,
        mouseZoom: true,
        draggable: true,
        keyboardZoom: false,
        compass: false,
        sceneFadeDuration: 600,
        backgroundColor: [0.04, 0.03, 0.03],
        minHfov: 55,
        maxHfov: 118,
      },
      scenes: cauHinhTour,
    })

    viewerRef.current = viewer

    const capNhatTrangThaiKhungNhin = () => {
      if (!daHuy && viewerRef.current) {
        setHfovHienTai(viewerRef.current.getHfov())
      }
    }

    const xuLyTaiXong = () => {
      if (daHuy || !viewerRef.current) return
      setDaTaiXong(true)
      setIdCanhHienTai(viewerRef.current.getScene())
      capNhatTrangThaiKhungNhin()
    }

    const xuLyChuyenCanh = (idCanh) => {
      if (daHuy) return
      setDaTaiXong(false)
      setIdCanhHienTai(idCanh)
      dongTatCaChuGiai()
    }

    const xuLyResize = () => {
      viewer.resize()
      capNhatTrangThaiKhungNhin()
    }

    const xuLyDongChuGiai = () => {
      dongTatCaChuGiai()
    }

    const xuLyToanManHinh = () => {
      setToanManHinh(Boolean(document.fullscreenElement))
      xuLyResize()
    }

    viewer.on('load', xuLyTaiXong)
    viewer.on('zoomchange', capNhatTrangThaiKhungNhin)
    viewer.on('scenechange', xuLyChuyenCanh)
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
  }, [coSanPannellum, cauHinhTour])

  const thayDoiMucPhong = (delta) => {
    const viewer = viewerRef.current
    if (!viewer) return
    const mucMoi = Math.max(55, Math.min(118, viewer.getHfov() + delta))
    viewer.setHfov(mucMoi, 250)
    setHfovHienTai(mucMoi)
  }

  const chuyenCanh = (idCanh) => {
    const viewer = viewerRef.current
    if (!viewer || idCanh === viewer.getScene()) return

    const canh = BO_CANH[idCanh]
    viewer.loadScene(idCanh, canh.cauHinh.pitch, canh.cauHinh.yaw, canh.cauHinh.hfov)
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
      <div className="grid min-h-screen lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="flex flex-col justify-between border-b border-white/10 bg-black/32 px-5 py-6 backdrop-blur-sm lg:border-b-0 lg:border-r lg:px-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                Toàn cảnh 360
              </p>
              <h1 className="font-display text-3xl leading-tight text-white">
                Tuyến tham quan panorama tư liệu Chichén Itzá
              </h1>
              <p className="text-sm leading-7 text-white/70">
                Route này dùng các panorama tư liệu thật và liên kết chúng thành một tour nhiều điểm
                đứng. Kéo để xoay góc nhìn, chạm các dấu chú giải để đọc thuyết minh và dùng các
                điểm điều hướng để tiến sâu hơn vào khu di tích.
              </p>
            </div>

            <div className="space-y-3 border-t border-white/10 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                Điểm đứng
              </p>
              <div className="space-y-3">
                {Object.values(BO_CANH).map((canh) => (
                  <NutCanh
                    key={canh.id}
                    dangChon={canh.id === idCanhHienTai}
                    nhan={canh.nhan}
                    tieuDe={canh.tieuDe}
                    moTa={canh.moTa}
                    onClick={() => chuyenCanh(canh.id)}
                  />
                ))}
              </div>
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
                Góc nhìn hiện tại: {Math.round(hfovHienTai)}°
              </p>
              <p className="text-sm leading-7 text-white/46">
                Có thể xoay quan sát toàn cảnh 360°.
              </p>
            </div>
          </div>

          <div className="space-y-4 border-t border-white/10 pt-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/48">
                Cảnh đang xem
              </p>
              <p className="font-display text-2xl text-white">{canhHienTai.tieuDe}</p>
              <p className="text-sm leading-7 text-white/62">{canhHienTai.thongTinNguon}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="/"
                className="inline-flex items-center justify-center border border-white/18 px-4 py-3 text-sm font-medium text-white transition hover:border-white/36 hover:bg-white/10"
              >
                Quay lại trang chính
              </a>
              <a
                href={canhHienTai.lienKetNguon}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center border border-white/10 px-4 py-3 text-sm font-medium text-white/72 transition hover:border-white/30 hover:text-white"
              >
                Xem nguồn cảnh hiện tại
              </a>
            </div>
          </div>
        </aside>

        <main className="relative min-h-[70vh]">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,8,7,0.18),rgba(9,8,7,0.32))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-[linear-gradient(180deg,rgba(8,8,7,0.68),rgba(8,8,7,0))]" />
          <div className="relative h-full min-h-[70vh] lg:min-h-screen">
            <div ref={khungViewerRef} className="h-full min-h-[70vh] lg:min-h-screen" />

            {!daTaiXong && !loiTai ? (
              <div className="pointer-events-none absolute inset-x-5 top-5 z-20 max-w-sm border border-white/10 bg-black/40 px-4 py-3 text-sm leading-7 text-white/78 backdrop-blur-sm">
                Đang tải cảnh panorama…
              </div>
            ) : null}

            {loiTai ? (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/72 px-6 text-center">
                <div className="max-w-md space-y-4">
                  <h2 className="font-display text-3xl text-white">Không thể mở tuyến tham quan</h2>
                  <p className="text-sm leading-7 text-white/72">
                    Trình xem panorama không khởi tạo được trên thiết bị hiện tại. Bạn có thể quay
                    lại trang chính để tiếp tục xem các ảnh tư liệu tĩnh của Chichén Itzá.
                  </p>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-[#14110f]"
                  >
                    Quay lại trang chính
                  </a>
                </div>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-[linear-gradient(180deg,rgba(8,8,7,0),rgba(8,8,7,0.74))] px-5 py-5 lg:px-8">
              <div className="max-w-[42rem] space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/52">
                  {canhHienTai.nhan}
                </p>
                <p className="font-display text-2xl leading-tight text-white">{canhHienTai.tieuDe}</p>
                <p className="text-sm leading-7 text-white/72">{canhHienTai.moTa}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
