import React, { useState, useEffect } from 'react';
import type { Conjugation } from '../types';
import { ArrowRight, CheckCircle2, XCircle, Info, ArrowLeft } from 'lucide-react';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { LessonResult } from './LessonResult';
import { motion, AnimatePresence } from 'framer-motion';

interface ConjugationProps {
  conjugations: Conjugation[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonConjugation: React.FC<ConjugationProps> = ({ conjugations, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing' | 'finished'>('learning');
  const [currentConjIdx, setCurrentConjIdx] = useState(0);
  const [currentRowIdx, setCurrentRowIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentConj = conjugations[currentConjIdx];

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleNextLearning = () => {
    if (currentConjIdx < conjugations.length - 1) {
      setCurrentConjIdx(currentConjIdx + 1);
    } else {
      setPhase('testing');
      setCurrentConjIdx(0);
      setCurrentRowIdx(0);
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    const correct = currentConj.rows[currentRowIdx].verb.toLowerCase();
    if (userInput.trim().toLowerCase() === correct) {
      setFeedback('correct');
    } else {
      setFeedback('wrong');
    }
  };

  const saveProgress = () => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('conjugation')) {
      lessonProgress.push('conjugation');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleNextRow = () => {
    if (feedback === 'wrong') {
      setFeedback(null);
      return;
    }

    setFeedback(null);
    setUserInput('');
    setShowHint(false);

    if (currentRowIdx < currentConj.rows.length - 1) {
      setCurrentRowIdx(currentRowIdx + 1);
    } else if (currentConjIdx < conjugations.length - 1) {
      setCurrentConjIdx(currentConjIdx + 1);
      setCurrentRowIdx(0);
    } else {
      saveProgress();
      setPhase('finished');
    }
  };

  if (phase === 'finished') {
    return <LessonResult title="Lekcja odmiana" onBack={onComplete} />;
  }

  return (
    <div className="container fade-in">
      <button className="btn btn-secondary" onClick={() => { window.speechSynthesis.cancel(); onComplete(); }} style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>

      {phase === 'learning' ? (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Zapamiętaj odmianę</h2>
          <div className="card">
            <h3 style={{ borderBottom: '2px solid var(--background)', paddingBottom: '0.5rem' }}>{currentConj.title}</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <tbody>
                {currentConj.rows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '0.75rem', color: 'var(--secondary)', fontWeight: 600 }}>{row.pronoun}</td>
                    <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '1.1rem' }}>{row.verb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextLearning}>
            {currentConjIdx < conjugations.length - 1 ? 'Następny wyraz' : 'Zacznij test'} <ArrowRight size={20} />
          </button>
        </>
      ) : (
        <>
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Wpisz poprawną formę</h2>
          <div className="card" style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--secondary)', marginBottom: '0.5rem' }}>{currentConj.title}</p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{currentConj.rows[currentRowIdx].pronoun} ...</h3>

            <form onSubmit={handleCheck}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input 
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Forma rosyjska..."
                  autoFocus
                  disabled={feedback === 'correct'}
                  style={{ textAlign: 'center', fontSize: '1.25rem' }}
                />
                <CyrillicKeyboard 
                  onInput={(char) => !feedback && setUserInput(prev => prev + char)} 
                  onBackspace={() => !feedback && setUserInput(prev => prev.slice(0, -1))}
                />
              </div>

              <AnimatePresence>
                {feedback && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '1rem' }}>
                    {feedback === 'correct' ? (
                      <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 /> Dobrze!
                      </div>
                    ) : (
                      <div style={{ color: 'var(--error)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <XCircle /> Niepoprawnie
                        </div>
                        {showHint && <p style={{ marginTop: '0.5rem' }}>Podpowiedź: <strong>{currentConj.rows[currentRowIdx].verb}</strong></p>}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {!feedback ? (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Sprawdź</button>
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowHint(true)}
                    style={{ padding: '0.5rem' }}
                  >
                    <Info size={20} />
                  </button>
                </div>
              ) : (
                <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextRow}>
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
