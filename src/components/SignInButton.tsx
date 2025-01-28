'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@mui/material';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Button
        variant="contained"
        onClick={() => signOut()}
        color="primary"
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button
      variant="contained"
      onClick={() => signIn('google')}
      color="primary"
    >
      Sign In
    </Button>
  );
} 