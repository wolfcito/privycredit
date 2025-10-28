import { Shield, Lock, CheckCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SCROLL_SEPOLIA_NAME, SCROLL_SEPOLIA_EXPLORER, CONTRACT_ADDRESS } from '../lib/contract';

export default function Landing() {
  const { setCurrentScreen } = useApp();

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-16">
        <div className="bg-blue-900/30 border border-blue-500/50 rounded-2xl p-4 mb-8 text-center">
          <p className="text-sm text-blue-200">
            Esta demo funciona en <strong>{SCROLL_SEPOLIA_NAME}</strong> -{' '}
            <a
              href={SCROLL_SEPOLIA_EXPLORER}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-100"
            >
              Ver explorador
            </a>
          </p>
        </div>

        <div className="flex items-center justify-center mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-[2.5rem] p-6 shadow-2xl">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
          </div>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4 leading-tight">
            PrivyCredit
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-2">
            Crédito sin destapar tu vida
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Demuestra tu solvencia sin revelar montos ni contrapartes.
            Una prueba sellada que protege tu privacidad.
          </p>
        </div>

        <div className="text-center mb-16">
          <button
            onClick={() => setCurrentScreen('connect')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all transform hover:scale-105"
          >
            Probar ahora
          </button>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-[2.5rem] border border-gray-700 shadow-2xl p-8 sm:p-12 mb-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Cómo funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-3xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">1</span>
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">Conecta</h3>
              <p className="text-gray-400 text-sm">
                Vincula tu wallet para analizar tus señales on-chain
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-3xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">Genera prueba</h3>
              <p className="text-gray-400 text-sm">
                Creamos una prueba sellada sin exponer tus datos
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-3xl w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-400">3</span>
              </div>
              <h3 className="font-semibold text-white mb-2 text-lg">Obtén respuesta</h3>
              <p className="text-gray-400 text-sm">
                Comparte con prestamistas o mejora tu perfil
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8">
            <Lock className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Privacidad total
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tus montos, contrapartes y actividad permanecen privados.
              Solo compartimos bandas de evaluación sin revelar información sensible.
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8">
            <CheckCircle className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">
              Prueba verificable
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Cada prueba se registra en blockchain y puede ser verificada
              por prestamistas sin necesidad de revelar tu información personal.
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-[2.5rem] border border-gray-700 shadow-2xl p-8 sm:p-12 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Aliados de confianza
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            <div className="text-gray-500 font-semibold">Cooperativa A</div>
            <div className="text-gray-500 font-semibold">Fintech B</div>
            <div className="text-gray-500 font-semibold">Banco C</div>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-blue-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">No vemos tus números</span>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6 text-center">
          <h3 className="text-sm font-semibold text-white mb-3">Smart Contract Verificado</h3>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
            <Shield className="w-4 h-4 text-blue-400" />
            <code className="text-xs bg-gray-700 px-2 py-1 rounded">
              {CONTRACT_ADDRESS.substring(0, 10)}...{CONTRACT_ADDRESS.substring(CONTRACT_ADDRESS.length - 8)}
            </code>
            <a
              href={`${SCROLL_SEPOLIA_EXPLORER}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center gap-1"
            >
              Ver contrato
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-2">Desplegado en {SCROLL_SEPOLIA_NAME}</p>
        </div>
      </div>
    </div>
    </>
  );
}
