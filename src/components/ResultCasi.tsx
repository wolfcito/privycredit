import { AlertCircle, TrendingUp, Bell, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
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

const improvements = [
  {
    factor: 'Estabilidad',
    action: '+1 mes de continuidad en saldos',
    impact: 'Alto',
  },
  {
    factor: 'Inflows',
    action: 'Aumentar frecuencia de depósitos',
    impact: 'Medio',
  },
  {
    factor: 'Riesgo',
    action: 'Mantener saldo dentro de banda estable',
    impact: 'Alto',
  },
];

export default function ResultCasi() {
  const { currentProof, setCurrentScreen } = useApp();

  if (!currentProof) {
    setCurrentScreen('landing');
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex bg-yellow-500/20 rounded-full p-6 mb-4">
            <AlertCircle className="w-16 h-16 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">Casi allí</h1>
          <p className="text-gray-300 text-lg">
            Estás cerca de cumplir todos los criterios
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Tu evaluación actual</h2>

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

          <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-xl p-4 mb-6">
            <p className="text-yellow-200 text-sm">
              Mejorando algunos factores podrías alcanzar el estado "Apto" pronto.
            </p>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Mejoras sugeridas</h2>
          <p className="text-gray-400 text-sm mb-6">
            Estos cambios te acercarán a una evaluación "Apto":
          </p>

          <div className="space-y-3 mb-6">
            {improvements.map((item, index) => (
              <div key={index} className="p-4 bg-gray-700/30 rounded-xl">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white">{item.factor}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.impact === 'Alto'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    Impacto {item.impact}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{item.action}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentScreen('simulator')}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-semibold transition-all"
            >
              <TrendingUp className="w-5 h-5" />
              Abrir simulador
            </button>

            <button
              onClick={() => setCurrentScreen('reminders')}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold transition-all"
            >
              <Bell className="w-5 h-5" />
              Recordarme en 30 días
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
          <button
            onClick={() => setCurrentScreen('checklist')}
            className="w-full flex items-center justify-between text-white hover:text-blue-400 transition-colors"
          >
            <span className="font-medium">Ver lista de mejoras completa</span>
            <Eye className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-blue-900/30 border border-blue-500/50 rounded-2xl p-4 mb-6 text-center">
          <p className="text-blue-200 text-sm">
            <strong>Tu privacidad está protegida.</strong> Estos datos permanecen privados y solo tú los ves.
          </p>
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
