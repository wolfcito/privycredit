import { AlertCircle, TrendingUp, Bell, ChevronRight, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BandLevel } from '../types';

const getBandColor = (band: BandLevel) => {
  switch (band) {
    case 'A':
      return 'bg-primary/20 text-primary border-primary/200';
    case 'B':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'C':
      return 'bg-red-100 text-red-700 border-red-200';
  }
};

const getBandLabel = (band: BandLevel) => {
  switch (band) {
    case 'A':
      return 'Alto';
    case 'B':
      return 'Medio';
    case 'C':
      return 'Bajo';
  }
};

export default function ResultCasi() {
  const { currentProof, setCurrentScreen } = useApp();

  if (!currentProof) {
    return null;
  }

  const factors = [
    { key: 'estabilidad', label: 'Estabilidad', value: currentProof.factors.estabilidad },
    { key: 'inflows', label: 'Ingresos', value: currentProof.factors.inflows },
    { key: 'riesgo', label: 'Riesgo', value: currentProof.factors.riesgo },
  ];

  const improvements = [];

  if (currentProof.factors.estabilidad !== 'A') {
    improvements.push({
      title: 'Mejorar estabilidad',
      description: 'Mantén tu wallet activa por +1 mes consecutivo',
      impact: 'alto' as const,
    });
  }

  if (currentProof.factors.inflows !== 'A') {
    improvements.push({
      title: 'Aumentar banda de ingresos',
      description: 'Incrementa la frecuencia de tus inflows',
      impact: 'alto' as const,
    });
  }

  if (currentProof.factors.riesgo !== 'A') {
    improvements.push({
      title: 'Reducir exposición al riesgo',
      description: 'Evita drawdowns mayores al 30% en tu saldo',
      impact: 'medio' as const,
    });
  }

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        <div className="bg-dark-card rounded-[2.5rem] shadow-xl p-8 sm:p-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-amber-500 rounded-full p-4">
              <AlertCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-white mb-3 text-center">
            Casi...
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Estás cerca de cumplir los umbrales. Con algunas mejoras podrás calificar como Apto.
          </p>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-[2rem] p-6 mb-8">
            <h3 className="font-semibold text-white mb-4">Bandas por factor</h3>
            <div className="space-y-3">
              {factors.map((factor) => (
                <div key={factor.key} className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">{factor.label}</span>
                  <span
                    className={`px-4 py-2 rounded-lg border font-semibold ${getBandColor(
                      factor.value
                    )}`}
                  >
                    Banda {factor.value} - {getBandLabel(factor.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {improvements.length > 0 && (
            <div className="bg-dark-card/50 border border-primary/20 rounded-[2rem] p-6 mb-8">
              <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Mejoras prioritarias
              </h3>
              <div className="space-y-3">
                {improvements.slice(0, 3).map((improvement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-semibold">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-white">{improvement.title}</h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            improvement.impact === 'alto'
                              ? 'bg-primary/20 text-primary'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          Impacto {improvement.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{improvement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <button
              onClick={() => setCurrentScreen('improvements')}
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              Ver plan de mejora completo
            </button>

            <button
              onClick={() => setCurrentScreen('simulator')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              Abrir simulador
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setCurrentScreen('reminders')}
              className="w-full bg-gray-100 hover:bg-gray-200 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Bell className="w-5 h-5" />
              Recordarme en 30 días
            </button>
          </div>

          <div className="bg-dark-card/50 border border-primary/20 rounded-2xl p-4">
            <p className="text-sm text-gray-300 text-center">
              Tus datos siguen privados. Solo mostramos bandas, no montos exactos.
            </p>
          </div>

          {currentProof.tx_hash && (
            <p className="text-xs text-center mt-4">
              <a
                href={`https://scrollscan.com/tx/${currentProof.tx_hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline inline-flex items-center gap-1"
              >
                Ver en Scrollscan
                <ExternalLink className="w-3 h-3" />
              </a>
            </p>
          )}

          <button
            onClick={() => setCurrentScreen('landing')}
            className="w-full mt-6 text-gray-400 hover:text-white py-2 text-sm transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
