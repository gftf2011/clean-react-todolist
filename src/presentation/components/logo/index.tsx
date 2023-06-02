import React from 'react'
import logo from '@/presentation/assets/logo.svg'

import '@/presentation/components/logo/style/style.scss'

type Props = {
  className?: string;
}

export const CustomLogoComponent: React.FC<Props> = ({ className }) => {
  return (<>
    <div className={className}>
      <div className='logo-container flex-row flex-x-center flex-y-center'>
        <img src={logo} alt='todolist icon logo with a piece of paper and a pen in the right side' />
        <h1>My Todolist</h1>
      </div>
    </div>
  </>)
}