/* eslint-disable react/prop-types */
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import { useMemo } from 'react'
import { MeshBasicMaterial } from 'three'

export const CustomElement = ({ color, position, scale, fbxUrl }) => {
  const fbx = useLoader(FBXLoader, fbxUrl)
  const BasicMaterial = new MeshBasicMaterial({ color })

  const model = useMemo(() => fbx.clone(true), [])
  model.children.forEach((mesh, i) => {
    mesh.material = BasicMaterial
  })

  return <primitive object={model} position={position} scale={scale} />
}
