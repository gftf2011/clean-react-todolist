import { Header, Footer } from '@/presentation/components/organisms';

import { MainWrapper } from './styles.tsx';

export const HomeTemplate: React.FC = () => {
  return (
    <>
      <Header.Default />
      <MainWrapper>
        <h1>Organize your daily task in your phone !</h1>
        <h2>Or organize it in your computer aswell !</h2>
      </MainWrapper>
      <Footer />
    </>
  );
};
