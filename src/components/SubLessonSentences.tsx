import React, { useState, useEffect } from 'react';
import { useTTS } from '../hooks/useTTS';
import { CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { LessonResult } from './LessonResult';

interface SentencesProps {
  sentences: { pl: string; ru: string }[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonSentences: React.FC<SentencesProps> = ({ sentences, lessonId, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { speak } = useTTS();

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const saveProgress = () => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('sentences')) {
      lessonProgress.push('sentences');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    const current = sentences[currentIndex];
    if (userInput.trim().toLowerCase() === current.ru.toLowerCase()) {
      setFeedback('correct');
      speak(current.ru);
    } else {
      setFeedback('wrong');
    }
  };

  const handleNext = () => {
    if (feedback === 'wrong') {
      setFeedback(null);
      return;
    }

    setFeedback(null);
    setUserInput('');
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveProgress();
      setIsFinished(true);
    }
  };

  if (isFinished) {
    return <LessonResult title="Lekcja zdania" onBack={onComplete} />;
  }

  const current = sentences[currentIndex];

  return (
    <div className="container fade-in">
       <button 
        className="btn btn-secondary" 
        onClick={() => { window.speechSynthesis.cancel(); onComplete(); }} 
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={20} /> Wróć
      </button>

       <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${((currentIndex + 1) / sentences.length) * 100}%` }}></div>
        </div>

        <div className="card" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
          <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
            Napisz zdanie ({currentIndex + 1} / {sentences.length})
          </span>
          <h2 style={{ fontSize: '1.5rem', margin: '1.5rem 0' }}>{current.pl}</h2>
          
          <form onSubmit={handleCheck}>
            <div style={{ position: 'relative' }}>
              <textarea 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Wpisz po rosyjsku..."
                autoFocus
                disabled={feedback === 'correct'}
                rows={3}
                style={{ 
                  width: '100%', 
                  padding: '1rem', 
                  borderRadius: '0.5rem', 
                  fontSize: '1.1rem', 
                  border: '2px solid #e2e8f0',
                  outline: 'none',
                  fontFamily: 'inherit',
                  marginBottom: '1rem'
                }}
              />
              <div style={{ position: 'absolute', bottom: '2rem', right: '0.5rem' }}>
                <CyrillicKeyboard 
                  onInput={(char) => !feedback && setUserInput(prev => prev + char)} 
                  onBackspace={() => !feedback && setUserInput(prev => prev.slice(0, -1))}
                />
              </div>
            </div>
            
            <AnimatePresence>
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ marginBottom: '1rem' }}
                >
                  {feedback === 'correct' ? (
                    <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 /> Świetnie!
                    </div>
                  ) : (
                    <div style={{ color: 'var(--error)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <XCircle /> Błąd
                      </div>
                      <p>Poprawnie: <strong>{current.ru}</strong></p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!feedback ? (
              <button className="btn btn-primary" style={{ width: '100%' }} type="submit">
                Sprawdź
              </button>
            ) : (
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNext} type="button">
                {feedback === 'correct' ? 'Dalej' : 'Spróbuj ponownie'}
              </button>
            )}
          </form>
        </div>
    </div>
  );
};
