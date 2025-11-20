import { AppKitButton, AppKitNetworkButton } from '@reown/appkit/react';
import { useAccount } from 'wagmi';

export default function WalletControls() {
  const { isConnected } = useAccount();

  return (
    <div className="fixed top-4 right-4 z-40">
      <div className="flex flex-wrap items-center justify-end gap-2 bg-dark-card/80 backdrop-blur border border-dark-border/70 rounded-2xl px-3 py-2 shadow-lg">
        {isConnected && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 hidden sm:inline">Red</span>
            <AppKitNetworkButton />
          </div>
        )}
        <AppKitButton />
      </div>
    </div>
  );
}
