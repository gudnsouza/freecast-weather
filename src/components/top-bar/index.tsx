import ThemeSwitchIcon from "@/assets/weather-icons/theme-switch.svg";
import { useModalStore } from "@/hooks/useModalStore";
import useThemeStore from "@/hooks/useThemeStore";
import styled from "styled-components";
import Clock from "./clock";
import SearchBox from "./search-box";

const StyledTopBar = styled.div`
  padding-top: 1rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 500;
`;

const StyledControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledThemeSwitchIcon = styled(ThemeSwitchIcon)`
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background: #fff;
  border: solid 1px white;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`;

const TopBar: React.FC = () => {
  const { openModal } = useModalStore();
  const { toggleTheme } = useThemeStore();
  return (
    <StyledTopBar>
      <Clock />
      <StyledControls>
        <SearchBox />
        <Button onClick={openModal}>Settings</Button>
        <button
          style={{
            display: "flex",
            alignItems: "center",
          }}
          onClick={toggleTheme}
        >
          <StyledThemeSwitchIcon />
        </button>
      </StyledControls>
    </StyledTopBar>
  );
};

export default TopBar;
