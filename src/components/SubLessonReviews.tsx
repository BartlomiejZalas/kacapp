import React, { useState, useEffect } from 'react';
import type { Word } from '../types';
import { useTTS } from '../hooks/useTTS';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';

interface ReviewsProps {
  onBack: () => void;
}

export const SubLessonReviews: React.FC<ReviewsProps> = ({ onBack }) => {
  const [reviewWords, setReviewWords] = useState<Word[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const { speak } = useTTS();

  useEffect(() => {
    const history = localStorage.getItem('kacapp_word_history');
    if (history) {
      const words: Word[] = JSON.parse(history);
      const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, 10);
      setReviewWords(shuffled);
    }

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    if (userInput.trim().toLowerCase() === reviewWords[currentIndex].ru.toLowerCase()) {
      setFeedback('correct');
      speak(reviewWords[currentIndex].ru);
    } else {
      setFeedback('wrong');
    }
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput('');
    if (currentIndex < reviewWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  if (reviewWords.length === 0) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Brak słówek do powtórki</h2>
        <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Ukończ lekcję słówek, aby dodać je do systemu powtórek.</p>
        <button className="btn btn-primary" onClick={onBack}>Wróć do menu</button>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto 2rem' }} />
        <h2>Powtórka zakończona!</h2>
        <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>Świetna robota. Zapraszamy jutro!</p>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={onBack}>Wróć do menu</button>
      </div>
    );
  }

  const current = reviewWords[currentIndex];

  return (
    <div className="container fade-in">
      <button 
        className="btn btn-secondary" 
        onClick={() => { window.speechSynthesis.cancel(); onBack(); }} 
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={20} /> Wróć
      </button>

      <div className="card" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <div className="flex" style={{ justifyContent: 'center', color: 'var(--accent)', marginBottom: '1rem' }}>
          <RotateCcw size={20} /> <strong>Powtórka ({currentIndex + 1} / {reviewWords.length})</strong>
        </div>
        
        <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>{current.pl}</h2>
        
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
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} onClick={handleNext} type="button">
              Dalej
            </button>
          )}
        </form>
      </div>
    </div>
  );
};
