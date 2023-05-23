'use client';

import { Box } from '@mui/material';

import css from './StartingHeader.module.css';
import { Logo } from '../Logo/Logo';

export const StartingHeader = (): JSX.Element => {
  return (
    <Box className={ css.header }>
        <Logo />
    </Box>
  )
}