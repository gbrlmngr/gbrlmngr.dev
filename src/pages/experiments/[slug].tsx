import { resolve } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { FC, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { Components } from "@mdx-js/react/lib";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import format from "date-fns/format";
import formatISO from "date-fns/formatISO";
import { useTranslations } from "next-intl";
import remarkGfm from "remark-gfm";
import { GenericLayout } from "@/components/layouts/generic";
import { components as mdxComponents } from "@/components/mdx";
import { track, Events } from "@/lib/mixpanel/events";

interface IExperimentPageProps {
  experiment: {
    meta: {
      slug: string;
    };
    mdxSource: MDXRemoteSerializeResult;
  };
}

const ExperimentPage: FC<IExperimentPageProps> = (props) => {
  const { experiment } = props;
  const { meta, mdxSource } = experiment ?? {};
  const t = useTranslations("pages.experiment");

  useEffect(() => {
    if (meta.slug) {
      track(Events.ViewedExperiment, {
        "Experiment Slug": meta.slug,
      });
    }
  }, [meta.slug]);

  return (
    <GenericLayout
      title={t("page-title", {
        experimentName: mdxSource.frontmatter.summary as string,
      })}
      breadcrumbs={[
        { label: "~", url: "/" },
        { label: t("experiments"), url: "/experiments" },
        { label: meta.slug, url: `/experiments/${meta.slug}` },
      ]}
    >
      <section className="w-full p-4 mb-2 sm:mb-4 grid gap-2 sm:gap-16 grid-cols-1 sm:grid-cols-2 text-sm border-l-4 border-l-white bg-neutral-950">
        <p className="truncate">
          <span className="font-bold">{t("meta.summary")}:</span>{" "}
          <span title={mdxSource.frontmatter.summary as string}>
            {mdxSource.frontmatter.summary as string}
          </span>
        </p>
      </section>

      <section className="w-full mt-2 sm:mt-4">
        <MDXRemote
          {...experiment.mdxSource}
          components={mdxComponents as Components}
        />
      </section>
    </GenericLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const experimentsDirectoryPath = resolve(
    process.cwd(),
    "src",
    "lib",
    "experiments"
  );
  const experimentsFileNames = await readdir(experimentsDirectoryPath);

  return {
    paths: experimentsFileNames?.map((slug) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<IExperimentPageProps> = async ({
  locale,
  params,
}) => {
  try {
    const experimentSlug = params?.slug as string;

    if (!experimentSlug) {
      return {
        redirect: {
          destination: "/experiments",
          permanent: false,
        },
      };
    }

    const experimentFilePath = resolve(
      process.cwd(),
      "src",
      "lib",
      "experiments",
      `${experimentSlug}.mdx`
    );
    const experimentFileContents = await readFile(experimentFilePath, "utf8");

    const mdxSource = await serialize(experimentFileContents, {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        format: "mdx",
      },
      parseFrontmatter: true,
    });

    return {
      props: {
        i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`))
          .default,
        experiment: {
          meta: { slug: experimentSlug },
          mdxSource,
        },
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default ExperimentPage;
