import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  background: var(--color-black);
  border: 2px solid var(--color-blue);
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  padding-left: 6rem;
  padding-right: 6rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ModalHeader = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 12px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;
