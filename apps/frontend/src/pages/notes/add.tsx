import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { CreateNoteInput, DashboardRoutes } from "shared";

import { DashboardLayout } from "@/components/layout/Dashboard";
import { CrudNote } from "@/components/templates/CrudNote/CrudNote";

const AddNote = () => {
  const { t } = useTranslation("page-crud-note");
  const router = useRouter();

  const createHandler = async (dto: CreateNoteInput) => {
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
        <title>{t("create-title")}</title>
      </Head>

      <CrudNote onCrud={createHandler} />
    </>
  );
};

export default AddNote;
AddNote.isProtected = true;
AddNote.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
