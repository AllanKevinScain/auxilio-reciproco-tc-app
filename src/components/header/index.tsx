"use client";
import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  chakra,
  Code,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  theme,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiMenu } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

import { SessionContext } from "@/providers";
import { deleteToken } from "@/services";
import { HeaderInterface } from "@/types";

export const Header: React.FC<HeaderInterface> = (props) => {
  const {
    isOpenDrawer = false,
    onAppearDrawer = () => null,
    onOpenCreateModal = () => null,
  } = props;
  const router = useRouter();
  const { user } = useContext(SessionContext);

  async function handleLogout() {
    await deleteToken();
    router.push("/login");
  }

  return (
    <>
      <Flex
        as="nav"
        h="60px"
        justify="space-between"
        align="center"
        px={["4%", "6%", "10%"]}
        boxShadow="md"
        bg="blue.900"
      >
        <IconButton
          aria-label="Botão do drawer"
          icon={<BiMenu size={30} color={theme.colors.gray[800]} />}
          onClick={onAppearDrawer}
        />

        <Button onClick={onOpenCreateModal}>Novo usuário</Button>
      </Flex>
      <Drawer isOpen={isOpenDrawer} placement="left" onClose={onAppearDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Usuário {user.email}</DrawerHeader>

          <DrawerBody>
            <Card direction="column" overflow="hidden" variant="outline">
              <Image
                objectFit="cover"
                w="full"
                src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                alt="Caffe Latte"
              />

              <Stack>
                <CardBody>
                  <Heading as="h2" size="md" textAlign="center">
                    Seja bem vindo!
                  </Heading>

                  <Text py="2">
                    Esse aplicativo é utilizado para ajudar as pessoas, faça bom
                    uso do sistema!
                  </Text>
                </CardBody>

                <CardFooter>
                  <Code>
                    <chakra.span>
                      Caso encontre um problema ou bug, relate ao{" "}
                      <Link href="https://wa.me/51995368765" target="_blank">
                        desenvovedor
                      </Link>
                    </chakra.span>
                  </Code>
                </CardFooter>
              </Stack>
            </Card>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="link"
              fontWeight="normal"
              color="gray.800"
              rightIcon={<CiLogout size={30} color={theme.colors.gray[800]} />}
              _hover={{}}
              onClick={handleLogout}
            >
              Sair
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
