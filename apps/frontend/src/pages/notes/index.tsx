import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Note } from "shared";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { NotesTemplate } from "@/components/templates/Notes/Notes";

import { QueryKeys } from "@/const";
import { useAppContext } from "@/context/app";
import { useNote } from "@/hooks";
import { api } from "@/services";

const Notes = () => {
  const { user, setLoading } = useAppContext();
  const { t } = useTranslation();
  const { deleteNote } = useNote();
  const { data } = useQuery<AxiosResponse<Note[]>>(
    [QueryKeys.allNotes, user?.id],
    {
      queryFn: () => {
        setLoading(true);
        return api.get("note/all");
      },
      enabled: !!user?.id,
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
    }
  );

  const [searchString, setSearchString] = useState("");

  const deleteHandler = async (id: string) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{t(data?.data ? "page-notes:title" : "page-loading")}</title>
      </Head>

      <NotesTemplate
        notes={data?.data}
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
