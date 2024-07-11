"use client";
import { GranteeFormInterface, GranteeCreateType } from "@/types";
import { Form, Formik } from "formik";
import { FormikInput } from "../formikInput";
import { editGranteeSchema } from "@/yup";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const EditGranteeForm: React.FC<GranteeFormInterface> = ({
  initialValues,
}) => {
  const navigate = useRouter();

  async function handleSubmit(values: GranteeCreateType) {
    const { id, ...rest } = values;
    const req = await fetch(`/api/grantee?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(rest),
    });

    const res = await req.json();
    console.log("🚀 ~ handleSubmit ~ res:", res);

    if (res.success) {
      navigate.push("/dashboard");
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editGranteeSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ errors, touched }) => {
        return (
          <Form className="max w-full">
            <h1 className="font-black text-xl text-zinc-800 text-center pb-10">
              Formulário de Edição
            </h1>
            <FormikInput
              label="Nome"
              isInvalid={!!errors.name && !!touched.name}
              error={errors.name}
              id="name"
              name="name"
              placeholder="Digite o nome"
            />
            <FormikInput
              label="CPF"
              isInvalid={!!errors.cpf && !!touched.cpf}
              error={errors.cpf}
              id="cpf"
              name="cpf"
              placeholder="Digite o cpf"
            />
            <FormikInput
              label="Aniversário"
              isInvalid={!!errors.birthDate && !!touched.birthDate}
              error={errors.birthDate}
              id="birthDate"
              name="birthDate"
              type="date"
            />
            <div className="grid grid-cols-2 gap-x-4">
              <h2 className="col-span-2 font-black text-md text-zinc-800 h-[40px]">
                Informações de contato:
              </h2>
              <FormikInput
                label="Email"
                isInvalid={!!errors.contact?.email && !!touched.contact?.email}
                error={errors.contact?.email}
                id="contact.email"
                name="contact.email"
                placeholder="Digite o e-mail"
              />
              <FormikInput
                label="Telefone"
                isInvalid={
                  !!errors.contact?.phoneNumber &&
                  !!touched.contact?.phoneNumber
                }
                error={errors.contact?.phoneNumber}
                id="contact.phoneNumber"
                name="contact.phoneNumber"
                placeholder="Digite o telefone"
              />
            </div>

            <div className="grid grid-cols-2 gap-x-4">
              <h2 className="col-span-2 font-black text-md text-zinc-800 h-[40px]">
                Informações de endereço:
              </h2>

              <FormikInput
                label="Cidade"
                isInvalid={!!errors.address?.city && !!touched.address?.city}
                error={errors.address?.city}
                id="address.city"
                name="address.city"
                placeholder="Digite a cidade"
              />
              <FormikInput
                label="Bairro"
                isInvalid={
                  !!errors.address?.neighborhood &&
                  !!touched.address?.neighborhood
                }
                error={errors.address?.neighborhood}
                id="address.neighborhood"
                name="address.neighborhood"
                placeholder="Digite o bairro"
              />
              <FormikInput
                label="Número da casa"
                isInvalid={
                  !!errors.address?.number && !!touched.address?.number
                }
                error={errors.address?.number}
                id="address.number"
                name="address.number"
                placeholder="Digite o número da casa"
              />
              <FormikInput
                label="CEP"
                isInvalid={
                  !!errors.address?.postalCode && !!touched.address?.postalCode
                }
                error={errors.address?.postalCode}
                id="address.postalCode"
                name="address.postalCode"
                placeholder="Digite o cep"
              />
              <FormikInput
                label="Rua"
                isInvalid={
                  !!errors.address?.street && !!touched.address?.street
                }
                error={errors.address?.street}
                id="address.street"
                name="address.street"
                placeholder="Digite a rua"
              />
            </div>

            <div className="flex gap-4 w-full">
              <Button
                variant="default"
                type="submit"
                className="w-full bg-slate-500"
              >
                Salvar
              </Button>
              <Button
                variant="default"
                type="button"
                className="w-full bg-slate-500"
                onClick={() => navigate.back()}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
