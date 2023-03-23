import { GetServerSideProps } from "next";
import { AuthRoutes } from "shared";

export default function AuthIndex() {
  return null;
}
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: AuthRoutes.SingIn,
    },
  };
};
