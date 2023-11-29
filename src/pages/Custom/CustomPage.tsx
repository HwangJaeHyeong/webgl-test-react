/* eslint-disable no-undef */
import { Col } from 'antd'
import { CustomElement } from 'components/CustomElement'
import { CustomTest } from 'components/CustomTest'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CanvasViewerContainer,
  CanvasViewerTitleTypo,
  Container,
  EditorButton,
  EditorContainer,
  EditorInput,
  EditorItemContainer,
  EditorItemTitleTypo,
  EditorRowContainer,
  EditorSlider,
  EditorTitleTypo,
  Root,
} from './styled'

import ReactDOM from 'react-dom'
type CustomPageProps = {
  className?: string
}

const DEFAULT_POSITION = [240, 300, -125] as [number, number, number]

const Label = ({ position, text }: any) => {
  const [style, setStyle] = useState<any>()
  useEffect(() => {
    setStyle({
      position: 'absolute',
      transform: `translate(-50%, -50%) translate(${position[0]}px,${position[1]}px)`,
      pointerEvents: 'none',
    })
  }, [position])

  return <div style={style}>{text}</div>
}

export const CustomPage: FC<CustomPageProps> = ({ className }) => {
  const navigate = useNavigate()
  const [scale, setScale] = useState<number>(1)
  const [position, setPosition] = useState<[number, number, number]>(DEFAULT_POSITION)
  const [color, setColor] = useState<string>('#e9fa00')
  const [label, setLabel] = useState<string>('')

  const onClickPositionButton = (type: 'RESET' | 'RIGHT' | 'LEFT' | 'OPPOSITE') => () => {
    if (type === 'RESET') {
      setPosition([...DEFAULT_POSITION])
      return
    }
    if (type === 'LEFT') {
      setPosition((prev) => [DEFAULT_POSITION[0], DEFAULT_POSITION[1], -1 * DEFAULT_POSITION[2]])
      return
    }
    if (type === 'RIGHT') {
      setPosition((prev) => [-1 * DEFAULT_POSITION[0], DEFAULT_POSITION[1], DEFAULT_POSITION[2]])
      return
    }
    if (type === 'OPPOSITE') {
      setPosition((prev) => [-1 * DEFAULT_POSITION[0], DEFAULT_POSITION[1], -1 * DEFAULT_POSITION[2]])
      return
    }
  }

  const onChangeScaleSlider = (value: number) => {
    if (isNaN(value)) {
      return
    }
    setScale(value)
  }

  return (
    <Root className={className}>
      <Container>
        <CanvasViewerContainer>
          <CanvasViewerTitleTypo>미리보기</CanvasViewerTitleTypo>
          <CustomTest>
            <CustomElement fbxUrl={'bell.fbx'} color={'#3ad2c4'} position={[240, 300, -125]} scale={[1, 1, 1]} />
            <CustomElement
              fbxUrl={'bell_02.fbx'}
              color={color}
              position={position}
              scale={[scale / 10, scale / 10, scale / 10]}
            />
          </CustomTest>
        </CanvasViewerContainer>
        <EditorContainer>
          <EditorTitleTypo>에디터</EditorTitleTypo>
          <EditorItemContainer>
            <EditorItemTitleTypo>크기</EditorItemTitleTypo>
            <EditorRowContainer>
              <Col span={24}>
                <EditorSlider min={0.01} max={1} value={scale} onChange={onChangeScaleSlider} step={0.01} />
              </Col>
            </EditorRowContainer>
          </EditorItemContainer>
          <EditorItemContainer>
            <EditorItemTitleTypo>색상</EditorItemTitleTypo>
            <EditorRowContainer>
              <input type="color" color={color} onChange={(e) => setColor(e.target.value)} />
            </EditorRowContainer>
          </EditorItemContainer>
          <EditorItemContainer>
            <EditorItemTitleTypo>위치</EditorItemTitleTypo>
            <EditorRowContainer>
              <EditorButton onClick={onClickPositionButton('RESET')}>리셋</EditorButton>
              <EditorButton onClick={onClickPositionButton('LEFT')}>90도 왼쪽</EditorButton>
              <EditorButton onClick={onClickPositionButton('RIGHT')}>90도 오른쪽</EditorButton>
              <EditorButton onClick={onClickPositionButton('OPPOSITE')}>정반대</EditorButton>
            </EditorRowContainer>
          </EditorItemContainer>
          <EditorItemContainer>
            <EditorItemTitleTypo>라벨</EditorItemTitleTypo>
            <EditorRowContainer>
              <EditorInput
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="라벨을 입력해주세요."
              />
            </EditorRowContainer>
          </EditorItemContainer>
        </EditorContainer>
      </Container>
      {ReactDOM.createPortal(<Label position={[0, 100, 0]} text="나무 라벨" />, document.body)}
    </Root>
  )
}
