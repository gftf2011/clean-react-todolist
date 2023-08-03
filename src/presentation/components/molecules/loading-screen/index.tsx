import { Icon } from '@/presentation/components/atoms';

import { ScreenWrapper } from './styles';

export const LoadingScreen: React.FC = () => {
  return (
    <ScreenWrapper>
      <Icon.ScreenLoader />
      <h1>Loading...</h1>
    </ScreenWrapper>
  );
};
