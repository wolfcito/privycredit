import { useState, useEffect } from 'react';
import { Shield, Loader } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useWeb3 } from '../context/Web3Context';
import {
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  createWalletClientFromProvider,
  bandLevelToBand,
  SCROLL_SEPOLIA_CHAIN_ID,
  SCROLL_SEPOLIA_NAME,
} from '../lib/contract';
import { Proof, BandLevel } from '../types';
import { keccak256, stringToHex } from 'viem';

const steps = [
  { id: 1, label: 'Recopilando señales', description: 'Analizando tu historial on-chain' },
  { id: 2, label: 'Sellando la prueba ZK', description: 'Generando verificación criptográfica' },
  { id: 3, label: 'Anclando en blockchain', description: 'Registrando en Scroll Sepolia' },
  { id: 4, label: 'Listo', description: 'Tu prueba está lista' },
];

const generateMockProof = (): { status: 'apto' | 'casi'; factors: any } => {
  const random = Math.random();

  if (random > 0.5) {
    return {
      status: 'apto',
      factors: {
        estabilidad: 'A' as BandLevel,
        inflows: 'A' as BandLevel,
        riesgo: 'A' as BandLevel,
      },
    };
  } else {
    return {
      status: 'casi',
      factors: {
        estabilidad: 'B' as BandLevel,
        inflows: 'B' as BandLevel,
        riesgo: 'C' as BandLevel,
      },
    };
  }
};

export default function GenerateProof() {
  const { setCurrentScreen, setCurrentProof } = useApp();
  const { account, chainId } = useWeb3();
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!account) return;

    const stepDuration = 8000;
    const updateInterval = 50;
    const progressPerUpdate = (100 / 4) / (stepDuration / updateInterval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + progressPerUpdate;

        if (newProgress >= 25 && currentStep === 1) {
          setCurrentStep(2);
        } else if (newProgress >= 50 && currentStep === 2) {
          setCurrentStep(3);
        } else if (newProgress >= 75 && currentStep === 3) {
          setCurrentStep(4);
        } else if (newProgress >= 100) {
          clearInterval(timer);
          generateProof();
        }

        return Math.min(newProgress, 100);
      });
    }, updateInterval);

    return () => clearInterval(timer);
  }, [account, currentStep]);

  const generateProof = async () => {
    try {
      if (!account) throw new Error('Wallet no autenticada');

      if (chainId !== SCROLL_SEPOLIA_CHAIN_ID) {
        throw new Error(`Red incorrecta. Esta aplicación solo funciona en ${SCROLL_SEPOLIA_NAME} (Chain ID: ${SCROLL_SEPOLIA_CHAIN_ID})`);
      }

      const mockProof = generateMockProof();
      const currentEpoch = Math.floor(Date.now() / (24 * 60 * 60 * 1000));

      const proofId = keccak256(
        stringToHex(`${account}-${currentEpoch}-${Date.now()}`)
      );
      const commitment = keccak256(
        stringToHex(JSON.stringify(mockProof.factors) + Date.now())
      );

      const walletClient = createWalletClientFromProvider();
      if (!walletClient) throw new Error('No se pudo crear el cliente de wallet');

      const [address] = await walletClient.getAddresses();

      const hash = await walletClient.writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'submitProof',
        args: [
          proofId,
          BigInt(currentEpoch),
          commitment,
          bandLevelToBand(mockProof.factors.estabilidad),
          bandLevelToBand(mockProof.factors.inflows),
          bandLevelToBand(mockProof.factors.riesgo),
        ],
        account: address,
      });

      const proof: Proof = {
        id: proofId,
        user_id: account,
        status: mockProof.status,
        factors: mockProof.factors,
        anchor_root: commitment,
        blockchain_proof_id: proofId,
        tx_hash: hash,
        epoch: currentEpoch,
        created_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      };

      setCurrentProof(proof);
      setCurrentScreen(mockProof.status === 'apto' ? 'result-apto' : 'result-casi');
    } catch (err: any) {
      console.error('Error generating proof:', err);
      setError(err.message || 'Error al generar la prueba');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-red-900/50 border border-red-500 rounded-3xl p-8 text-center">
          <div className="bg-red-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold text-white mb-3">Error al generar prueba</h2>
          <p className="text-red-200 text-sm mb-6">{error}</p>
          <button
            onClick={() => setCurrentScreen('connect')}
            className="bg-white text-red-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex bg-blue-500/20 rounded-full p-6 mb-6 animate-pulse">
            <Shield className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">
            Generando tu prueba sellada
          </h1>
          <p className="text-gray-400">
            Esto tomará aproximadamente 30 segundos
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-8">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-400">Progreso</span>
              <span className="text-sm font-bold text-white">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                  currentStep === step.id
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : currentStep > step.id
                    ? 'bg-green-900/20 border border-green-500/50'
                    : 'bg-gray-700/30 border border-gray-600/50'
                }`}
              >
                <div className="flex-shrink-0">
                  {currentStep > step.id ? (
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">✓</span>
                    </div>
                  ) : currentStep === step.id ? (
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <Loader className="w-5 h-5 text-white animate-spin" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm font-bold">{step.id}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </h3>
                  <p className={`text-sm ${
                    currentStep >= step.id ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 rounded-2xl p-4 text-center">
          <p className="text-blue-200 text-sm">
            <strong>Tu información no sale en claro.</strong> Solo se comparten bandas de evaluación.
          </p>
        </div>
      </div>
    </div>
  );
}
