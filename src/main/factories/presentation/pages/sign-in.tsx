import { SignInPage } from '@/presentation/components/pages'

import { LocalStorage } from '@/infra/gateways'

import { makeSignInUseCase } from '@/main/factories/use-cases'
import { makeSignInValidation } from '@/main/factories/presentation/validations'

export const makeSignIn: React.FC = () => {
  return (
    <SignInPage
      validation={makeSignInValidation()}
      signInUseCase={makeSignInUseCase()}
      storage={new LocalStorage()}
    />
  )
}