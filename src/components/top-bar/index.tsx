import themeSwitchIcon from "/weather-icons/theme-switch.svg";
import styled from "styled-components";
import { useModalStore } from "../modal/store";
import Clock from "./clock";

const StyledTopBar = styled.div`
  padding: 1rem;
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

const StyledIcon = styled.img`
  height: 1rem;
  border-radius: 50%;
  background: #fff;
  border: solid 1px white;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  background: transparent;
  font-weight: 500;
  color: var(--color-white);

  &:hover {
    color: var(--color-blue);
  }
`;

const TopBar: React.FC = () => {
  const { openModal } = useModalStore();
  return (
    <StyledTopBar>
      <Clock />
      <StyledControls>
        <Button>Search</Button>
        <Button onClick={openModal}>Settings</Button>
        <StyledIcon src={themeSwitchIcon} alt="Theme Switch" />
      </StyledControls>
    </StyledTopBar>
  );
};

export default TopBar;
