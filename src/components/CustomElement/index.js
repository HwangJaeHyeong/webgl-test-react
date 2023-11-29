/* eslint-disable react/prop-types */
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import { FontLoader } from 'thirdparty/FontLoader'
import { MeshBasicMaterial } from 'three'

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

export const CustomElement = ({ color, position, scale, fbxUrl, label, direction = 'RESET' }) => {
  const fbx = useLoader(FBXLoader, fbxUrl)
  const font = useLoader(FontLoader, 'font.json')
  const BasicMaterial = new MeshBasicMaterial({ color })

  const model = useMemo(() => fbx.clone(true), [])
  model.children.forEach((mesh, i) => {
    mesh.material = BasicMaterial
  })

  const washedPositionMargin = (() => {
    if (direction === 'SAMPLE') {
      return [30, 30, 0]
    }
    if (direction === 'RESET') {
      return POSITION_MARGIN['RESET']
    }
    if (direction === 'LEFT') {
      return POSITION_MARGIN['LEFT']
    }
    if (direction === 'RIGHT') {
      return POSITION_MARGIN['RIGHT']
    }
    return POSITION_MARGIN['OPPOSITE']
  })()

  const washedPositionRotate = (() => {
    if (direction === 'SAMPLE') {
      return POSITION_ROTATE['RESET']
    }
    if (direction === 'RESET') {
      return POSITION_ROTATE['RESET']
    }
    if (direction === 'LEFT') {
      return POSITION_ROTATE['LEFT']
    }
    if (direction === 'RIGHT') {
      return POSITION_ROTATE['RIGHT']
    }
    return POSITION_ROTATE['OPPOSITE']
  })()

  return (
    <>
      <primitive object={model} position={position} scale={scale} />
      <Text
        font={font}
        scale={[200, 200, 200]}
        color="#111"
        anchorX="center"
        anchorY="bottom"
        position={[
          position[0] + washedPositionMargin[0],
          position[1] + washedPositionMargin[1],
          position[2] - washedPositionMargin[2],
        ]}
        rotation={washedPositionRotate}
      >
        {label}
      </Text>
    </>
  )
}
