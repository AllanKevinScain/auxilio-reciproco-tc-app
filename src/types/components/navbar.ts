import { Session } from "next-auth";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export interface NavbarInterface {
  session: Session;
  search: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchInputInterface extends InputProps {}
