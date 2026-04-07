import { Suspense, useEffect, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import dustOverlay from '../assets/textures/dust-overlay.svg'

function kiemTraDoHoa() {
  if (typeof window === 'undefined') return false

  const giamChuyenDong = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (giamChuyenDong) return false

  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return false
  if ('deviceMemory' in navigator && navigator.deviceMemory <= 4) return false

  const khung = document.createElement('canvas')
  const webgl =
    khung.getContext('webgl') ||
    khung.getContext('experimental-webgl') ||
    khung.getContext('webgl2')

  return Boolean(webgl)
}

function HatBui() {
  const duLieu = useMemo(() => {
    const soHat = 120
    const viTri = new Float32Array(soHat * 3)
    let hatGiong = 37

    const giaNgauNhien = () => {
      hatGiong = (hatGiong * 1664525 + 1013904223) % 4294967296
      return hatGiong / 4294967296
    }

    for (let i = 0; i < soHat; i += 1) {
      viTri[i * 3] = (giaNgauNhien() - 0.5) * 30
      viTri[i * 3 + 1] = giaNgauNhien() * 7 + 0.2
      viTri[i * 3 + 2] = (giaNgauNhien() - 0.5) * 24
    }

    return viTri
  }, [])

  const diem = useMemo(() => new THREE.PointsMaterial({
    color: '#e5d1a4',
    size: 0.07,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  }), [])

  useEffect(() => () => diem.dispose(), [diem])

  useFrame((trangThai) => {
    const tam = trangThai.scene.getObjectByName('hat-bui')
    if (!tam) return
    tam.rotation.y = trangThai.clock.elapsedTime * 0.01
  })

  return (
    <points name="hat-bui" material={diem}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={duLieu}
          count={duLieu.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
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
        <planeGeometry args={[52, 52]} />
        <meshStandardMaterial color="#4a3f34" roughness={1} />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.01, 0]}
        receiveShadow
      >
        <ringGeometry args={[6.5, 18, 80]} />
        <meshStandardMaterial
          color="#756246"
          roughness={1}
          transparent
          opacity={0.26}
        />
      </mesh>
    </group>
  )
}

function ChuyenDongMayQuay() {
  useFrame((trangThai) => {
    const t = trangThai.clock.elapsedTime * 0.08
    const camera = trangThai.camera

    camera.position.x = Math.sin(t) * 1.2 + 5.8
    camera.position.z = Math.cos(t * 0.7) * 1.1 + 8.2
    camera.position.y = 3.4 + Math.sin(t * 0.4) * 0.12
    camera.lookAt(0, 1.6, 0)
  })

  return null
}

function Canh() {
  return (
    <>
      <color attach="background" args={['#100d0b']} />
      <fog attach="fog" args={['#100d0b', 7, 28]} />
      <ambientLight intensity={0.28} color="#d7c29b" />
      <directionalLight
        castShadow
        color="#f3d388"
        intensity={2.4}
        position={[10, 8, 4]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <directionalLight color="#4d695f" intensity={0.35} position={[-6, 3, -8]} />
      <MatDat />
      <ThapElCastillo />
      <HatBui />
      <ChuyenDongMayQuay />
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
  const [coTheDung3D] = useState(() => kiemTraDoHoa())

  if (!coTheDung3D) {
    return <KhungTinh className={className} />
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <KhungTinh className="absolute inset-0 opacity-30" />
      <Suspense fallback={<KhungTinh className="absolute inset-0" />}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [5.8, 3.4, 8.2], fov: 34 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Canh />
        </Canvas>
      </Suspense>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(243,231,208,0.12),transparent_16%),linear-gradient(180deg,rgba(18,15,13,0),rgba(18,15,13,0.44)_70%,rgba(18,15,13,0.78))]" />
    </div>
  )
}
