import type { Metadata } from "next";

import { SomeChildInterface } from "@/types";
import { Loading } from "@/components";

export const metadata: Metadata = {
  title: "Home",
};

export default function DashboardLayout({ children }: SomeChildInterface) {
  return <Loading>{children}</Loading>;
}
