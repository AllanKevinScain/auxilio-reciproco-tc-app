import { CredentialsForm, GithubButton, GoogleButton } from "@/components";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session !== null) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex justify-center items-center h-full">
      <div
        className={twMerge(
          "flex flex-col-reverse bg-slate-300 rounded-xl p-10 w-[60vw] h-[80vh] gap-10",
          "lg:flex-row"
        )}
      >
        <div className="flex justify-center flex-col w-full h-full gap-4">
          <h1 className="text-center font-black text-lg text-zinc-800">
            Não autenticado
          </h1>

          <CredentialsForm />
          <span className="text-center text-lg font-semibold">ou</span>
          <GoogleButton />
          <GithubButton />
        </div>

        <div className="w-full h-full rounded-xl bg-ponte-coberta bg-right" />
      </div>
    </main>
  );
}
