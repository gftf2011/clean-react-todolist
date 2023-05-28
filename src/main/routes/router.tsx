import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { makeHome } from '@/main/factories'

export const Router: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={makeHome} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}