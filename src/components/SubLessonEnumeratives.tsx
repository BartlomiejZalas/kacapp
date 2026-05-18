import React, { useState, useEffect } from 'react';
import type { Enumerative } from '../types';
import { useTTS } from '../hooks/useTTS';
import { CheckCircle2, XCircle, ArrowRight, Volume2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { LessonResult } from './LessonResult';

interface EnumProps {
  items: Enumerative[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonEnumeratives: React.FC<EnumProps> = ({ items, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing' | 'finished'>('learning');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { speak } = useTTS();

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleNextLearning = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('testing');
      setCurrentIndex(0);
    }
  };

  const saveProgress = () => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('enumeratives')) {
      lessonProgress.push('enumeratives');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    if (userInput.trim().toLowerCase() === items[currentIndex].ru.toLowerCase()) {
      setFeedback('correct');
      speak(items[currentIndex].ru);
    } else {
      setFeedback('wrong');
    }
  };

  const handleNextTesting = () => {
    if (feedback === 'wrong') {
      setFeedback(null);
      return;
    }

    setFeedback(null);
    setUserInput('');
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveProgress();
      setPhase('finished');
    }
  };

  const current = items[currentIndex];

  if (phase === 'finished') {
    return <LessonResult title="Enumeratywne" onBack={onComplete} />;
  }

  return (
    <div className="container fade-in">
       <button 
        className="btn btn-secondary" 
        onClick={() => { window.speechSynthesis.cancel(); onComplete(); }} 
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={20} /> Wróć
      </button>

      {phase === 'learning' ? (
        <>
          <div className="card" style={{ textAlign: 'center' }}>
            <h2 style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>Nauka - Enumeratywne</h2>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}></div>
            </div>
            <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{current.ru}</h1>
            <p style={{ fontSize: '1.5rem', color: 'var(--secondary)', marginBottom: '2rem' }}>{current.pl}</p>
            <button className="btn btn-primary" onClick={() => speak(current.ru)}>
              <Volume2 /> Posłuchaj
            </button>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextLearning}>
            Dalej ({currentIndex + 1} / {items.length}) <ArrowRight size={20} />
          </button>
        </>
      ) : (
        <>
          <div className="card" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
              Wpisz po rosyjsku ({currentIndex + 1} / {items.length})
            </span>
            <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{current.pl}</h2>
            
            <form onSubmit={handleCheck}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Wpisz..."
                  autoFocus
                  disabled={feedback === 'correct'}
                  style={{ textAlign: 'center', fontSize: '1.5rem' }}
                />
                <CyrillicKeyboard 
                  onInput={(char) => !feedback && setUserInput(prev => prev + char)} 
                  onBackspace={() => !feedback && setUserInput(prev => prev.slice(0, -1))}
                />
              </div>
              
              <AnimatePresence>
                {feedback && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
                    {feedback === 'correct' ? (
                      <div style={{ color: 'var(--success)' }}><CheckCircle2 /> Dobrze!</div>
                    ) : (
                      <div style={{ color: 'var(--error)' }}>
                        <XCircle /> Poprawnie: <strong>{current.ru}</strong>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!feedback ? (
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} type="submit">
                  Sprawdź
                </button>
              ) : (
                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={handleNextTesting} type="button">
                  {feedback === 'correct' ? 'Dalej' : 'Spróbuj ponownie'}
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};
