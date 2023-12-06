/* eslint-disable react/prop-types */
import { OrbitControls } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

function STLModel({ url }) {
  const meshRef = useRef()
  const geometry = useLoader(STLLoader, url)

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshStandardMaterial color={'red'} />
    </mesh>
  )
}

export const RenderingTest = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Suspense fallback={null}>
        <STLModel url="test1.stl" />
        <STLModel url="test2.stl" />
        <STLModel url="test3.stl" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}
