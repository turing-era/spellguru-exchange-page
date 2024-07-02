import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import React, { FC, ReactNode } from 'react';

type Props = {
  label: string;
  icon: ReactNode;
  href: string;
  isSmScreen: boolean;
};

export const SpellButton: FC<Props> = ({ href, label, icon, isSmScreen }) => {
  return (
    <Box sx={{display: 'inline-block'}}>
      <NextLink color='inherit' href={href} target='_blank'>
        <Button
          sx={{
            width: 120,
            py: '2px',
            px: '2px',
            border: '2px solid #F8E256',
            color: '#fff',
            borderRadius: '20px',
            fontSize: isSmScreen ? '14px' : '16px',
            ':hover': {
              borderRadius: '20px',
            },
          }}
          startIcon={icon}
        >
          {label}
        </Button>
      </NextLink>
    </Box>
  );
};
