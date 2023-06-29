import { useState } from 'react'

import { SignInTemplate } from '@/presentation/components/templates'

import { Validation } from '@/presentation/contracts/validation'

type Props = {
  validation: Validation
}

export const SignInPage: React.FC<Props> = ({ validation }) => {
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    validateInputFields()
  }

  return (
    <SignInTemplate
      emailInputOnChange={handleEmailInput}
      passwordInputOnChange={handlePasswordInput}
      submitOnClick={handleSubmit}
      emailValidationMessage={emailValidationErrorMsg}
      passwordValidationMessage={passwordValidationErrorMsg} />
  )
}