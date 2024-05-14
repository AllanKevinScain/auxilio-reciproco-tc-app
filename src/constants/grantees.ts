import { faker } from "@faker-js/faker";

import { GranteesType } from "@/types";

function createRandomGrantees(): GranteesType {
  return {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
  };
}

export const granteesMock: GranteesType[] = faker.helpers.multiple(
  createRandomGrantees,
  {
    count: 5,
  }
);

export const granteesMockStatic: GranteesType[] = [
  {
    id: "9cc8429b-f652-4ab3-a2db-d173d09cbbf4",
    name: "Jamel Weissnat",
    email: "Jamel@yahoo.com",
  },
  {
    id: "e2fde5be-2030-4c44-89b5-694f1fe2af31",
    name: "Bailee Roob",
    email: "Bailee@hotmail.com",
  },
  {
    id: "4b96345a-942b-4a3f-9e82-56bbf892ec11",
    name: "Paris Crooks44",
    email: "Paris@yahoo.com",
  },
  {
    id: "6a692b8a-2d0c-45bd-af74-90afab37a8a2",
    name: "Marilie Runolfsson",
    email: "Marilie@hotmail.com",
  },
  {
    id: "2e888f56-d22a-4f82-82d3-ee0ddba1fbef",
    name: "Tamara Ferry",
    email: "Tamara@yahoo.com",
  },
];

export const grantessInitialValues = {
  name: "",
  email: "",
};
