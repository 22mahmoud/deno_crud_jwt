import { bgGreen, black, Application, Router } from "../deps.ts";
import { hello, signup, login, me } from "./controllers/user.ts";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
} from "./controllers/post.ts";
import { handleAuthHeader, handleErrors } from "./middlewares.ts";
import { IUser } from "./types.ts";

const router = new Router();

router
  .get("/", hello)
  .post("/signup", signup)
  .post("/login", login)
  .get("/me", me)
  .get("/posts", getPosts)
  .post("/posts", createPost)
  .get("/posts/:id", getPost)
  .delete("/posts/:id", deletePost);

const app = new Application<{
  user: Omit<IUser, "password"> | null;
}>();

app.use(handleAuthHeader);
app.use(handleErrors);

app.use(router.routes());
app.use(router.allowedMethods());

console.log(bgGreen(black("Server started on port 8000")));

await app.listen({ port: 8000 });
