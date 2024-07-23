import { ComponentProps } from "react";

type InputType = ComponentProps<"input">;

export interface FormikInputInterface extends InputType {
  isInvalid: boolean;
  error: string | undefined;
  label: string;
  hasChildren?: boolean;
}
