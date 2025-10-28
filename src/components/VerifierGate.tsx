import { useState } from 'react';
import { Shield, Search, AlertCircle } from 'lucide-react';
import { publicClient, CONTRACT_ADDRESS, CONTRACT_ABI, bandToBandLevel } from '../lib/contract';
import { BandLevel } from '../types';

type VerificationResult = {
  user: string;
  epoch: bigint;
  commitment: string;
  stability: BandLevel;
  inflows: BandLevel;
  risk: BandLevel;
  valid: boolean;
  createdAt: bigint;
} | null;

const getBandColor = (band: BandLevel) => {
  switch (band) {
    case 'A':
      return 'bg-accent/20 text-green-400 border-green-500/50';
    case 'B':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'C':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
  }
};

export default function VerifierGate() {
  const [proofId, setProofId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<VerificationResult>(null);

  const handleVerify = async () => {
    if (!proofId || proofId.length < 10) {
      setError('Ingresa un ID de prueba válido');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const proofIdHex = proofId.startsWith('0x') ? proofId as `0x${string}` : `0x${proofId}` as `0x${string}`;

      const data = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'getProofSummary',
        args: [proofIdHex],
      });

      const [user, epoch, commitment, stability, inflows, risk, valid, createdAt] = data;

      if (!valid) {
        setError('Esta prueba ha sido revocada o no existe');
        return;
      }

      setResult({
        user: user as string,
        epoch,
        commitment: commitment as string,
        stability: bandToBandLevel(Number(stability)),
        inflows: bandToBandLevel(Number(inflows)),
        risk: bandToBandLevel(Number(risk)),
        valid,
        createdAt,
      });
    } catch (err: any) {
      console.error('Verification error:', err);
      setError('No se pudo verificar la prueba. Verifica el ID e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    const isApto = result.stability === 'A' && result.inflows === 'A' && result.risk === 'A';

    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-card to-dark py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className={`inline-flex rounded-full p-6 mb-4 ${
              isApto ? 'bg-accent/20' : 'bg-yellow-500/20'
            }`}>
              <Shield className={`w-16 h-16 ${isApto ? 'text-green-400' : 'text-yellow-400'}`} />
            </div>
            <h1 className="text-3xl font-bold text-light mb-3">
              {isApto ? 'Verificación: Apto' : 'Verificación: Requiere revisión'}
            </h1>
            <p className="text-light">Resultado de la prueba sellada</p>
          </div>

          <div className="bg-dark-card/50 backdrop-blur-sm rounded-3xl border border-dark-border p-8 mb-6">
            <h2 className="text-xl font-semibold text-light mb-6">Factores evaluados</h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-dark-card/30 rounded-xl">
                <div>
                  <h3 className="font-medium text-light mb-1">Estabilidad</h3>
                  <p className="text-xs text-gray-400">Consistencia de saldos</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(result.stability)}`}>
                  Banda {result.stability}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-card/30 rounded-xl">
                <div>
                  <h3 className="font-medium text-light mb-1">Inflows</h3>
                  <p className="text-xs text-gray-400">Ingresos recurrentes</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(result.inflows)}`}>
                  Banda {result.inflows}
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-card/30 rounded-xl">
                <div>
                  <h3 className="font-medium text-light mb-1">Riesgo</h3>
                  <p className="text-xs text-gray-400">Gestión de volatilidad</p>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getBandColor(result.risk)}`}>
                  Banda {result.risk}
                </span>
              </div>
            </div>

            <div className="bg-dark-card/30 border border-accent/50 rounded-xl p-4 mb-6">
              <p className="text-light text-sm">
                <strong>Sin PII:</strong> Esta verificación no expone montos, contrapartes
                ni información personal del usuario. Solo muestra bandas de evaluación.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <button className="bg-accent hover:bg-primary-dark text-dark py-3 rounded-xl font-semibold transition-all">
                Solicitar underwriting
              </button>
              <button className="bg-dark-card hover:bg-gray-600 text-light py-3 rounded-xl font-semibold transition-all">
                Descargar constancia
              </button>
            </div>
          </div>

          <div className="bg-dark-card/50 backdrop-blur-sm rounded-2xl border border-dark-border p-6 mb-6">
            <h3 className="text-sm font-semibold text-light mb-3">Metadatos de la prueba</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Usuario:</span>
                <span className="text-light font-mono text-xs">
                  {result.user.substring(0, 6)}...{result.user.substring(result.user.length - 4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Época:</span>
                <span className="text-light">{result.epoch.toString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Creada:</span>
                <span className="text-light">
                  {new Date(Number(result.createdAt) * 1000).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Estado:</span>
                <span className="text-green-400 font-semibold">Válida</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setResult(null);
              setProofId('');
            }}
            className="text-gray-400 hover:text-light text-sm transition-colors mx-auto block"
          >
            ← Verificar otra prueba
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark-card to-dark py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex bg-accent/20 rounded-full p-6 mb-4">
            <Shield className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-light mb-3">Portal de Verificación</h1>
          <p className="text-light">
            Para prestamistas e instituciones financieras
          </p>
        </div>

        <div className="bg-dark-card/50 backdrop-blur-sm rounded-3xl border border-dark-border p-8 mb-6">
          <h2 className="text-xl font-semibold text-light mb-4">Verificar prueba</h2>
          <p className="text-gray-400 text-sm mb-6">
            Ingresa el ID de prueba que te compartió el cliente para ver su resultado
            y bandas de evaluación sin exponer información personal.
          </p>

          {error && (
            <div className="bg-red-900/50 border border-red-500 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-200 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-light mb-2">
              ID de prueba o enlace
            </label>
            <input
              type="text"
              value={proofId}
              onChange={(e) => setProofId(e.target.value)}
              placeholder="0x..."
              className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-primary-dark disabled:bg-gray-600 text-light py-3 rounded-xl font-semibold transition-all disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Verificando...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Verificar ahora
              </>
            )}
          </button>
        </div>

        <div className="bg-dark-card/30 border border-accent/50 rounded-2xl p-6 text-center">
          <h3 className="font-semibold text-light mb-2">¿Qué verás?</h3>
          <p className="text-light text-sm">
            Resultado (Apto/Casi) y bandas por factor. No se exponen montos,
            contrapartes ni información personal del cliente.
          </p>
        </div>
      </div>
    </div>
  );
}
