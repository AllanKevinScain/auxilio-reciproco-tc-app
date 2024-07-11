import { CreateGranteeForm, NavBar } from "@/components";
import { authOptions } from "@/lib/next-auth";
import { getServerSession, Session } from "next-auth";

export default async function CreateGrantee() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex flex-col h-full w-full gap-10 pb-10">
      <NavBar session={session as Session} showSearch={false} />
      <CreateGranteeForm
        initialValues={{
          address: {
            city: "",
            neighborhood: "",
            number: "",
            street: "",
            postalCode: "",
          },
          contact: {
            phoneNumber: "",
            email: "",
          },
          cpf: "",
          familyNames: [],
          name: "",
          birthDate: "",
          id: "",
        }}
      />
    </main>
  );
}
