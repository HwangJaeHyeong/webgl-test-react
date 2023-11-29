import { CustomElement } from 'components/CustomElement'
import { CustomTest } from 'components/CustomTest'
import { FC, useState } from 'react'
import { CanvasViewerContainer, Container, Root } from './styled'

type CustomPageProps = {
  className?: string
}

export const CustomPage: FC<CustomPageProps> = ({ className }) => {
  const [position, setPosition] = useState<[number, number, number]>([240, 300, -125])

  return (
    <Root className={className}>
      <Container>
        <CanvasViewerContainer>
          <CustomTest>
            <CustomElement fbxUrl={'bell.fbx'} color={'#3ad2c4'} position={[240, 300, -125]} scale={[1, 1, 1]} />
            <CustomElement fbxUrl={'bell_02.fbx'} color={'yellow'} position={position} scale={[0.1, 0.1, 0.1]} />
          </CustomTest>
        </CanvasViewerContainer>
      </Container>
    </Root>
  )
}
