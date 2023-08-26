import ReactDOM from 'react-dom/client';

import { Router } from '@/main/routes/router';

import '@/presentation/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router />
);
