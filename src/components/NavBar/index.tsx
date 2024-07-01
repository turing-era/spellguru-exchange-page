'use client';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaDiscord } from 'react-icons/fa';
import { SiGitbook } from 'react-icons/si';

import { NavLink } from './NavLink';
import { Logo } from './Logo';
import { External } from './External';
import { UserInfo } from '@/interface/apiInterface/userinfo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useMediaQuery } from '@mui/material';

const drawerWidth = 240;

const navs = [
  {
    label: 'Ecosystem',
    href: 'https://alienx.spellguru.ai/eco',
  },
  {
    label: 'SpellBox',
    href: 'https://exchange.spellguru.ai/',
  },
];

const externalLinks = [
  {
    name: 'x',
    href: 'https://x.com/GuruSpell',
    icon: <FaXTwitter />,
  },
  {
    name: 'discord',
    href: 'https://discord.com/invite/cDZVCyz8ws',
    icon: <FaDiscord />,
  },
  {
    name: 'gitbook',
    href: 'https://gitbook.spellguru.ai',
    icon: <SiGitbook />,
  },
];

export const NavBar = ({userInfo}: {userInfo: UserInfo | undefined}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ my: 2, justifyContent: 'center', display: 'flex' }}>
        <Logo />
      </Box>
      <Divider />
      <List>
        {navs.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText
                primary={<NavLink label={item.label} href={item.href} />}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
      >
        <External externalLinks={externalLinks} userInfo={userInfo} />
      </Box>
      <Box sx={{ my: 2 }} className={ userInfo ? "custom-connect-btn-userInfo-sm" : "custom-connect-btn-sm"}>
        <ConnectButton key='drawerConnectBtn' accountStatus={'avatar'} chainStatus='none' showBalance={false}></ConnectButton>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        component='nav'
        color='transparent'
        position='static'
        elevation={0}
        className="h-[100px] py-[18px] px-[0px] md:px-[24px]"
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <Stack direction='row' spacing={{ sm: '1rem', md: '4rem'}} useFlexGap flexWrap='nowrap'>
              <Logo />

              {/* nav links */}
              <Stack
                direction='row'
                spacing={{ sm: '1rem', md: '2rem'}}
                useFlexGap
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                {navs.map((nav) => (
                  <Box
                    key={nav.label}
                    data-testid={`nav-${nav.label}`}
                    display='flex'
                    alignItems='center'
                  >
                    <NavLink label={nav.label} href={nav.href} />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* external links */}
          <Box
            sx={{ display: { xs: 'none', sm: 'block' }, marginLeft: '1rem' }}
          >
            <External externalLinks={externalLinks} userInfo={userInfo} />
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

/**
 * 


      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
 * 
 * 
 */
