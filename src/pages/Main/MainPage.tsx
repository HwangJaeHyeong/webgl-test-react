import { ThreeTest } from 'components/ThreeTest'
import { FC } from 'react'
import { Container, Root } from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Container>
        <ThreeTest position={[300, 150, -100]} url={'christmas_tree_01.fbx'} />
        <ThreeTest position={[700, 300, -150]} fov={130} url={'christmas_tree_02.fbx'} />
      </Container>
    </Root>
  )
}
