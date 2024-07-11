"use client";
import { usePathname } from "next/navigation";
import { AiFillMedicineBox, AiOutlineMenu, AiOutlineUp } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import colors from "tailwindcss/colors";
import { Button } from "../ui/button";
import { NavbarInterface } from "@/types";
import { useState } from "react";
import { Signout } from "./signout";

export const NavBar: React.FC<NavbarInterface> = ({
  session,
  search,
  showSearch = true,
  onSearch = () => null,
}) => {
  const path = usePathname();

  const [open, setIsOpen] = useState(false);

  const image = session?.user?.image
    ? session.user?.image
    : "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg";

  const accessPages = [{ label: "Dashboard", href: "/dashboard" }];

  function handleAppear() {
    setIsOpen((s) => !s);
  }

  return (
    <nav className="bg-slate-600">
      <div className="max px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <Button
            onClick={handleAppear}
            className={twMerge(
              "relative inline-flex items-center justify-center rounded-md p-2 text-zinc-400",
              "hover:bg-slate-700 hover:text-white",
              "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white",
              "sm:hidden"
            )}
          >
            <AiOutlineMenu size={25} />
          </Button>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <AiFillMedicineBox size={30} color={colors.red[300]} />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {accessPages.map(({ label, href }) => {
                  return (
                    <a
                      key={label}
                      href={href}
                      className={twMerge(
                        "rounded-md px-3 py-2 text-sm font-medium",
                        path === `/${label.toLocaleLowerCase()}` &&
                          "bg-slate-700 text-white",
                        path !== `/${label.toLocaleLowerCase()}` &&
                          "text-zinc-300",
                        "hover:bg-slate-800 hover:text-white"
                      )}
                      aria-current="page"
                    >
                      {label}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {showSearch && (
            <div className="hidden sm:ml-6 sm:block">
              <Signout value={search} onChange={onSearch} />
            </div>
          )}
          <img
            className="h-8 w-8 rounded-full ml-3"
            src={image}
            alt="profile-image"
          />
        </div>
      </div>

      <div className="flex flex-col pt-3 sm:hidden" id="mobile-menu">
        {showSearch && <Signout value={search} onChange={onSearch} />}

        <div
          className={twMerge(
            "overflow-hidden space-y-1 px-2 pt-2 max-h-[212px] transition-all",
            !open && "max-h-[0px]"
          )}
        >
          {accessPages.map(({ label, href }) => {
            return (
              <a
                key={label}
                href={href}
                className={twMerge(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  path === `/${label.toLocaleLowerCase()}` &&
                    "bg-gray-900 text-white",
                  path !== `/${label.toLocaleLowerCase()}` && "text-gray-300",
                  "hover:bg-gray-700 hover:text-white"
                )}
                aria-current="page"
              >
                {label}
              </a>
            );
          })}
        </div>

        <AiOutlineUp
          size={20}
          color={colors.white}
          className={twMerge(
            "self-center transition-all",
            !open && "rotate-180"
          )}
        />
      </div>
    </nav>
  );
};
