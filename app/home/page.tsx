'use client';

import { Box } from '@mui/material';

import { Header } from '@/components/Header/Header';

export default function Home(): JSX.Element {

  return (
    <Box>
      <Header />
      <Box>Trello page</Box>
    </Box>
  );
}