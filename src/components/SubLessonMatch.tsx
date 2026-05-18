import React, { useState, useEffect } from 'react';
import type { Word } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonResult } from './LessonResult';
import { ArrowLeft } from 'lucide-react';

interface MatchProps {
  words: Word[];
  lessonId: string;
  onComplete: () => void;
}

interface Item {
  id: string;
  text: string;
  type: 'ru' | 'pl';
  pairId: string;
}

export const SubLessonMatch: React.FC<MatchProps> = ({ words, lessonId, onComplete }) => {
  const [plItems, setPlItems] = useState<Item[]>([]);
  const [ruItems, setRuItems] = useState<Item[]>([]);
  const [selectedPl, setSelectedPl] = useState<Item | null>(null);
  const [selectedRu, setSelectedRu] = useState<Item | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<'wrong' | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const pl = words.map(w => ({ id: `pl-${w.ru}`, text: w.pl, type: 'pl' as const, pairId: w.ru }));
    const ru = words.map(w => ({ id: `ru-${w.ru}`, text: w.ru, type: 'ru' as const, pairId: w.ru }));
    setPlItems([...pl].sort(() => Math.random() - 0.5));
    setRuItems([...ru].sort(() => Math.random() - 0.5));
  }, [words]);

  const saveProgress = () => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    const allProgress = progress ? JSON.parse(progress) : {};
    const lessonProgress = allProgress[lessonId] || [];
    if (!lessonProgress.includes('match')) {
      lessonProgress.push('match');
      allProgress[lessonId] = lessonProgress;
      localStorage.setItem('kacapp_sub_progress', JSON.stringify(allProgress));
    }
  };

  const handleSelect = (item: Item) => {
    if (matchedPairIds.includes(item.pairId)) return;

    if (item.type === 'pl') {
      setSelectedPl(selectedPl?.id === item.id ? null : item);
    } else {
      setSelectedRu(selectedRu?.id === item.id ? null : item);
    }
  };

  useEffect(() => {
    if (selectedPl && selectedRu) {
      if (selectedPl.pairId === selectedRu.pairId) {
        const newMatched = [...matchedPairIds, selectedPl.pairId];
        setMatchedPairIds(newMatched);
        setSelectedPl(null);
        setSelectedRu(null);
        if (newMatched.length === words.length) {
          saveProgress();
          setTimeout(() => setIsFinished(true), 800);
        }
      } else {
        setFeedback('wrong');
        setTimeout(() => {
          setFeedback(null);
          setSelectedPl(null);
          setSelectedRu(null);
        }, 500);
      }
    }
  }, [selectedPl, selectedRu, matchedPairIds, words.length]);

  if (isFinished) {
    return <LessonResult title="Dopasuj pary" onBack={onComplete} />;
  }

  return (
    <div className="container fade-in">
      <button className="btn btn-secondary" onClick={onComplete} style={{ marginBottom: '1rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Dopasuj pary</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', justifyItems: 'center' }}>
        <div className="grid" style={{ width: '100%' }}>
          <AnimatePresence>
            {plItems.map((item) => !matchedPairIds.includes(item.pairId) && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => handleSelect(item)}
                className="card"
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '1rem',
                  margin: '0 auto',
                  width: '100%',
                  background: selectedPl?.id === item.id ? 'var(--primary)' : 'var(--card)',
                  color: selectedPl?.id === item.id ? 'white' : 'var(--text)',
                  border: feedback === 'wrong' && selectedPl?.id === item.id ? '2px solid var(--error)' : 'none',
                }}
              >
                {item.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid" style={{ width: '100%' }}>
          <AnimatePresence>
            {ruItems.map((item) => !matchedPairIds.includes(item.pairId) && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => handleSelect(item)}
                className="card"
                style={{
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '1rem',
                  margin: '0 auto',
                  width: '100%',
                  background: selectedRu?.id === item.id ? 'var(--primary)' : 'var(--card)',
                  color: selectedRu?.id === item.id ? 'white' : 'var(--text)',
                  border: feedback === 'wrong' && selectedRu?.id === item.id ? '2px solid var(--error)' : 'none',
                }}
              >
                {item.text}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
