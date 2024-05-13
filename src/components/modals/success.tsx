import {
  Button,
  chakra,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  theme,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

import { SuccessModalInterface } from "@/types";

export const SuccessModal: React.FC<SuccessModalInterface> = (props) => {
  const { isOpen, onClose, message = "Ação realizada com sucesso!" } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <FaCheck color={theme.colors.green[500]} size={40} />
          Sucesso!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <chakra.span>{message}</chakra.span>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
