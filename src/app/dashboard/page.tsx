"use client";
import { useSession } from "next-auth/react";
import { NavBar } from "@/components";
import { Session } from "next-auth";
import { useCallback, useEffect, useState } from "react";
import { GranteeListType } from "@/types";
import { formatCPF } from "@brazilian-utils/brazilian-utils";
import { formatPhoneNumber } from "@/helpers";
import { AiFillPlusCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import colors from "tailwindcss/colors";

export default function DashBoard() {
  const session = useSession();
  const navigate = useRouter();

  const [grantees, setGrantees] = useState<GranteeListType[]>([]);
  const [search, setSearch] = useState("");

  const headers = ["Nome", "Nome dos Familiares", "CPF/Contato", "Endereço"];

  const filterdGranteesBySearch = grantees.filter((grantee) => {
    const { name, contact, address, cpf } = grantee;
    const { phoneNumber } = contact;
    const { street, number, neighborhood, city } = address;
    const mountedAddress = `${street},${number},${neighborhood} - ${city}`;
    const lowerSearch = search.toLocaleLowerCase();

    if (
      name.toLocaleLowerCase().includes(lowerSearch) ||
      phoneNumber.toLocaleLowerCase().includes(lowerSearch) ||
      cpf.toLocaleLowerCase().includes(lowerSearch) ||
      mountedAddress.toLocaleLowerCase().includes(lowerSearch)
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
  function handleNavigate(e: string) {
    navigate.push(e);
  }

  const listGrantees = useCallback(async () => {
    const req = await fetch("/api/grantees", {
      method: "GET",
    });
    const res = await req.json();

    setGrantees(res.items);
  }, []);

  useEffect(() => {
    listGrantees();
  }, [listGrantees]);

  return (
    <main className="flex flex-col h-full w-full gap-10 pb-10">
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
                  className="cursor-pointer transition-all hover:border-b hover:text-zinc-400"
                  onClick={() => handleNavigate(`/grantee-edit/${grantee.id}`)}
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
                </tr>
              );
            })}
          </tbody>
        </table>
        {!resultGrantees && (
          <span className="text-center">Nenhum registro encontrado!</span>
        )}
      </div>
    </main>
  );
}
