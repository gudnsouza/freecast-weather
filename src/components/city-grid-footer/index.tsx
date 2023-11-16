import { TCity } from "@/constants/cities";
import { useCityStore } from "@/hooks/useCityStore";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import Button from "../button";

const GridContainer = styled.div`
  display: grid;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1rem;
`;

const CityGridFooter: React.FC = () => {
  const { visibleCities, selectCity, selectedCity } = useCityStore();

  const handleCityClick = (city: TCity) => {
    selectCity(city);
  };

  return (
    <GridContainer>
      <AnimatePresence>
        {visibleCities.map((city) => (
          <motion.div
            layout
            layoutId={city.name}
            key={city.name}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75, transition: { duration: 0.2 } }}
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
