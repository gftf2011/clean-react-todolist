import { SignUpPage } from '@/presentation/components/pages'

import { LocalStorage } from '@/infra/gateways'

import { makeSignUpUseCase } from '@/main/factories/use-cases'
import { makeSignUpValidation } from '@/main/factories/presentation/validations'

export const makeSignUp: React.FC = () => {
  return (
    <SignUpPage
      validation={makeSignUpValidation()}
      signUpUseCase={makeSignUpUseCase()}
      storage={new LocalStorage()}
    />
  )
}