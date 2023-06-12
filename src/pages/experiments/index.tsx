import { resolve } from "node:path";
import { readdirSync, readFileSync } from "node:fs";
import { GetStaticProps, NextPage } from "next";
import { useTranslations } from "next-intl";
import * as matter from "gray-matter";
import { GenericLayout } from "@/components/layouts/generic";
import { Unbounded } from "@/lib/fonts";
import Link from "next/link";

interface IExperimentsPageProps {
  experiments: Record<string, string | number | boolean>[];
}

const capitalize = (str: string): string =>
  `${str.charAt(0).toUpperCase()}${str.substring(1)}`;

const ExperimentsPage: NextPage<IExperimentsPageProps> = ({ experiments }) => {
  const t = useTranslations("pages.experiments");

  return (
    <GenericLayout
      title={t("page-title")}
      breadcrumbs={[
        { label: "~", url: "/" },
        { label: t("experiments"), url: "/experiments" },
      ]}
    >
      <h1
        className={`mb-2 sm:mb-4 text-2xl sm:text-3xl font-bold ${Unbounded.className}`}
      >
        {capitalize(t("experiments"))}
      </h1>

      <section className="w-full text-center">
        {experiments.length === 0 && <p>{t("nothing-to-see")}</p>}

        {experiments.length > 0 &&
          experiments.map((experiment, index) => (
            <Link
              key={experiment.slug as string}
              href={`/experiments/${experiment.slug}`}
              className="group w-full inline-flex gap-2 items-center justify-center"
            >
              <span className="text-neutral-500 text-sm">
                #{String(index + 1).padStart(3, "0")}
              </span>
              <span className="truncate link">{experiment.summary}</span>
            </Link>
          ))}
      </section>
    </GenericLayout>
  );
};

export const getStaticProps: GetStaticProps<IExperimentsPageProps> = async ({
  locale,
}) => {
  const experimentsDirectoryPath = resolve(
    process.cwd(),
    "src",
    "lib",
    "experiments"
  );
  const experimentsFileNames = readdirSync(experimentsDirectoryPath);
  const experiments = experimentsFileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const { data } = matter.read(resolve(experimentsDirectoryPath, fileName));
      return {
        ...data,
        slug: fileName.replace(/\.mdx$/i, ""),
      };
    });

  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
      experiments,
    },
  };
};

export default ExperimentsPage;
