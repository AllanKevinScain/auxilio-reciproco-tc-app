import { EditGranteeForm, NavBar } from "@/components";
import { baseURLCLIENTAPI, formatPhoneNumber } from "@/helpers";
import { authOptions } from "@/lib/next-auth";
import { CreateGranteeParamsInterface, GranteeCreateType } from "@/types";
import { formatCEP, formatCPF } from "@brazilian-utils/brazilian-utils";
import { format } from "date-fns";
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
    const res = (await req.json()) as GranteeCreateType;

    return (
      <div className="flex flex-col h-full w-full gap-10 pb-10">
        <NavBar session={session as Session} showSearch={false} />
        <EditGranteeForm
          initialValues={{
            ...res,
            address: {
              ...res.address,
              postalCode: formatCEP(res.address.postalCode),
            },
            ...(res.birthDate && {
              birthDate: format(res.birthDate, "yyyy-MM-dd"),
            }),
            cpf: formatCPF(res.cpf),
            contact: {
              ...res.contact,
              phoneNumber: formatPhoneNumber(res.contact.phoneNumber),
            },
          }}
        />
      </div>
    );
  }
}
