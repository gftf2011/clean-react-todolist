import React, { useState } from 'react'
import hero from '@/presentation/assets/hero-background.svg'
import dropdownIcon from '@/presentation/assets/dropdown-icon.svg'

import '@/presentation/pages/home/style/style.scss'

import { FooterComponent } from '@/presentation/pages/home/components/footer'
import { LogoComponent } from '@/presentation/pages/home/components/logo'

export const HomePage: React.FC = () => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  return (<>
    <header>
      <div className='container'>
        <LogoComponent />
        <div className="actions">
          <button onClick={() => setDropdownActive(!dropdownActive)} className='dropdown-menu-btn'>
            <img src={dropdownIcon} alt='dropdown menu icon with 3 small horizontal bars' />
          </button>
          <nav>
            <ul>
              <li><a href='#' className='sign-in'>Sign In</a></li>
              <li><a href='#' className='sign-up'>Sign Up</a></li>
            </ul>
          </nav>
        </div>
        {dropdownActive && <nav>
          <ul>
            <li><a href='#' className='sign-in'>Sign In</a></li>
            <li><a href='#' className='sign-up'>Sign Up</a></li>
          </ul>
        </nav>}
      </div>
    </header>
    <main>
      <section>
        <h2>Organize your daily basis with a simple and clean TODOLIST</h2>
        <img src={hero} alt='image from a person checking their todolist tasks' />
      </section>
    </main>
    <FooterComponent />
  </>)
}