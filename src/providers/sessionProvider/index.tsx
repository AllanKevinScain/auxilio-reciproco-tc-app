"use client";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";

import { setToken, signInRequest } from "@/services";
import {
  SessionContextType,
  SignInData,
  SomeChildrenInterface,
  UserType,
} from "@/types";

const SessionContext = createContext({} as SessionContextType);

export const SessionProivider: React.FC<SomeChildrenInterface> = (props) => {
  const { children } = props;
  const navigate = useRouter();

  const [userState, setUserState] = useState({} as UserType);

  const isAuthenticated = !!userState.token;

  async function signIn(data: SignInData) {
    const { email, password } = data;

    const sessionRequest = await signInRequest({
      email,
      password,
    });

    if (sessionRequest.token || sessionRequest.success) {
      await setToken(sessionRequest);
      setUserState(sessionRequest.user);

      if (sessionRequest.user.role === "ADMIN") {
        return navigate.push("/p/a/registration-points-req");
      }

      return navigate.push("/p/my-points");
    }
  }

  return (
    <SessionContext.Provider
      value={{ isAuthenticated, signIn, user: userState }}
    >
      {children}
    </SessionContext.Provider>
  );
};
