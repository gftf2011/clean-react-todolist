import { useState } from 'react';

import { Logo, Link, Button, Icon } from '@/presentation/components/atoms';
import { Navbar } from '@/presentation/components/molecules';

import { DefaultHeaderWrapper, SignedInHeaderWrapper } from './styles';

const DefaultHeader: React.FC = () => {
  const [dropdownButtonActive, setDropdownButtonActive] =
    useState<boolean>(false);

  const handleDropdownButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    setDropdownButtonActive(!dropdownButtonActive);
  };

  return (
    <DefaultHeaderWrapper>
      <header>
        <div className="header-wrapper">
          <div className="logo-wrapper">
            <Logo className="logo-md" />
            <h3>My TODOLIST</h3>
          </div>
          <Navbar navigationId="header-desktop-navigation" listClassName="row">
            <Link
              key="home-link-desktop"
              to="/"
              className="btn-elegant-primary"
            >
              Home
            </Link>
            <Link
              key="sign-in-link-desktop"
              to="/sign-in"
              className="btn-elegant-primary"
            >
              Sign-In
            </Link>
            <Link
              key="sign-up-link-desktop"
              to="/sign-up"
              className="btn-elegant-primary"
            >
              Sign-Up
            </Link>
          </Navbar>
          <Button
            onClick={handleDropdownButtonClick}
            className="btn-primary header-mobile-dropdown-button"
          >
            {dropdownButtonActive ? <Icon.CloseMenu /> : <Icon.MenuDropdown />}
          </Button>
        </div>
        <div className="mobile-navigation-wrapper">
          {dropdownButtonActive && (
            <Navbar
              navigationId="header-mobile-navigation"
              listClassName="column"
            >
              <Link
                key="home-link-mobile"
                to="/"
                className="btn-elegant2-primary"
              >
                Home
              </Link>
              <Link
                key="sign-in-link-mobile"
                to="/sign-in"
                className="btn-elegant2-primary"
              >
                Sign-In
              </Link>
              <Link
                key="sign-up-link-mobile"
                to="/sign-up"
                className="btn-elegant2-primary"
              >
                Sign-Up
              </Link>
            </Navbar>
          )}
        </div>
      </header>
    </DefaultHeaderWrapper>
  );
};

type SignedInHeaderProps = {
  onClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void | Promise<void>;
};

const SignedInHeader: React.FC<SignedInHeaderProps> = (props) => {
  const [dropdownButtonActive, setDropdownButtonActive] =
    useState<boolean>(false);

  const handleDropdownButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();

    setDropdownButtonActive(!dropdownButtonActive);
  };

  return (
    <SignedInHeaderWrapper>
      <header>
        <div className="header-wrapper">
          <div className="logo-wrapper">
            <Logo className="logo-md" />
            <h3>My TODOLIST</h3>
          </div>
          <Button
            onClick={props.onClick}
            id="log-out-desktop"
            className="btn-primary"
          >
            Log-out
          </Button>
          <Button
            onClick={handleDropdownButtonClick}
            className="btn-primary header-mobile-dropdown-button"
          >
            {dropdownButtonActive ? <Icon.CloseMenu /> : <Icon.MenuDropdown />}
          </Button>
        </div>
        <div className="mobile-wrapper">
          {dropdownButtonActive && (
            <Button
              onClick={props.onClick}
              id="log-out-mobile"
              className="btn-primary block"
            >
              Log-out
            </Button>
          )}
        </div>
      </header>
    </SignedInHeaderWrapper>
  );
};

export const Header = {
  Default: DefaultHeader,
  SignedIn: SignedInHeader,
};
