import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Address } from 'viem';
import { SCROLL_SEPOLIA_CHAIN_ID, SCROLL_SEPOLIA_NAME, SCROLL_SEPOLIA_RPC, SCROLL_SEPOLIA_EXPLORER } from '../lib/contract';

interface Web3ContextType {
  account: Address | null;
  chainId: number | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<Address | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isConnected = account !== null;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0] as Address);
        } else {
          setAccount(null);
        }
      };

      const handleChainChanged = (chainIdHex: string) => {
        setChainId(parseInt(chainIdHex, 16));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0] as Address);
          }
        });

      window.ethereum
        .request({ method: 'eth_chainId' })
        .then((chainIdHex: string) => {
          setChainId(parseInt(chainIdHex, 16));
        });

      return () => {
        window.ethereum.removeAllListeners('accountsChanged');
        window.ethereum.removeAllListeners('chainChanged');
      };
    }
  }, []);

  const connect = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      setError(`Por favor instala MetaMask u otra wallet compatible para usar esta aplicación en ${SCROLL_SEPOLIA_NAME}`);
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length > 0) {
        setAccount(accounts[0] as Address);

        const targetChainId = SCROLL_SEPOLIA_CHAIN_ID;
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

        if (parseInt(currentChainId, 16) !== targetChainId) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${targetChainId.toString(16)}` }],
            });
          } catch (switchError: any) {
            if (switchError.code === 4902) {
              try {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: `0x${targetChainId.toString(16)}`,
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
                throw new Error(`No se pudo agregar ${SCROLL_SEPOLIA_NAME} a tu wallet. Por favor agrégala manualmente.`);
              }
            } else {
              throw switchError;
            }
          }
        }
      }
    } catch (err: any) {
      console.error('Error connecting wallet:', err);
      setError(err.message || `Error al conectar la wallet. Asegúrate de estar en ${SCROLL_SEPOLIA_NAME}.`);
      setAccount(null);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAccount(null);
    setError(null);
  };

  return (
    <Web3Context.Provider
      value={{
        account,
        chainId,
        isConnected,
        isConnecting,
        error,
        connect,
        disconnect,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};
