import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CustomLogoComponent } from '@/presentation/components/logo'
import { userSlice, signInFormSlice } from '@/presentation/state-manager/redux-toolkit'
import { Validation } from '@/presentation/contracts/validation'

import '@/presentation/pages/sign-in/style/style.scss'

type Props = {
  validation: Validation
}

type SignInFormData = {
  emailErrorMessage: string
  passwordErrorMessage: string
}

type UserData = {
  email: string
  password: string
}

export const SignInPage: React.FC<Props> = ({ validation }) => {
  const dispatch = useDispatch();
  const userState: UserData = useSelector((state: any) => state.user);
  const signInFormState: SignInFormData = useSelector((state: any) => state.signInForm);

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(userSlice.actions.email({ email: e.target.value }))
  }

  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(userSlice.actions.password({ password: e.target.value }))
  }

  const validateInputFields = () => {
    const { email, password } = userState
    const formData = { email, password }
    const emailErrorMessage = validation.validate('email', formData)
    const passwordErrorMessage = validation.validate('password', formData)
    dispatch(signInFormSlice.actions.emailFieldError({ emailErrorMessage }))
    dispatch(signInFormSlice.actions.passwordFieldError({ passwordErrorMessage }))
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    validateInputFields()
  }

  return (<>
    <main className='vw-100 vh-100 flex-column flex-x-center flex-y-center pv-6'>
      <div className='form-container w-auto w-auto flex-column flex-x-center flex-y-center p-4'>
        <CustomLogoComponent className='mv-6' />
        <form className='w-auto flex-column flex-x-center flex-y-center'>
          <div className='form-group mv-3'>
            <label className='col-form-label mb-1'>E-mail</label>
            <input 
              onChange={handleEmailInput}
              className='form-control form-control-md'
              type='email'
              placeholder='example@mail.com' />
            <small className='mt-1 txt-c-danger'>{signInFormState.emailErrorMessage}</small>
          </div>
          <div className='form-group mv-3'>
            <label className='col-form-label mb-1'>Password</label>
            <input
              onChange={handlePasswordInput}
              className='form-control form-control-md'
              type='password'
              placeholder='123456' />
            <small className='mt-1 txt-c-danger'>{signInFormState.passwordErrorMessage}</small>
          </div>
          <button
            onClick={handleSubmit}
            className='w-auto btn-primary txt-c-light pv-1 mt-3'
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  </>)
}