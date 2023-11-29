import { CustomTest } from 'components/CustomTest'
import { FC } from 'react'
import { Container, Root } from './styled'

type CustomPageProps = {
  className?: string
}

export const CustomPage: FC<CustomPageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Container>
        <CustomTest />
      </Container>
    </Root>
  )
}
