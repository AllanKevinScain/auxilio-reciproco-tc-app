import {
  Button,
  chakra,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  theme,
} from "@chakra-ui/react";
import { RiAlarmWarningFill } from "react-icons/ri";

import { DeleteModalInterface } from "@/types";

export const DeleteModal: React.FC<DeleteModalInterface> = (props) => {
  const {
    isOpen,
    onClose,
    message = "Realizar ação de apagar?",
    onNext = () => null,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={() => null} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader display="flex" alignItems="center" gap="4">
          <RiAlarmWarningFill color={theme.colors.red[500]} size={40} />
          Delete de usuário!
        </ModalHeader>
        <ModalBody>
          <chakra.span>{message}</chakra.span>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button mr={3} onClick={onNext}>
            Deletar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
