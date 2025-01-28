'use client';

import { signIn } from 'next-auth/react';
import { Button, Container, Box, Typography } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Typography component="h1" variant="h4">
          Sign in to Manga Reader
        </Typography>
        
        <Button
          variant="outlined"
          size="large"
          startIcon={<FcGoogle />}
          onClick={() => signIn('google', { callbackUrl: '/' })}
          sx={{ width: '100%', maxWidth: 300 }}
        >
          Sign in with Google
        </Button>
      </Box>
    </Container>
  );
} 