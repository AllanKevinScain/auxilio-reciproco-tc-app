export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  switch (cleaned.length) {
    case 9:
      return cleaned.replace(/(\d{5})(\d{4})/, "$1-$2");
    case 11:
      return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    case 13:
      return cleaned.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, "+$1 ($2) $3-$4");
    default:
      return phone;
  }
}
