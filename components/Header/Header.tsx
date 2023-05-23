'use client';

import React, { useEffect, useState } from 'react';

import { Box, ButtonBase } from '@mui/material';
import { Logout } from '@mui/icons-material';

import Link from 'next/link';

import User from '../User/User';

import { UserUrl } from '@/url/userUrl';

import { useRouter } from 'next/navigation';

import css from './Header.module.css';

export const Header = (): JSX.Element => {
  const [name, setName] = useState<string>('');
  
  const router = useRouter();

  const userName = async (): Promise<void> => {
    const user_id = JSON.parse(localStorage.getItem('user_id') || '')!;
    const refreshToken: string = JSON.parse(localStorage.getItem('refresh_token') || '');
  
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    };

    try {
      const response: Response = await fetch(`${UserUrl}`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ user_id })
      });

      const data = await response.json();     
      if (response.status === 200) {
        localStorage.setItem('refresh_token', JSON.stringify(data.token))
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

  useEffect(() => { userName() }, []);
  

  return (
    <Box className={css.header}>
      <User name={name} />
      <Box className={css.headerArea}>
        <Link href='/home/to_do_list' className={ window.location.pathname == '/home/to_do_list' ? css.activate : css.link } >
          Список дел
        </Link>
        <Link href='/404' className={ window.location.pathname == '/404' ? css.activate : css.link } >
          О нас :
        </Link>
        <Link href='/404' className={ window.location.pathname == '/404' ? css.activate : css.link }>
          Наши проекты :
        </Link>
        <ButtonBase onClick={() => {
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