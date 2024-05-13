"use client";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  theme,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FaUserEdit } from "react-icons/fa";

import { TextField } from "@/components";
import { GranteesSchema } from "@/constants";
import { EditModalInterface } from "@/types";

import { DeleteModal } from "./delete";

export const EditModal: React.FC<EditModalInterface> = (props) => {
  const { isOpen, onClose, initialValues } = props;
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  function handleModal() {
    setIsOpenDeleteModal((s) => !s);
  }
  function handleSubmit(values: typeof initialValues) {
    console.log(values);
  }

  return (
    <>
      <DeleteModal
        isOpen={isOpenDeleteModal}
        onClose={handleModal}
        onNext={() => console.log("Continuar")}
      />

      <Modal isOpen={isOpen} onClose={() => null} size="3xl">
        <ModalOverlay />

        <Formik
          initialValues={initialValues}
          validationSchema={GranteesSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form>
              <ModalContent>
                <ModalHeader display="flex" alignItems="center" gap="4">
                  <FaUserEdit color={theme.colors.blackAlpha[800]} size={40} />
                  Edição de usuário
                </ModalHeader>
                <ModalBody display="flex" flexDirection="column" gap="4">
                  <TextField
                    id="name"
                    name="name"
                    lable="Nome"
                    placeholder="Digite o Nome"
                    isInvalid={!!errors.name && !!touched.name}
                    errorMessage={errors.name}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    id="email"
                    name="email"
                    lable="E-mail"
                    placeholder="Digite o e-mail"
                    isInvalid={!!errors.email && !!touched.email}
                    errorMessage={errors.email}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </ModalBody>

                <ModalFooter justifyContent="space-between">
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      handleModal();
                      onClose();
                    }}
                    w="fit-content"
                    h="40px"
                    _focus={{}}
                    _hover={{}}
                    _active={{}}
                  >
                    Deletar usuário
                  </Button>
                  <Flex gap="4">
                    <Button type="reset" mr={3} onClick={onClose}>
                      Fechar
                    </Button>
                    <Button type="submit" mr={3}>
                      Alterar
                    </Button>
                  </Flex>
                </ModalFooter>
              </ModalContent>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};
