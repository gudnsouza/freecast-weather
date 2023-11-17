import ToggleChart from "@/assets/weather-icons/toggle-chart.svg";
import PartlyCloudy from "@/assets/weather-icons/weather-partly-cloudy.svg";
import { useVisualizationModeStore } from "@/hooks/useVisualizationModeStore";
import styled from "styled-components";

const StyledButtonsContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledSvgContainer = styled.div<{ $selected: boolean }>`
  & > svg {
    fill: ${(props) =>
      props.$selected ? props.theme.accent : props.theme.text};
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
`;

const StyledIconButton = styled.button`
  background: ${({ theme }) => theme.backgorund};
  border: none;
`;

const IconButton: React.FC<{
  children: React.ReactNode;
  onClick: () => void;
  $selected: boolean;
}> = ({ children, onClick, $selected }) => {
  return (
    <StyledIconButton onClick={onClick}>
      <StyledSvgContainer $selected={$selected}>{children}</StyledSvgContainer>
    </StyledIconButton>
  );
};

const VisualizationModeSelector: React.FC = () => {
  const { visualizationMode, setVisualizationMode } =
    useVisualizationModeStore();

  return (
    <StyledButtonsContainer>
      <IconButton
        onClick={() => setVisualizationMode("chart")}
        $selected={visualizationMode === "chart"}
      >
        <ToggleChart />
      </IconButton>
      <IconButton
        onClick={() => setVisualizationMode("icon")}
        $selected={visualizationMode === "icon"}
      >
        <PartlyCloudy />
      </IconButton>
    </StyledButtonsContainer>
  );
};

export default VisualizationModeSelector;
