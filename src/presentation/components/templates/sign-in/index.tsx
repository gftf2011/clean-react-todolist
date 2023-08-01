import { Button } from '@/presentation/components/atoms';
import {
  FormControl,
  LoadingScreen,
  Toast,
} from '@/presentation/components/molecules';
import { Header } from '@/presentation/components/organisms';

import { MainWrapper, FormWrapper } from './styles.tsx';

type Props = {
  emailInputOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  passwordInputOnChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  closeToast: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
  submit: (event: React.FormEvent<HTMLFormElement>) => void | Promise<void>;
  emailValidationMessage: string;
  passwordValidationMessage: string;
  isLoading: boolean;
  showToast: boolean;
  toastText: string;
};

export const SignInTemplate: React.FC<Props> = (props) => {
  return (
    <>
      {props.isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header.Default />
          <MainWrapper>
            {props.showToast && (
              <Toast text={props.toastText} onClick={props.closeToast} />
            )}
            <FormWrapper onSubmit={props.submit}>
              <h1>Sign-In</h1>
              <FormControl
                id="email:sign-in:form-control"
                inputOnChange={props.emailInputOnChange}
                labelText="E-mail"
                placeholder="example@mail.com"
                type="email"
                name="email"
                errorMessage={props.emailValidationMessage}
              />
              <FormControl
                id="password:sign-in:form-control"
                inputOnChange={props.passwordInputOnChange}
                labelText="Password"
                placeholder="123456"
                type="password"
                name="password"
                errorMessage={props.passwordValidationMessage}
              />
              <Button type="submit" className="btn-primary btn-md block">
                Submit
              </Button>
            </FormWrapper>
          </MainWrapper>
        </>
      )}
    </>
  );
};
