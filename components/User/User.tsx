'use client';

import { Avatar, Box } from "@mui/material"

import css from './User.module.css'

export interface Name {
  name: string;
}

export default function User({ name }: Name): JSX.Element {
  return (
    <Box className={ css.nameArea }>
      <Avatar
        sx={{
          bgcolor: '#1976d2'
        }} 
      />
      <Box className={ css.name }>{ name }</Box>
    </Box>
  )
}