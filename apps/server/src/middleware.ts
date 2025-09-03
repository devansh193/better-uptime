import type { Context, Next } from "hono";
import { auth } from "./lib/auth";

export async function sessionMiddleware(c: Context, next: Next) {
  try {
    const session = await auth.api.getSession({ headers: c.req.raw.headers });
    if (!session) {
      c.set("user", null);
      c.set("session", null);
      return next();
    }
    c.set("user", session.user);
    c.set("session", session);
    return next();
  } catch (error) {
    console.error("Session middleware error:", error);
    c.set("user", null);
    c.set("session", null);
    return next();
  }
}
