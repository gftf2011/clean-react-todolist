import { TodosPage } from '@/presentation/components/pages'

import { PrivateRoute } from '@/main/proxies'
import { makeFindNotesUseCase, makeUpdateFinishedNoteUseCase } from '@/main/factories/use-cases'

import { LocalStorage } from '@/infra/gateways'

export const makeTodos: React.FC = () => {
  return (
    <PrivateRoute storage={new LocalStorage()}>
      <TodosPage
        findNotesUseCase={makeFindNotesUseCase()}
        updateFinishedNoteUseCase={makeUpdateFinishedNoteUseCase()}
        storage={new LocalStorage()} />
    </PrivateRoute>
  )
}