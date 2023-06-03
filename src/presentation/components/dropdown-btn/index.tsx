import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FiX, FiMenu } from 'react-icons/fi';

import { dropdownMenuSlice } from '@/presentation/state-manager/redux-toolkit'

import '@/presentation/components/dropdown-btn/style/style.scss'

type Props = {
  className?: string
}

export const CustomDropdownBtnComponent: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch();
  const isActive: boolean = useSelector((state: any) => state.dropdownMenu.isActive);

  const handleDropdownClick = () => {
    dispatch(dropdownMenuSlice.actions.toggle())
  }

  return (<>
    <button onClick={() => handleDropdownClick()} id='mobile-dropdown' className={className}>
      {isActive ? <FiX /> : <FiMenu />}
    </button>
  </>)
}