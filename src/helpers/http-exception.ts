/* export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    UNPROCESSABLE_ENTITY = 422,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
  } */

export function httpException(data: Response) {
  if (data.status === 204) {
    throw new Error("Nada registrado no banco");
  }

  if (data.status === 400) {
    throw new Error("Erro na chamda");
  }

  return data;
}
