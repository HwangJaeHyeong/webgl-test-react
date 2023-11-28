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
        <ThreeTest />
      </Container>
    </Root>
  )
}
