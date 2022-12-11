import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { AuthInput, DashboardRoutes } from "shared";

import { AuthLayout } from "@/components/layout/Auth";
import { SignUp } from "@/components/templates/SignUp/SignUp";

import { useAuth } from "@/hooks/useAuth";

const SignUpPage = () => {
  const { signUp } = useAuth();
  const router = useRouter();

  const signUpHandler = async (dto: AuthInput) => {
    try {
      await signUp(dto);
      router.push(DashboardRoutes.Dashboard);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <SignUp signUpHandler={signUpHandler} />
    </>
  );
};

export default SignUpPage;
SignUpPage.getLayout = function getLayout(page: React.ReactNode) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
