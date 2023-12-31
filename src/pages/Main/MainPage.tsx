import { RenderingTest } from 'components/RenderingTest'
import { FC } from 'react'
import { Container, Root } from './styled'

type MainPageProps = {
  className?: string
}

export const MainPage: FC<MainPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Container>
        {/* <ThreeTest position={[700, 100, -150]} fov={130} url={'christmas_tree_02.fbx'} /> */}
        <RenderingTest />
      </Container>
    </Root>
  )
}
