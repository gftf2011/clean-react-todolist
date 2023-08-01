import { AiOutlineMenu } from 'react-icons/ai';

import { HiOutlineX } from 'react-icons/hi';

import { FiLoader } from 'react-icons/fi';

import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';

import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaTrashAlt,
} from 'react-icons/fa';

const Trash: React.FC = () => {
  return <FaTrashAlt />;
};

const ScreenLoader: React.FC = () => {
  return <FiLoader />;
};

const LeftArrow: React.FC = () => {
  return <BiLeftArrowAlt />;
};

const RightArrow: React.FC = () => {
  return <BiRightArrowAlt />;
};

const MenuDropdown: React.FC = () => {
  return <AiOutlineMenu />;
};

const CloseMenu: React.FC = () => {
  return <HiOutlineX />;
};

const LinkedIn: React.FC = () => {
  return <FaLinkedin />;
};

const Github: React.FC = () => {
  return <FaGithub />;
};

const Twitter: React.FC = () => {
  return <FaTwitter />;
};

const Instagram: React.FC = () => {
  return <FaInstagram />;
};

export const Icon = {
  ScreenLoader,
  LeftArrow,
  RightArrow,
  MenuDropdown,
  CloseMenu,
  Trash,
  Media: {
    LinkedIn,
    Github,
    Twitter,
    Instagram,
  },
};
