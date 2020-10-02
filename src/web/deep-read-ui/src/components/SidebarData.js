import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Start deep-read',
    path: '/startdeepread',
    icon: <IoIcons.IoMdMailUnread />,
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/aboutus',
    icon: <FaIcons.FaPeopleCarry />,
    cName: 'nav-text'
  }
];
