import type { Metadata } from "next";

import { SomeChildInterface } from "@/types";
import { Loading } from "@/components";

export const metadata: Metadata = {
  title: "Editar usuário",
};

export default function EditGranteeLayout({ children }: SomeChildInterface) {
  return <Loading>{children}</Loading>;
}
