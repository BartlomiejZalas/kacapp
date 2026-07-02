import { useCallback } from 'react';

export const useTTS = () => {
  const speak = useCallback((text: string, lang: string = 'ru-RU', onEnd?: () => void, voiceVariant: number = 0) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      
      if (onEnd) {
        utterance.onend = onEnd;
      }
      
      const voices = window.speechSynthesis.getVoices();
      const langVoices = voices.filter(v => v.lang.startsWith(lang));
      
      if (langVoices.length > 0) {
        const googleVoices = langVoices.filter(v => v.name.includes('Google'));
        const availableVoices = googleVoices.length > 0 ? googleVoices : langVoices;
        utterance.voice = availableVoices[voiceVariant % availableVoices.length];
      }

      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};
