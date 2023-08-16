import { useNavigate } from 'react-router-dom';

import { useResetState } from '@/presentation/hooks';

import { Storage } from '@/use-cases/ports/gateways';

type Result = (storage: Storage, path?: string) => void;

export const useLogout = (): Result => {
  const navigate = useNavigate();

  const reset = useResetState();

  return (storage: Storage, path?: string): void => {
    storage.clear();
    reset();
    navigate(path || '/sign-in');
  };
};
