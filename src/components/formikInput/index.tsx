"use client";
import { FormikInputInterface } from "@/types";
import { Field } from "formik";

export const FormikInput: React.FC<FormikInputInterface> = (props) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={props.id} className="text-xs text-zinc-600">
        {props.label}
      </label>
      <Field
        {...props}
        className="mb-[.5rem] bg-white border-[1px] border-solid border-[#555] rounded-[.5rem] box-border text-[1rem] py-[.5rem] px-[1rem]
    w-full"
      />
      {props.isInvalid && props.error && (
        <span className="text-xs text-red-500 animate-pulse">
          {props.error}
        </span>
      )}
    </div>
  );
};
