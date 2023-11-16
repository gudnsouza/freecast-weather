import { useCityStore } from "@/hooks/useCityStore";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";

const StyledContainer = styled.div`
  display: inline-flex;
  width: 100%;
  max-width: 400px;
  align-items: center;
  gap: 1rem;
`;
const ForecastPeriodSelector: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCity } = useCityStore();

  if (!selectedCity) return null;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        Forecast
      </div>
      <StyledContainer>
        <Button
          $isActiveStyle={location.pathname === "/"}
          onClick={() => navigate("/")}
        >
          Now
        </Button>
        <Button
          $isActiveStyle={location.pathname === "/5-days"}
          onClick={() => navigate("/5-days")}
        >
          5 Days
        </Button>
      </StyledContainer>
    </div>
  );
};

export default ForecastPeriodSelector;
