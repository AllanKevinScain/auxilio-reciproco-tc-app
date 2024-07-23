"use client";
import { SomeChildInterface } from "@/types";
import { twMerge } from "tailwind-merge";
import { useContext } from "react";
import { LoadingContext } from "@/providers";
import colors from "tailwindcss/colors";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loading: React.FC<SomeChildInterface> = ({ children }) => {
  const { isLoading } = useContext(LoadingContext);

  return (
    <div className={twMerge("relative h-screen", isLoading && "blur-sm")}>
      {isLoading && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen">
          <AiOutlineLoading3Quarters
            size={40}
            color={colors.slate[900]}
            className="animate-spin"
          />
        </div>
      )}
      {children}
    </div>
  );
};
