import { Context, validateJwt } from "./deps.ts";
import { IUser } from "./types.ts";
import { config } from "./config.ts";
import { User } from "./models/user.ts";

export async function handleAuthHeader(
  ctx: Context<{ user: Omit<IUser, "password"> | null }>,
  next: () => Promise<void>
) {
  try {
    const { request, state } = ctx;

    const jwt =
      request.headers.get("authorization")?.split("bearer ")?.[1] || "";

    const validatedJwt = await validateJwt(jwt, config.jwtSecret, {
      isThrowing: false
    });

    if (!validatedJwt) {
      state.user = null;
    }

    const user = await User.findOneById(validatedJwt?.payload?.id! as string);
    if (!user) {
      state.user = null;
    }

    state.user = user;
    await next();
  } catch (error) {
    console.error(error);
  }
}
