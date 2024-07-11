export type GranteeType = {
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
