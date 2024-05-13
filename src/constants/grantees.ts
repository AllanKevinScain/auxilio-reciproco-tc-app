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
    count: 20,
  }
);

export const grantessInitialValues = {
  name: "",
  email: "",
}
