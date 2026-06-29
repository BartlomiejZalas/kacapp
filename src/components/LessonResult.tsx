import React, { useEffect } from 'react';
import { Trophy, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { updateStreak } from '../utils/streak';

interface ResultProps {
  title: string;
  onBack: () => void;
}

export const LessonResult: React.FC<ResultProps> = ({ title, onBack }) => {
  useEffect(() => {
    updateStreak();
  }, []);

  return (
    <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12 }}
      >
        <div style={{ 
          background: 'var(--success)', 
          color: 'white', 
          width: '100px', 
          height: '100px', 
          borderRadius: '50%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 2rem' 
        }}>
          <Trophy size={48} />
        </div>
      </motion.div>

      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Gratulacje!</h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--secondary)', marginBottom: '3rem' }}>
        Ukończyłeś moduł: <br/><strong>{title}</strong>
      </p>

      <button className="btn btn-primary" style={{ width: '100%' }} onClick={onBack}>
        <ArrowLeft size={20} /> Powrót do lekcji
      </button>
    </div>
  );
};
