import React, { useMemo } from 'react';
import { categories } from '../data/lessons';
import { grammarLessons } from '../data/grammar';
import { ChevronRight, CheckCircle2, RotateCcw, Flame, Medal } from 'lucide-react';
import { getStreakData } from '../utils/streak';
import { words as pluralWords, days as pluralDays } from '../utils/plural';
import { LessonIcon } from '../utils/icons';
import { getAllSubProgress, getBadges } from '../utils/progress';
import { countCompleted, getSubLessons } from '../utils/subLessons';
import { getAllCards, getDueCount, getUpcomingCount } from '../utils/srs';

interface DashboardProps {
  onSelectLesson: (id: string) => void;
  onSelectGrammar: (id: string) => void;
  onOpenReviews: () => void;
  refreshKey: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectLesson, onSelectGrammar, onOpenReviews, refreshKey }) => {
  // Wszystko czytane z localStorage; refreshKey zmienia się po powrocie z lekcji.
  const { progress, reviewCount, upcomingCount, wordCount, badges, streakData } = useMemo(() => {
    void refreshKey; // odświeżenie po powrocie z lekcji
    return {
      progress: getAllSubProgress(),
      reviewCount: getDueCount(),
      upcomingCount: getUpcomingCount(1),
      wordCount: getAllCards().length,
      badges: getBadges(),
      streakData: getStreakData(),
    };
  }, [refreshKey]);

  return (
    <div className="container fade-in">
      <header style={{ marginBottom: '1.5rem' }}>
        <div className="flex" style={{ justifyContent: 'center', gap: '1.25rem' }}>
          <img
            src="/favicon.svg"
            alt=""
            style={{
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              boxShadow: 'var(--shadow-lg)',
              border: '3px solid white',
              flexShrink: 0,
              objectFit: 'cover',
            }}
          />
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.05 }}>KacApp</h1>
            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.85rem', maxWidth: '250px' }}>
              Rosyjski, który wchodzi do głowy jak bratnia pomoc do państw ościennych
            </p>
          </div>
        </div>
      </header>

      <div
        className="card flex"
        style={{
          background: streakData.isActiveToday ? 'linear-gradient(135deg, #f97316, #ea580c)' : 'var(--card)',
          color: streakData.isActiveToday ? 'white' : 'var(--text)',
          borderColor: streakData.isActiveToday ? 'transparent' : '#fed7aa',
          padding: '1.25rem',
          boxShadow: streakData.isActiveToday ? '0 14px 26px -14px rgb(249 115 22 / 0.8)' : 'var(--shadow-sm)',
        }}
      >
        <div
          style={{
            background: streakData.isActiveToday ? 'rgba(255,255,255,0.22)' : '#fff7ed',
            padding: '0.9rem',
            borderRadius: '50%',
            display: 'flex',
            color: streakData.isActiveToday ? 'white' : '#f97316',
          }}
        >
          <Flame size={28} />
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.2rem', color: 'inherit' }}>
            {streakData.streak} {pluralDays(streakData.streak)} z rzędu
          </h3>
          <p
            style={{
              fontSize: '0.85rem',
              color: streakData.isActiveToday ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)',
            }}
          >
            {streakData.isActiveToday
              ? 'Świetna robota! Wróć jutro, by podtrzymać serię.'
              : streakData.streak === 0
                ? 'Zrób dziś lekcję, aby rozpocząć swoją serię!'
                : 'Zrób dziś lekcję, aby nie stracić streaka!'}
          </p>
        </div>
        {wordCount > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, lineHeight: 1 }}>{wordCount}</div>
            <div style={{ fontSize: '0.7rem', opacity: 0.85 }}>słówek</div>
          </div>
        )}
      </div>

      <button
        type="button"
        className="card card-interactive flex"
        onClick={onOpenReviews}
        style={{
          justifyContent: 'space-between',
          width: '100%',
          marginBottom: '2rem',
          font: 'inherit',
          color: 'var(--text)',
          textAlign: 'left',
          borderColor: reviewCount > 0 ? 'var(--primary)' : 'var(--border)',
        }}
      >
        <div className="flex">
          <div style={{ background: 'var(--primary-soft)', padding: '0.9rem', borderRadius: '1rem', color: 'var(--primary)', display: 'flex' }}>
            <RotateCcw size={28} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Powtórki</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {reviewCount > 0
                ? `${reviewCount} ${pluralWords(reviewCount)} czeka na dziś`
                : upcomingCount > 0
                  ? `Zrobione. Jutro wraca ${upcomingCount}.`
                  : 'Wszystko na dziś zaliczone'}
            </p>
          </div>
        </div>
        <div className="flex" style={{ gap: '0.5rem' }}>
          {reviewCount > 0 && (
            <span
              style={{
                background: 'var(--primary)',
                color: 'white',
                minWidth: '2.25rem',
                height: '2.25rem',
                padding: '0 0.5rem',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
              }}
            >
              {reviewCount}
            </span>
          )}
          <ChevronRight color="var(--text-muted)" />
        </div>
      </button>

      <section style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
          Gramatyka
        </h2>
        <div className="grid">
          {grammarLessons.map((lesson) => {
            const isDone = (progress[lesson.id] || []).includes('grammar');
            return (
              <button
                type="button"
                key={lesson.id}
                className="card card-interactive flex"
                onClick={() => onSelectGrammar(lesson.id)}
                style={{
                  justifyContent: 'space-between',
                  width: '100%',
                  font: 'inherit',
                  color: 'var(--text)',
                  textAlign: 'left',
                  borderColor: isDone ? 'var(--success)' : 'var(--border)',
                }}
              >
                <div className="flex" style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ background: '#f5f3ff', padding: '0.9rem', borderRadius: '1rem', color: 'var(--accent)', display: 'flex' }}>
                    <LessonIcon name={lesson.icon} size={28} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '1.05rem' }}>{lesson.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {lesson.summary}
                    </p>
                  </div>
                </div>
                <div className="flex" style={{ gap: '0.4rem' }}>
                  {isDone && <CheckCircle2 size={22} color="var(--success)" />}
                  <ChevronRight color="var(--text-muted)" />
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {categories.map((category) => (
        <section key={category.id} style={{ marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
            {category.name}
          </h2>
          <div className="grid">
            {category.lessons.map((lesson) => {
              const total = getSubLessons(lesson).length;
              const done = countCompleted(lesson, progress[lesson.id] || []);
              const isFullyCompleted = total > 0 && done === total;

              return (
                <button
                  type="button"
                  key={lesson.id}
                  className="card card-interactive flex"
                  onClick={() => onSelectLesson(lesson.id)}
                  style={{
                    justifyContent: 'space-between',
                    width: '100%',
                    font: 'inherit',
                    color: 'var(--text)',
                    textAlign: 'left',
                    borderColor: isFullyCompleted ? 'var(--success)' : 'var(--border)',
                  }}
                >
                  <div className="flex" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ background: 'var(--primary-soft)', padding: '0.9rem', borderRadius: '1rem', color: 'var(--primary)', display: 'flex' }}>
                      <LessonIcon name={lesson.icon} size={28} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '1.05rem' }}>{lesson.name}</h3>
                      <div className="progress-bar" style={{ height: '6px', marginTop: '0.4rem' }}>
                        <div className="progress-fill" style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
                      </div>
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
                        {done} / {total} modułów
                      </p>
                    </div>
                  </div>
                  <div className="flex" style={{ gap: '0.4rem' }}>
                    {badges[lesson.id] !== undefined && <Medal size={20} color="#f59e0b" />}
                    {isFullyCompleted && <CheckCircle2 size={22} color="var(--success)" />}
                    <ChevronRight color="var(--text-muted)" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};
