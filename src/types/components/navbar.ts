import { Session } from "next-auth";
import { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export interface NavbarInterface {
  session: Session;
  showSearch?: boolean;
  search?: string;
  onSearch?: (_: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchInputInterface extends InputProps {}
