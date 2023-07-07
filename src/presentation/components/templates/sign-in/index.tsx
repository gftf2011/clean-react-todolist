import { Button } from '@/presentation/components/atoms'
import { FormControl } from '@/presentation/components/molecules'
import { Header } from '@/presentation/components/organisms'

import { MainWrapper, FormWrapper } from './styles.tsx'

type Props = {
  emailInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>
  passwordInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>
  submit: () => void | Promise<void>
  emailValidationMessage: string
  passwordValidationMessage: string
}

export const SignInTemplate: React.FC<Props> = (props) => {

  return (
    <>
      <Header />
      <MainWrapper>
        <FormWrapper onSubmit={props.submit}>
          <h1>Sign-In</h1>
          <FormControl
            id='email:sign-in:form-control'
            inputOnChange={props.emailInputOnChange}
            labelText='E-mail'
            placeholder='example@mail.com'
            type='email'
            name='email'
            errorMessage={props.emailValidationMessage} />
          <FormControl
            id='password:sign-in:form-control'
            inputOnChange={props.passwordInputOnChange}
            labelText='Password'
            placeholder='123456'
            type='password'
            name='password'
            errorMessage={props.passwordValidationMessage} />
          <Button
            type='submit'
            className='btn-primary btn-md block'
          >
            Submit
          </Button>
        </FormWrapper>
      </MainWrapper>
    </>
  )
}