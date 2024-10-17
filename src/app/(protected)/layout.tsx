import Box from '@mui/material/Box';
import { AuthUser } from 'app/(guest)/layout';
import { PROVIDERCUSTOM_TYPE } from 'constants/signUpConstants';
import dynamic from 'next/dynamic';
import { getLoggedInUser } from 'utils/getSessionData';
import GuestGuard from 'utils/route-guard/GuestGuard';
import Footer from 'views/guestViews/guestLayout/footer';
import Header from 'views/protectedViews/protectedLayout/Header';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const authUser: AuthUser | null = await getLoggedInUser();
  const HeaderGuestComponent = dynamic(() => import('views/guestViews/guestLayout/Header'), {
    ssr: false
  });

  return (
    <GuestGuard>
      <Box>
        {authUser?.user?.provider === PROVIDERCUSTOM_TYPE.PROVIDERCUSTOM ? <Header variant="worker" /> : <HeaderGuestComponent />}
        <main>
          <Box sx={{ mt: 10 }}>{children}</Box>
        </main>
        <Footer />
      </Box>
    </GuestGuard>
  );
}
