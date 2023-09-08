import { EditTodoPage } from '@/presentation/components/pages';

import { PrivateRoute } from '@/main/proxies';
import { makeUpdateNoteUseCase } from '@/main/factories/use-cases';

import { LocalStorage } from '@/infra/gateways';

export const makeEditTodo: React.FC = () => {
  return (
    <PrivateRoute storage={LocalStorage.getInstance()}>
      <EditTodoPage
        updateNoteUseCase={makeUpdateNoteUseCase()}
        storage={LocalStorage.getInstance()}
      />
    </PrivateRoute>
  );
};
