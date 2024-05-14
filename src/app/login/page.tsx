"use client";
import { Button, chakra, Flex, Heading, theme } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { CiLogin } from "react-icons/ci";

import { PasswordField, TextField } from "@/components";
import { LoginSchema } from "@/constants";
import { SessionContext } from "@/providers";
import { SignInData } from "@/types";

export default function LoginPage() {
  const { signIn } = useContext(SessionContext);

  async function handleSubmit(values: SignInData) {
    await signIn(values);
  }

  return (
    <chakra.main
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="blue.300"
      h="100vh"
    >
      <Flex
        justify="start"
        w="60vw"
        h="80vh"
        rounded="xl"
        backgroundImage="url(background_tc.png)"
        backgroundPosition="left"
      >
        <Flex
          flexDir="column"
          h="full"
          w="50%"
          justify="center"
          px="20"
          bg="gray.300"
          rounded="lg"
          gap="8"
        >
          <Heading textAlign="center">Faça login para continuar</Heading>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={LoginSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              isSubmitting,
            }) => {
              return (
                <Form style={{ width: "100%" }}>
                  <Flex flexDir="column" pb="10" gap="6">
                    <TextField
                      id="email"
                      name="email"
                      lable="E-mail"
                      placeholder="Digite seu email"
                      value={values.email}
                      errorMessage={errors.email}
                      isInvalid={!!errors.email && !!touched.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <PasswordField
                      id="password"
                      name="password"
                      lable="Senha"
                      placeholder="Digite sua senha"
                      value={values.password}
                      errorMessage={errors.password}
                      isInvalid={!!errors.password && !!touched.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Flex>

                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    rightIcon={
                      <CiLogin size={30} color={theme.colors.gray[800]} />
                    }
                    w="full"
                    colorScheme="yellow"
                  >
                    Logar
                  </Button>
                </Form>
              );
            }}
          </Formik>
        </Flex>
      </Flex>
    </chakra.main>
  );
}
