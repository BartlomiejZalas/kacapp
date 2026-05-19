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
import { lessons } from './data/lessons';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [currentSubLesson, setCurrentSubLesson] = useState<string | null>(null);
  const [showReviews, setShowReviews] = useState(false);

  const currentLesson = lessons.find(l => l.id === currentLessonId);

  const handleBackToDashboard = () => {
    setCurrentLessonId(null);
    setCurrentSubLesson(null);
    setShowReviews(false);
  };

  const handleBackToLesson = () => {
    setCurrentSubLesson(null);
  };

  const renderSubLesson = () => {
    if (showReviews) {
      return <SubLessonReviews onBack={handleBackToDashboard} />;
    }

    if (!currentLesson) return null;

    switch (currentSubLesson) {
      case 'dialog':
        return <DialogView dialog={currentLesson.dialog} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'vocab':
        return <SubLessonVocab words={currentLesson.words} lessonId={currentLesson.id} type="vocab" onComplete={handleBackToLesson} />;
      case 'hard_vocab':
        return <SubLessonVocab words={currentLesson.hardWords} lessonId={currentLesson.id} type="hard_vocab" onComplete={handleBackToLesson} />;
      case 'match':
        return <SubLessonMatch words={currentLesson.words} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'conjugation':
        return <SubLessonConjugation conjugations={currentLesson.conjugations} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'unusual':
        return <SubLessonUnusual phrases={currentLesson.unusualPhrases} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'sentences':
        return <SubLessonSentences sentences={currentLesson.sentences} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      case 'enumeratives':
        return <SubLessonEnumeratives items={currentLesson.enumeratives} lessonId={currentLesson.id} onComplete={handleBackToLesson} />;
      default:
        return (
          <LessonView 
            lesson={currentLesson} 
            onBack={handleBackToDashboard} 
            onSelectSubLesson={(type) => setCurrentSubLesson(type)} 
          />
        );
    }
  };

  return (
    <div className="App">
      {!currentLessonId && !showReviews ? (
        <Dashboard 
          onSelectLesson={(id) => setCurrentLessonId(id)} 
          onOpenReviews={() => setShowReviews(true)}
        />
      ) : (
        renderSubLesson()
      )}
    </div>
  );
}

export default App;
