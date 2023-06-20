'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Box, ButtonBase } from '@mui/material';
import { Logout } from '@mui/icons-material';

import User from '../User/User';

import css from './Header.module.css';

export const Header = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  const [pathName, setPathName] = useState<string>('');

  useEffect(() => setPathName(location.pathname));

  const router = useRouter();
  
  const userName = async (): Promise<void> => {
    const API_URL = process.env.API_URL;
    const user_id = localStorage.getItem('user_id');
    const refreshToken = localStorage.getItem('refresh_token');

    if (!user_id || !refreshToken) {
      router.push('/401');
    } else {
      const id = JSON.parse(user_id || '');
      const token = JSON.parse(refreshToken || '');
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };
    
      try {
        const response: Response = await fetch(`${API_URL}/user`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ user_id: id })
        });
    
        const data = await response.json();     
        if (response.status === 200) {
          localStorage.setItem('refresh_token', JSON.stringify(data.token));
          setName(data.name);
        }
    
        if (response.status === 201) {
          const refreshToken = data;
          localStorage.setItem('refresh_token', JSON.stringify(refreshToken));
          window.location.reload();
        }
      } catch (err) {
        return console.log(err);
      }
    }    
  }

  useEffect(() => { userName() }, []);
  
  return (
    <Box className={css.header}>
      <User name={name} />
      <Box className={css.headerArea}>
        <Link 
          href='/home/to_do_list' 
          className={pathName === '/home/to_do_list' ? css.activate : css.link}
        >
          To-do list
        </Link>
        <Link 
          id='about_us_link'
          href='/404' 
          className={pathName === '/404' ? css.activate : css.link} 
        >
          About Us
        </Link>
        <Link 
          id='our_project_link'
          href='/404' 
          className={pathName === '/404' ? css.activate : css.link}
        >
          Our projects
        </Link>
        <ButtonBase 
          id='logout'
          onClick={() => {
            localStorage.setItem('user_id', '');
            localStorage.setItem('refresh_token', '');
            router.push('/');
        }}>
          <Logout
            sx={{
              color: 'white'
            }}
          />
        </ButtonBase>
      </Box>
    </Box>
  );
};