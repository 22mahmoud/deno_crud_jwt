import { RouterContext } from "../deps.ts";
import { IPost } from "../types.ts";
import { Post } from "../models/post.ts";

export async function getPosts(ctx: RouterContext) {
  try {
    const { response } = ctx;
    const posts = await Post.findAll();
    response.status = 201;
    response.body = {
      data: posts
    };
  } catch (error) {
    console.error(error);
  }
}

export async function getPost(ctx: RouterContext) {
  try {
    const { response, params } = ctx;
    const post = await Post.findOneById(params.id!);
    response.status = 201;
    response.body = {
      data: post
    };
  } catch (error) {
    console.error(error);
  }
}

export async function createPost(ctx: RouterContext) {
  try {
    const {
      request,
      response,
      state: { user }
    } = ctx;
    if (!user) {
      response.status = 401;
      response.body = {
        message: "Unauthorized"
      };
      return;
    }
    const body = await request.body();
    const data: Omit<IPost, "id" | "user"> = body.value;
    const post = await Post.insert({ ...data, userId: user.id });
    response.status = 201;
    response.body = {
      message: "post created",
      data: post
    };
  } catch (error) {
    console.error(error);
  }
}

export async function deletePost(ctx: RouterContext) {
  try {
    const {
      params,
      response,
      state: { user }
    } = ctx;
    if (!user) {
      response.status = 401;
      response.body = {
        message: "Unauthorized"
      };
      return;
    }

    const post = await Post.findOneById(params.id || "");
    if (post.user?.id !== user.id) {
      response.status = 403;
      response.body = {
        message: "you don't have access to delete this post"
      };
      return;
    }
    await Post.delete(post.id || "");
    response.status = 202;
    response.body = {
      message: "post deleted"
    };
  } catch (error) {
    console.error(error);
  }
}
