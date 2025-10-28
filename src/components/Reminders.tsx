import { useState } from 'react';
import { Bell, CheckCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Reminders() {
  const { setCurrentScreen } = useApp();
  const [selectedDays, setSelectedDays] = useState(30);
  const [reminderSet, setReminderSet] = useState(false);

  const reminderDate = new Date(Date.now() + selectedDays * 24 * 60 * 60 * 1000);

  const handleSetReminder = () => {
    setReminderSet(true);
  };

  if (reminderSet) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dark via-dark-card to-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex bg-accent/20 rounded-full p-6 mb-6">
            <CheckCircle className="w-16 h-16 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-light mb-4">¡Recordatorio activado!</h1>
          <p className="text-light mb-2">
            Te avisaremos el {reminderDate.toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Será buen momento para generar una nueva prueba con tus mejoras
          </p>
          <button
            onClick={() => setCurrentScreen('landing')}
            className="bg-accent hover:bg-primary-dark text-dark px-6 py-3 rounded-xl font-semibold transition-all"
          >
            Volver al inicio
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
            <Bell className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-light mb-3">Programar recordatorio</h1>
          <p className="text-light">
            Te avisaremos cuando sea buen momento para intentarlo de nuevo
          </p>
        </div>

        <div className="bg-dark-card/50 backdrop-blur-sm rounded-3xl border border-dark-border p-8 mb-6">
          <h2 className="text-xl font-semibold text-light mb-6">¿Cuándo quieres que te recordemos?</h2>

          <div className="space-y-3 mb-8">
            {[15, 30, 60, 90].map((days) => (
              <label
                key={days}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                  selectedDays === days
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-dark-card/30 border-2 border-transparent hover:bg-dark-card/50'
                }`}
              >
                <input
                  type="radio"
                  name="days"
                  value={days}
                  checked={selectedDays === days}
                  onChange={() => setSelectedDays(days)}
                  className="w-5 h-5 text-blue-500"
                />
                <div className="flex-1">
                  <p className="font-medium text-light">{days} días</p>
                  <p className="text-xs text-gray-400">
                    {new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                </div>
                <Calendar className="w-5 h-5 text-gray-400" />
              </label>
            ))}
          </div>

          <div className="bg-dark-card/30 border border-accent/50 rounded-xl p-4 mb-6">
            <p className="text-light text-sm">
              Te enviaremos un recordatorio cuando sea un buen momento para generar
              una nueva prueba con tus mejoras aplicadas.
            </p>
          </div>

          <button
            onClick={handleSetReminder}
            className="w-full bg-accent hover:bg-primary-dark text-dark py-3 rounded-xl font-semibold transition-all"
          >
            Activar recordatorio
          </button>
        </div>

        <button
          onClick={() => setCurrentScreen('result-casi')}
          className="text-gray-400 hover:text-light text-sm transition-colors mx-auto block"
        >
          ← Volver a resultados
        </button>
      </div>
    </div>
  );
}
