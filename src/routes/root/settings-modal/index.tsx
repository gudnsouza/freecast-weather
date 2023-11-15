import Button from "@/components/button";
import Modal from "@/components/modal";
import { useState } from "react";
import styled from "styled-components";
import { useSettingsStore } from "./store";

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 12px;
`;

const SettingsModal: React.FC = () => {
  const { setUnits, setTimeFormat } = useSettingsStore();

  const [localUnits, setLocalUnits] = useState<string>("Metric");
  const [localTimeFormat, setLocalTimeFormat] = useState<string>("24h");

  const saveSettings = () => {
    setUnits(localUnits as "Imperial" | "Metric" | "Standard");
    setTimeFormat(localTimeFormat as "AM/PM" | "24h");
  };

  return (
    <Modal onSave={saveSettings} title="Settings">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "6px",
            }}
          >
            Units
          </div>
          <StyledButtonsContainer>
            <Button
              size="sm"
              $isActiveStyle={localUnits === "Imperial"}
              onClick={() => setLocalUnits("Imperial")}
            >
              Imperial
            </Button>
            <Button
              size="sm"
              $isActiveStyle={localUnits === "Metric"}
              onClick={() => setLocalUnits("Metric")}
            >
              Metric
            </Button>
            <Button
              size="sm"
              $isActiveStyle={localUnits === "Standard"}
              onClick={() => setLocalUnits("Standard")}
            >
              Standard
            </Button>
          </StyledButtonsContainer>
        </div>

        <div>
          <div
            style={{
              textAlign: "center",
              marginBottom: "6px",
            }}
          >
            Time
          </div>
          <StyledButtonsContainer>
            <Button
              size="sm"
              $isActiveStyle={localTimeFormat === "AM/PM"}
              onClick={() => setLocalTimeFormat("AM/PM")}
            >
              AM/PM
            </Button>
            <Button
              size="sm"
              $isActiveStyle={localTimeFormat === "24h"}
              onClick={() => setLocalTimeFormat("24h")}
            >
              24h
            </Button>
          </StyledButtonsContainer>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
