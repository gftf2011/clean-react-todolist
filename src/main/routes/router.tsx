import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { makeHome, makeSignIn } from '@/main/factories/presentation'

const router = createBrowserRouter([
  {
    path: "/",
    element: makeHome({}),
  },
  {
    path: "/sign-in",
    element: makeSignIn({}),
  },
]);

export const Router: React.FC = () => {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  )
}