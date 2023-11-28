/* eslint-disable react/prop-types */
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// eslint-disable-next-line react/prop-types
function FBXModel({ url }) {
  const fbx = useLoader(FBXLoader, url)
  // const fbx = useLoader(FBXLoader, url)
  const ref = useRef()

  // 간단한 애니메이션을 적용할 수 있습니다.
  useFrame(() => {
    ref.current.rotation.y += 0.005
  })

  return <primitive object={fbx} ref={ref} />
}

export const ThreeTest = ({ position = [200, 200, 0], fov = 150, url = 'christmas_tree_01.fbx' }) => {
  return (
    <Canvas camera={{ position, fov }} style={{ height: '800px', width: '800px' }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="city" />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -0.8, 0]}
          opacity={0.25}
          width={10}
          height={10}
          blur={1.5}
          far={0.8}
        />
        <FBXModel url={url} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
