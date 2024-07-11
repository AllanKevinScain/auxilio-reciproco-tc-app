"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export const CredentialsForm: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      redirect: false,
      email: data.get("email"),
      password: data.get("password"),
    });

    if (signInResponse && !signInResponse.error) {
      router.refresh();
    } else {
      console.log("Error: ", signInResponse);
      setError("Seu email ou senha estão errados!");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-full">
      {error && (
        <span className="p-1 mb-2 text-md font-semibold text-white bg-red-500 rounded-md animate-pulse">
          {error}
        </span>
      )}

      <input
        className="mb-[.5rem] bg-white border-[1px] border-solid border-[#555] rounded-[.5rem] box-border text-[1rem] py-[.5rem] px-[1rem]
    w-full"
        type="email"
        name="email"
        placeholder="Insira seu email"
      />
      <input
        className="mb-[.5rem] bg-white border-[1px] border-solid border-[#555] rounded-[.5rem] box-border text-[1rem] py-[.5rem] px-[1rem]
    w-full"
        type="password"
        name="password"
        placeholder="Insira sua senha"
      />

      <Button
        type="submit"
        variant="outline"
        className="w-full h-12 border-[#555]"
      >
        Acessar com Credentials
      </Button>
    </form>
  );
};
