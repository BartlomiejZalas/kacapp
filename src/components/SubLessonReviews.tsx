import React, { useState, useEffect, useMemo } from 'react';
import type { Word } from '../types';
import { useTTS } from '../hooks/useTTS';
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, PartyPopper, Ghost, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { normalizeRussian } from '../utils/normalize';

interface ReviewsProps {
  onBack: () => void;
}

export const SubLessonReviews: React.FC<ReviewsProps> = ({ onBack }) => {
  const [sessionQueue, setSessionQueue] = useState<Word[]>([]);
  const [wrongInSession, setWrongInSession] = useState<Set<string>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [overachieverLevel, setOverachieverLevel] = useState(0);
  const { speak } = useTTS();

  useEffect(() => {
    const historyStr = localStorage.getItem('kacapp_word_history');
    const reviewsNewStr = localStorage.getItem('kacapp_reviews_new');
    const lastDate = localStorage.getItem('kacapp_last_review_date');
    const dailyPoolStr = localStorage.getItem('kacapp_daily_review_pool');

    const history: Word[] = historyStr ? JSON.parse(historyStr) : [];
    const reviewsNew: Word[] = reviewsNewStr ? JSON.parse(reviewsNewStr) : [];
    
    const today = new Date().toLocaleDateString();
    let dailyPool: Word[] = [];

    if (lastDate === today && dailyPoolStr) {
      dailyPool = JSON.parse(dailyPoolStr);
    } else {
      const potentialRandom = history.filter(h => !reviewsNew.find(rn => rn.ru === h.ru));
      dailyPool = [...potentialRandom].sort(() => Math.random() - 0.5).slice(0, 20);
      localStorage.setItem('kacapp_last_review_date', today);
      localStorage.setItem('kacapp_daily_review_pool', JSON.stringify(dailyPool));
    }

    const initialQueue = [...reviewsNew, ...dailyPool];
    setSessionQueue(initialQueue);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback === 'correct' || !userInput.trim()) return;

    const currentWord = sessionQueue[currentIndex];
    if (normalizeRussian(userInput) === normalizeRussian(currentWord.ru)) {
      setFeedback('correct');
      speak(currentWord.ru);
    } else {
      setFeedback('wrong');
      setWrongInSession(prev => new Set(prev).add(currentWord.ru));
    }
  };

  const handleNext = () => {
    const currentWord = sessionQueue[currentIndex];
    const isCorrect = feedback === 'correct';
    const wasEverWrong = wrongInSession.has(currentWord.ru);

    if (isCorrect && !wasEverWrong) {
      const reviewsNewStr = localStorage.getItem('kacapp_reviews_new');
      if (reviewsNewStr) {
        const reviewsNew: Word[] = JSON.parse(reviewsNewStr);
        localStorage.setItem('kacapp_reviews_new', JSON.stringify(reviewsNew.filter(w => w.ru !== currentWord.ru)));
      }

      const dailyPoolStr = localStorage.getItem('kacapp_daily_review_pool');
      if (dailyPoolStr) {
        const dailyPool: Word[] = JSON.parse(dailyPoolStr);
        localStorage.setItem('kacapp_daily_review_pool', JSON.stringify(dailyPool.filter(w => w.ru !== currentWord.ru)));
      }
    }

    if (wasEverWrong) {
      const updatedQueue = [...sessionQueue];
      updatedQueue.push(currentWord);
      setSessionQueue(updatedQueue);
    }

    setFeedback(null);
    setUserInput('');
    
    if (currentIndex < sessionQueue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const addMoreWords = () => {
    const historyStr = localStorage.getItem('kacapp_word_history');
    const history: Word[] = historyStr ? JSON.parse(historyStr) : [];
    if (history.length > 0) {
      const moreWords = [...history].sort(() => Math.random() - 0.5).slice(0, 10);
      setSessionQueue([...sessionQueue, ...moreWords]);
      setIsFinished(false);
      setOverachieverLevel(prev => prev + 1);
    }
  };

  const progress = useMemo(() => {
    if (sessionQueue.length === 0) return 0;
    return (currentIndex / sessionQueue.length) * 100;
  }, [currentIndex, sessionQueue.length]);

  if (sessionQueue.length === 0 && !isFinished) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <PartyPopper size={64} color="var(--accent)" style={{ margin: '0 auto 2rem' }} />
        <h2 style={{ marginBottom: '1rem' }}>Cel osiągnięty!</h2>
        <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>Wszystkie powtórki na dziś zaliczone.</p>
        <div className="flex" style={{ flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={addMoreWords}>Chcę więcej!</button>
          <button className="btn btn-secondary" onClick={onBack}>Wróć do menu</button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <CheckCircle2 size={64} color="var(--success)" style={{ margin: '0 auto 2rem' }} />
        <h2>Powtórka zakończona!</h2>
        <p style={{ color: 'var(--secondary)', marginBottom: '3rem' }}>
          {overachieverLevel > 0 
            ? `Wow! Jesteś na poziomie overachievera: ${overachieverLevel}!` 
            : 'Świetna robota. Zapraszamy jutro!'}
        </p>
        <div className="flex" style={{ flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-primary" onClick={addMoreWords}>Jeszcze więcej!</button>
          <button className="btn btn-secondary" style={{ width: '100%' }} onClick={onBack}>Wróć do menu</button>
        </div>
      </div>
    );
  }

  const current = sessionQueue[currentIndex];

  const progressBarAnimation = overachieverLevel > 0 ? {
    rotate: [0, -2, 2, -2, 2, 0],
    x: [0, -5, 5, -5, 5, 0],
    y: overachieverLevel > 2 ? [0, -2, 2, -2, 2, 0] : 0,
    scale: [1, 1.05, 0.95, 1.05, 1],
    transition: { 
      duration: Math.max(0.1, 0.5 - overachieverLevel * 0.05), 
      repeat: Infinity 
    }
  } : {};

  const cardAnimation = overachieverLevel > 4 ? {
    rotate: overachieverLevel > 6 ? [0, -1, 1, -1, 1, 0] : 0,
    y: overachieverLevel > 8 ? [0, -2, 2, -2, 2, 0] : 0,
    transition: { duration: 0.2, repeat: Infinity }
  } : {};

  return (
    <div className="container fade-in">
      <button 
        className="btn btn-secondary" 
        onClick={() => { window.speechSynthesis.cancel(); onBack(); }} 
        style={{ marginBottom: '1rem' }}
      >
        <ArrowLeft size={20} /> Wróć
      </button>

      <motion.div 
        className="progress-bar"
        animate={progressBarAnimation}
        style={{ 
          height: overachieverLevel > 0 ? '16px' : '8px', 
          background: overachieverLevel > 3 ? '#ff00ff20' : 'var(--background)',
          marginTop: '1rem'
        }}
      >
        <motion.div 
          className="progress-fill" 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ 
            background: overachieverLevel > 0 ? `linear-gradient(90deg, #2563eb, #ff00ff, #00ffff)` : 'var(--accent)',
            backgroundSize: '200% 100%',
            boxShadow: overachieverLevel > 2 ? '0 0 20px #ff00ff' : 'none'
          }}
        />
      </motion.div>

      <motion.div 
        className="card" 
        animate={cardAnimation}
        style={{ textAlign: 'center', paddingBottom: '3rem', position: 'relative', overflow: 'hidden' }}
      >
        {overachieverLevel > 5 && (
          <motion.div 
            style={{ position: 'absolute', top: 10, right: 10 }}
            animate={{ scale: [1, 1.5, 1], rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap color="#ffff00" fill="#ffff00" />
          </motion.div>
        )}
        
        <div className="flex" style={{ justifyContent: 'center', color: overachieverLevel > 0 ? '#ff00ff' : 'var(--accent)', marginBottom: '1rem' }}>
          {overachieverLevel > 0 ? <Ghost size={20} /> : <RotateCcw size={20} />}
          <strong>
            {overachieverLevel > 0 ? `TRYB DZIADA LVL ${overachieverLevel}` : 'Powtórka'} ({currentIndex + 1} / {sessionQueue.length})
          </strong>
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
              style={{ 
                textAlign: 'center', 
                fontSize: '1.25rem',
                borderColor: overachieverLevel > 4 ? '#ff00ff' : undefined
              }}
            />
            <CyrillicKeyboard 
              onInput={(char) => !feedback && setUserInput(prev => prev + char)} 
              onBackspace={() => !feedback && setUserInput(prev => prev.slice(0, -1))}
            />
          </div>
          
          <AnimatePresence>
            {feedback && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                style={{ marginTop: '1rem' }}
              >
                {feedback === 'correct' ? (
                  <div style={{ color: 'var(--success)', fontWeight: 700 }}>
                    <CheckCircle2 size={20} /> Poprawnie!
                  </div>
                ) : (
                  <div style={{ color: 'var(--error)' }}>
                    <XCircle size={20} /> Prawie... powinno być: <strong>{current.ru}</strong>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Słówko wróci na koniec kolejki.</p>
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
            <button 
              className="btn btn-primary" 
              style={{ 
                width: '100%', 
                marginTop: '1.5rem',
                background: feedback === 'wrong' ? 'var(--error)' : 'var(--primary)'
              }} 
              onClick={handleNext} 
              type="button"
            >
              Dalej
            </button>
          )}
        </form>
      </motion.div>
    </div>
  );
};
