
import type { Metadata } from 'next';
import { WithProviders } from 'app-flat/providers';
import { ChildrenProps } from 'shared/config/types';

export const metadata: Metadata = {
  title: 'Soraphor',
  description: 'AI + web3'
};

export default function RootLayout ({ children }:ChildrenProps) {
  return <WithProviders>{children}</WithProviders>;
}
