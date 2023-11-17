import CloseCircle from "@/assets/weather-icons/close-circle.svg";
import { useCityStore } from "@/hooks/useCityStore";
import { useState } from "react";
import styled from "styled-components";

const SearchBoxContainer = styled.form`
  padding: 6px;
  display: flex;
  align-items: center;
  border: 2px solid ${({ theme }) => theme.accent};
  border-radius: 8px;
`;

const InputField = styled.input`
  background: transparent;
  border: none;
  flex: 1;

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 1;
  }
`;

const StyledCloseCircleIcon = styled(CloseCircle)`
  height: 1rem;
  width: 1rem;
  fill: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setVisibleCities, visibleCities, selectCity } = useCityStore();

  const [originalCities] = useState(visibleCities);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    const filteredCities = originalCities.filter((city) =>
      city.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setVisibleCities(filteredCities);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setVisibleCities(originalCities);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const foundCity = visibleCities.find(
      (city) => city.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundCity) {
      selectCity(foundCity);
    }
  };

  return (
    <SearchBoxContainer onSubmit={handleSearchSubmit}>
      <InputField
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleClearSearch}
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          background: "none",
        }}
      >
        <StyledCloseCircleIcon />
      </button>
    </SearchBoxContainer>
  );
};

export default SearchBox;
