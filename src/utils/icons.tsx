import React from 'react';
import {
  Utensils,
  Home,
  Users,
  Shield,
  Globe,
  Plane,
  Train,
  BookOpen,
  Flame,
  Briefcase,
  Heart,
  ShoppingCart,
  Stethoscope,
  Footprints,
  Hash,
  Compass,
  type LucideIcon,
} from 'lucide-react';

// Każda lekcja deklaruje `icon` jako string - tu jest jedyne miejsce mapowania.
// Brak wpisu = lekcja dostawała wcześniej po cichu ikonę domku.
const iconMap: Record<string, LucideIcon> = {
  Utensils,
  Home,
  Users,
  Shield,
  Globe,
  Plane,
  Train,
  BookOpen,
  Flame,
  Briefcase,
  Heart,
  ShoppingCart,
  Stethoscope,
  Footprints,
  Hash,
  Compass,
};

const getLessonIcon = (name: string): LucideIcon => iconMap[name] || BookOpen;

/**
 * Ikona lekcji jako komponent - mapowanie zostaje tutaj, a nie w widokach.
 * Komponenty pochodzą ze stałej mapy, więc „tworzenie w trakcie renderu”
 * nie resetuje tu żadnego stanu.
 */
export const LessonIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 28 }) =>
  React.createElement(getLessonIcon(name), { size });
