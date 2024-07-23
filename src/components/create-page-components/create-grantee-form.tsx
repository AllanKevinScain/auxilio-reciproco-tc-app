"use client";
import {
  GranteeFormInterface,
  GranteeCreateType,
  ViaCepResponse,
} from "@/types";
import {
  capitalize,
  formatCEP,
  formatCPF,
} from "@brazilian-utils/brazilian-utils";
import { useFormik } from "formik";
import { FormikInput } from "../formikInput";
import { createGranteeSchema } from "@/yup";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { AiFillDelete, AiOutlineLoading3Quarters } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { isEmpty } from "lodash";
import { formatPhoneNumber, viacepTransform } from "@/helpers";
import colors from "tailwindcss/colors";

export const CreateGranteeForm: React.FC<GranteeFormInterface> = ({
  initialValues,
}) => {
  const navigate = useRouter();
  const [familyName, setFamilyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: GranteeCreateType) {
    function repleced(e: string | undefined) {
      if (e) {
        return e.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(" ", "");
      }
      return "";
    }

    const newObject: GranteeCreateType = {
      ...values,
      cpf: repleced(values.cpf),
      address: {
        ...values.address,
        postalCode: repleced(values.address.postalCode),
      },
      contact: {
        ...values.contact,
        phoneNumber: repleced(values.contact.phoneNumber),
      },
    };

    const req = await fetch(`/api/grantee`, {
      method: "POST",
      body: JSON.stringify(newObject),
    });
    const res = await req.json();

    if (res.id) {
      navigate.push("/dashboard");
    }
  }

  const {
    errors,
    values,
    touched,
    setFieldValue,
    setFieldError,
    handleSubmit,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: createGranteeSchema,
    onSubmit: (values) => onSubmit(values),
  });

  function handleAddFamilyNameMember(e: React.KeyboardEvent<HTMLInputElement>) {
    const hasThisName = values.familyNames.filter(
      (i) => i.toLocaleLowerCase() === familyName?.toLocaleLowerCase()
    );

    if (isEmpty(hasThisName)) {
      if (e.key === "Enter") {
        setFieldValue("familyNames", [
          ...values.familyNames,
          capitalize(familyName),
        ]);
        setFamilyName("");
      }
    } else {
      setFieldError("familyNames", "Esse nome já foi salvo!");
    }
  }

  function handleRemoveFamilyNameMember(name: string | undefined) {
    const filterNames = values.familyNames.filter(
      (i) => i.toLocaleLowerCase() !== name?.toLocaleLowerCase()
    );

    setFieldValue("familyNames", filterNames);
  }

  async function postalAddress(cep: string) {
    if (isEmpty(cep)) return;
    setIsLoading(true);
    try {
      const req = await fetch(`/api/viacep?cep=${cep}`, {
        method: "GET",
      });
      const res = (await req.json()) as ViaCepResponse;

      viacepTransform(res).forEach((field) => {
        if (field[1]) {
          setFieldValue(field[0], field[1]);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className={twMerge("relative max w-full pb-10", isLoading && "blur-sm")}
    >
      {isLoading && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
          <AiOutlineLoading3Quarters
            size={40}
            color={colors.slate[900]}
            className="animate-spin"
          />
        </div>
      )}

      <h1 className="font-black text-xl text-zinc-800 text-center pb-10">
        Formulário de Criação
      </h1>
      <div className="flex flex-col w-full gap-y-10">
        <div className="flex flex-col">
          <h2 className="col-span-2 font-black text-md text-zinc-800 h-[40px]">
            Informações particulares:
          </h2>

          <FormikInput
            id="name"
            name="name"
            label="Nome"
            placeholder="Digite o nome"
            value={values.name}
            isInvalid={!!errors.name && !!touched.name}
            error={errors.name}
            onChange={handleChange}
            onBlur={(e) => {
              setFieldValue("name", capitalize(e.target.value));
            }}
          />
          <FormikInput
            id="cpf"
            name="cpf"
            label="CPF"
            placeholder="Digite o cpf"
            value={values.cpf}
            isInvalid={!!errors.cpf && !!touched.cpf}
            error={errors.cpf}
            onChange={(e) => {
              setFieldValue("cpf", formatCPF(e.target.value));
            }}
          />
          <FormikInput
            id="birthDate"
            name="birthDate"
            type="date"
            label="Aniversário"
            value={values.birthDate}
            isInvalid={!!errors.birthDate && !!touched.birthDate}
            error={errors.birthDate}
            onChange={handleChange}
          />

          <FormikInput
            label="Nome de um familiar"
            placeholder="Digite o nome do seu familiar"
            hasChildren={true}
            isInvalid={!!errors.familyNames}
            error={errors.familyNames as string}
            value={familyName}
            onKeyUp={handleAddFamilyNameMember}
            onChange={(e) => setFamilyName(e.target.value)}
          >
            <div className="flex flex-col bg-white rounded-lg p-2 border mt-4 gap-2">
              {values.familyNames.map((name) => {
                return (
                  <div key={name} className="flex justify-between">
                    <span className="leading-2 p-0 m-0">{name}</span>
                    <Button
                      variant="secondary"
                      onClick={() => handleRemoveFamilyNameMember(name)}
                      className="p-0 max-h-[25px] hover:text-black"
                    >
                      <AiFillDelete
                        size={25}
                        className={twMerge("text-zinc-400", "hover:text-black")}
                      />
                    </Button>
                  </div>
                );
              })}
            </div>
          </FormikInput>
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <h2 className="col-span-2 font-black text-md text-zinc-800 h-[40px]">
            Informações de contato:
          </h2>
          <FormikInput
            id="contact.email"
            name="contact.email"
            label="Email"
            placeholder="Digite o e-mail"
            value={values.contact.email}
            isInvalid={!!errors.contact?.email && !!touched.contact?.email}
            error={errors.contact?.email}
            onChange={handleChange}
          />
          <FormikInput
            id="contact.phoneNumber"
            name="contact.phoneNumber"
            placeholder="Digite o telefone"
            value={values.contact.phoneNumber}
            label="Telefone"
            isInvalid={
              !!errors.contact?.phoneNumber && !!touched.contact?.phoneNumber
            }
            error={errors.contact?.phoneNumber}
            onChange={(e) => {
              setFieldValue(
                "contact.phoneNumber",
                formatPhoneNumber(e.target.value)
              );
            }}
          />
        </div>

        <div className="grid grid-cols-2 gap-x-4">
          <h2 className="col-span-2 font-black text-md text-zinc-800 h-[40px]">
            Informações de endereço:
          </h2>

          <FormikInput
            id="address.postalCode"
            name="address.postalCode"
            label="CEP"
            placeholder="Digite o cep"
            value={values.address.postalCode}
            isInvalid={
              !!errors.address?.postalCode && !!touched.address?.postalCode
            }
            error={errors.address?.postalCode}
            onChange={(e) => {
              setFieldValue("address.postalCode", formatCEP(e.target.value));
            }}
            onBlur={(e) => postalAddress(e.target.value)}
          />

          <FormikInput
            id="address.city"
            name="address.city"
            label="Cidade"
            placeholder="Digite a cidade"
            value={values.address.city}
            isInvalid={!!errors.address?.city && !!touched.address?.city}
            error={errors.address?.city}
            onChange={handleChange}
          />
          <FormikInput
            id="address.neighborhood"
            name="address.neighborhood"
            label="Bairro"
            placeholder="Digite o bairro"
            value={values.address.neighborhood}
            isInvalid={
              !!errors.address?.neighborhood && !!touched.address?.neighborhood
            }
            error={errors.address?.neighborhood}
            onChange={handleChange}
          />
          <FormikInput
            id="address.number"
            name="address.number"
            label="Número da casa"
            placeholder="Digite o número da casa"
            value={values.address.number}
            isInvalid={!!errors.address?.number && !!touched.address?.number}
            error={errors.address?.number}
            onChange={handleChange}
          />
          <FormikInput
            id="address.street"
            name="address.street"
            label="Rua"
            placeholder="Digite a rua"
            value={values.address.street}
            isInvalid={!!errors.address?.street && !!touched.address?.street}
            error={errors.address?.street}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex gap-4 w-full">
        <Button
          variant="default"
          type="button"
          className="w-full bg-slate-500"
          onClick={() => handleSubmit()}
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
    </form>
  );
};
