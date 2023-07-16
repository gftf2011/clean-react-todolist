import { useState } from 'react'

import { Logo, Link, Button, Icon } from '@/presentation/components/atoms'
import { Navbar } from '@/presentation/components/molecules'

import { HeaderWrapper } from './styles'

export const Header: React.FC = () => {
  const [dropdownButtonActive, setDropdownButtonActive] = useState<boolean>(false)

  const handleDropdownButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()

    setDropdownButtonActive(!dropdownButtonActive)
  }

  return (
    <HeaderWrapper>
      <header>
        <div className='header-wrapper'>
          <div className='logo-wrapper'>
            <Logo className='logo-md' />
            <h3>My TODOLIST</h3>
          </div>
          <Navbar navigationId='header-desktop-navigation' listClassName='row'>
            <Link to='/' className='btn-elegant-primary'>Home</Link>
            <Link to='/sign-in' className='btn-elegant-primary'>Sign-In</Link>
            <Link to='/sign-up' className='btn-elegant-primary'>Sign-Up</Link>
          </Navbar>
          <Button onClick={handleDropdownButtonClick} id='header-mobile-dropdown-button' className='btn-primary'>
            {dropdownButtonActive ? <Icon.CloseMenu /> : <Icon.MenuDropdown />}
          </Button>
        </div>
        <div className='mobile-navigation-wrapper'>
          {dropdownButtonActive && <Navbar navigationId='header-mobile-navigation' listClassName='column'>
            <Link to='/' className='btn-elegant2-primary'>Home</Link>
            <Link to='/sign-in' className='btn-elegant2-primary'>Sign-In</Link>
            <Link to='/sign-up' className='btn-elegant2-primary'>Sign-Up</Link>
          </Navbar>}
        </div>
      </header>
    </HeaderWrapper>
  )
}