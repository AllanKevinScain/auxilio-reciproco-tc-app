"use client";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  theme,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdLockOpen } from "react-icons/md";
import { PiEyeglassesFill, PiEyeglassesLight } from "react-icons/pi";

import { FieldsInterface } from "@/types";

export const PasswordField: React.FC<FieldsInterface> = (props) => {
  const { isInvalid, errorMessage, lable, ...rest } = props;
  const [showText, setShowText] = useState(false);

  function handleShowText() {
    setShowText((s) => !s);
  }

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{lable}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <MdLockOpen color={theme.colors.gray[500]} size={20} />
        </InputLeftElement>
        <Input {...rest} type={showText ? "text" : "password"} bg="white" />
        <InputRightElement onClick={handleShowText} cursor="pointer">
          {showText && (
            <PiEyeglassesFill color={theme.colors.gray[500]} size={20} />
          )}
          {!showText && (
            <PiEyeglassesLight color={theme.colors.gray[500]} size={20} />
          )}
        </InputRightElement>
      </InputGroup>
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
