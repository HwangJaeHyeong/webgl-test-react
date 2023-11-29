/* eslint-disable react/prop-types */
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// eslint-disable-next-line react/prop-types
function FBXModel({ url }) {
  const fbx = useLoader(FBXLoader, url)
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.005
  })

  return <primitive object={fbx} ref={ref} castShadow receiveShadow />
}

export const CustomTest = ({ position = [700, 300, -145], fov = 125, url = 'christmas_tree_02.fbx' }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position, fov }}
      style={{ background: '#ddd', height: '1000px', width: '800px' }}
    >
      <ambientLight intensity={1} />
      <directionalLight
        castShadow
        position={[200, 300, 200]}
        intensity={0.8}
        shadow-mapSize-width={2048}
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
        <ContactShadows position={[0, -0.8, 0]} opacity={0.1} width={10} height={10} blur={1.5} far={0.8} />
        <FBXModel url={url} />
      </Suspense>
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}
