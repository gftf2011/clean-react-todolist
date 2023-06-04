import { SignInPage } from '@/presentation/pages'

import React from 'react'

import { makeSignInValidation } from '@/main/factories/presentation/validations'

export const makeSignIn: React.FC<any> = () => {
  return (
    <SignInPage validation={makeSignInValidation()} />
  )
}