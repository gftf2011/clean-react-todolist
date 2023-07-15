import styled from 'styled-components'

export const ToastWrapper = styled.div`
  top: 12px;
  right: 12px;

  overflow: hidden;

  padding: 12px;

  border-radius: 4px;

  position: absolute;

  width: 100%;
  max-width: 400px;

  background-color: #d32752;
  color: #f0f0f0;

  font-family: 'Shadows Into Light', cursive;

  div {
    position: relative;

    width: 100%;

    button {
      top: 0px;
      right: 0px;

      position: absolute;
    }

    p {
      padding: 24px 36px 12px 8px;

      font-size: 1.125rem;
    }
  }

  @media only screen and (max-width: 768px) {
    & {
      top: 0px;
      right: 0px;

      border-radius: 0px;

      max-width: 100%;
    }
  }
`