import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [name, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef<number | null>(null);

  const motivationalPhrases = [
    "Ты справился, [Имя] 💪",
    "Отличная работа, [Имя]! 💪",
    "Ты молодец, [Имя]! 💪",
    "Так держать, [Имя]! 💪"
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setIsRunning(false);
      const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
      setMessage(randomPhrase.replace('[Имя]', name || 'брат'));
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, timeLeft, name]);

  const handleStart = () => {
    if (name.trim() === '') {
      setMessage('Пожалуйста, введите ваше имя!');
      return;
    }
    setMessage('');
    setTimeLeft(10);
    setIsRunning(true);
  };

  const handleReset = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
    setTimeLeft(10);
    setMessage('');
    setName('');
  };

  const handleTryAgain = () => {
    setMessage('');
    setTimeLeft(10);
    setIsRunning(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Таймер-Мотиватор</h1>

        <div className="mb-6">
          <label htmlFor="name" className="block text-gray-700 text-lg mb-2">
            Твое имя:
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-4 py-2 border rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isRunning}
          />
        </div>

        <div className="text-5xl font-bold text-gray-900 mb-6">
          {isRunning && timeLeft > 0 ? (
            `${name || 'Брат'}, осталось ${timeLeft} сек`
          ) : (
            timeLeft === 0 && message ? '' : `${timeLeft} сек`
          )}
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handleStart}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            disabled={isRunning}
          >
            Старт таймера
          </button>

          {timeLeft === 0 && message && (
            <button
              onClick={handleTryAgain}
              className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Попробовать еще раз
            </button>
          )}

          <button
            onClick={handleReset}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Сброс
          </button>
        </div>

        {message && (
          <p className="text-2xl font-semibold text-purple-700 mt-4">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;