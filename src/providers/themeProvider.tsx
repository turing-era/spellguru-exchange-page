'use client';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Colors } from '@/utils/constants';

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: 'dark',
          primary: Colors.primary,
          secondary: Colors.secondary,
          info: Colors.info,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: ({ ownerState }) => ({
                textTransform: 'none',
                borderRadius: '8px',
                fontSize: '20px',
                fontFamily: '__chirp_713ebb, __chirp_Fallback_713ebb',
                '&:hover': {
                  borderRadius: '8px',
                },
                ...(ownerState.color === 'primary' &&
                ownerState.variant === 'contained'
                  ? { color: '#000' }
                  : {}),
                ...(ownerState.size === 'large' ? { fontWeight: 'bold' } : {}),
              }),
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                background: '#1A1A1A',
                borderRadius: 20,
              },
            },
          },
        },
      })}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
