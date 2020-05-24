import { makeJwt, Jose, Payload } from "../deps.ts";
import { config } from "./config.ts";

export function generateJwt(id: string) {
  const key = config.jwtSecret;

  const payload: Payload = {
    id
  };

  const header: Jose = {
    alg: "HS256",
    typ: "JWT"
  };

  return makeJwt({ header, payload, key });
}
