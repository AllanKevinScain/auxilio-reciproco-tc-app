import { ReactNode } from "react";

export interface SomeChildrenInterface {
  children: ReactNode;
}

export type GranteesType = {
  id?: string;
  name: string;
  email: string;
};
