import React from 'react';

import { HomePage } from '@/presentation/components/pages';

import { LocalStorage } from '@/infra/gateways';

import { SignedInRoute } from '@/main/proxies';

export const makeHome: React.FC<any> = () => {
  return (
    <SignedInRoute storage={LocalStorage.getInstance()}>
      <HomePage />
    </SignedInRoute>
  );
};
