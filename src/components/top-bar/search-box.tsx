import CloseCircle from "@/assets/weather-icons/close-circle.svg";
import { useCityStore } from "@/hooks/useCityStore";
import { useState } from "react";
import styled from "styled-components";

const SearchBoxContainer = styled.div`
  padding: 6px;
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
`;

const InputField = styled.input`
  background: transparent;
  border: none;

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }
`;

const StyledCloseCircleIcon = styled(CloseCircle)`
  height: 1rem;
  width: 1rem;
  fill: ${({ theme }) => theme.text};
`;

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setVisibleCities, visibleCities } = useCityStore();

  const [originalCities] = useState(visibleCities);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchTerm(inputValue);

    if (inputValue) {
      const filteredCities = originalCities.filter((city) =>
        city.name.toLowerCase().includes(inputValue)
      );
      setVisibleCities(filteredCities);
    } else {
      setVisibleCities(originalCities);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setVisibleCities(originalCities);
  };

  return (
    <SearchBoxContainer>
      <InputField
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        onClick={handleClearSearch}
        style={{ display: "flex", alignItems: "center" }}
      >
        <StyledCloseCircleIcon />
      </button>
    </SearchBoxContainer>
  );
};

export default SearchBox;
