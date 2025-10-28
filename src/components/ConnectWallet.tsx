import { useState } from 'react';
import { Shield, CheckCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useWeb3 } from '../context/Web3Context';
import { SCROLL_SEPOLIA_NAME } from '../lib/contract';

export default function ConnectWallet() {
  const { setCurrentScreen } = useApp();
  const { account, isConnecting, error, connect } = useWeb3();
  const [consentData, setConsentData] = useState(false);
  const [consentPrivacy, setConsentPrivacy] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const canContinue = account && consentData && consentPrivacy;

  const handleContinue = () => {
    if (canContinue) {
      setCurrentScreen('generate');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-card to-dark py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex bg-accent/20 rounded-full p-4 mb-4">
            <Shield className="w-12 h-12 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-light mb-2">Conecta y autoriza</h1>
          <p className="text-gray-400">
            Necesitamos tu permiso para generar una prueba sellada
          </p>
        </div>

        <div className="bg-dark-card/50 backdrop-blur-sm rounded-3xl border border-dark-border p-8 mb-6">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-light mb-4">1. Conecta tu wallet</h2>
            {!account ? (
              <>
                <p className="text-gray-400 text-sm mb-4">
                  Usaremos tu wallet para analizar señales on-chain y generar tu prueba.
                  Tu información no se comparte con terceros.
                </p>
                {error && (
                  <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={connect}
                  disabled={isConnecting}
                  className="w-full bg-accent hover:bg-primary-dark disabled:bg-gray-600 text-light py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
                >
                  {isConnecting ? 'Conectando...' : 'Conectar Wallet'}
                </button>
                <p className="text-xs text-gray-500 mt-3 text-center">
                  Se abrirá MetaMask u otra wallet compatible en {SCROLL_SEPOLIA_NAME}
                </p>
              </>
            ) : (
              <div className="flex items-center gap-3 bg-green-900/30 border border-green-500/50 rounded-xl p-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-light font-medium text-sm mb-1">Wallet conectada</p>
                  <p className="text-gray-400 text-xs font-mono truncate">
                    {account}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-light mb-4">
              2. Otorga consentimiento
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Lee y acepta los siguientes términos en lenguaje claro:
            </p>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 bg-dark-card/30 rounded-xl cursor-pointer hover:bg-dark-card/50 transition-colors">
                <input
                  type="checkbox"
                  checked={consentData}
                  onChange={(e) => setConsentData(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-dark-border text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <div className="flex-1">
                  <p className="text-light text-sm font-medium mb-1">
                    Analizar mi actividad on-chain
                  </p>
                  <p className="text-gray-400 text-xs">
                    Permitimos que PrivyCredit analice transacciones y saldos de tu wallet
                    para calcular factores de crédito (estabilidad, inflows, riesgo).
                  </p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 bg-dark-card/30 rounded-xl cursor-pointer hover:bg-dark-card/50 transition-colors">
                <input
                  type="checkbox"
                  checked={consentPrivacy}
                  onChange={(e) => setConsentPrivacy(e.target.checked)}
                  className="mt-1 w-5 h-5 rounded border-dark-border text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <div className="flex-1">
                  <p className="text-light text-sm font-medium mb-1">
                    Generar prueba sellada sin PII
                  </p>
                  <p className="text-gray-400 text-xs">
                    Entiendo que se generará una prueba con bandas (A/B/C) sin revelar
                    montos exactos, contrapartes ni información personal identificable.
                  </p>
                </div>
              </label>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <ExternalLink className="w-3 h-3" />
              <a href="#" className="hover:text-accent transition-colors">
                Términos de servicio
              </a>
              <span>·</span>
              <a href="#" className="hover:text-accent transition-colors">
                Política de privacidad
              </a>
            </div>
          </div>

          <button
            onClick={() => setShowHelp(!showHelp)}
            className="text-accent hover:text-accent text-sm mb-4 transition-colors"
          >
            {showHelp ? '▼' : '▶'} ¿Qué es una prueba sellada?
          </button>

          {showHelp && (
            <div className="bg-dark-card/30 border border-accent/50 rounded-xl p-4 mb-6">
              <p className="text-light text-sm leading-relaxed">
                Una <strong>prueba sellada</strong> es una verificación criptográfica que
                demuestra que cumples ciertos criterios (como estabilidad financiera) sin
                revelar los datos exactos que lo prueban. Es como mostrar que eres mayor
                de edad sin enseñar tu fecha de nacimiento exacta.
              </p>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full bg-accent hover:bg-primary-dark disabled:bg-gray-600 disabled:cursor-not-allowed text-light py-3 rounded-xl font-semibold transition-all"
          >
            Continuar
          </button>

          {!canContinue && account && (
            <p className="text-center text-xs text-gray-500 mt-3">
              Acepta ambos consentimientos para continuar
            </p>
          )}
        </div>

        <button
          onClick={() => setCurrentScreen('landing')}
          className="text-gray-400 hover:text-light text-sm transition-colors mx-auto block"
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}
