/* eslint-disable no-undef */
import 'antd/dist/antd.css'
import { OpenCvProvider } from 'opencv-react'
import { MainPage } from 'pages/Main'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './default.css'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <OpenCvProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  </OpenCvProvider>
)
