import toast from "react-hot-toast";

import { SignInData } from "@/types";

export async function signInRequest(values: SignInData) {
  const req = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(values),
  });

  const res = await req.json();

  if (res) {
    const { success, message } = res;
    if (!success && success !== undefined) {
      toast.error(`${message}`);
    } else {
      toast.success("Login efetuado com sucesso!");
    }
  }
  return res;
}

export const baseUrlApi = () => {
  const currentEnv = process.env.NODE_ENV;

  if (currentEnv === "development") {
    return process.env.BASEURL_API_DEV_API;
  }

  return process.env.BASEURL_API_PRD_API;
};

export const baseUrlClient = () => {
  const currentEnv = process.env.NODE_ENV;

  if (currentEnv === "development") {
    return process.env.BASEURL_API_DEV_CLIENT;
  }

  return process.env.BASEURL_API_PRD_CLIENT;
};
