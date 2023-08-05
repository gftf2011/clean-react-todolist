import { AddTodoPage } from '@/presentation/components/pages';

import { PrivateRoute } from '@/main/proxies';
import { makeCreateNoteUseCase } from '@/main/factories/use-cases';

import { LocalStorage } from '@/infra/gateways';

export const makeAddTodo: React.FC = () => {
  return (
    <PrivateRoute storage={new LocalStorage()}>
      <AddTodoPage
        createNoteUseCase={makeCreateNoteUseCase()}
        storage={new LocalStorage()}
      />
    </PrivateRoute>
  );
};
