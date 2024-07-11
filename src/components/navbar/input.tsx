import { SearchInputInterface } from "@/types";
import { AiOutlineSearch } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";

export const SearchInput: React.FC<SearchInputInterface> = (props) => {
  return (
    <div
      className={twMerge(
        "flex items-center w-full bg-white h-[40px] rounded-lg px-2",
        props.className
      )}
    >
      <AiOutlineSearch size={25} color={colors.zinc[600]} />

      <input
        {...props}
        type="text"
        className={twMerge(
          "bg-transparent h-[40px] w-full pl-2",
          "focus:outline-none",
          "hover:cursor-pointer"
        )}
        placeholder="Faça sua pesquisa"
      />
    </div>
  );
};
