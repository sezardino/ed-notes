import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { NotesTemplate } from "@/components/templates/Notes/Notes";

import { useApi } from "@/hooks";
import { ApiNotesResponse } from "@/pages/api/dashboard/notes";

const Notes = () => {
  const { data } = useApi<ApiNotesResponse>({
    endpoint: "/api/dashboard/notes",
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NotesTemplate notes={data?.notes} />
    </>
  );
};

export default Notes;
Notes.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
