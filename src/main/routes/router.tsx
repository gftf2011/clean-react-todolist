import React from 'react'

import { makeHome, makeSignIn } from '@/main/factories/presentation'
import { ReduxRouterDomProvider } from '@/main/adapters'

const routes = [
  {
    path: "/",
    element: makeHome({}),
  },
  {
    path: "/sign-in",
    element: makeSignIn({}),
  },
]

export const Router: React.FC = () => {
  return (
    <React.StrictMode>
      <ReduxRouterDomProvider routes={routes} />
    </React.StrictMode>
  )
}