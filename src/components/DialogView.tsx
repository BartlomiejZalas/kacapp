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
      <button className="btn btn-secondary" onClick={() => { window.speechSynthesis.cancel(); onComplete(); }} style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Posłuchaj dialogu</h2>
      
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {lines.map((line, idx) => (
            <div key={idx} style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '0.4rem' }}>
              <div className="flex" style={{ alignItems: 'flex-start', marginBottom: '0.1rem', gap: '0.75rem' }}>
                <div 
                  style={{ 
                    background: 'var(--background)', 
                    padding: '0.4rem', 
                    borderRadius: '50%', 
                    color: 'var(--primary)',
                    marginTop: '0.1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => speak(line.ru)}
                >
                  <MessageCircle size={16} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '1.05rem', fontWeight: 500, lineHeight: 1.3 }}>{line.ru}</p>
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

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => speak(lines.map(l => l.ru).join('. '))} 
            style={{ 
              borderRadius: '50%', 
              width: '50px', 
              height: '50px', 
              padding: 0,
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
            }}
            title="Odtwórz całość"
          >
            <Volume2 size={24} />
          </button>
        </div>
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleFinish}>
        Dalej <ArrowRight size={20} />
      </button>
    </div>
  );
};
