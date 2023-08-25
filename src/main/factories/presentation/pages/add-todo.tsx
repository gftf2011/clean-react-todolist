import { AddTodoPage } from '@/presentation/components/pages';

import { PrivateRoute } from '@/main/proxies';
import { makeCreateNoteUseCase } from '@/main/factories/use-cases';

import { LocalStorage } from '@/infra/gateways';

export const makeAddTodo: React.FC = () => {
  return (
    <PrivateRoute storage={LocalStorage.getInstance()}>
      <AddTodoPage
        createNoteUseCase={makeCreateNoteUseCase()}
        storage={LocalStorage.getInstance()}
      />
    </PrivateRoute>
  );
};
