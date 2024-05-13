import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { FieldsInterface } from "@/types";

export const TextField: React.FC<FieldsInterface> = (props) => {
  const { isInvalid, errorMessage, lable, ...rest } = props;

  return (
    <FormControl isInvalid={isInvalid}>
      <FormLabel>{lable}</FormLabel>
      <Input {...rest} type="text" bg="white" />
      {isInvalid && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
