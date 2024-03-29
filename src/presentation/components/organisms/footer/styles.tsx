import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  width: 100%;
  min-height: 80px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background-color: #1ca4c9;

  border-top: 1px solid #e9e9e9;

  font-family: 'Rock Salt', cursive;

  div.footer-wrapper {
    width: 100%;
    max-width: 1536px;

    padding: 0 0.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    p {
      color: #e9e9e9;
      text-align: center;
      font-size: 0.75rem;
    }

    ul {
      list-style: none;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      li {
        margin-left: 0.25rem;

        &:last-child {
          margin-right: 0.25rem;
        }
      }
    }

    @media only screen and (max-width: 768px) {
      & {
        padding: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        p {
          font-size: 0.675rem;
          margin-bottom: 0.25rem;
        }
      }
    }
  }
`;
