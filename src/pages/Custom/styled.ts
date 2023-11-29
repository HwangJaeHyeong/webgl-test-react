import { CANVAS_HEIGHT, CANVAS_WIDTH } from 'constants/layout'
import styled from 'styled-components'

export const Root = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #ddd;
  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  width: 1280px;
  display: flex;
  justify-content: center;
  padding-top: 100px;
`

export const CanvasViewerContainer = styled.div`
  width: ${CANVAS_WIDTH}px;
  height: ${CANVAS_HEIGHT}px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
