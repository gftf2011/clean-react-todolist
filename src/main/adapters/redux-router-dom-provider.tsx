import { Provider } from 'react-redux';

import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';

import { store } from '@/presentation/state-manager/redux-toolkit';

type Props = {
  routes: RouteObject[];
};

export const ReduxRouterDomProvider: React.FC<Props> = ({ routes }) => {
  const router = createBrowserRouter(routes);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};
