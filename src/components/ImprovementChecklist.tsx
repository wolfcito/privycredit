import { CheckSquare, TrendingUp, Save, Bell } from 'lucide-react';
import { useApp } from '../context/AppContext';

const improvements = [
  {
    id: 1,
    factor: 'Estabilidad',
    action: 'Mantener saldo mínimo durante +30 días consecutivos',
    impact: 'Alto',
    description: 'Evita caídas bruscas en tu saldo para demostrar estabilidad financiera',
  },
  {
    id: 2,
    factor: 'Inflows',
    action: 'Incrementar frecuencia de ingresos a semanal',
    impact: 'Alto',
    description: 'Depósitos más frecuentes indican flujos de ingreso consistentes',
  },
  {
    id: 3,
    factor: 'Riesgo',
    action: 'Reducir volatilidad de saldo en 20%',
    impact: 'Medio',
    description: 'Mantén tu saldo dentro de un rango estable sin grandes fluctuaciones',
  },
];

export default function ImprovementChecklist() {
  const { setCurrentScreen } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex bg-green-500/20 rounded-full p-6 mb-4">
            <CheckSquare className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Plan de mejora</h1>
          <p className="text-gray-300">
            Acciones prioritarias para alcanzar el estado "Apto"
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-8 mb-6">
          <div className="space-y-4 mb-8">
            {improvements.map((item) => (
              <div key={item.id} className="bg-gray-700/30 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-white">{item.factor}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.impact === 'Alto'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                          : item.impact === 'Medio'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                          : 'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                      }`}>
                        Impacto {item.impact}
                      </span>
                    </div>
                    <p className="text-white mb-2">{item.action}</p>
                    <p className="text-sm text-gray-400">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-900/30 border border-blue-500/50 rounded-xl p-4 mb-6">
            <p className="text-blue-200 text-sm">
              <strong>Enfoque en pequeños pasos:</strong> No necesitas hacer todo a la vez.
              Empieza por las acciones de alto impacto y verás resultados progresivos.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl font-semibold transition-all">
              <Save className="w-5 h-5" />
              Guardar plan
            </button>

            <button
              onClick={() => setCurrentScreen('reminders')}
              className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-semibold transition-all"
            >
              <Bell className="w-5 h-5" />
              Activar recordatorio
            </button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-6 mb-6">
          <button
            onClick={() => setCurrentScreen('simulator')}
            className="w-full flex items-center justify-between text-white hover:text-blue-400 transition-colors"
          >
            <span className="font-medium">Simular impacto de mejoras</span>
            <TrendingUp className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => setCurrentScreen('result-casi')}
          className="text-gray-400 hover:text-white text-sm transition-colors mx-auto block"
        >
          ← Volver a resultados
        </button>
      </div>
    </div>
  );
}
