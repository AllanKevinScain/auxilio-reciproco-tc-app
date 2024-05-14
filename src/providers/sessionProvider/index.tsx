"use client";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";

import { getUser, setToken /* , signInRequest */ } from "@/services";
import {
  SessionContextType,
  SignInData,
  SomeChildrenInterface,
  UserType,
} from "@/types";

export const SessionContext = createContext({} as SessionContextType);

export const SessionProivider: React.FC<SomeChildrenInterface> = (props) => {
  const { children } = props;
  const navigate = useRouter();

  const [userState, setUserState] = useState({} as UserType);

  const isAuthenticated = !!userState.token;

  async function signIn(data: SignInData) {
    const { email, password } = data;

    if (email === "admin@gmail.com" && password === "Light123!") {
      setUserState({
        email,
        role: "admin",
        token:
          "shabdduydghjasdbh1237teg17db632e8732ged27836etse672ge38762zsg87687f",
      });
      setToken({
        email,
        password,
        token:
          "shabdduydghjasdbh1237teg17db632e8732ged27836etse672ge38762zsg87687f",
      });

      navigate.push("/");
    }
  }

  const getUserStorage = useCallback(async () => {
    const jsonUser = await getUser();
    if (jsonUser?.value) {
      const parsedUser = JSON.parse(jsonUser?.value as string);
      setUserState(parsedUser);
    }
  }, []);

  useEffect(() => {
    getUserStorage();
  }, [getUserStorage]);

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, signIn, user: userState }}
    >
      {children}
    </SessionContext.Provider>
  );
};
