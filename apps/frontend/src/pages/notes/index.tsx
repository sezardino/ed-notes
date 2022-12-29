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
import { useDebouncedValue, useNote } from "@/hooks";
import { api } from "@/services";

const Notes = () => {
  const { user, setLoading } = useAppContext();
  const { t } = useTranslation();
  const { deleteNote } = useNote();
  const [searchString, setSearchString] = useState("");
  const search = useDebouncedValue(searchString, 1000);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery<
    AxiosResponse<{ notes: Note[]; count: number }>
  >([QueryKeys.allNotes, user?.id, search, page], {
    queryFn: () => {
      setLoading(true);
      return api.get("note/all", { params: { search, page, limit: 9 } });
    },
    enabled: !!user?.id,
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
  });

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
        hasLoading={isLoading}
        notes={data?.data.notes}
        search={search}
        setSearch={setSearchString}
        currentPage={page}
        totalCount={data?.data.count}
        changeCurrentPage={setPage}
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
