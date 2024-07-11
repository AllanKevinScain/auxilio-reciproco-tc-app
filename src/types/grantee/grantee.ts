import { InferType } from "yup";
import { createGranteeSchema } from "@/yup";

export type GranteeCreateType = InferType<typeof createGranteeSchema>;

export type GranteeListType = {
  id: string;
  name: string;
  cpf: string;
  familyNames: string[];
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  address: {
    id: string;
    postalCode: string;
    city: string;
    street: string;
    number: string;
    neighborhood: string;
    createdAt: string;
    updatedAt: string;
    granteeId: string;
  };
  contact: {
    id: string;
    email: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    granteeId: string;
  };
};
