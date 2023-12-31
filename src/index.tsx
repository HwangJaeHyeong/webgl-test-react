/* eslint-disable no-undef */
import 'antd/dist/antd.css'
import { CustomPage } from 'pages/Custom'
import { MainPage } from 'pages/Main'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './default.css'

const root = ReactDOM.createRoot(document.getElementById('root') as any)

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/custom" element={<CustomPage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  </BrowserRouter>
)
