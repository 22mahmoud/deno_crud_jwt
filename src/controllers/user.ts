import { RouterContext, validateJwt, uuid, yup } from "../../deps.ts";
import { IUser } from "../types.ts";
import { User } from "../models/user.ts";
import { generateJwt } from "../helpers.ts";
import { config } from "../config.ts";

export async function hello(ctx: RouterContext) {
  const { response } = ctx;
  response.status = 200;
  response.body = {
    message: "Hello, World"
  };
}

const signupSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required(),
  name: yup.string().required()
});

const loginSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

export async function signup(ctx: RouterContext) {
  const { request, response } = ctx;
  try {
    const body = await request.body();

    const data: Omit<IUser, "id"> = body.value;
    await signupSchema.validate(data);

    const userId = uuid.generate();

    // check if the user with this email already registerd
    const user = await User.findOneByEmail(data.email);
    if (user) {
      response.status = 400;
      response.body = {
        message: `User with email : ${data.email} already exist`
      };
      return;
    }

    const { id } = await User.insert({ ...data, id: userId });
    const jwt = generateJwt(id);
    response.status = 201;
    response.body = {
      data: jwt
    };
  } catch (error) {
    throw error;
  }
}

export async function login(ctx: RouterContext) {
  const { request, response } = ctx;
  try {
    const body = await request.body();
    const data: Omit<IUser, "id" | "name"> = body.value;
    await loginSchema.validate(data);

    const user = await User.comparePassword(data.email, data.password);
    if (!user) {
      response.status = 400;
      response.body = {
        message: "user not found or bad password"
      };
      return;
    }

    const jwt = generateJwt(user.id);
    response.status = 201;
    response.body = {
      data: jwt
    };
  } catch (error) {
    throw error;
  }
}

export async function me(ctx: RouterContext) {
  try {
    const { request, response } = ctx;
    const jwt = request.headers.get("authorization")?.split("bearer ")?.[1];
    if (!jwt) {
      response.status = 401;
      response.body = {
        message: "Unauthorized"
      };
      return;
    }

    const validatedJwt = await validateJwt(jwt, config.jwtSecret, {
      isThrowing: false
    });

    if (!validatedJwt) {
      response.status = 401;
      response.body = {
        message: "Unauthorized"
      };
      return;
    }

    const user = await User.findOneById(validatedJwt.payload?.id as string);
    if (!user) {
      response.status = 401;
      response.body = {
        message: "Unauthorized"
      };
      return;
    }

    response.status = 200;
    response.body = user;
  } catch (error) {
    throw error;
  }
}
