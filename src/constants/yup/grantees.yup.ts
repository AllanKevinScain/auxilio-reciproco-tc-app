import * as Yup from "yup";

export const GranteesSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Informação muito curta!")
    .max(50, "Informação muito longa!")
    .required("Campo obrigatório!"),
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
});
