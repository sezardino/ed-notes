import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { IAuthDto, IProtectedUser } from "shared";

import { AuthLayout } from "@/components/layout/Auth/Auth";
import { SignIn } from "@/components/templates/SignIn/SignIn";

export default function SignInPage() {
  const { mutateAsync: signInHandler, isLoading } = useMutation(
    (dto: IAuthDto) => axios.post<IProtectedUser>("/api/auth/sign-in", dto)
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <SignIn signInHandler={signInHandler} />
      </AuthLayout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};