import React, { useState } from 'react'
import dropdownIcon from '@/presentation/assets/dropdown-icon.svg'
import hero from '@/presentation/assets/hero-background.svg'
import logo from '@/presentation/assets/logo.svg'

import '@/presentation/pages/home/style/style.scss'

export const HomePage: React.FC = () => {
  const [dropdownActive, setDropdownActive] = useState<boolean>(false);

  return (<>
    <header className="flex-column flex-x-center flex-y-center pv-3">
      <div className='container vw-100 flex-row flex-x-center flex-y-around ph-2'>
        <div className='logo-container flex-row flex-x-center flex-y-center'>
          <img src={logo} alt='todolist icon logo with a piece of paper and a pen in the right side' />
          <h1>My Todolist</h1>
        </div>
        <div className="flex-row flex-x-center flex-y-center">
          <button onClick={() => setDropdownActive(!dropdownActive)} id='mobile-dropdown' className='btn-primary pv-1 ph-2'>
            <img src={dropdownIcon} alt='dropdown menu icon with 3 small horizontal bars' />
          </button>
          <nav id='desktop-actions'>
            <ul>
              <li>
                <a href='#' className='ml-3 flex-row flex-x-center flex-y-center btn-outline-primary ph-3 pv-2'>Sign In</a>
              </li>
              <li>
                <a href='#' className='flex-row flex-x-center flex-y-center btn-primary txt-c-light ph-3 pv-2 ml-2'>Sign Up</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {dropdownActive && <div id='mobile-actions' className='mt-3 ph-2 container vw-100 flex-row flex-x-center flex-y-around'>
        <nav className='w-auto'>
          <ul className='w-auto'>
            <li className='w-auto pr-1'>
              <a href='#' className='w-auto flex-row flex-x-center flex-y-center btn-outline-primary ph-3 pv-2'>Sign In</a>
            </li>
            <li className='w-auto pl-1'>
              <a href='#' className='w-auto flex-row flex-x-center flex-y-center btn-primary txt-c-light ph-3 pv-2'>Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>}
    </header>
    <main className='vw-100'>
      <section className='container flex-column flex-x-center flex-y-center ph-2'>
        <h2 className='mb-6'>Organize your daily basis with a simple and clean TODOLIST</h2>
        <img id='hero' src={hero} alt='image from a person checking their todolist tasks' />
      </section>
    </main>
  </>)
}