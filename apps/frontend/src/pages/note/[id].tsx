import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Note } from "shared";

import { DefaultLayout } from "@/components/layout/Default";
import { NoteTemplate } from "@/components/templates/Note/Note";

import { QueryKeys } from "@/const";
import { useAppContext } from "@/context/app";
import { api } from "@/services";

const NotePage = ({ id }: { id: string }) => {
  const { setLoading } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useQuery<AxiosResponse<Note>>([QueryKeys.note, id], {
    queryFn: () => {
      setLoading(true);
      return api.get(`note/${id}`);
    },
    onSuccess: () => setLoading(false),
    onError: () => {
      setLoading(false);
      router.push("/404");
    },
  });

  return (
    <>
      <Head>
        <title>
          {t(data ? "page-note:title" : "page-loading", {
            name: data?.data.name,
          })}
        </title>
      </Head>

      {data && <NoteTemplate note={data.data} />}
    </>
  );
};

export default NotePage;
NotePage.getLayout = function getLayout(page: React.ReactNode) {
  return <DefaultLayout>{page}</DefaultLayout>;
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
