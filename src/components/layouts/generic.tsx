import { FC, ReactNode } from "react";
import Head from "next/head";
import { Inconsolata } from "@/lib/fonts";
import { Breadcrumbs, IBreadcrumbsProps } from "../breadcrumbs";
import { useTranslations } from "next-intl";

interface IGenericLayoutProps {
  HeadComponent?: typeof Head;
  title?: string;
  breadcrumbs?: IBreadcrumbsProps["items"];
  children: ReactNode;
}

export const GenericLayout: FC<IGenericLayoutProps> = (props) => {
  const { HeadComponent, title, breadcrumbs, children } = props;
  const t = useTranslations("common");

  return (
    <>
      {HeadComponent ?? (
        <Head>
          <title>{title ?? "gbrlmngr.dev"}</title>
        </Head>
      )}

      <main
        className={`max-w-screen-lg mx-auto flex flex-col items-center px-12 py-24 sm:px-24 ${Inconsolata.className}`}
      >
        {breadcrumbs?.length && <Breadcrumbs items={breadcrumbs} />}
        {children}
        <footer className="mt-4 sm:mt-6 text-sm text-neutral-500">
          {t("footer")}
        </footer>
      </main>
    </>
  );
};
