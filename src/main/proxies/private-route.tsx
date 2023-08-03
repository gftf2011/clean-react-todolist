import { RouteProps, Navigate } from 'react-router-dom';

import { Storage } from '@/use-cases/ports/gateways';

type Props = {
  storage: Storage;
} & RouteProps;

export const PrivateRoute: React.FC<Props> = ({ storage, children }) => {
  return storage.get(Storage.KEYS.ACCESS_TOKEN) ? (
    <>{children}</>
  ) : (
    <Navigate to="/sign-in" />
  );
};
