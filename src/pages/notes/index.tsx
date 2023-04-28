import { GetStaticProps, NextPage } from "next";
import { Unbounded, Inconsolata } from "next/font/google";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import { format } from "date-fns";
import { NoteFrontmatter, getNotesMetadata } from "@/lib/notes/utilities";
import { Breadcrumbs } from "@/components/breadcrumbs";

interface NotesPageProps {
  notes: (NoteFrontmatter & { slug: string })[];
}

const UnboundedFont = Unbounded({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});
const InconsolataFont = Inconsolata({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});

const NotesPage: NextPage<NotesPageProps> = ({ notes }) => {
  const t = useTranslations("pages.notes");
  const variants: Variants = {
    hidden: { opacity: 0, y: -15 },
    visible: { opacity: 1, y: 0 },
    blurred: { filter: "blur(10px)" },
    clear: { filter: "blur(0)" },
  };

  const isMotionReduced = useReducedMotion();

  return (
    <>
      <Head>
        <title>{t("page-title")}</title>
      </Head>
      <main
        className={`max-w-screen-lg mx-auto flex flex-col items-center py-16 px-12 sm:px-24 ${InconsolataFont.className}`}
      >
        <motion.div
          className="w-full"
          variants={variants}
          initial={["blurred", "hidden"]}
          animate={["clear", "visible"]}
          transition={
            isMotionReduced
              ? { duration: 0 }
              : { duration: 0.8, delay: 0.3, ease: "easeOut" }
          }
        >
          <header className="w-full">
            <Breadcrumbs
              items={[
                { label: t("breadcrumbs.root"), url: "/" },
                {
                  label: t("breadcrumbs.notes"),
                  url: "/notes",
                  isActive: true,
                },
              ]}
            />
            <h1
              className={`text-center text-4xl font-bold ${UnboundedFont.className}`}
            >
              {t("index")}
            </h1>
          </header>

          <section className="pt-4 text-center">
            {notes.map((note) => {
              const { date, slug, title } = note;

              return (
                <div
                  key={slug}
                  className="flex flex-row items-center justify-center gap-2"
                >
                  <small
                    className="min-w-[10ch] text-sm"
                    title={format(new Date(date), "yyyy-MM-dd HH:mm")}
                  >
                    {format(new Date(date), "yyyy-MM-dd")}
                  </small>
                  <Link
                    href={`/notes/${slug}`}
                    className="max-w-xs truncate text-neutral-500 transition-colors duration-500 hover:text-white focus:text-white active:text-white"
                  >
                    {title}
                  </Link>
                </div>
              );
            })}
          </section>
        </motion.div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<NotesPageProps> = async ({
  locale,
}) => {
  const notes = getNotesMetadata();

  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
      notes,
    },
  };
};

export default NotesPage;
