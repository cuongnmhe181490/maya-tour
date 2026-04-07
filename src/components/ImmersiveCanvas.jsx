import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import dustOverlay from '../assets/textures/dust-overlay.svg'

function tinhCauHinhDoHoa() {
  if (typeof window === 'undefined') {
    return { coTheDung3D: false, dpr: 1 }
  }

  const giamChuyenDong = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const luuDuLieu = navigator.connection?.saveData === true

  if (giamChuyenDong || luuDuLieu) {
    return { coTheDung3D: false, dpr: 1 }
  }

  const soNhan = navigator.hardwareConcurrency ?? 6
  const boNho = navigator.deviceMemory ?? 8
  const khung = document.createElement('canvas')
  const webgl =
    khung.getContext('webgl2') ||
    khung.getContext('webgl') ||
    khung.getContext('experimental-webgl')

  if (!webgl || soNhan <= 4 || boNho <= 4) {
    return { coTheDung3D: false, dpr: 1 }
  }

  const dprThietBi = window.devicePixelRatio || 1
  const dpr = boNho <= 6 ? Math.min(dprThietBi, 1.15) : Math.min(dprThietBi, 1.3)

  return { coTheDung3D: true, dpr }
}

function HatBui({ dangHoatDong }) {
  const thamChieu = useRef(null)
  const duLieu = useMemo(() => {
    const soHat = 72
    const viTri = new Float32Array(soHat * 3)
    let hatGiong = 37

    const giaNgauNhien = () => {
      hatGiong = (hatGiong * 1664525 + 1013904223) % 4294967296
      return hatGiong / 4294967296
    }

    for (let i = 0; i < soHat; i += 1) {
      viTri[i * 3] = (giaNgauNhien() - 0.5) * 28
      viTri[i * 3 + 1] = giaNgauNhien() * 6 + 0.3
      viTri[i * 3 + 2] = (giaNgauNhien() - 0.5) * 22
    }

    return viTri
  }, [])

  useFrame((trangThai) => {
    if (!dangHoatDong || !thamChieu.current) return
    thamChieu.current.rotation.y = trangThai.clock.elapsedTime * 0.008
  })

  return (
    <points ref={thamChieu}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={duLieu}
          count={duLieu.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e5d1a4"
        size={0.06}
        transparent
        opacity={0.2}
        depthWrite={false}
      />
    </points>
  )
}

function ThapElCastillo() {
  return (
    <group position={[0, 0, 0]}>
      {[0, 1, 2, 3, 4, 5].map((bac) => (
        <mesh
          key={bac}
          castShadow
          receiveShadow
          position={[0, 0.35 * bac + 0.18, 0]}
        >
          <boxGeometry args={[7 - bac * 0.9, 0.36, 7 - bac * 0.9]} />
          <meshStandardMaterial
            color={bac % 2 === 0 ? '#a9906f' : '#8c755b'}
            roughness={0.95}
            metalness={0.03}
          />
        </mesh>
      ))}

      <mesh castShadow receiveShadow position={[0, 2.5, 0]}>
        <boxGeometry args={[1.4, 1, 1.4]} />
        <meshStandardMaterial color="#7a624a" roughness={0.98} metalness={0.02} />
      </mesh>

      <mesh receiveShadow position={[0, 0.3, 4.05]}>
        <boxGeometry args={[1.2, 0.12, 1.4]} />
        <meshStandardMaterial color="#9e8666" roughness={0.96} />
      </mesh>

      {[0, 1, 2, 3, 4].map((bac) => (
        <mesh
          key={`thang-${bac}`}
          receiveShadow
          castShadow
          position={[0, 0.24 + bac * 0.35, 3.5 - bac * 0.48]}
        >
          <boxGeometry args={[1.05, 0.08, 0.7]} />
          <meshStandardMaterial color="#b59d7a" roughness={0.92} />
        </mesh>
      ))}
    </group>
  )
}

function MatDat() {
  return (
    <group>
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#4a3f34" roughness={1} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <ringGeometry args={[6.5, 18, 48]} />
        <meshStandardMaterial
          color="#756246"
          roughness={1}
          transparent
          opacity={0.24}
        />
      </mesh>
    </group>
  )
}

function ChuyenDongMayQuay({ dangHoatDong }) {
  useFrame((trangThai) => {
    if (!dangHoatDong) return

    const t = trangThai.clock.elapsedTime * 0.08
    const camera = trangThai.camera

    camera.position.x = Math.sin(t) * 1.1 + 5.7
    camera.position.z = Math.cos(t * 0.7) * 1 + 8
    camera.position.y = 3.35 + Math.sin(t * 0.4) * 0.1
    camera.lookAt(0, 1.6, 0)
  })

  return null
}

function Canh({ dangHoatDong }) {
  return (
    <>
      <color attach="background" args={['#100d0b']} />
      <fog attach="fog" args={['#100d0b', 7, 24]} />
      <ambientLight intensity={0.26} color="#d7c29b" />
      <directionalLight
        castShadow
        color="#f3d388"
        intensity={2.2}
        position={[10, 8, 4]}
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
        shadow-camera-near={0.5}
        shadow-camera-far={32}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
      />
      <directionalLight color="#4d695f" intensity={0.3} position={[-6, 3, -8]} />
      <MatDat />
      <ThapElCastillo />
      <HatBui dangHoatDong={dangHoatDong} />
      <ChuyenDongMayQuay dangHoatDong={dangHoatDong} />
    </>
  )
}

function KhungTinh({ className = '' }) {
  return (
    <div
      className={`relative overflow-hidden bg-[radial-gradient(circle_at_58%_32%,rgba(243,211,136,0.18),transparent_18%),linear-gradient(180deg,rgba(18,15,13,0.22),rgba(18,15,13,0.74)),linear-gradient(135deg,#3e342a,#191411_55%,#0f0d0b)] ${className}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35 mix-blend-screen"
        style={{ backgroundImage: `url(${dustOverlay})` }}
      />
      <div className="absolute inset-x-[17%] bottom-[11%] top-[17%] rounded-t-[1.7rem] border border-[#d8b66a]/18 bg-[linear-gradient(180deg,#cfb179_0%,#887257_26%,#3a2a21_64%,#120f0d_100%)] [clip-path:polygon(50%_0,100%_22%,82%_22%,86%_36%,72%_36%,76%_50%,62%_50%,66%_64%,52%_64%,56%_78%,0_78%,50%_100%,100%_78%,44%_78%,48%_64%,34%_64%,38%_50%,24%_50%,28%_36%,14%_36%,18%_22%,0_22%)] shadow-[0_45px_120px_rgba(0,0,0,0.45)]" />
      <div className="absolute inset-x-[9%] bottom-[9%] h-[25%] rounded-[999px] bg-[radial-gradient(circle,rgba(217,180,74,0.18),rgba(20,17,15,0)_70%)] blur-3xl" />
      <div className="absolute left-[9%] top-[10%] h-[1px] w-[34%] bg-gold-sun/35" />
      <div className="absolute right-[11%] top-[18%] h-[1px] w-[20%] bg-parchment/16" />
    </div>
  )
}

export function ImmersiveCanvas({ className = '' }) {
  const [cauHinhDoHoa] = useState(() => tinhCauHinhDoHoa())
  const [dangTrongTamNhin, setDangTrongTamNhin] = useState(false)
  const [tabDangMo, setTabDangMo] = useState(
    () => typeof document === 'undefined' || document.visibilityState === 'visible',
  )
  const khungRef = useRef(null)

  useEffect(() => {
    if (!khungRef.current || !cauHinhDoHoa.coTheDung3D) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setDangTrongTamNhin(entry.isIntersecting)
      },
      { threshold: 0.35 },
    )

    observer.observe(khungRef.current)

    return () => observer.disconnect()
  }, [cauHinhDoHoa.coTheDung3D])

  useEffect(() => {
    const capNhatTrangThai = () => {
      setTabDangMo(document.visibilityState === 'visible')
    }

    document.addEventListener('visibilitychange', capNhatTrangThai)

    return () => {
      document.removeEventListener('visibilitychange', capNhatTrangThai)
    }
  }, [])

  if (!cauHinhDoHoa.coTheDung3D) {
    return <KhungTinh className={className} />
  }

  const dangHoatDong = dangTrongTamNhin && tabDangMo

  return (
    <div
      ref={khungRef}
      className={`relative overflow-hidden ${className}`}
      data-trang-thai-render={dangHoatDong ? 'dong' : 'tinh'}
    >
      <KhungTinh className="absolute inset-0 opacity-30" />
      <Suspense fallback={<KhungTinh className="absolute inset-0" />}>
        <Canvas
          frameloop={dangHoatDong ? 'always' : 'demand'}
          shadows="basic"
          dpr={cauHinhDoHoa.dpr}
          camera={{ position: [5.7, 3.35, 8], fov: 34 }}
          gl={{
            antialias: cauHinhDoHoa.dpr > 1.1,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          performance={{ min: 0.75 }}
        >
          <Canh dangHoatDong={dangHoatDong} />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(243,231,208,0.12),transparent_16%),linear-gradient(180deg,rgba(18,15,13,0),rgba(18,15,13,0.44)_70%,rgba(18,15,13,0.78))]" />
    </div>
  )
}
