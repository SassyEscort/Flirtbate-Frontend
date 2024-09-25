'use client';
import { User } from 'app/(guest)/layout';
import { ROLE } from 'constants/workerVerification';
import { Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useContext } from 'react';

export type AuthContextProps = {
  session: Session | null;
  isCustomer: boolean;
  user: string | undefined;
};

const AuthContext = createContext<AuthContextProps>({
  session: null,
  isCustomer: false,
  user: ''
});

export const AuthFeaturProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  const user = (session?.user as User)?.picture;
  const providerData = JSON.parse(user || '{}');
  const isCustomer = providerData?.role === ROLE.CUSTOMER;

  return <AuthContext.Provider value={{ session, isCustomer, user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext);
  return context;
};
