import { ChevronLeft, TrendingUp, Download, Bell, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Improvement } from '../types';

const getImpactColor = (impact: string) => {
  switch (impact) {
    case 'alto':
      return 'bg-primary/20 text-primary border-primary/200';
    case 'medio':
      return 'bg-amber-100 text-amber-700 border-amber-200';
    case 'bajo':
      return 'bg-gray-100 text-gray-300 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-300 border-gray-200';
  }
};

export default function ImprovementChecklist() {
  const { currentProof, setCurrentScreen } = useApp();

  if (!currentProof) {
    return null;
  }

  const improvements: Improvement[] = [];

  if (currentProof.factors.estabilidad !== 'A') {
    improvements.push({
      title: 'Mejorar estabilidad de wallet',
      description: 'Mantén tu wallet activa y con transacciones por +1 mes consecutivo',
      impact: 'alto',
    });
  }

  if (currentProof.factors.inflows !== 'A') {
    improvements.push({
      title: 'Aumentar frecuencia de ingresos',
      description: 'Recibe pagos de forma más regular para mejorar tu banda de inflows',
      impact: 'alto',
    });
  }

  if (currentProof.factors.riesgo !== 'A') {
    improvements.push({
      title: 'Reducir volatilidad de saldo',
      description: 'Evita drawdowns mayores al 30% manteniendo un saldo más estable',
      impact: 'medio',
    });
  }

  improvements.push({
    title: 'Mantener historial limpio',
    description: 'Evita liquidaciones en protocolos DeFi para mantener bajo riesgo',
    impact: 'medio',
  });

  improvements.push({
    title: 'Diversificar fuentes de ingreso',
    description: 'Recibe pagos de múltiples fuentes para demostrar mayor estabilidad',
    impact: 'bajo',
  });

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <button
          onClick={() => setCurrentScreen('result-casi')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="bg-dark-card rounded-[2.5rem] shadow-xl p-8 sm:p-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary rounded-2xl p-3">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white">Plan de mejora</h1>
          </div>

          <p className="text-gray-400 mb-8">
            Sigue estos pasos para mejorar tu resultado y llegar a Apto
          </p>

          <div className="space-y-4 mb-8">
            {improvements.map((improvement, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-6 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-dark-card border-2 border-gray-300 rounded-lg w-10 h-10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-slate-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-white">{improvement.title}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border font-medium ${getImpactColor(
                          improvement.impact
                        )}`}
                      >
                        Impacto {improvement.impact}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {improvement.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-dark-card/50 border border-primary/20 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-white mb-2">Consejo motivador</h3>
            <p className="text-sm text-gray-300">
              Cada mejora te acerca a la aprobación. No necesitas hacerlo todo de una vez.
              Enfócate en los cambios de alto impacto primero y revisa tu progreso en 30 días.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentScreen('reminders')}
              className="flex-1 bg-primary hover:bg-primary-dark text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <Bell className="w-5 h-5" />
              Activar recordatorio
            </button>

            <button className="bg-gray-100 hover:bg-gray-200 text-white px-6 py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
              <Download className="w-5 h-5" />
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
