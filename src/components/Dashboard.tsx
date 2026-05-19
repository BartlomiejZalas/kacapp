import React, { useState, useEffect } from 'react';
import { lessons } from '../data/lessons';
import { Utensils, Home, Users, ChevronRight, CheckCircle2, RotateCcw } from 'lucide-react';

const icons: Record<string, any> = {
  Utensils,
  Home,
  Users,
};

interface DashboardProps {
  onSelectLesson: (id: string) => void;
  onOpenReviews: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson, onOpenReviews }) => {
  const [completedSubLessons, setCompletedSubLessons] = useState<Record<string, string[]>>({});
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    if (progress) {
      setCompletedSubLessons(JSON.parse(progress));
    }

    const history = localStorage.getItem('kacapp_word_history');
    if (history) {
      const words = JSON.parse(history);
      setReviewCount(Math.min(words.length, 10));
    }
  }, []);

  return (
    <div className="container fade-in">
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>KacApp</h1>
        <p style={{ color: 'var(--secondary)' }}>Nauka rosyjskiego z przyjemnością</p>
      </header>

      <button 
        className="btn btn-secondary" 
        onClick={onOpenReviews}
        style={{ width: '100%', marginBottom: '2rem', background: 'var(--accent)', color: 'white' }}
      >
        <RotateCcw size={20} /> Powtórki ({reviewCount})
      </button>

      <div className="grid">
        {lessons.map((lesson) => {
          const IconComponent = icons[lesson.icon] || Home;
          const completedCount = completedSubLessons[lesson.id]?.length || 0;
          const totalSubLessons = 8; // dialog, vocab, hard_vocab, match, conjugation, unusual, sentences, enumeratives
          const isFullyCompleted = completedCount === totalSubLessons;

          return (
            <div 
              key={lesson.id} 
              className="card flex" 
              onClick={() => onSelectLesson(lesson.id)}
              style={{ 
                cursor: 'pointer', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                position: 'relative',
                border: isFullyCompleted ? '2px solid var(--success)' : 'none'
              }}
            >
              <div className="flex">
                <div style={{ 
                  background: 'var(--background)', 
                  padding: '1rem', 
                  borderRadius: '1rem',
                  color: 'var(--primary)'
                }}>
                  <IconComponent size={32} />
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{lesson.name}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>
                    Postęp: {completedCount}/{totalSubLessons}
                  </p>
                </div>
              </div>
              
              <div className="flex" style={{ gap: '0.5rem' }}>
                {isFullyCompleted && <CheckCircle2 size={24} color="var(--success)" />}
                <ChevronRight color="var(--secondary)" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
