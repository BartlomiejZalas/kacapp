import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { DialogView } from './components/DialogView';
import { SubLessonVocab } from './components/SubLessonVocab';
import { SubLessonMatch } from './components/SubLessonMatch';
import { SubLessonConjugation } from './components/SubLessonConjugation';
import { SubLessonUnusual } from './components/SubLessonUnusual';
import { SubLessonSentences } from './components/SubLessonSentences';
import { SubLessonEnumeratives } from './components/SubLessonEnumeratives';
import { SubLessonReviews } from './components/SubLessonReviews';
import { SubLessonDictation } from './components/SubLessonDictation';
import { SubLessonFinalTest } from './components/SubLessonFinalTest';
import { categories } from './data/lessons';
import { grammarLessons } from './data/grammar';
import { GrammarLessonView } from './components/GrammarLessonView';

function App() {
  const lessons = categories.flatMap((c) => c.lessons);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [currentSubLesson, setCurrentSubLesson] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);
  const [currentGrammarId, setCurrentGrammarId] = useState<string | null>(null);
  // Podbijany przy każdym powrocie, żeby ekrany przeliczyły postęp z localStorage.
  const [refreshKey, setRefreshKey] = useState(0);

  const currentLesson = lessons.find((l) => l.id === currentLessonId);

  const handleBackToDashboard = () => {
    setCurrentLessonId(null);
    setCurrentSubLesson(null);
    setShowReviews(false);
    setCurrentGrammarId(null);
    setRefreshKey((k) => k + 1);
  };

  const handleBackToLesson = () => {
    setCurrentSubLesson(null);
    setRefreshKey((k) => k + 1);
  };

  const currentGrammar = grammarLessons.find((l) => l.id === currentGrammarId);
  if (currentGrammar) {
    return (
      <div className="App">
        <GrammarLessonView key={currentGrammar.id} lesson={currentGrammar} onBack={handleBackToDashboard} />
      </div>
    );
  }

  if (showReviews) {
    return (
      <div className="App">
        <SubLessonReviews onBack={handleBackToDashboard} />
      </div>
    );
  }

  if (!currentLesson) {
    return (
      <div className="App">
        <Dashboard
          refreshKey={refreshKey}
          onSelectLesson={(id) => setCurrentLessonId(id)}
          onSelectGrammar={(id) => setCurrentGrammarId(id)}
          onOpenReviews={() => setShowReviews(true)}
        />
      </div>
    );
  }

  const renderSubLesson = () => {
    // key wymusza świeży stan ćwiczenia przy każdym wejściu (np. po „Powtórz”).
    const key = `${currentLesson.id}-${currentSubLesson}`;
    switch (currentSubLesson) {
      case 'dialog':
        return <DialogView key={key} dialog={currentLesson.dialog} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'vocab':
        return <SubLessonVocab key={key} words={currentLesson.words} lessonId={currentLesson.id} type="vocab" onComplete={handleBackToLesson} />;
      case 'hard_vocab':
        return <SubLessonVocab key={key} words={currentLesson.hardWords} lessonId={currentLesson.id} type="hard_vocab" onComplete={handleBackToLesson} />;
      case 'match':
        return <SubLessonMatch key={key} words={currentLesson.words} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'conjugation':
        return <SubLessonConjugation key={key} conjugations={currentLesson.conjugations} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'unusual':
        return <SubLessonUnusual key={key} phrases={currentLesson.unusualPhrases} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'sentences':
        return <SubLessonSentences key={key} sentences={currentLesson.sentences} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'dictation':
        return <SubLessonDictation key={key} lesson={currentLesson} onComplete={handleBackToLesson} />;
      case 'final_test':
        return <SubLessonFinalTest key={key} lesson={currentLesson} onComplete={handleBackToLesson} />;
      case 'enumeratives':
        return <SubLessonEnumeratives key={key} items={currentLesson.enumeratives} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      default:
        return (
          <LessonView
            lesson={currentLesson}
            refreshKey={refreshKey}
            onBack={handleBackToDashboard}
            onSelectSubLesson={(type) => setCurrentSubLesson(type)}
          />
        );
    }
  };

  return <div className="App">{renderSubLesson()}</div>;
}

export default App;
