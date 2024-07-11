"use client";
import { SearchInputInterface } from "@/types";
import { SearchInput } from "./input";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export const Signout: React.FC<SearchInputInterface> = (props) => {
  return (
    <div className="flex gap-2 px-2">
      <SearchInput {...props} />
      <Button variant="outline" onClick={() => signOut()}>
        Sair
      </Button>
    </div>
  );
};
