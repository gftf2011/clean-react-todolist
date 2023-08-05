import styled from 'styled-components';

export const MainWrapper = styled.main`
  position: relative;

  height: calc(100vh - 96px - 80px);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-height: 798px) {
    & {
      margin-top: 1rem;
      justify-content: flex-start;
    }
  }
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 480px;

  font-family: 'Shadows Into Light', cursive;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  border-radius: 0.5rem;
  border: 2px solid #e9e9e9;

  input,
  textarea,
  button,
  h1 {
    font-family: inherit;
  }

  h1 {
    margin-bottom: 1rem;
  }

  hr {
    height: 1px;
    width: 100%;

    border: none;
    background-color: #e9e9e9;

    margin: 0.75rem 0;
  }

  @media only screen and (max-width: 496px) {
    & {
      border: none;
    }
  }
`;
