import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  theme,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { FaUserPlus } from "react-icons/fa6";

import { TextField } from "@/components";
import { GranteesSchema } from "@/constants";
import { DefaultModalsInterface } from "@/types";

export const CreateModal: React.FC<DefaultModalsInterface> = (props) => {
  const { isOpen, onClose } = props;

  const initialValues = {
    name: "",
    email: "",
  };

  function handleSubmit(values: typeof initialValues) {
    console.log(values);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => null} size="3xl">
      <ModalOverlay />

      <Formik
        initialValues={initialValues}
        validationSchema={GranteesSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form>
            <ModalContent>
              <ModalHeader display="flex" alignItems="center" gap="4">
                <FaUserPlus color={theme.colors.blackAlpha[800]} size={40} />
                Criação de usuário
              </ModalHeader>
              <ModalBody display="flex" flexDirection="column" gap="4">
                <TextField
                  id="name"
                  lable="Nome"
                  placeholder="Digite o Nome"
                  isInvalid={!!errors.name && !!touched.name}
                  errorMessage={errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextField
                  id="email"
                  lable="E-mail"
                  placeholder="Digite o e-mail"
                  isInvalid={!!errors.email && !!touched.email}
                  errorMessage={errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </ModalBody>

              <ModalFooter>
                <Button type="reset" mr={3} onClick={onClose}>
                  Fechar
                </Button>
                <Button type="submit" mr={3}>
                  Criar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
