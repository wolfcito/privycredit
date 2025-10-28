import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';
import { useWeb3 } from '../context/Web3Context';
import { SCROLL_SEPOLIA_CHAIN_ID, SCROLL_SEPOLIA_NAME, SCROLL_SEPOLIA_RPC, SCROLL_SEPOLIA_EXPLORER } from '../lib/contract';

export default function NetworkAlert() {
  const { isConnected, chainId } = useWeb3();
  const [dismissed, setDismissed] = useState(false);

  const isWrongNetwork = isConnected && chainId !== SCROLL_SEPOLIA_CHAIN_ID;

  if (!isWrongNetwork || dismissed) return null;

  const handleSwitchNetwork = async () => {
    if (typeof window === 'undefined' || !window.ethereum) return;

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${SCROLL_SEPOLIA_CHAIN_ID.toString(16)}` }],
      });
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${SCROLL_SEPOLIA_CHAIN_ID.toString(16)}`,
                chainName: SCROLL_SEPOLIA_NAME,
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: [SCROLL_SEPOLIA_RPC],
                blockExplorerUrls: [SCROLL_SEPOLIA_EXPLORER],
              },
            ],
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      }
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4">
      <div className="bg-amber-900/95 backdrop-blur-sm border-2 border-amber-500 rounded-2xl p-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="font-semibold text-light mb-1">Red incorrecta</h3>
            <p className="text-amber-100 text-sm mb-3">
              Esta aplicación solo funciona en {SCROLL_SEPOLIA_NAME}.
              Por favor cambia tu red para continuar.
            </p>
            <button
              onClick={handleSwitchNetwork}
              className="bg-amber-500 hover:bg-amber-600 text-light px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            >
              Cambiar a {SCROLL_SEPOLIA_NAME}
            </button>
          </div>
          <button
            onClick={() => setDismissed(true)}
            className="text-amber-200 hover:text-light transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
