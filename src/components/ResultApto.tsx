import { CheckCircle, Share2, Eye, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCROLL_SEPOLIA_EXPLORER } from '../lib/contract';
import { BandLevel } from '../types';

const getBandColor = (band: BandLevel) => {
  switch (band) {
    case 'A':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'B':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'C':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
  }
};

export default function ResultApto() {
  const { currentProof, setCurrentScreen } = useApp();

  if (!currentProof) {
    setCurrentScreen('landing');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex bg-green-500/20 rounded-full p-6 mb-4">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">¡Apto!</h1>
          <p className="text-gray-300 text-lg">
            Tu perfil cumple los criterios de evaluación
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Factores evaluados</h2>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <h3 className="font-medium text-white mb-1">Estabilidad</h3>
                <p className="text-xs text-gray-400">Consistencia de saldos</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(currentProof.factors.estabilidad)}`}>
                Banda {currentProof.factors.estabilidad}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <h3 className="font-medium text-white mb-1">Inflows</h3>
                <p className="text-xs text-gray-400">Ingresos recurrentes</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(currentProof.factors.inflows)}`}>
                Banda {currentProof.factors.inflows}
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-700/30 rounded-xl">
              <div>
                <h3 className="font-medium text-white mb-1">Riesgo</h3>
                <p className="text-xs text-gray-400">Gestión de volatilidad</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(currentProof.factors.riesgo)}`}>
                Banda {currentProof.factors.riesgo}
              </span>
            </div>
          </div>

          <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-4 mb-6">
            <p className="text-blue-200 text-sm">
              <strong>Privacidad protegida:</strong> Solo se comparten estas bandas.
              Tus montos y contrapartes permanecen privados.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentScreen('share')}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-semibold transition-all"
            >
              <Share2 className="w-5 h-5" />
              Compartir con prestamista
            </button>

            <button
              onClick={() => setCurrentScreen('share')}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold transition-all"
            >
              <Eye className="w-5 h-5" />
              Ver detalles
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
          <h3 className="text-sm font-semibold text-white mb-3">Información de la prueba</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">ID de prueba:</span>
              <span className="text-white font-mono text-xs">
                {currentProof.blockchain_proof_id.substring(0, 10)}...
                {currentProof.blockchain_proof_id.substring(currentProof.blockchain_proof_id.length - 8)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Válida hasta:</span>
              <span className="text-white">
                {new Date(currentProof.expires_at).toLocaleDateString()}
              </span>
            </div>
            {currentProof.tx_hash && (
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Transacción:</span>
                <a
                  href={`${SCROLL_SEPOLIA_EXPLORER}/tx/${currentProof.tx_hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline flex items-center gap-1 text-xs"
                >
                  Ver en blockchain
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen('landing')}
          className="text-gray-400 hover:text-white text-sm transition-colors mx-auto block"
        >
          ← Volver al inicio
        </button>
      </div>
    </div>
  );
}
