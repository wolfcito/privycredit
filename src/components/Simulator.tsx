import { useState } from 'react';
import { ChevronLeft, RotateCcw, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BandLevel } from '../types';

const bandOptions: BandLevel[] = ['A', 'B', 'C'];

const getBandColor = (band: BandLevel) => {
  switch (band) {
    case 'A':
      return 'bg-emerald-500 hover:bg-primary';
    case 'B':
      return 'bg-amber-500 hover:bg-amber-600';
    case 'C':
      return 'bg-red-500 hover:bg-red-600';
  }
};

const calculateStatus = (estabilidad: BandLevel, inflows: BandLevel, riesgo: BandLevel) => {
  if (estabilidad === 'A' && inflows === 'A' && riesgo === 'A') {
    return 'apto';
  }
  return 'casi';
};

export default function Simulator() {
  const { currentProof, setCurrentScreen } = useApp();

  const [estabilidad, setEstabilidad] = useState<BandLevel>(
    currentProof?.factors.estabilidad || 'B'
  );
  const [inflows, setInflows] = useState<BandLevel>(currentProof?.factors.inflows || 'B');
  const [riesgo, setRiesgo] = useState<BandLevel>(currentProof?.factors.riesgo || 'B');

  const status = calculateStatus(estabilidad, inflows, riesgo);

  const reset = () => {
    if (currentProof) {
      setEstabilidad(currentProof.factors.estabilidad);
      setInflows(currentProof.factors.inflows);
      setRiesgo(currentProof.factors.riesgo);
    }
  };

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6">
        <button
          onClick={() =>
            setCurrentScreen(currentProof?.status === 'apto' ? 'result-apto' : 'result-casi')
          }
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
            <h1 className="text-3xl font-bold text-white">Simulador de bandas</h1>
          </div>

          <p className="text-gray-400 mb-8">
            Ajusta las bandas para ver cómo cambiaría tu resultado
          </p>

          <div
            className={`rounded-[2rem] p-6 mb-8 text-center ${
              status === 'apto'
                ? 'bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-primary/300'
                : 'bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300'
            }`}
          >
            <h2 className="text-sm font-semibold text-gray-400 mb-2">Resultado simulado</h2>
            <p
              className={`text-4xl font-bold ${
                status === 'apto' ? 'text-primary' : 'text-amber-600'
              }`}
            >
              {status === 'apto' ? '¡Apto!' : 'Casi...'}
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Estabilidad
              </label>
              <div className="flex gap-2">
                {bandOptions.map((band) => (
                  <button
                    key={band}
                    onClick={() => setEstabilidad(band)}
                    className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all ${
                      estabilidad === band
                        ? `${getBandColor(band)} ring-4 ring-offset-2 ${
                            band === 'A'
                              ? 'ring-emerald-200'
                              : band === 'B'
                              ? 'ring-amber-200'
                              : 'ring-red-200'
                          }`
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    Banda {band}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {estabilidad === 'A' && 'Wallet activa +6 meses con continuidad'}
                {estabilidad === 'B' && 'Wallet activa 3-6 meses'}
                {estabilidad === 'C' && 'Wallet activa <3 meses o con gaps'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Ingresos</label>
              <div className="flex gap-2">
                {bandOptions.map((band) => (
                  <button
                    key={band}
                    onClick={() => setInflows(band)}
                    className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all ${
                      inflows === band
                        ? `${getBandColor(band)} ring-4 ring-offset-2 ${
                            band === 'A'
                              ? 'ring-emerald-200'
                              : band === 'B'
                              ? 'ring-amber-200'
                              : 'ring-red-200'
                          }`
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    Banda {band}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {inflows === 'A' && 'Inflows regulares y consistentes'}
                {inflows === 'B' && 'Inflows moderados con variación'}
                {inflows === 'C' && 'Inflows irregulares o bajos'}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-white mb-3">Riesgo</label>
              <div className="flex gap-2">
                {bandOptions.map((band) => (
                  <button
                    key={band}
                    onClick={() => setRiesgo(band)}
                    className={`flex-1 py-3 rounded-2xl font-semibold text-white transition-all ${
                      riesgo === band
                        ? `${getBandColor(band)} ring-4 ring-offset-2 ${
                            band === 'A'
                              ? 'ring-emerald-200'
                              : band === 'B'
                              ? 'ring-amber-200'
                              : 'ring-red-200'
                          }`
                        : 'bg-gray-200 text-gray-400 hover:bg-gray-300'
                    }`}
                  >
                    Banda {band}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {riesgo === 'A' && 'Sin liquidaciones, drawdown <15%'}
                {riesgo === 'B' && 'Drawdown 15-30%, riesgo moderado'}
                {riesgo === 'C' && 'Liquidaciones o drawdown >30%'}
              </p>
            </div>
          </div>

          <div className="bg-dark-card/50 border border-primary/20 rounded-2xl p-6 mb-6">
            <h3 className="font-semibold text-white mb-2">Nota educativa</h3>
            <p className="text-sm text-gray-300">
              Este simulador muestra cómo las mejoras en cada banda afectan tu resultado.
              Los valores exactos permanecen privados. Para llegar a Apto, todas las bandas
              deben estar en nivel A.
            </p>
          </div>

          <button
            onClick={reset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-white py-4 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Restablecer valores originales
          </button>
        </div>
      </div>
    </div>
  );
}
