/* eslint-disable react/prop-types */
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { Text } from '@react-three/drei'
import { useMemo } from 'react'
import { FontLoader } from 'thirdparty/FontLoader'
import { MeshBasicMaterial } from 'three'

export const CustomElement = ({ color, position, scale, fbxUrl }) => {
  const fbx = useLoader(FBXLoader, fbxUrl)
  const BasicMaterial = new MeshBasicMaterial({ color })
  const font = useLoader(FontLoader, 'font.json')

  const model = useMemo(() => fbx.clone(true), [])
  model.children.forEach((mesh, i) => {
    mesh.material = BasicMaterial
  })

  return (
    <>
      <primitive object={model} position={position} scale={scale} />
      <Text
        font={font}
        scale={[200, 200, 200]}
        color="black" // default
        anchorX="center" // default
        anchorY="bottom" // default
        position={[position[0] + 50, position[1] + 50, position[2] - 10]}
        rotation={[739.87, -100, 359.76]}
      >
        ready
      </Text>
    </>
  )
}
