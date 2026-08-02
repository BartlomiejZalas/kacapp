import React from 'react';
import { Inbox, ArrowLeft } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  onBack: () => void;
}

/** Zamiast białego ekranu / crasha, gdy lekcja nie ma danego materiału. */
export const EmptyState: React.FC<EmptyStateProps> = ({ title, description, onBack }) => (
  <div className="container fade-in" style={{ textAlign: 'center', paddingTop: '4rem' }}>
    <div style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
      <Inbox size={56} />
    </div>
    <h2 style={{ marginBottom: '0.5rem' }}>{title}</h2>
    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>{description}</p>
    <button className="btn btn-primary btn-block" onClick={onBack}>
      <ArrowLeft size={20} /> Wróć
    </button>
  </div>
);
