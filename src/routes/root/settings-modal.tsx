import Button from "@/components/button";
import Modal from "@/components/modal";
import { useModalStore } from "@/hooks/useModalStore";
import { TUnits, useSettingsStore } from "@/hooks/useSettingsStore";
import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 12px;
`;

const SettingsModal: React.FC = () => {
  const { setUnits, setTimeFormat, units, timeFormat } = useSettingsStore();
  const { isModalOpen } = useModalStore();

  const [localUnits, setLocalUnits] = useState<TUnits>(units);
  const [localTimeFormat, setLocalTimeFormat] = useState<string>(timeFormat);

  useEffect(() => {
    if (isModalOpen) {
      setLocalUnits(units);
      setLocalTimeFormat(timeFormat);
    }
  }, [isModalOpen, units, timeFormat]);

  const saveSettings = () => {
    setUnits(localUnits as TUnits);
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
              $isActiveStyle={localUnits === "imperial"}
              onClick={() => setLocalUnits("imperial")}
            >
              Imperial
            </Button>
            <Button
              size="sm"
              $isActiveStyle={localUnits === "metric"}
              onClick={() => setLocalUnits("metric")}
            >
              Metric
            </Button>
            <Button
              size="sm"
              $isActiveStyle={localUnits === "standard"}
              onClick={() => setLocalUnits("standard")}
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
