import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
  password: Yup.string()
    .matches(/(?=.*[a-z])/, "A senha precisa conter uma letra minúscula")
    .matches(/(?=.*\d)/, "A senha precisa conter um número")
    .matches(/(?=.*[@$!%*?&])/, "A senha precisa conter um caractere especial")
    .matches(
      /[A-Za-z\d@$!%*?&]{8,}/,
      "A senha precisa conter oito caracteres comuns"
    )
    .required("Campo obrigatório!"),
});
