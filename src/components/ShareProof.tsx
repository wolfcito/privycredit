import { useState } from 'react';
import { Share2, Copy, CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCROLL_SEPOLIA_EXPLORER } from '../lib/contract';

export default function ShareProof() {
  const { currentProof, setCurrentScreen } = useApp();
  const [copied, setCopied] = useState(false);

  if (!currentProof) {
    setCurrentScreen('landing');
    return null;
  }

  const shareLink = `https://privycredit.app/verify/${currentProof.blockchain_proof_id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const daysUntilExpiry = Math.ceil(
    (new Date(currentProof.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex bg-blue-500/20 rounded-full p-6 mb-4">
            <Share2 className="w-16 h-16 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Compartir prueba</h1>
          <p className="text-gray-300">
            Genera un enlace seguro para compartir con prestamistas
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Enlace de verificación</h2>

          <div className="bg-gray-700/50 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-yellow-400 flex-shrink-0" />
              <p className="text-sm text-gray-300">
                Este enlace expira en <strong className="text-white">{daysUntilExpiry} días</strong>
              </p>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3 mb-3">
              <p className="text-sm text-gray-400 font-mono break-all">{shareLink}</p>
            </div>
            <button
              onClick={handleCopy}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition-all"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar enlace
                </>
              )}
            </button>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-4 mb-6">
            <p className="text-blue-200 text-sm leading-relaxed">
              <strong>Qué se comparte:</strong> Este enlace solo muestra tu resultado
              (Apto/Casi) y las bandas por factor. No se revelan montos, contrapartes
              ni información personal.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <h3 className="font-semibold text-white mb-4">Compartir con aliados</h3>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-left transition-all flex items-center justify-between">
                <div>
                  <p className="font-medium text-white mb-1">Cooperativa A</p>
                  <p className="text-xs text-gray-400">Envío directo a su plataforma</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-left transition-all flex items-center justify-between">
                <div>
                  <p className="font-medium text-white mb-1">Fintech B</p>
                  <p className="text-xs text-gray-400">Integración automática</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-xl text-left transition-all flex items-center justify-between">
                <div>
                  <p className="font-medium text-white mb-1">Banco C</p>
                  <p className="text-xs text-gray-400">Portal de solicitudes</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
          <h3 className="text-sm font-semibold text-white mb-3">Detalles de la prueba</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Estado:</span>
              <span className="text-white font-semibold capitalize">{currentProof.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Creada:</span>
              <span className="text-white">
                {new Date(currentProof.created_at).toLocaleDateString()}
              </span>
            </div>
            {currentProof.tx_hash && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Blockchain:</span>
                <a
                  href={`${SCROLL_SEPOLIA_EXPLORER}/tx/${currentProof.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 text-xs"
                >
                  Ver transacción
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen(currentProof.status === 'apto' ? 'result-apto' : 'result-casi')}
          className="text-gray-400 hover:text-white text-sm transition-colors mx-auto block"
        >
          ← Volver a resultados
        </button>
      </div>
    </div>
  );
}
