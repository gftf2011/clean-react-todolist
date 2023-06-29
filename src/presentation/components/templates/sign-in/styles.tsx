import styled from 'styled-components'

export const MainWrapper = styled.main`
  height: calc(100vh - 96px - 80px);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 480px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 1rem;

  border-radius: 0.5rem;
  border: 2px solid #e9e9e9;

  font-family: 'Shadows Into Light', cursive;

  input, button, h1 {
    font-family: inherit;
  }

  h1 {
    margin-bottom: 1rem;
  }
`
