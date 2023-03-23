import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, Note, UpdateNoteInput } from "shared";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { CrudNote } from "@/components/templates/CrudNote/CrudNote";

import { QueryKeys } from "@/const";
import { useAppContext } from "@/context/app";
import { useNote } from "@/hooks";
import { api } from "@/services";

const EditNote = ({ id }: { id: string }) => {
  const { t } = useTranslation("page-crud-note");
  const { user, setLoading } = useAppContext();
  const { updateNote } = useNote();

  const router = useRouter();
  const { data } = useQuery<AxiosResponse<Note>>([QueryKeys.note, id], {
    queryFn: () => {
      setLoading(true);
      return api.get(`note/${id}`);
    },
    enabled: !!user?.id,
    onSuccess: () => setLoading(false),
    onError: () => setLoading(false),
  });

  const editHandler = async (dto: UpdateNoteInput) => {
    await updateNote({ id, dto });

    router.push(DashboardRoutes.Note + id);
  };

  return (
    <>
      <Head>
        <title>{t("edit-title")}</title>
      </Head>
      {data?.data && <CrudNote onCrud={editHandler} note={data.data} />}
    </>
  );
};

export default EditNote;
EditNote.isProtected = true;
EditNote.getLayout = function getLayout(page: React.ReactNode) {
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
