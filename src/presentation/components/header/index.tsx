import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import dropdownIcon from '@/presentation/assets/dropdown-icon.svg'
import { CustomLogoComponent } from '@/presentation/components/logo'

import { dropdownMenuSlice } from '@/presentation/state-manager/redux-toolkit'

import '@/presentation/components/header/style/style.scss'

export const CustomHeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const isActive: boolean = useSelector((state: any) => state.dropdownMenu.isActive);

  const handleDropdownClick = () => {
    dispatch(dropdownMenuSlice.actions.toggle())
  }

  return (<>
    <header className="flex-column flex-x-center flex-y-center pv-3">
      <div className='container vw-100 flex-row flex-x-center flex-y-around ph-2'>
        <CustomLogoComponent className='mr-max' />
        {<div className="flex-row flex-x-center flex-y-center">
          <button onClick={() => handleDropdownClick()} id='mobile-dropdown' className='btn-primary pv-1 ph-2'>
            <img src={dropdownIcon} alt='dropdown menu icon with 3 small horizontal bars' />
          </button>
          <nav id='desktop-actions'>
            <ul>
              <li>
                <Link className='ml-3 flex-row flex-x-center flex-y-center btn-outline-primary ph-3 pv-2' to='/sign-in' >Sign In</Link>
              </li>
              <li>
                <a href='#' className='flex-row flex-x-center flex-y-center btn-primary txt-c-light ph-3 pv-2 ml-2'>Sign Up</a>
              </li>
            </ul>
          </nav>
        </div>}
      </div>
      {isActive && <div id='mobile-actions' className='mt-3 ph-2 container vw-100 flex-row flex-x-center flex-y-around'>
        <nav className='w-auto'>
          <ul className='w-auto'>
            <li className='w-auto pr-1'>
              <Link className='w-auto flex-row flex-x-center flex-y-center btn-outline-primary ph-3 pv-2' to='/sign-in'>Sign In</Link>
            </li>
            <li className='w-auto pl-1'>
              <a href='#' className='w-auto flex-row flex-x-center flex-y-center btn-primary txt-c-light ph-3 pv-2'>Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>}
    </header>
  </>)
}