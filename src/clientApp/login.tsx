"use client";
import {
  Button,
  chakra,
  Flex,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

import { Modal } from "@/components";
import { granteesMock, grantessInitialValues } from "@/constants";

export const LoginClientPage = () => {
  const [stateModals, seStateModals] = useState({
    success: false,
    edit: false,
    create: false,
  });
  const [initialStates, seInitialStates] = useState(grantessInitialValues);

  function handleCloseModal(value: string) {
    seStateModals((s) => ({ ...s, [value]: false }));
  }

  function handleOpenModal(value: string) {
    seStateModals((s) => ({ ...s, [value]: true }));
  }

  function handleEdit(valueId: string) {
    handleOpenModal("edit");
    const filter = granteesMock.filter((i) => i.id === valueId)[0];

    seInitialStates(filter);
  }

  return (
    <chakra.main display="flex" flexDir="column" gap="5" pb="5">
      <Flex
        as="nav"
        h="60px"
        justify="flex-end"
        align="center"
        px={["5%", "10%", "20%"]}
        boxShadow="md"
        bg="blue.900"
      >
        <Button onClick={() => handleOpenModal("create")}>Novo usuário</Button>
      </Flex>
      <Flex
        flexDir="column"
        mx={["4%", "6%", "10%"]}
        bg="blue.600"
        rounded="lg"
      >
        <TableContainer>
          <Table variant="simple">
            <TableCaption color="white">
              Tabela de cadastro ás pessoas de Três Coroas
            </TableCaption>
            <Thead>
              <Tr>
                {["Nome", "E-mail", "CPF"].map((i) => {
                  return (
                    <Th key={i} fontSize={16} color="gray.200">
                      {i}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {granteesMock.map((i) => {
                return (
                  <Tr
                    key={i.id}
                    fontSize={12}
                    color="gray.300"
                    onClick={() => handleEdit(i.id!)}
                    cursor="pointer"
                    transition="all"
                    transitionDuration="0.9s"
                    _hover={{ bg: "blue.100", color: "gray.900" }}
                  >
                    <Td>{i.name}</Td>
                    <Td>{i.email}</Td>
                    <Td>{i.id}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>

      <Modal.success
        isOpen={stateModals.success}
        onClose={() => handleCloseModal("success")}
      />
      <Modal.create
        isOpen={stateModals.create}
        onClose={() => handleCloseModal("create")}
      />

      <Modal.edit
        isOpen={stateModals.edit}
        initialValues={initialStates}
        onClose={() => handleCloseModal("edit")}
      />
    </chakra.main>
  );
};
