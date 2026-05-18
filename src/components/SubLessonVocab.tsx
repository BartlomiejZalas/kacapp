import React, { useState, useEffect } from 'react';
import type { Word } from '../types';
import { useTTS } from '../hooks/useTTS';
import { CheckCircle2, XCircle, ArrowRight, Volume2, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CyrillicKeyboard } from './CyrillicKeyboard';
import { LessonResult } from './LessonResult';

interface VocabProps {
  words: Word[];
  lessonId: string;
  onComplete: () => void;
}

export const SubLessonVocab: React.FC<VocabProps> = ({ words, lessonId, onComplete }) => {
  const [phase, setPhase] = useState<'learning' | 'testing' | 'finished'>('learning');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [testWords, setTestWords] = useState<Word[]>([]);
  const [wrongWords, setWrongWords] = useState<Word[]>([]);
  const [masteredWordsRu, setMasteredWordsRu] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const { speak } = useTTS();

  useEffect(() => {
    if (phase === 'learning') {
      speak(words[currentIndex].ru);
    }
  }, [currentIndex, phase, words, speak]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleNextLearning = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('testing');
      setCurrentIndex(0);
      setTestWords([...words]);
    }
  };

  const handleCheck = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (feedback || !userInput.trim()) return;

    const currentWord = testWords[currentIndex];
    if (userInput.trim().toLowerCase() === currentWord.ru.toLowerCase()) {
      setFeedback('correct');
      speak(currentWord.ru);
      
      if (testWords.length === words.length && !wrongWords.find(w => w.ru === currentWord.ru)) {
         if (!masteredWordsRu.includes(currentWord.ru)) {
           setMasteredWordsRu(prev => [...prev, currentWord.ru]);
         }
      }
    } else {
      setFeedback('wrong');
      if (!wrongWords.find(w => w.ru === currentWord.ru)) {
        setWrongWords([...wrongWords, currentWord]);
      }
    }
  };

  const saveProgress = () => {
    // Save granular progress
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('vocab')) {
      lessonProgress.push('vocab');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }

    // Save words to history for reviews
    const history = localStorage.getItem('kacapp_word_history');
    const wordHistory: Word[] = history ? JSON.parse(history) : [];
    
    words.forEach(word => {
      if (!wordHistory.find(w => w.ru === word.ru)) {
        wordHistory.push(word);
      }
    });
    localStorage.setItem('kacapp_word_history', JSON.stringify(wordHistory));
  };

  const handleNextTesting = () => {
    if (feedback === 'wrong') {
       setFeedback(null);
       return;
    }
    
    setFeedback(null);
    setUserInput('');
    if (currentIndex < testWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (wrongWords.length > 0) {
        setTestWords([...wrongWords]);
        setWrongWords([]);
        setCurrentIndex(0);
      } else {
        saveProgress();
        setPhase('finished');
      }
    }
  };

  if (phase === 'finished') {
    return <LessonResult title="Lekcja słówek" onBack={onComplete} />;
  }

  const word = words[currentIndex];
  const progress = (masteredWordsRu.length / words.length) * 100;

  return (
    <div className="container fade-in">
      <button className="btn btn-secondary" onClick={() => { window.speechSynthesis.cancel(); onComplete(); }} style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>

      {phase === 'learning' ? (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${((currentIndex + 1) / words.length) * 100}%` }}></div>
          </div>
          
          <div className="card" style={{ textAlign: 'center' }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
              Nauka słówek ({currentIndex + 1} / {words.length})
            </span>
            {word.image && (
              <img 
                src={word.image} 
                alt={word.pl} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '0.5rem', margin: '1rem 0' }} 
              />
            )}
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{word.ru}</h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '1.5rem' }}>{word.pl}</p>
            
            <button className="btn btn-primary" onClick={() => speak(word.ru)}>
              <Volume2 /> Posłuchaj
            </button>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleNextLearning}>
            Dalej <ArrowRight size={20} />
          </button>
        </>
      ) : (
        <>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>

          <div className="card" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
            <span style={{ color: 'var(--secondary)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700 }}>
              Wpisz po rosyjsku (Opanowane: {masteredWordsRu.length}/{words.length})
            </span>
            <h2 style={{ fontSize: '2rem', margin: '1rem 0' }}>{testWords[currentIndex].pl}</h2>
            
            <form onSubmit={handleCheck}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input 
                  type="text" 
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Wpisz słówko..."
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
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginTop: '1rem' }}
                  >
                    {feedback === 'correct' ? (
                      <div style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CheckCircle2 /> Brawo!
                      </div>
                    ) : (
                      <div style={{ color: 'var(--error)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <XCircle /> Niezupełnie...
                        </div>
                        <p>Poprawna odpowiedź: <strong>{testWords[currentIndex].ru}</strong></p>
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
                  style={{ width: '100%', marginTop: '1.5rem' }} 
                  onClick={handleNextTesting} 
                  type="button"
                >
                  {feedback === 'correct' ? 'Dalej' : 'Spróbuj jeszcze raz'}
                </button>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};
