import type { Metadata } from "next";

import { SomeChildInterface } from "@/types";
import { Loading } from "@/components";

export const metadata: Metadata = {
  title: "Criar usuário",
};

export default function CreateGranteeLayout({ children }: SomeChildInterface) {
  return <Loading>{children}</Loading>;
}
