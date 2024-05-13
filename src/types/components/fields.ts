import { InputProps } from "@chakra-ui/react";

export interface FieldsInterface extends InputProps {
  lable: string;
  isInvalid: boolean;
  errorMessage: string | undefined;
}
