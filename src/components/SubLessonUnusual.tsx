import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { motion, AnimatePresence } from 'framer-motion';

interface UnusualProps {
  phrases: { 
    pl: string; 
    ru: string; 
    explanation?: string;
    examples?: { pl: string; ru: string }[];
  }[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonUnusual: React.FC<UnusualProps> = ({ phrases, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing' | 'finished'>('learning');
  const [currentPhraseIdx, setCurrentPhraseIdx] = useState(0);
  const [currentExampleIdx, setCurrentExampleIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleNextLearning = () => {
    setPhase('testing');
    setCurrentPhraseIdx(0);
    setCurrentExampleIdx(0);
  };

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    const currentPhrase = phrases[currentPhraseIdx];
    const correct = currentPhrase.examples 
      ? currentPhrase.examples[currentExampleIdx].ru.toLowerCase()
      : currentPhrase.ru.toLowerCase();

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
    if (!lessonProgress.includes('unusual')) {
      lessonProgress.push('unusual');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleNextTesting = () => {
    if (feedback === 'wrong') {
      setFeedback(null);
      return;
    }
    setFeedback(null);
    setUserInput('');

    const currentPhrase = phrases[currentPhraseIdx];
    if (currentPhrase.examples && currentExampleIdx < currentPhrase.examples.length - 1) {
      setCurrentExampleIdx(currentExampleIdx + 1);
    } else if (currentPhraseIdx < phrases.length - 1) {
      setCurrentPhraseIdx(currentPhraseIdx + 1);
      setCurrentExampleIdx(0);
    } else {
      saveProgress();
      setPhase('finished');
    }
  };

  if (phase === 'finished') {
    return <LessonResult title="Niecodzienne związki słów" onBack={onComplete} />;
  }

  const currentPhrase = phrases[currentPhraseIdx];

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
          <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Niecodzienne związki słów</h2>
          {phrases.map((phrase, idx) => (
            <div key={idx} className="card">
              <div className="flex" style={{ color: 'var(--accent)', marginBottom: '1rem' }}>
                <Zap /> <strong>Reguła</strong>
              </div>
              <h1 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{phrase.ru}</h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--secondary)', marginBottom: '1rem' }}>{phrase.pl}</p>
              {phrase.explanation && (
                <div style={{ padding: '1rem', background: 'var(--background)', borderRadius: '0.5rem', borderLeft: '4px solid var(--accent)', marginBottom: '1rem' }}>
                  {phrase.explanation}
                </div>
              )}
              {phrase.examples && (
                <div style={{ textAlign: 'left', background: '#f8fafc', padding: '0.75rem', borderRadius: '0.5rem' }}>
                   <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '0.5rem' }}>PRZYKŁADY:</p>
                   {phrase.examples.map((ex, i) => (
                     <div key={i} style={{ marginBottom: '0.25rem', fontSize: '0.9rem' }}>
                       • <strong>{ex.ru}</strong> - {ex.pl}
                     </div>
                   ))}
                </div>
              )}
            </div>
          ))}
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextLearning}>
            Rozumiem, sprawdź mnie! <ArrowRight size={20} />
          </button>
        </>
      ) : (
        <div className="card" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
            Wpisz poprawnie przykład
          </span>
          <h2 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>
            {currentPhrase.examples ? currentPhrase.examples[currentExampleIdx].pl : currentPhrase.pl}
          </h2>
          
          <form onSubmit={handleCheck}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Wpisz po rosyjsku..."
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
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '1rem' }}>
                  {feedback === 'correct' ? (
                    <div style={{ color: 'var(--success)' }}><CheckCircle2 /> Dobrze!</div>
                  ) : (
                    <div style={{ color: 'var(--error)' }}>
                      <XCircle /> Poprawnie: <strong>
                        {currentPhrase.examples ? currentPhrase.examples[currentExampleIdx].ru : currentPhrase.ru}
                      </strong>
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
      )}
    </div>
  );
};
