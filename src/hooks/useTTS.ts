import { useCallback } from 'react';

/**
 * Lista głosów w Chrome bywa pusta przy pierwszym wywołaniu (ładuje się asynchronicznie),
 * dlatego trzymamy ją w cache i odświeżamy na `voiceschanged`.
 */
let cachedVoices: SpeechSynthesisVoice[] = [];

const refreshVoices = () => {
  if ('speechSynthesis' in window) cachedVoices = window.speechSynthesis.getVoices();
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
}

export const useTTS = () => {
  const speak = useCallback(
    (text: string, lang: string = 'ru-RU', onEnd?: () => void, voiceVariant: number = 0, rate: number = 1) => {
      if (!('speechSynthesis' in window)) {
        onEnd?.();
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate;
      if (onEnd) {
        utterance.onend = onEnd;
        // Bez tego przerwana/nieudana wypowiedź zatrzymałaby odtwarzanie dialogu.
        utterance.onerror = () => onEnd();
      }

      if (cachedVoices.length === 0) refreshVoices();
      const langVoices = cachedVoices.filter((v) => v.lang.replace('_', '-').startsWith(lang.slice(0, 2)));

      if (langVoices.length > 0) {
        const googleVoices = langVoices.filter((v) => v.name.includes('Google'));
        const available = googleVoices.length > 0 ? googleVoices : langVoices;
        utterance.voice = available[voiceVariant % available.length];
        // Jeden głos w systemie - różnicujemy rozmówców wysokością tonu.
        if (available.length === 1) {
          utterance.pitch = voiceVariant % 2 === 0 ? 0.9 : 1.35;
        }
      }

      window.speechSynthesis.speak(utterance);
    },
    []
  );

  return { speak };
};
