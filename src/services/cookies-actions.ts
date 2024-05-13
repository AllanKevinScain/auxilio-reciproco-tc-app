"use server";
import { cookies } from "next/headers";

const ageCookie = {
  secure: true,
  maxAge: 60 * 60 * 4 /* 4h */,
};

export async function getToken() {
  return cookies().get("authfofao.token");
}

export async function getUser() {
  return cookies().get("authfofao.user");
}

export async function deleteToken() {
  cookies().delete("authfofao.token");
  cookies().delete("authfofao.user");
  cookies().delete("authfofao.role");
}

export async function setToken(values: unknown) {
  cookies().set("authtc.data", JSON.stringify(values), {
    priority: "high",
    ...ageCookie,
  });
}
