import styled from 'styled-components';

export const ScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100vw;

  background-color: #f0f0f0;

  svg {
    font-size: 5rem;

    @-webkit-keyframes rotating {
      from{
        -webkit-transform: rotate(0deg);
      }
      to{
        -webkit-transform: rotate(360deg);
      }
    }

    -webkit-animation: rotating 2s linear infinite;
  }

  h1 {
    font-family: 'Shadows Into Light', cursive;
    margin-top: 1rem;
  }
`