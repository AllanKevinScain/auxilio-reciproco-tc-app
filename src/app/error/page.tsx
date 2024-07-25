"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const navigate = useRouter();

  return (
    <main className="flex flex-col justify-center items-center h-full gap-4">
      <h1 className="text-center font-black text-lg text-zinc-800">
        Aconteceu um error!
      </h1>

      <Button onClick={() => navigate.push("/")} className="w-[50%]">
        Tentar Novamente
      </Button>
    </main>
  );
}
