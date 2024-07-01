import Stack from '@mui/material/Stack';
import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserInfo } from '@/interface/apiInterface/userinfo';
import { useMediaQuery } from '@mui/material';

type ExternalLinkType = {
  name: string;
  href: string;
  icon: ReactNode;
};

type Props = {
  externalLinks: ExternalLinkType[];
  userInfo: UserInfo | undefined;
};

export const External: FC<Props> = ({ externalLinks, userInfo }) => {
  const connectBtnVisible = useMediaQuery('(min-width:600px)')

  return (
    <Stack flexDirection='row' spacing={{ xs: '2rem', sm: '1rem', md: '2rem'}} useFlexGap flexWrap='nowrap'>
      {externalLinks.map((item) => (
        <Box
          key={item.name}
          style={{
            fontSize: 24,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={() => {
            window.open(item.href, '_blank');
          }}
        >
          {item.icon}
        </Box>
      ))}
      {
        connectBtnVisible ? <Box className={ userInfo ? "" : "custom-connect-btn"}>
          <ConnectButton key='externalConnectBtn' chainStatus='name'
            showBalance={{smallScreen: false, largeScreen: true}}
          />
        </Box>: null
      }
    </Stack>
  );
};
