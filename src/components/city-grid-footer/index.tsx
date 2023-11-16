import { CITIES, TCity } from "@/constants/cities"; // Import your cities constant

import { useCityStore } from "@/hooks/useCityStore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../button";

const GridContainer = styled.div`
  display: grid;
  padding-top: 1rem;
  padding-bottom: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px;
  margin-top: 20px;
`;

const shuffleArray = (array: Array<TCity>) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    if (i !== j) {
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
  }
  return shuffled;
};

const CityGridFooter: React.FC = () => {
  const [visibleCities, setVisibleCities] = useState<Array<TCity>>([]);
  const { selectCity, selectedCity } = useCityStore();
  useEffect(() => {
    const shuffledCities = shuffleArray(CITIES);
    const initialCities = shuffledCities.slice(0, 18);
    setVisibleCities(initialCities);
  }, []);

  const handleCityClick = (city: TCity) => {
    selectCity(city);
  };

  return (
    <GridContainer>
      <AnimatePresence>
        {visibleCities.map((city) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button
              $isActiveStyle={selectedCity?.name === city.name}
              onClick={() => handleCityClick(city)}
            >
              {city.name}
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </GridContainer>
  );
};

export default CityGridFooter;
