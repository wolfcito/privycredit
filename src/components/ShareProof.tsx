import { useState } from 'react';
import { Copy, Check, QrCode, ChevronLeft, ExternalLink, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { supabase } from '../lib/supabase';

export default function ShareProof() {
  const { currentProof, setCurrentScreen } = useApp();
  const [shareToken, setShareToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateShareLink = async () => {
    if (!currentProof) return;

    setLoading(true);
    setError('');

    try {
      const token = `proof_${Math.random().toString(36).substring(2, 15)}${Math.random()
        .toString(36)
        .substring(2, 15)}`;

      const { error: insertError } = await supabase.from('shares').insert({
        proof_id: currentProof.id,
        token,
        expires_at: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(),
      });

      if (insertError) throw insertError;

      setShareToken(token);
    } catch (err) {
      console.error(err);
      setError('No se pudo generar el enlace. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareToken) return;

    const url = `${window.location.origin}/verify/${shareToken}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  if (!currentProof) {
    return null;
  }

  const shareUrl = shareToken ? `${window.location.origin}/verify/${shareToken}` : '';

  return (
    <div className="min-h-screen bg-dark">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6">
        <button
          onClick={() => setCurrentScreen('result-apto')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <span>Volver</span>
        </button>

        <div className="bg-dark-card rounded-[2.5rem] shadow-xl p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-white mb-3">
            Compartir prueba sellada
          </h1>
          <p className="text-gray-400 mb-8">
            Genera un enlace seguro para compartir tu resultado con prestamistas
          </p>

          {!shareToken ? (
            <div>
              <div className="bg-dark-card/50 border border-primary/20 rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-white mb-3">Qué se comparte:</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Tu resultado (Apto/Casi)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Bandas por factor (Estabilidad, Ingresos, Riesgo)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>Timestamp de generación</span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-white mb-1">Válido por 72 horas</h3>
                    <p className="text-sm text-gray-300">
                      El enlace expirará automáticamente después de 3 días por seguridad.
                    </p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              <button
                onClick={generateShareLink}
                disabled={loading}
                className="w-full bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                {loading ? 'Generando...' : 'Generar enlace seguro'}
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-emerald-50 border border-primary/200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Check className="w-5 h-5" />
                  <span className="font-semibold">Enlace generado</span>
                </div>
                <p className="text-sm text-gray-300">
                  Tu enlace está listo. Compártelo con el prestamista.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-400 font-mono break-all">{shareUrl}</p>
              </div>

              <div className="flex gap-3 mb-8">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copiar enlace
                    </>
                  )}
                </button>

                <button className="bg-gray-100 hover:bg-gray-200 text-white px-6 py-3 rounded-2xl font-semibold transition-colors flex items-center justify-center gap-2">
                  <QrCode className="w-5 h-5" />
                  QR
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="font-semibold text-white mb-4">Envío directo a aliados</h3>
                <div className="space-y-2">
                  <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-white py-3 rounded-2xl font-medium transition-colors flex items-center justify-between px-4">
                    <span>Cooperativa A</span>
                    <ExternalLink className="w-5 h-5 text-slate-400" />
                  </button>
                  <button className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-200 text-white py-3 rounded-2xl font-medium transition-colors flex items-center justify-between px-4">
                    <span>Fintech B</span>
                    <ExternalLink className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="bg-dark-card/50 border border-primary/20 rounded-2xl p-4">
                <p className="text-sm text-gray-300 text-center">
                  El enlace expira en 72 horas. Solo se comparten bandas y resultado, nunca montos ni
                  contrapartes.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
