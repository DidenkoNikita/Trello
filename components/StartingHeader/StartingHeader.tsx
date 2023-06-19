'use client';

import { Box } from '@mui/material';

import { Logo } from '../Logo/Logo';

import css from './StartingHeader.module.css';

export const StartingHeader = (): JSX.Element => {
  return (
    <Box className={css.header}>
        <Logo />
    </Box>
  )
}