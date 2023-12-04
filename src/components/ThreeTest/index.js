/* eslint-disable react/prop-types */
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { MeshBasicMaterial } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

const POSITION_MARGIN = {
  RESET: [50, 50, -10],
  LEFT: [50, 50, -10],
  RIGHT: [-50, 50, -10],
  OPPOSITE: [-50, 50, -10],
}

const POSITION_ROTATE = {
  RESET: [739.87, -100, 359.76],
  LEFT: [720.87, -50, 120.76],
  RIGHT: [-5, 300, -10.76],
  OPPOSITE: [1.5, 10, 359.76],
}

const INTERVAL = 1000

const COLORS = ['#FF6668', '#3ad2c4', '#4036ED', '#FFC9C9', '#9596FF', '#4036ED', '#3ad2c4', '#3A22D4', '#16226B']
// eslint-disable-next-line react/prop-types
function FBXModel({ url, color, interval }) {
  const fbx = useLoader(FBXLoader, url)
  const fbx2 = useLoader(FBXLoader, 'bell_02.fbx')
  const BasicMaterial = new MeshBasicMaterial({ color })
  const ref = useRef()

  const clonedFbx = useMemo(() => fbx.clone(true), [fbx])
  const clonedFbx2 = useMemo(() => fbx2.clone(true), [fbx2])
  clonedFbx2.children.forEach((mesh, i) => {
    mesh.material = BasicMaterial
  })

  console.log({ color })

  return (
    <>
      <primitive object={clonedFbx} ref={ref} color={color} castShadow receiveShadow />
      <primitive
        object={clonedFbx2}
        position={[50, 50, -10]}
        scale={[0.1, 0.1, 0.1]}
        color={color}
        castShadow
        receiveShadow
      />
    </>
  )
}

export const ThreeTest = ({ position = [200, 200, 0], fov = 150, url = 'christmas_tree_01.fbx' }) => {
  const [step, setStep] = useState(0)
  const [cameraTarget, setCameraTarget] = useState([0, 0, 0])
  const orbitRef = useRef()
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)

  const onClickTarget =
    (type, value = 10) =>
    () => {
      if (type === 'x') {
        setCameraTarget((prev) => [value, prev[1], prev[2]])
        return
      }
      if (type === 'y') {
        setCameraTarget((prev) => [prev[0], value, prev[2]])
        return
      }
      if (type === 'z') {
        setCameraTarget((prev) => [prev[0], prev[1], value])
        return
      }
    }

  const onClick = () => {
    if (orbitRef.current) {
      // orbitRef.current.position.set(700, 180, -48) // 초기 타겟 위치 설정
      // orbitRef.current.rotation.set(-1.65, 1.3, 1.65) // 초기 타겟 위치 설정
      // orbitRef.current.update() // OrbitControls 업데이트
      setCameraTarget([+a, +b, +c])
    }
  }
  const onClick2 = () => {
    const camera = orbitRef.current.object
    const { x, y, z } = camera.position
    const { x: rx, y: ry, z: rz } = camera.rotation
    const { x: tx, y: ty, z: tz } = orbitRef.current.target
    console.log({
      position: [Math.floor(x), Math.floor(y), Math.floor(z)],
      rotation: [rx, ry, rz],
      target: [tx, ty, tz],
    })
  }

  const onClick3 = () => {
    setStep((prev) => prev - 1)
  }
  const onClick4 = () => {
    setStep((prev) => prev + 1)
  }

  useEffect(() => {
    if (orbitRef.current) {
      orbitRef.current.target.set(...cameraTarget)
      orbitRef.current.update()
    }
  }, [cameraTarget, setCameraTarget])

  return (
    <div>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [500, 0, 0], fov, target: cameraTarget }}
        style={{ background: '#ddd', height: '800px', width: '800px' }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          castShadow
          position={[200, 300, 200]} // 조명의 위치를 Y축으로 높게 설정
          intensity={0.8}
          shadow-mapSize-width={2048} // 그림자의 해상도를 높여 더 선명하게 만듭니다.
          shadow-mapSize-height={2048}
          shadow-camera-near={0.5}
          shadow-camera-far={500}
          shadow-camera-left={-200}
          shadow-camera-right={200}
          shadow-camera-top={200}
          shadow-camera-bottom={-200}
        />
        <spotLight intensity={1} angle={0.1} penumbra={1} position={[200, 200, 0]} castShadow />
        <Suspense fallback={null}>
          <Environment preset="city" />
          {[...Array(5)].map((value, index) => (
            <group position={[0, 0, -1 * (index - step) * INTERVAL]} key={index}>
              <ContactShadows position={[0, -0.8, 0]} opacity={0.1} width={10} height={10} blur={1.5} far={0.8} />
              <FBXModel url={url} color={COLORS[index]} interval={(index - step) * INTERVAL} />
            </group>
          ))}
        </Suspense>
        <OrbitControls enableZoom={false} ref={orbitRef} />
      </Canvas>
      <button onClick={onClick}>버튼</button>

      <button onClick={onClick3}>버튼</button>
      <button onClick={onClick4}>버튼</button>
    </div>
  )
}
