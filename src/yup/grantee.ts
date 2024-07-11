import {
  isValidCEP,
  isValidCPF,
  isValidPhone,
} from "@brazilian-utils/brazilian-utils";
import * as yup from "yup";

const contactSchema = yup.object({
  email: yup.string().email("Email inválido!"),
  phoneNumber: yup
    .string()
    .test({
      name: "phoneValidation",
      message: "Número inválido!",
      test: (value = "", { createError, ...rest }) => {
        if (!isValidPhone(value)) {
          return createError({ ...rest });
        }
        return true;
      },
    })
    .required("Número de telefone obrigatório!"),
});

const addressSchema = yup.object({
  postalCode: yup.string().test({
    name: "cepValidation",
    message: "CEP inválido!",
    test: (value = "", { createError, ...rest }) => {
      if (!isValidCEP(value)) {
        return createError({ ...rest });
      }
      return true;
    },
  }),
  city: yup.string().required("Cidade obrigatório!"),
  street: yup.string().required("Rua obrigatório!"),
  neighborhood: yup.string().required("Bairro obrigatório!"),
  number: yup.string().required("Número de casa obrigatório!"),
});

export const createGranteeSchema = yup.object().shape({
  id: yup.string(),
  name: yup.string().required("Nome obrigatório!"),
  cpf: yup
    .string()
    .test({
      name: "cpfValidation",
      message: "CPF inválido!",
      test: (value = "", { createError, ...rest }) => {
        if (!isValidCPF(value)) {
          return createError({ ...rest });
        }
        return true;
      },
    })
    .required("CPF obrigatório!"),
  familyNames: yup
    .array()
    .of(yup.string())
    .required("Nome dos familiares obrigatório!"),
  birthDate: yup.string(),
  contact: contactSchema,
  address: addressSchema,
});

export const editGranteeSchema = createGranteeSchema.deepPartial();
