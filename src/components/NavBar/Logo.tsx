import Box from '@mui/material/Box';
import Image from "next/image";
import React from 'react';

export const Logo = () => {
  return (
    <Box display='flex' alignItems='center'>
      <Image
        src='/logo.svg'
        alt='SpellGuru Logo'
        width={150}
        height={40}
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </Box>
  );
};
