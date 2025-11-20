import {
  type AppKitNetwork,
  scroll,
  scrollSepolia,
} from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';

const DEFAULT_PROJECT_ID = '1752dca96cdc7b5701287bb6996a2841';

export const projectId =
  import.meta.env.VITE_PROJECT_ID ?? DEFAULT_PROJECT_ID;

if (!projectId) {
  throw new Error('VITE_PROJECT_ID is required for Reown AppKit.');
}

export const networks: [AppKitNetwork, ...AppKitNetwork[]] = [
  scrollSepolia,
  scroll,
];

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false,
});
