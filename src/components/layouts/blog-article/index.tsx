import { FC } from "react";
import { Unbounded, Inconsolata } from "next/font/google";
import Link from "next/link";
import { format, formatDistanceToNow, type Locale } from "date-fns";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { mdxComponents } from "./mdx-components";

interface BlogArticleLayoutProps {
  locale?: Locale;
  previous?: {
    title: string;
    url: string;
  };
  next?: {
    title: string;
    url: string;
  };
  title: string;
  author: string;
  date: Date;
  tags: string[];
  content: MDXRemoteSerializeResult<any, any>;
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

export const BlogArticleLayout: FC<BlogArticleLayoutProps> = (props) => {
  const { locale, previous, next, title, author, date, tags, content } = props;
  const t = useTranslations("pages.blog");
  const pageTitle = `${t("page-title")}: ${title}`;

  const variants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    blurred: { filter: "blur(10px)" },
    clear: { filter: "blur(0)" },
  };

  const isMotionReduced = useReducedMotion();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <motion.div
        className={`max-w-screen-lg flex flex-col items-center mx-auto py-16 px-12 sm:px-24 ${InconsolataFont.className}`}
        variants={variants}
        initial={["blurred", "hidden"]}
        animate={["clear", "visible"]}
        transition={
          isMotionReduced
            ? { duration: 0 }
            : { duration: 0.8, delay: 0.3, ease: "easeOut" }
        }
      >
        <header className="w-full text-left space-x-2 mb-4 text-neutral-500">
          <Link
            href="/"
            className="transition-colors duration-500 hover:text-white focus:text-white active:text-white"
          >
            {t("breadcrumbs.root")}
          </Link>
          <span>/</span>
          <Link
            href="/blog"
            className="transition-colors duration-500 hover:text-white focus:text-white active:text-white"
          >
            {t("breadcrumbs.blog")}
          </Link>
        </header>

        <article className="w-full divide-y divide-dashed divide-neutral-600">
          <header className="w-full flex flex-row items-center justify-between pb-2">
            {previous && (
              <Link
                href={previous.url}
                className="w-1/2 flex flex-row items-center justify-start flex-grow px-1 space-x-1 ring-0 outline-none text-sm text-neutral-500 transition-all duration-500 hover:text-white focus:text-white active:text-white"
              >
                <span className="flex-shrink-0">&#x2190;</span>
                <span className="w-full flex-grow text-left truncate">
                  {previous.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={next.url}
                className="w-1/2 flex flex-row items-center justify-end flex-grow px-1 space-x-1 ring-0 outline-none text-sm text-neutral-500 transition-all duration-500 hover:text-white focus:text-white active:text-white"
              >
                <span className="w-full flex-grow text-right truncate">
                  {next.title}
                </span>
                <span className="flex-shrink-0">&#x2192;</span>
              </Link>
            )}
          </header>
          <main className="w-full py-2 text-center">
            <h1 className={`text-2xl ${UnboundedFont.className}`}>{title}</h1>
            <section className="w-full space-x-2">
              <small className="text-sm">{author}</small>
              <small className="text-sm">@</small>
              <time dateTime={format(date, "yyyy-MM-dd")} className="text-sm">
                {formatDistanceToNow(date, {
                  locale,
                  addSuffix: true,
                  includeSeconds: false,
                })}
              </time>
            </section>
            {tags.length > 0 && (
              <section className="w-full space-x-2 text-center">
                {tags.map((tag) => (
                  <span key={tag} className="italic text-sm text-neutral-500">
                    #{tag.replaceAll(/\W+/gi, "-")}
                  </span>
                ))}
              </section>
            )}
            <section className="text-justify pt-4">
              <MDXRemote {...content} components={mdxComponents} />
            </section>
          </main>
          <footer className="w-full pt-2 text-center">
            <small className="text-sm text-neutral-500">
              &copy; {author} {new Date().getFullYear()}
            </small>
          </footer>
        </article>
      </motion.div>
    </>
  );
};
