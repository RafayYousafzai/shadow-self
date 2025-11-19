
import React, { useState } from 'react';
import { QUESTIONS } from '../constants';
import { CosmicDetails } from '../types';

interface QuizProps {
  onComplete: (answers: Record<number, string>, cosmicDetails: CosmicDetails) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isExiting, setIsExiting] = useState(false);
  const [showCosmicForm, setShowCosmicForm] = useState(false);
  
  // Cosmic Form State
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthCity, setBirthCity] = useState('');

  const currentQuestion = QUESTIONS[currentIndex];

  const handleOptionClick = (value: string) => {
    const newAnswers = { ...answers, [currentIndex]: value };
    setAnswers(newAnswers);
    
    setIsExiting(true);
    
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsExiting(false);
      } else {
        setShowCosmicForm(true);
        setIsExiting(false);
      }
    }, 300);
  };

  const handleCosmicSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(answers, { birthDate, birthTime, birthCity });
  };

  // Standard Quiz View
  if (!showCosmicForm) {
    const progress = ((currentIndex + 1) / QUESTIONS.length) * 100;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-zinc-900">
          <div 
            className="h-full bg-gradient-to-r from-purple-600 to-red-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className={`w-full max-w-2xl transition-all duration-300 transform ${isExiting ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
          <div className="mb-8">
            <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
              Question {currentIndex + 1} / {QUESTIONS.length}
            </span>
            <h2 className="text-2xl md:text-4xl font-display mt-4 leading-tight text-zinc-100">
              {currentQuestion.text}
            </h2>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option.value)}
                className="w-full text-left p-5 glass-panel rounded-sm hover:bg-white/5 border border-zinc-800 hover:border-zinc-600 transition-all duration-200 group"
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full border border-zinc-700 text-zinc-500 text-xs mr-4 group-hover:border-zinc-400 group-hover:text-zinc-200 transition-colors">
                    {option.value}
                  </span>
                  <span className="text-zinc-300 group-hover:text-white font-light text-sm md:text-base">
                    {option.label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Cosmic Details Form View
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 relative animate-fade-in">
      <div className="w-full max-w-md glass-panel p-8 border border-zinc-800 rounded-sm">
        <h2 className="text-3xl font-display text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-rose-400">
          The Final Layer
        </h2>
        <p className="text-zinc-400 text-center text-sm mb-8">
          To align your archetype with the stars, we need your origin data.
        </p>

        <form onSubmit={handleCosmicSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Date of Birth *</label>
            <input 
              type="date" 
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-black/50 border border-zinc-700 text-white p-3 rounded focus:border-rose-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">Time (Optional)</label>
              <input 
                type="time" 
                value={birthTime}
                onChange={(e) => setBirthTime(e.target.value)}
                className="w-full bg-black/50 border border-zinc-700 text-white p-3 rounded focus:border-rose-500 focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-2">City (Optional)</label>
              <input 
                type="text" 
                placeholder="Paris, France"
                value={birthCity}
                onChange={(e) => setBirthCity(e.target.value)}
                className="w-full bg-black/50 border border-zinc-700 text-white p-3 rounded focus:border-rose-500 focus:outline-none transition-colors placeholder-zinc-700"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-rose-100 transition-colors"
          >
            Reveal My Aura
          </button>

          <div className="text-center">
             <button 
               type="button" 
               onClick={() => onComplete(answers, { birthDate: "Unknown", birthTime: "", birthCity: "" })}
               className="text-[10px] text-zinc-600 hover:text-zinc-400 uppercase tracking-wider border-b border-transparent hover:border-zinc-400 transition-all"
             >
               Skip Cosmic Analysis
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Quiz;
