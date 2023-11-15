import { AnimatePresence } from "framer-motion";
import Button from "../button";
import Clock from "../top-bar/clock";
import { useModalStore } from "./store";
import {
  ModalBackground,
  ModalContainer,
  ModalContent,
  ModalHeader,
  StyledButtonsContainer,
} from "./styles";

type ModalProps = {
  children: React.ReactNode;
  title: string;
  onSave: () => void;
};

const backgroundVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const Modal: React.FC<ModalProps> = (props) => {
  const { isModalOpen, closeModal } = useModalStore();
  const handleSave = () => {
    props.onSave();
    closeModal();
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <ModalBackground
          variants={backgroundVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ModalHeader>{props.title}</ModalHeader>
            <ModalContent>{props.children}</ModalContent>
            <div>
              <StyledButtonsContainer>
                <Button onClick={closeModal} size="sm">
                  Cancel
                </Button>
                <Button onClick={handleSave} size="sm">
                  Save
                </Button>
              </StyledButtonsContainer>
              <div
                style={{
                  textAlign: "center",
                  fontSize: "24px",
                  marginTop: "1rem",
                }}
              >
                <Clock />
              </div>
            </div>
          </ModalContainer>
        </ModalBackground>
      )}
    </AnimatePresence>
  );
};

export default Modal;
