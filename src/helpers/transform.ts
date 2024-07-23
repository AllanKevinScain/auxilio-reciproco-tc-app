import { ViaCepResponse } from "@/types";

export function viacepTransform(data: ViaCepResponse) {
  const { bairro, localidade, siafi, logradouro } = data;

  return [
    ["address.city", localidade],
    ["address.neighborhood", bairro],
    ["address.number", siafi],
    ["address.street", logradouro],
  ];
}
