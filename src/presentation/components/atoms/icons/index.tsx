import { AiOutlineMenu } from 'react-icons/ai'

import { HiOutlineX } from 'react-icons/hi'

import { FiLoader } from 'react-icons/fi'

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

const ScreenLoader: React.FC = () => {
  return (
    <FiLoader />
  )
}

const MenuDropdown: React.FC = () => {
  return (
    <AiOutlineMenu />
  )
}

const CloseMenu: React.FC = () => {
  return (
    <HiOutlineX />
  )
}

const LinkedIn: React.FC = () => {
  return (
    <FaLinkedin />
  )
}

const Github: React.FC = () => {
  return (
    <FaGithub />
  )
}

const Twitter: React.FC = () => {
  return (
    <FaTwitter />
  )
}

const Instagram: React.FC = () => {
  return (
    <FaInstagram />
  )
}

export const Icon = {
  ScreenLoader,
  MenuDropdown,
  CloseMenu,
  Media: {
    LinkedIn,
    Github,
    Twitter,
    Instagram,
  }
}
