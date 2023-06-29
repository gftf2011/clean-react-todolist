import styled from 'styled-components'

export const MainWrapper = styled.main`
  padding: 1rem;

  height: calc(100vh - 96px - 80px);
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-family: 'Rock Salt', cursive;

  h1, h2 {
    text-align: center;
  }

  h2 {
    margin-top: 3rem;
  }

  @media only screen and (max-width: 768px) {
    & {
      h1 {
        font-size: 1.75rem;
      }
  
      h2 {
        font-size: 1.25rem;
      }
    }
  }
`