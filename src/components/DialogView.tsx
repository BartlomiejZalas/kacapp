import React, { useState, useEffect } from 'react';
import { useTTS } from '../hooks/useTTS';
import { Volume2, ArrowRight, MessageCircle, Languages, ArrowLeft } from 'lucide-react';
import { LessonResult } from './LessonResult';
import { motion, AnimatePresence } from 'framer-motion';

interface DialogProps {
  dialog: string;
  lessonId: string;
  onComplete: () => void;
}

export const DialogView: React.FC<DialogProps> = ({ dialog, lessonId, onComplete }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [visibleTranslations, setVisibleTranslations] = useState<number[]>([]);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const { speak } = useTTS();
  
  const lines = dialog.split('\n').filter(line => line.trim() !== '').map(line => {
    const [ru, pl] = line.split('|');
    return { ru: ru.trim(), pl: pl?.trim() };
  });

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const saveProgress = () => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('dialog')) {
      lessonProgress.push('dialog');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleFinish = () => {
    saveProgress();
    setIsFinished(true);
  };

  const playSequentially = (startIndex: number) => {
    if (startIndex >= lines.length) {
      setPlayingIndex(null);
      return;
    }
    setPlayingIndex(startIndex);
    speak(lines[startIndex].ru, 'ru-RU', () => {
      playSequentially(startIndex + 1);
    }, startIndex % 2);
  };

  const toggleTranslation = (idx: number) => {
    if (visibleTranslations.includes(idx)) {
      setVisibleTranslations(visibleTranslations.filter(i => i !== idx));
    } else {
      setVisibleTranslations([...visibleTranslations, idx]);
    }
  };

  if (isFinished) {
    return <LessonResult title="Dialog i słuchanie" onBack={onComplete} />;
  }

  return (
    <div className="container fade-in">
      <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <button className="btn btn-secondary" onClick={() => { window.speechSynthesis.cancel(); onComplete(); }}>
          <ArrowLeft size={20} /> Wróć
        </button>
        <button 
          className="btn btn-primary" 
          onClick={() => playSequentially(0)} 
          style={{ 
            borderRadius: '50%', 
            width: '45px', 
            height: '45px', 
            padding: 0,
            boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
          }}
        >
          <Volume2 size={20} />
        </button>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Posłuchaj dialogu</h2>
      
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {lines.map((line, idx) => (
            <div 
              key={idx} 
              style={{ 
                borderBottom: '1px solid #f1f5f9', 
                padding: '0.5rem',
                borderRadius: '0.5rem',
                background: playingIndex === idx ? 'var(--background)' : 'transparent',
                transition: 'background 0.3s ease'
              }}
            >
              <div className="flex" style={{ alignItems: 'flex-start', marginBottom: '0.1rem', gap: '0.75rem' }}>
                <div 
                  style={{ 
                    background: 'white', 
                    padding: '0.4rem', 
                    borderRadius: '50%', 
                    color: playingIndex === idx ? 'var(--primary)' : '#94a3b8',
                    marginTop: '0.1rem',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }}
                  onClick={() => {
                    setPlayingIndex(idx);
                    speak(line.ru, 'ru-RU', () => setPlayingIndex(null), idx % 2);
                  }}
                >
                  <MessageCircle size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ 
                    fontSize: '1.05rem', 
                    fontWeight: playingIndex === idx ? 700 : 500, 
                    lineHeight: 1.3,
                    color: playingIndex === idx ? 'var(--primary)' : 'var(--text)'
                  }}>
                    {line.ru}
                  </p>
                </div>
                {line.pl && (
                  <button 
                    onClick={() => toggleTranslation(idx)}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: visibleTranslations.includes(idx) ? 'var(--primary)' : 'var(--secondary)',
                      cursor: 'pointer',
                      padding: '0.4rem'
                    }}
                  >
                    <Languages size={18} />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {visibleTranslations.includes(idx) && line.pl && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--secondary)', 
                      marginLeft: '2.8rem',
                      fontStyle: 'italic',
                      overflow: 'hidden'
                    }}
                  >
                    {line.pl}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleFinish}>
        Dalej <ArrowRight size={20} />
      </button>
    </div>
  );
};
