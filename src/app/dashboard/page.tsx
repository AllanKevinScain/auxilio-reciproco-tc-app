"use client";
import { useSession } from "next-auth/react";
import { NavBar } from "@/components";
import { Session } from "next-auth";
import { useCallback, useContext, useEffect, useState } from "react";
import { GranteeListType } from "@/types";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { formatPhoneNumber } from "@/helpers";
import {
  AiFillDelete,
  AiFillEdit,
  AiFillEye,
  AiFillPlusCircle,
} from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import colors from "tailwindcss/colors";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { LoadingContext } from "@/providers";

export default function DashBoard() {
  const { setIsLoading } = useContext(LoadingContext);

  const session = useSession();
  const navigate = useRouter();

  const [grantees, setGrantees] = useState<GranteeListType[]>([]);
  const [search, setSearch] = useState("");

  const headers = ["Nome", "Nome dos Familiares", "CPF/Contato", "Endereço"];

  const filterdGranteesBySearch = grantees.filter((grantee) => {
    const { name, contact, address, cpf, familyNames } = grantee;
    const { phoneNumber } = contact;
    const { street, number, neighborhood, city } = address;
    const mountedAddress = `${street},${number},${neighborhood} - ${city}`;
    const familyNamesLower = familyNames.map((i) => i.toLocaleLowerCase());
    const lowerSearch = search.toLocaleLowerCase();
    const itsHasFamily = familyNamesLower.filter((i) =>
      i.includes(lowerSearch)
    );

    if (
      name.toLocaleLowerCase().includes(lowerSearch) ||
      phoneNumber.toLocaleLowerCase().includes(lowerSearch) ||
      cpf.toLocaleLowerCase().includes(lowerSearch) ||
      mountedAddress.toLocaleLowerCase().includes(lowerSearch) ||
      itsHasFamily.some((i) => i)
    ) {
      return grantee;
    }
  });

  const resultGrantees: GranteeListType[] = filterdGranteesBySearch
    ? filterdGranteesBySearch
    : grantees;

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }

  const listGrantees = useCallback(async () => {
    const req = await fetch("/api/grantees", {
      method: "GET",
    });
    const res = await req.json();

    setGrantees(res.items);
  }, []);

  async function handleDelete(e: string) {
    setIsLoading(true);
    try {
      await fetch(`/api/grantee?id=${e}`, {
        method: "DELETE",
      });

      await listGrantees();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listGrantees();
  }, [listGrantees]);

  return (
    <div className="flex flex-col h-full w-full gap-10 pb-10">
      <NavBar
        session={session.data as Session}
        onSearch={handleSearch}
        search={search}
      />

      <div className="flex w-full max justify-end">
        <Button
          variant="default"
          className="w-fit relative"
          onClick={() => navigate.push("/grantee-create")}
        >
          <AiFillPlusCircle size={30} color={colors.zinc[700]} />
          Cadastrar Novo
        </Button>
      </div>

      <div className="flex flex-col mx-[14vw] overflow-auto rounded-lg border border-slate-300 p-10">
        <table className="max w-full">
          <thead className="text-left text-zinc-800">
            <tr>
              {headers.map((i) => {
                return (
                  <th key={i} className="pb-4">
                    {i}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-[13px] text-zinc-600">
            {resultGrantees.map((grantee) => {
              const { street, number, neighborhood, city } = grantee.address;
              return (
                <tr
                  key={grantee.id}
                  className="transition-all hover:border-b hover:text-zinc-400"
                >
                  <td className="py-1 min-w-[280px]">{grantee.name}</td>
                  <td className="py-1 min-w-[280px]">
                    {grantee.familyNames.join(",")}
                  </td>
                  <td className="py-1 min-w-[280px]">
                    {formatCPF(grantee.cpf) +
                      " / " +
                      formatPhoneNumber(grantee.contact.phoneNumber)}
                  </td>
                  <td className="py-1 min-w-[280px]">
                    {street + "," + number + "," + neighborhood + " - " + city}
                  </td>
                  <td className="flex py-1 min-w-[120px] gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleDelete(grantee.id)}
                      className="p-0 hover:text-black"
                    >
                      <AiFillDelete
                        size={25}
                        className={twMerge("text-zinc-400", "hover:text-black")}
                      />
                    </Button>
                    <Link
                      href={`/grantee-edit/${grantee.id}`}
                      className="flex justify-center items-center"
                    >
                      <AiFillEdit
                        size={25}
                        className={twMerge("text-zinc-400", "hover:text-black")}
                      />
                    </Link>
                    <Link
                      href={`/grantee-view/${grantee.id}`}
                      className="flex justify-center items-center"
                    >
                      <AiFillEye
                        size={25}
                        className={twMerge("text-zinc-400", "hover:text-black")}
                      />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!resultGrantees && (
          <span className="text-center">Nenhum registro encontrado!</span>
        )}
      </div>
    </div>
  );
}
