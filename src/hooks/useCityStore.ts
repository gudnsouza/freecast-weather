import type { TCity } from "@/constants/cities";
import { create } from "zustand";

type TCityStore = {
  selectedCity: TCity | undefined;
  selectCity: (city: TCity) => void;
};

export const useCityStore = create<TCityStore>((set) => ({
  selectedCity: undefined,
  selectCity: (city) => set({ selectedCity: city }),
}));
