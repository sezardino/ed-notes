import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { NotesTemplate } from "@/components/templates/Notes/Notes";

import { useApi } from "@/hooks";
import { ApiNotesResponse } from "@/pages/api/dashboard/notes";

const Notes = () => {
  const { t } = useTranslation();
  const [searchString, setSearchString] = useState("");

  const { data } = useApi<ApiNotesResponse>({
    endpoint: "/api/dashboard/notes",
    params: { search: searchString },
  });

  const deleteHandler = async (id: string) => console.log(id);

  return (
    <>
      <Head>
        <title>{t(data?.notes ? "page-notes:title" : "page-loading")}</title>
      </Head>

      <NotesTemplate
        notes={data?.notes}
        setSearch={setSearchString}
        deleteHandler={deleteHandler}
      />
    </>
  );
};

export default Notes;
Notes.isProtected = true;
Notes.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string)),
    },
  };
};
