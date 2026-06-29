import React, { useState, useEffect } from 'react';
import { categories } from '../data/lessons';
import { Utensils, Home, Users, Shield, ChevronRight, CheckCircle2, RotateCcw, Flame } from 'lucide-react';
import { getStreakData } from '../utils/streak';

const icons: Record<string, any> = {
  Utensils,
  Home,
  Users,
  Shield,
};

interface DashboardProps {
  onSelectLesson: (id: string) => void;
  onOpenReviews: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson, onOpenReviews }) => {
  const [completedSubLessons, setCompletedSubLessons] = useState<Record<string, string[]>>({});
  const [reviewCount, setReviewCount] = useState(0);
  const [streakData, setStreakData] = useState({ streak: 0, isActiveToday: false });

  useEffect(() => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    if (progress) {
      setCompletedSubLessons(JSON.parse(progress));
    }

    const reviewsNewStr = localStorage.getItem('kacapp_reviews_new');
    const dailyPoolStr = localStorage.getItem('kacapp_daily_review_pool');
    const lastDate = localStorage.getItem('kacapp_last_review_date');
    const historyStr = localStorage.getItem('kacapp_word_history');

    const reviewsNew = reviewsNewStr ? JSON.parse(reviewsNewStr) : [];
    const history = historyStr ? JSON.parse(historyStr) : [];
    const today = new Date().toLocaleDateString();

    if (lastDate === today && dailyPoolStr) {
      const dailyPool = JSON.parse(dailyPoolStr);
      setReviewCount(reviewsNew.length + dailyPool.length);
    } else {
      const potentialRandom = history.filter((h: any) => !reviewsNew.find((rn: any) => rn.ru === h.ru));
      const newDailyPoolSize = Math.min(potentialRandom.length, 20);
      setReviewCount(reviewsNew.length + newDailyPoolSize);
    }
    
    setStreakData(getStreakData());
  }, []);

  return (
    <div className="container fade-in">
      <header style={{ marginBottom: '2.5rem' }}>
        <div className="flex" style={{ justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
          <img 
            src="/favicon.svg" 
            alt="Logo" 
            style={{ 
              width: '100px', 
              height: '100px', 
              borderRadius: '50%', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
              border: '3px solid white',
              flexShrink: 0
            }} 
          />
          <div style={{ textAlign: 'left' }}>
            <h1 style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--primary)', margin: 0, lineHeight: 1.1 }}>KacApp</h1>
            <p style={{ color: 'var(--secondary)', fontStyle: 'italic', fontSize: '0.85rem', margin: '0.25rem 0 0', maxWidth: '250px' }}>
              Rosyjski, który wchodzi do głowy jak do państw ościennych
            </p>
          </div>
        </div>
      </header>

      <div 
        className="card flex"
        style={{ 
          marginBottom: '1rem',
          background: streakData.isActiveToday ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : 'var(--background)',
          color: streakData.isActiveToday ? 'white' : 'var(--text)',
          border: streakData.isActiveToday ? 'none' : '2px dashed #f97316',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '1.5rem',
          gap: '1rem',
          boxShadow: streakData.isActiveToday ? '0 10px 25px -5px rgba(249, 115, 22, 0.4)' : 'none'
        }}
      >
        <div style={{
          background: streakData.isActiveToday ? 'rgba(255, 255, 255, 0.2)' : '#fff1f2',
          padding: '1rem',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: streakData.isActiveToday ? 'white' : '#f97316'
        }}>
          <Flame size={32} />
        </div>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.25rem', color: streakData.isActiveToday ? 'white' : 'var(--text)' }}>
            {streakData.streak} {streakData.streak === 1 ? 'dzień' : 'dni'} z rzędu!
          </h3>
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: streakData.isActiveToday ? 'rgba(255,255,255,0.9)' : 'var(--secondary)' }}>
            {streakData.isActiveToday 
              ? 'Świetna robota! Wróć jutro, by podtrzymać serię.' 
              : streakData.streak === 0 
                ? 'Zrób dziś lekcję, aby rozpocząć swoją serię!'
                : 'Zrób dziś lekcję, aby nie stracić streaka!'}
          </p>
        </div>
      </div>

      <div 
        className="card flex" 
        onClick={onOpenReviews}
        style={{ 
          cursor: 'pointer', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2rem',
          border: reviewCount > 0 ? '2px solid var(--primary)' : 'none'
        }}
      >
        <div className="flex">
          <div style={{ 
            background: 'var(--background)', 
            padding: '1rem', 
            borderRadius: '1rem',
            color: 'var(--primary)'
          }}>
            <RotateCcw size={32} />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Powtórki</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--secondary)' }}>
              Powtórz poznane słówka
            </p>
          </div>
        </div>
        
        <div className="flex" style={{ gap: '0.5rem' }}>
          {reviewCount > 0 && (
            <div style={{
              background: '#2563eb',
              color: 'white',
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1rem',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3)'
            }}>
              {reviewCount}
            </div>
          )}
          <ChevronRight color="var(--secondary)" />
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            color: 'var(--accent)', 
            marginBottom: '1rem',
          }}>
            {category.name}
          </h2>
          <div className="grid">
            {category.lessons.map((lesson) => {
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
      ))}
    </div>
  );
};
