import { useCallback } from 'react';

export const useTTS = () => {
  const speak = useCallback((text: string, lang: string = 'ru-RU') => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      
      // Try to find a better voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.lang.startsWith(lang) && v.name.includes('Google'));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};
