
import React from 'react'

import { SignInPage } from '@/presentation/components/pages'

import { makeSignInValidation } from '@/main/factories/presentation/validations'

export const makeSignIn: React.FC<any> = () => {
  return (
    <SignInPage validation={makeSignInValidation()} />
  )
}