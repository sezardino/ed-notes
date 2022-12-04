import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { NoteTemplate } from "@/components/templates/Note/Note";

import { useApi } from "@/hooks";
import { ApiNoteResponse } from "@/pages/api/dashboard/note";

const Note = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { data } = useApi<ApiNoteResponse>({
    endpoint: "/api/dashboard/note",
    params: { id: router.query.id },
  });

  const deleteHandler = async () => console.log(data?.note?.id);
  const changeVisibilityHandler = async () => console.log(data?.note?.id);

  return (
    <>
      <Head>
        <title>
          {t(data?.note ? "page-note:title" : "page-loading", {
            name: data?.note?.name,
          })}
        </title>
      </Head>

      <NoteTemplate
        note={data?.note}
        deleteHandler={deleteHandler}
        changeVisibilityHandler={changeVisibilityHandler}
      />
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
      id: params.id,
    },
  };
};
