import { useState } from 'react'

import { SignInTemplate } from '@/presentation/components/templates'
import { Validation } from '@/presentation/contracts/validation'

import { SignInUseCase } from '@/domain/use-cases'

type Props = {
  validation: Validation
  signInUseCase: SignInUseCase
}

export const SignInPage: React.FC<Props> = ({ validation, signInUseCase }) => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [emailValidationErrorMsg, setEmailValidationErrorMsg] = useState<string>('')
  const [passwordValidationErrorMsg, setPasswordValidationErrorMsg] = useState<string>('')

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const validateInputFields = () => {
    const formData = { email, password }
    const emailErrorMessage = validation.validate('email', formData)
    const passwordErrorMessage = validation.validate('password', formData)
    setEmailValidationErrorMsg(emailErrorMessage)
    setPasswordValidationErrorMsg(passwordErrorMessage)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    validateInputFields();
    const response = await signInUseCase.execute({ email, password });
    console.log(response);
  }

  return (
    <SignInTemplate
      emailInputOnChange={handleEmailInput}
      passwordInputOnChange={handlePasswordInput}
      submit={handleSubmit}
      emailValidationMessage={emailValidationErrorMsg}
      passwordValidationMessage={passwordValidationErrorMsg} />
  )
}