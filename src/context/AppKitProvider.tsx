import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';

import { networks, projectId, wagmiAdapter } from '../config/wagmi';

const queryClient = new QueryClient();

const metadata = {
  name: 'PrivyCredit',
  description: 'Pruebas selladas on-chain en Scroll',
  url: 'https://privycredit.dev',
  icons: ['https://appkit.reown.com/icon.png'],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: networks[0],
  metadata,
  features: {
    analytics: true,
  },
});

type Props = {
  children: ReactNode;
};

export function AppKitProvider({ children }: Props) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
