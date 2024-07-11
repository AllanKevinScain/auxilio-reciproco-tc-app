import { EditGranteeForm, NavBar } from "@/components";
import { baseURLCLIENTAPI } from "@/helpers";
import { authOptions } from "@/lib/next-auth";
import { CreateGranteeParamsInterface } from "@/types";
import { getServerSession, Session } from "next-auth";

export default async function CreateGrantee({
  params,
}: CreateGranteeParamsInterface) {
  const session = await getServerSession(authOptions);

  if (params.granteeId) {
    const req = await fetch(
      `${baseURLCLIENTAPI()}/api/grantee?id=${params.granteeId}`,
      {
        method: "GET",
      }
    );
    const res = await req.json();

    return (
      <main className="flex flex-col h-full w-full gap-10 pb-10">
        <NavBar session={session as Session} showSearch={false} />
        <EditGranteeForm initialValues={res} />
      </main>
    );
  }
}
