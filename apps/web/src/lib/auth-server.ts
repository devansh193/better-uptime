import { headers } from "next/headers";

export async function getServerSession() {
  try {
    const headersList = await headers();
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"
      }/api/auth/get-session`,
      {
        headers: {
          cookie: headersList.get("cookie") || "",
        },
        credentials: "include",
        cache: "no-store", // Don't cache session requests
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    return null;
  } catch (error) {
    console.error("Server session check error:", error);
    return null;
  }
}
