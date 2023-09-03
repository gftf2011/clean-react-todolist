import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import { setupStore } from '@/presentation/state-manager/redux-toolkit/store';

type Props = {
  routes: RouteObject[];
};

export const ReduxRouterDomProvider: React.FC<Props> = ({ routes }) => {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
};
