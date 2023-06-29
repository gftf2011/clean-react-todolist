import { AiOutlineMenu } from 'react-icons/ai'

import { HiOutlineX } from 'react-icons/hi'

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";

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
  MenuDropdown,
  CloseMenu,
  Media: {
    LinkedIn,
    Github,
    Twitter,
    Instagram,
  }
}
