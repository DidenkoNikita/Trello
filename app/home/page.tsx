'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';

import { Header } from '@/components/Header/Header';
import { authorizationCheck } from '@/client_service/authorizationCheck';

export default function Home() {

  const router = useRouter();

  useEffect(() => {authorizationCheck(router)})
  return (
    <Box>
      <Header />
      <Box>Trello page</Box>
    </Box>
  );
}