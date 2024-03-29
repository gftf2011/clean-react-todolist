import styled from 'styled-components';

export const DefaultHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #e9e9e9;

  font-family: 'Shadows Into Light', cursive;

  header {
    width: 100%;
    max-width: 1536px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;

    div.header-wrapper {
      width: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      div.logo-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        h3 {
          color: #212121;
          margin-left: 1rem;
        }
      }

      nav {
        max-width: 456px;
      }
    }

    div.mobile-navigation-wrapper {
      width: 100%;
      padding: 0.5rem 0;
    }
  }

  @media only screen and (min-width: 769px) {
    .header-mobile-dropdown-button {
      display: none;
    }
    #header-mobile-navigation {
      display: none;
    }
  }

  @media only screen and (max-width: 768px) {
    #header-desktop-navigation {
      display: none;
    }
  }
`;

export const SignedInHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-bottom: 1px solid #e9e9e9;

  font-family: 'Shadows Into Light', cursive;

  button {
    font-family: inherit;
  }

  header {
    width: 100%;
    max-width: 1536px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding: 0.5rem;

    div.header-wrapper {
      width: 100%;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      div.logo-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        h3 {
          color: #212121;
          margin-left: 1rem;
        }
      }

      button {
        max-width: 140px;
      }
    }

    div.mobile-wrapper {
      width: 100%;
      padding: 0.5rem 0;
    }
  }

  @media only screen and (min-width: 769px) {
    .header-mobile-dropdown-button {
      display: none;
    }
    #log-out-mobile {
      display: none;
    }
  }

  @media only screen and (max-width: 768px) {
    #log-out-desktop {
      display: none;
    }
  }
`;
