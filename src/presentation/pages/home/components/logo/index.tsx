import React from 'react'
import logo from '@/presentation/assets/logo.svg'
import styled from 'styled-components'

const Logo = styled.div`
  width: 168px;
  margin-right: auto;
  grid-area: logo;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const Image = styled.img`
  max-height: 48px;
`

const H1 = styled.h1`
  margin-left: 8px;
  font-size: 16px;
`

export const LogoComponent: React.FC = () => (
  <Logo>
    <Image src={logo} alt='todolist icon logo with a piece of paper and a pen in the right side' />
    <H1>My Todolist</H1>
  </Logo>
)