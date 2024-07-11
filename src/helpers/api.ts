export function baseURLAPI() {
  if (process.env.NODE_ENV === "production") {
    return "URL DE PROD";
  }

  return process.env.API_BASE_URL;
}

export function baseURLCLIENTAPI() {
  if (process.env.NODE_ENV === "production") {
    return "URL DE PROD";
  }

  return process.env.NEXTAUTH_URL;
}
