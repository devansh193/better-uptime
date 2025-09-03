import { authClient } from "@/lib/auth-client";
import { SignInView } from "@/modules/auth/views/sign-in-view";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

const SignInPage = async () => {
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!!session?.data?.user) {
    redirect("/");
  }

  return <SignInView />;
};
export default SignInPage;
