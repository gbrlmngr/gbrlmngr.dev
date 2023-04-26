import { FC } from "react";
import { Unbounded, Inconsolata } from "next/font/google";
import Link from "next/link";
import { format, formatDistanceToNow, type Locale } from "date-fns";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface BlogLayoutProps {
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
  mdx: MDXRemoteSerializeResult;
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

export const BlogLayout: FC<BlogLayoutProps> = (props) => {
  const { locale, previous, next, title, author, date, tags, mdx } = props;

  return (
    <article
      className={`max-w-screen-lg flex flex-col items-center mx-auto px-12 py-24 sm:px-24 divide-y ${InconsolataFont.className}`}
    >
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
      <main className="w-full py-2 space-y-1 text-center">
        <h1 className={`text-2xl ${UnboundedFont.className}`}>{title}</h1>
        <section className="w-full flex flex-row items-center justify-center space-x-2">
          <small className="text-sm">{author}</small>
          <small className="text-sm">@</small>
          <time dateTime={format(date, "yyyy-MM-dd")} className="text-sm">
            {formatDistanceToNow(date, { addSuffix: true, locale })}
          </time>
        </section>
        {tags.length > 0 && (
          <section className="w-full space-x-2 text-center">
            {tags.map((tag) => (
              <span key={tag} className="italic text-sm text-neutral-500">
                #{tag}
              </span>
            ))}
          </section>
        )}
        <section className="text-justify pt-3">
          <MDXRemote {...mdx} />
        </section>
      </main>
      <footer className="w-full pt-2 text-center">
        <small className="text-sm text-neutral-500">
          &copy; {author} {new Date().getFullYear()}
        </small>
      </footer>
    </article>
  );
};
