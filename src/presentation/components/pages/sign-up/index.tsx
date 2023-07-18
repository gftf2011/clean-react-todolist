import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignUpTemplate } from '@/presentation/components/templates'
import { Validation } from '@/presentation/contracts/validation'

import { SignUpUseCase } from '@/domain/use-cases'
import { Storage } from '@/use-cases/ports/gateways'

type Props = {
  validation: Validation
  signUpUseCase: SignUpUseCase
  storage: Storage
}

export const SignUpPage: React.FC<Props> = ({ validation, signUpUseCase, storage }) => {
  const navigate = useNavigate()

  const [name, setName] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showToast, setShowToast] = useState<boolean>(false)
  const [toastText, setToastText] = useState<string>('')

  const [nameValidationErrorMsg, setNameValidationErrorMsg] = useState<string>('')
  const [lastnameValidationErrorMsg, setLastnameValidationErrorMsg] = useState<string>('')
  const [emailValidationErrorMsg, setEmailValidationErrorMsg] = useState<string>('')
  const [passwordValidationErrorMsg, setPasswordValidationErrorMsg] = useState<string>('')

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value)
  }

  const handleLastnameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLastname(e.target.value)
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value)
  }

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value)
  }

  const handleToastClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    setShowToast(false)
  }

  const validateInputFields = () => {
    const formData = { email, password, name, lastname }
    const nameErrorMessage = validation.validate('name', formData)
    const lastnameErrorMessage = validation.validate('lastname', formData)
    const emailErrorMessage = validation.validate('email', formData)
    const passwordErrorMessage = validation.validate('password', formData)
    setNameValidationErrorMsg(nameErrorMessage)
    setLastnameValidationErrorMsg(lastnameErrorMessage)
    setEmailValidationErrorMsg(emailErrorMessage)
    setPasswordValidationErrorMsg(passwordErrorMessage)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    validateInputFields();
    setIsLoading(true);
    try {
      const response = await signUpUseCase.execute({ email, password, name, lastname });
      storage.set(Storage.KEYS.ACCESS_TOKEN, response);
      navigate('/todos')
    } catch (err) {
      setToastText((err as Error).message)
      setShowToast(true)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SignUpTemplate
      nameInputOnChange={handleNameInput}
      lastnameInputOnChange={handleLastnameInput}
      emailInputOnChange={handleEmailInput}
      passwordInputOnChange={handlePasswordInput}
      submit={handleSubmit}
      closeToast={handleToastClose}
      nameValidationMessage={nameValidationErrorMsg}
      lastnameValidationMessage={lastnameValidationErrorMsg}
      emailValidationMessage={emailValidationErrorMsg}
      passwordValidationMessage={passwordValidationErrorMsg}
      isLoading={isLoading}
      toastText={toastText}
      showToast={showToast} />
  )
}