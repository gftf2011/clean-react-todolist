import { TodosPage } from '@/presentation/components/pages'

import { PrivateRoute } from '@/main/proxies'

import { LocalStorage } from '@/infra/gateways'

export const makeTodos: React.FC = () => {
  return (
    <PrivateRoute storage={new LocalStorage()}>
      <TodosPage />
    </PrivateRoute>
  )
}