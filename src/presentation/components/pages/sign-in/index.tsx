import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInTemplate } from '@/presentation/components/templates';
import { Validation } from '@/presentation/contracts/validation';

import { SignInUseCase } from '@/domain/use-cases';
import { Storage } from '@/use-cases/ports/gateways';

type Props = {
  validation: Validation;
  signInUseCase: SignInUseCase;
  storage: Storage;
};

export const SignInPage: React.FC<Props> = ({
  validation,
  signInUseCase,
  storage,
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastText, setToastText] = useState<string>('');

  const [emailValidationErrorMsg, setEmailValidationErrorMsg] =
    useState<string>('');
  const [passwordValidationErrorMsg, setPasswordValidationErrorMsg] =
    useState<string>('');

  const handlePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handleToastClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    setShowToast(false);
  };

  const validateInputFields = () => {
    const formData = { email, password };
    const emailErrorMessage = validation.validate('email', formData);
    const passwordErrorMessage = validation.validate('password', formData);
    setEmailValidationErrorMsg(emailErrorMessage);
    setPasswordValidationErrorMsg(passwordErrorMessage);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    validateInputFields();
    setIsLoading(true);
    try {
      const response = await signInUseCase.execute({ email, password });
      storage.set(Storage.KEYS.ACCESS_TOKEN, response);
      navigate('/todos');
    } catch (err) {
      setEmail('');
      setPassword('');
      setToastText((err as Error).message);
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignInTemplate
      emailInputValue={email}
      passwordInputValue={password}
      emailInputOnChange={handleEmailInput}
      passwordInputOnChange={handlePasswordInput}
      submit={handleSubmit}
      closeToast={handleToastClose}
      emailValidationMessage={emailValidationErrorMsg}
      passwordValidationMessage={passwordValidationErrorMsg}
      isLoading={isLoading}
      toastText={toastText}
      showToast={showToast}
    />
  );
};
