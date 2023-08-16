import { useLogout } from '@/presentation/hooks';

import { InvalidTokenError } from '@/use-cases/errors';

import { Storage } from '@/use-cases/ports/gateways';

type CallBackType = (error: Error) => void;

type Result = {
  handleError: (
    callback: CallBackType,
    storage: Storage
  ) => (error: Error) => void;
};

export const useErrorHandler = (): Result => {
  const logout = useLogout();

  const handleError = (callback: CallBackType, storage: Storage) => {
    return (error: Error): void => {
      if (error instanceof InvalidTokenError) {
        logout(storage);
      } else {
        callback(error);
      }
    };
  };

  return { handleError };
};
