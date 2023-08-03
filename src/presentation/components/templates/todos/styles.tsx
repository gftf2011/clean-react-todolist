import styled from 'styled-components';

export const MainWrapper = styled.main`
  position: relative;

  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Shadows Into Light', cursive;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: auto;
    width: 100%;
    max-width: 480px;

    border-radius: 0.5rem;
    border: 2px solid #e9e9e9;

    padding: 12px;

    @media only screen and (max-width: 496px) {
      & {
        border: none;
      }
    }
  }

  hr {
    height: 1px;
    width: 100%;

    border: none;
    background-color: #e9e9e9;

    margin: 0.75rem 0;
  }

  @media only screen and (max-height: 620px) {
    & {
      margin-top: 1rem;
      justify-content: flex-start;
    }
  }
`;
