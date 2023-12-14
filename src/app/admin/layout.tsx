import * as React from 'react';
import { DRAWER_WIDTH } from '@/constants/ui.constants';
import Box from '@mui/material/Box';
import NavBar from '@/components/NavBar/NavBar.component';
import SideBar from '@/components/NavBar/SideBar.component';
import { Providers } from '../providers';

export const metadata = {
  title: 'Ultiverse Admin',
  description: 'Password protected',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <NavBar title="Ultiverse" />
            <SideBar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    ml: `${DRAWER_WIDTH}px`,
                    mt: ['48px', '56px', '64px'],
                    p: 3,
                }}
            >
                {children}
            </Box>
        </Providers>
      </body>
    </html>
  );
}
