import "../styles/globals.css";

import { ChakraProvider, theme } from "@chakra-ui/react";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import { SessionProivider } from "@/providers";
import { SomeChildrenInterface } from "@/types";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Auxílio recíproco TC",
  description: "Criado por Allan Scain e Flamarion Fagundes",
};

function RootLayout({ children }: Readonly<SomeChildrenInterface>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={rubik.className}
        style={{ backgroundColor: theme.colors.blue[100] }}
      >
        <SessionProivider>
          <ChakraProvider>{children}</ChakraProvider>
        </SessionProivider>
      </body>
    </html>
  );
}

export default RootLayout;
