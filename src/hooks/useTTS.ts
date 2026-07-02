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
      console.log('Available ru voices:', voices.filter(v => v.lang.startsWith('ru')).map(v => v.name));
      const langVoices = voices.filter(v => v.lang.startsWith(lang));

      if (langVoices.length > 0) {
        const googleVoices = langVoices.filter(v => v.name.includes('Google'));
        const availableVoices = googleVoices.length > 0 ? googleVoices : langVoices;
        const selectedVoice = availableVoices[voiceVariant % availableVoices.length];
        utterance.voice = selectedVoice;
        // If there is only one voice, vary pitch to simulate a different voice
        if (availableVoices.length === 1) {
          utterance.pitch = voiceVariant % 2 === 0 ? 0.9 : 1.4;
        }
      }

      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  return { speak };
};
