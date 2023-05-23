'use client'

import { useRouter } from "next/navigation";

import { ReplyAll } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";


export default function Custom404() {
  const router = useRouter();
  return (
    <Box
      sx={{
        width: '500px',
        height: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
        marginTop: '70px'
      }}
    >
      <Box
        sx={{
          color: 'text.primary',
          fontSize: '20px',
          marginRight: '10px'
        }}
      >
        404 - Page Not Found
      </Box>
      <IconButton onClick={router.back}>
        <ReplyAll />
      </IconButton>
    </Box>
  )
}