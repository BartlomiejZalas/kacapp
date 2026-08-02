import React, { useMemo } from 'react';
import type { Lesson } from '../types';
import { ArrowLeft, CheckCircle2, Lock, Medal } from 'lucide-react';
import { LessonIcon } from '../utils/icons';
import { getBadges, getLessonProgress } from '../utils/progress';
import { getSubLessons, isSubLessonLocked } from '../utils/subLessons';
import { items as pluralItems } from '../utils/plural';

interface LessonViewProps {
  lesson: Lesson;
  onBack: () => void;
  onSelectSubLesson: (type: string) => void;
  /** Rośnie po powrocie z modułu - wymusza odświeżenie postępu. */
  refreshKey: number;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onSelectSubLesson, refreshKey }) => {
  const subLessons = getSubLessons(lesson);
  const completedSubIds = useMemo(() => {
    void refreshKey; // odświeżenie po powrocie z modułu
    return getLessonProgress(lesson.id);
  }, [lesson.id, refreshKey]);

  const badge = useMemo(() => {
    void refreshKey;
    return getBadges()[lesson.id];
  }, [lesson.id, refreshKey]);

  const doneCount = subLessons.filter((s) => completedSubIds.includes(s.type)).length;
  const nextSub = subLessons.find(
    (s) => !completedSubIds.includes(s.type) && !isSubLessonLocked(s, subLessons, completedSubIds)
  );

  return (
    <div className="container fade-in">
      <button className="btn btn-secondary" onClick={onBack} style={{ marginBottom: '1.5rem' }}>
        <ArrowLeft size={20} /> Wróć
      </button>

      <header style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, var(--primary), #38bdf8)',
            width: '76px',
            height: '76px',
            borderRadius: '1.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            boxShadow: '0 14px 26px -12px rgb(37 99 235 / 0.8)',
          }}
        >
          <LessonIcon name={lesson.icon} size={36} />
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>{lesson.name}</h1>
        {badge !== undefined && (
          <span className="badge" style={{ background: '#fef3c7', color: '#b45309', marginBottom: '0.75rem' }}>
            <Medal size={14} /> Test zdany na {badge}%
          </span>
        )}
        <div style={{ maxWidth: '260px', margin: '0 auto' }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(doneCount / subLessons.length) * 100}%` }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.4rem' }}>
            Ukończone {doneCount} z {subLessons.length} modułów
          </p>
        </div>
      </header>

      {nextSub && (
        <button
          className="btn btn-primary btn-block"
          style={{ marginBottom: '1.5rem' }}
          onClick={() => onSelectSubLesson(nextSub.type)}
        >
          {doneCount === 0 ? 'Zacznij lekcję' : 'Kontynuuj'}: {nextSub.name}
        </button>
      )}

      <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {subLessons.map((sub) => {
          const isDone = completedSubIds.includes(sub.type);
          const isLocked = isSubLessonLocked(sub, subLessons, completedSubIds);
          return (
            <button
              key={sub.type}
              type="button"
              className={isLocked ? 'card' : 'card card-interactive'}
              disabled={isLocked}
              onClick={() => onSelectSubLesson(sub.type)}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.1rem 0.75rem',
                margin: 0,
                minHeight: '140px',
                position: 'relative',
                font: 'inherit',
                color: 'var(--text)',
                opacity: isLocked ? 0.55 : 1,
                cursor: isLocked ? 'not-allowed' : 'pointer',
                borderColor: isDone ? 'var(--success)' : 'var(--border)',
              }}
            >
              {isLocked && (
                <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', color: 'var(--text-muted)' }}>
                  <Lock size={16} />
                </div>
              )}
              {isDone && (
                <div style={{ position: 'absolute', top: '0.6rem', right: '0.6rem', color: 'var(--success)' }}>
                  <CheckCircle2 size={18} />
                </div>
              )}
              <div
                style={{
                  background: sub.color + '1f',
                  color: sub.color,
                  padding: '0.75rem',
                  borderRadius: '50%',
                  marginBottom: '0.6rem',
                }}
              >
                <sub.icon size={24} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{sub.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {isLocked
                  ? 'zalicz pozostałe moduły'
                  : sub.type === 'dialog'
                    ? 'do odsłuchania'
                    : sub.type === 'final_test'
                      ? '15 pytań, próg 80%'
                      : `${sub.count} ${pluralItems(sub.count)}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
