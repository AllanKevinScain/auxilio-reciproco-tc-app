"use client";
import { FormikInputInterface } from "@/types";
import { twMerge } from "tailwind-merge";

export const FormikInput: React.FC<FormikInputInterface> = (props) => {
  const {
    hasChildren = false,
    children,
    isInvalid,
    error,
    label,
    ...rest
  } = props;
  return (
    <div className="flex flex-col w-full mb-[.5rem]">
      <label htmlFor={props.id} className="text-xs text-zinc-600">
        {label}
      </label>
      <input
        {...rest}
        className={twMerge(
          "bg-white border-[1px] border-solid border-[#555] rounded-[.5rem] box-border text-[1rem] py-[.5rem] px-[1rem] w-full",
          !props.value && "text-zinc-400",
          "placeholder:text-zinc-400"
        )}
      />
      {hasChildren && children}
      <span className="text-xs text-red-500 animate-pulse h-4">
        {isInvalid && error && error}
      </span>
    </div>
  );
};
