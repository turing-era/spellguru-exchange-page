import Box from '@mui/material/Box';
import React, { FC } from 'react';
import NextLink from 'next/link';
import Link from '@mui/material/Link';

export const NavLink: FC<{ label: string; href: string }> = ({
  label,
  href,
}) => {
  return (
    <Box data-testid={`link-${label}`}>
      <Link
        target='_blank'
        href={href}
        underline='none'
        component={NextLink}
        sx={{
          color: '#fff',
          opacity: 0.6,
          ':hover': {
            opacity: 1,
          }
        }}
      >
        {label}
      </Link>
    </Box>
  );
};
