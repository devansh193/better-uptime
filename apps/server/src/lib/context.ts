import type { Context as HonoContext } from "hono";

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  return {
    user: context.get("user"),
    session: context.get("session"),
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
