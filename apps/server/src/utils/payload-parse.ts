import type { Response } from "got";
export const payloadParse = (response: Response) => {
  let payload;
  const contentType = response.headers["content-type"];
  if (contentType && contentType.includes("application/json")) {
    try {
      payload = JSON.parse(response.body as string);
    } catch (e) {
      payload = response.body;
    }
  } else {
    payload = response.body;
  }
};
