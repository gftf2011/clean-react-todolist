import { useState } from 'react';

import { Storage } from '@/use-cases/ports/gateways';
import { UseCase } from '@/domain/use-cases';

type Dependencies = {
  operationSuccess: (arg?: any) => void;
  operationFailure: (error: Error) => void;
  useCase: UseCase;
  storage: Storage;
};

type Result = {
  loading: boolean;
  fetch: (dependencies: Dependencies) => (input: any) => Promise<any>;
};

export const useFetchData = (): Result => {
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Template Method Functional Implementation
   */
  const fetch = ({
    useCase,
    storage,
    operationSuccess,
    operationFailure,
  }: Dependencies): ((input: any) => Promise<any>) => {
    return async (input: any): Promise<any> => {
      let response: any;

      try {
        setLoading(true);

        const storageValue: { accessToken: string } = storage.get(
          Storage.KEYS.ACCESS_TOKEN
        );

        response = await useCase.execute({
          ...input,
          accessToken: storageValue.accessToken,
        });

        operationSuccess(response);
      } catch (err) {
        response = err;
        operationFailure(err as Error);
      } finally {
        setLoading(false);
      }

      return response;
    };
  };

  return {
    loading,
    fetch,
  };
};
