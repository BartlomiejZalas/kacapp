import React, { useState, useEffect } from 'react';
import type { Lesson } from '../types';
import { ArrowLeft, BookOpen, MessageSquare, Repeat, Zap, ListOrdered, Layers, Utensils, Home, Users, CheckCircle2 } from 'lucide-react';

const icons: Record<string, any> = {
  Utensils,
  Home,
  Users,
};

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onSelectSubLesson: (type: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onSelectSubLesson }) => {
  const [completedSubIds, setCompletedSubIds] = useState<string[]>([]);
  const IconComponent = icons[lesson.icon] || Home;

  useEffect(() => {
    const progress = localStorage.getItem('kacapp_sub_progress');
    if (progress) {
      const allProgress = JSON.parse(progress);
      setCompletedSubIds(allProgress[lesson.id] || []);
    }
  }, [lesson.id]);

  const subLessons = [
    { type: 'dialog', name: 'Dialog i słuchanie', icon: MessageSquare, color: '#3b82f6' },
    { type: 'vocab', name: 'Lekcja słówek', icon: BookOpen, color: '#10b981' },
    { type: 'match', name: 'Dopasuj pary', icon: Layers, color: '#f59e0b' },
    { type: 'conjugation', name: 'Lekcja odmiana', icon: Repeat, color: '#8b5cf6' },
    { type: 'unusual', name: 'Związki słów', icon: Zap, color: '#ef4444' },
    { type: 'sentences', name: 'Lekcja zdania', icon: MessageSquare, color: '#ec4899' },
    { type: 'enumeratives', name: 'Enumeratywne', icon: ListOrdered, color: '#6366f1' },
  ];

  return (
    <div className="container fade-in">
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>

      <header style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ 
          background: 'white', 
          width: '80px', 
          height: '80px', 
          borderRadius: '2rem', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 1rem',
          color: 'var(--primary)',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
        }}>
          <IconComponent size={40} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.25rem', color: 'var(--text)' }}>
          {lesson.name}
        </h1>
        <p style={{ color: 'var(--secondary)', fontSize: '0.95rem' }}>
          Osiągnięto: {completedSubIds.length}/{subLessons.length}
        </p>
      </header>

      <div className="grid" style={{ 
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', 
        justifyItems: 'center',
        width: '100%',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        {subLessons.map((sub) => {
          const isDone = completedSubIds.includes(sub.type);
          return (
            <div 
              key={sub.type} 
              className="card" 
              onClick={() => onSelectSubLesson(sub.type)}
              style={{ 
                cursor: 'pointer', 
                textAlign: 'center', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem',
                margin: 0,
                width: '100%',
                maxWidth: '180px',
                position: 'relative',
                border: isDone ? `2px solid var(--success)` : 'none'
              }}
            >
              {isDone && (
                <div style={{ 
                  position: 'absolute', 
                  top: '0.5rem', 
                  right: '0.5rem', 
                  color: 'var(--success)' 
                }}>
                  <CheckCircle2 size={16} />
                </div>
              )}
              <div style={{ 
                background: sub.color + '20', 
                color: sub.color, 
                padding: '0.75rem', 
                borderRadius: '50%', 
                marginBottom: '0.5rem' 
              }}>
                <sub.icon size={24} />
              </div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{sub.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
