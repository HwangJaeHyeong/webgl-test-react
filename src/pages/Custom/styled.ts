import { Button, Input, Slider } from 'antd'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  width: 1280px;
  display: flex;
  justify-content: center;
  gap: 40px;
  padding-top: 100px;
`

export const CanvasViewerContainer = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #eee;
  gap: 10px;
  overflow: hidden;
  border: 1px #333 solid;
  border-radius: 8px;
`

export const CanvasViewerTitleTypo = styled.p`
  font-size: 24px;
  font-weight: bold;
  color: #111;
  margin-top: 20px;
`

export const EditorContainer = styled.div`
  width: 400px;
  height: fit-content;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 10px;
  padding: 30px;
  box-sizing: border-box;
  border: 1px #333 solid;
  border-radius: 8px;
`

export const EditorTitleTypo = styled.span`
  font-size: 24px;
  font-weight: bold;
  color: #111;
  margin-bottom: 10px;
`

export const EditorItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const EditorItemTitleTypo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #111;
`

export const EditorRowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const EditorSelectContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export const EditorButton = styled(Button)``
export const EditorSlider = styled(Slider)``
export const EditorInput = styled(Input)``
