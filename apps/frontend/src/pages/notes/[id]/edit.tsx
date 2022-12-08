import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DashboardRoutes, UpdateNoteInput } from "shared";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { CrudNote } from "@/components/templates/CrudNote/CrudNote";

import { useApi } from "@/hooks";
import { ApiNoteResponse } from "@/pages/api/dashboard/note";

const Note = () => {
  const { t } = useTranslation("page-crud-note");

  const router = useRouter();
  const { data } = useApi<ApiNoteResponse>({
    endpoint: "/api/dashboard/note",
    params: { id: router.query.id },
    onSuccess(data) {
      if (data?.note) return;

      // router.push("/404");
    },
  });

  const editHandler = async (dto: UpdateNoteInput) => {
    console.log(dto);

    await new Promise((res) => {
      setTimeout(() => {
        res("resolve");
      }, 500);
    });

    router.push(DashboardRoutes.Notes);
  };

  return (
    <>
      <Head>
        <title>{t("edit-title")}</title>
      </Head>
      {data?.note && <CrudNote onCrud={editHandler} note={data.note} />}
    </>
  );
};

export default Note;
Note.getLayout = function getLayout(page: React.ReactNode) {
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
    },
  };
};
