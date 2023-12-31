/* eslint-disable react/prop-types */
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout'
import { useBooleanState } from 'hooks/useBooleanState'
import { Suspense, useRef } from 'react'
import { styled } from 'styled-components'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

// eslint-disable-next-line react/prop-types
const ChristmasTreeModel = () => {
  const fbx = useLoader(FBXLoader, 'christmas_tree_02.fbx')
  const ref = useRef()

  return <primitive object={fbx} ref={ref} castShadow receiveShadow />
}

const GroupModel = ({ children, autoRotate, cameraRef }) => {
  const ref = useRef()

  useFrame(() => {
    if (ref.current && autoRotate) {
      ref.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={ref} position={[0, -200, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[0, 0, 0]}
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
      <ChristmasTreeModel />
      {children}
    </group>
  )
}

export const CustomTest = ({ children }) => {
  const { state: autoRotate, toggleState: toggleAutoRotate } = useBooleanState(true)
  const cameraRef = useRef(null)
  const orbitRef = useRef(null)

  return (
    <Root>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [500, 0, -50], fov: 125 }}
        style={{ background: '#eee', height: CANVAS_HEIGHT - 150, width: CANVAS_WIDTH }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight
          castShadow
          position={[0, 0, 0]}
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
        <spotLight intensity={1} angle={0.1} penumbra={1} position={[0, 0, 0]} castShadow />
        <Suspense fallback={null}>
          <GroupModel autoRotate={autoRotate}>{children}</GroupModel>
          <ContactShadows position={[0, -0.8, 0]} opacity={0.1} width={10} height={10} blur={1.5} far={0.8} />
        </Suspense>
        <OrbitControls ref={orbitRef} camera={cameraRef.current} enableZoom={false} target={[0, 0, 0]} />
      </Canvas>
      <AutoRotateContainer onClick={toggleAutoRotate}>
        <AutoRotateCheckbox type={'checkbox'} checked={autoRotate} />
        <AutoRotateTypo>자동 회전</AutoRotateTypo>
      </AutoRotateContainer>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AutoRotateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`
const AutoRotateCheckbox = styled.input``
const AutoRotateTypo = styled.span``
