import { CITIES, type TCity } from "@/constants/cities";
import { create } from "zustand";

type TCityStore = {
  selectedCity: TCity | undefined;
  visibleCities: TCity[];
  availableCities: Array<TCity>;
  setAvailableCities: (cities: Array<TCity>) => void;
  selectCity: (city: TCity) => void;
  setVisibleCities: (cities: Array<TCity>) => void;
};

const shuffleArray = (array: TCity[]) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) {
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled;
};

export const useCityStore = create<TCityStore>((set) => ({
  selectedCity: undefined,
  visibleCities: shuffleArray(CITIES).slice(0, 18),
  availableCities: [],
  setAvailableCities: (cities) => set({ visibleCities: cities }),
  selectCity: (city) => set({ selectedCity: city }),
  setVisibleCities: (cities) => set({ visibleCities: cities }),
}));
