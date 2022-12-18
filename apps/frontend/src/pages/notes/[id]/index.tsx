import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, Note } from "shared";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { NoteTemplate } from "@/components/templates/Note/Note";

import { QueryKeys } from "@/const";
import { useAppContext } from "@/context/app";
import { useNote } from "@/hooks";
import { api } from "@/services";

const NotePage = ({ id }: { id: string }) => {
  const { setLoading, user } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();
  const { deleteNote, updateNote } = useNote();
  const { data } = useQuery<AxiosResponse<Note>>([QueryKeys.note, id], {
    queryFn: () => {
      setLoading(true);
      return api.get(`note/${id}`);
    },
    enabled: !!user?.id,
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
  });
  const deleteHandler = async () => {
    try {
      await deleteNote(id);
      router.push(DashboardRoutes.Notes);
    } catch (error) {
      console.log(error);
    }
  };
  const changeVisibilityHandler = async () => {
    if (!data?.data) return;

    try {
      await updateNote({ id, dto: { isPublic: !data.data.isPublic } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>
          {t(data ? "page-note:title" : "page-loading", {
            name: data?.data.name,
          })}
        </title>
      </Head>

      {data && (
        <NoteTemplate
          note={data.data}
          deleteHandler={deleteHandler}
          changeVisibilityHandler={changeVisibilityHandler}
        />
      )}
    </>
  );
};

export default NotePage;
NotePage.isProtected = true;
NotePage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  if (!params || !params.id) return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
      id: params.id,
    },
  };
};
