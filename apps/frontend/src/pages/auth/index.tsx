import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthRoutes } from "shared";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace(AuthRoutes.SingIn);
  }, [router]);

  return null;
}
