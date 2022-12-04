import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import { DashboardLayout } from "@/components/layout/Dashboard";

const Dashboard = () => {
  const { t } = useTranslation("page-dashboard");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
      </Head>
    </>
  );
};

export default Dashboard;
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout title="page-dashboard:title">{page}</DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
