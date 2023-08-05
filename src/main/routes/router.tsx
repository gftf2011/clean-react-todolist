import React from 'react';

import {
  makeHome,
  makeSignIn,
  makeSignUp,
  makeAddTodo,
  makeTodos,
} from '@/main/factories/presentation';
import { ReduxRouterDomProvider } from '@/main/adapters';

const routes = [
  {
    path: '/',
    element: makeHome({}),
  },
  {
    path: '/sign-in',
    element: makeSignIn({}),
  },
  {
    path: '/sign-up',
    element: makeSignUp({}),
  },
  {
    path: '/add-todo',
    element: makeAddTodo({}),
  },
  {
    path: '/todos',
    element: makeTodos({}),
  },
];

export const Router: React.FC = () => {
  return (
    <React.StrictMode>
      <ReduxRouterDomProvider routes={routes} />
    </React.StrictMode>
  );
};
