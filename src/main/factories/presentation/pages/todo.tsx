import { TodoPage } from '@/presentation/components/pages';

import { PrivateRoute } from '@/main/proxies';

import { LocalStorage } from '@/infra/gateways';

export const makeTodo: React.FC = () => {
  return (
    <PrivateRoute storage={new LocalStorage()}>
      <TodoPage />
    </PrivateRoute>
  );
};
