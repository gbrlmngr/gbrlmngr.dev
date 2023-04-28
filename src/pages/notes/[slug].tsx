import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getNote, getNotes } from "@/lib/notes/utilities";
import { NotesLayout } from "@/components/layouts/notes";

interface NoteFrontmatter {
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
  date: string;
  tags: string[];
}

interface NotePageProps {
  note: MDXRemoteSerializeResult<unknown, Partial<NoteFrontmatter>>;
  slug: string;
}

const NotePage: NextPage<NotePageProps> = ({ note, slug }) => {
  const { frontmatter } = note ?? {};
  const { author = "", title = "", date = "", tags = [] } = frontmatter;
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    setIsRendered(true);
  }, [setIsRendered]);

  if (!isRendered) return null;

  return (
    <NotesLayout
      slug={slug}
      author={author}
      title={title}
      date={new Date(date)}
      tags={tags}
      content={note}
      previous={frontmatter.previous}
      next={frontmatter.next}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: getNotes(true).map((path) => ({
      params: { slug: path },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NotePageProps> = async (
  context
) => {
  const { params, locale } = context;
  const slug = Array.isArray(params?.slug)
    ? params!.slug[0]
    : params!.slug ?? "";
  const note = getNote(slug);

  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
      note: JSON.parse(
        JSON.stringify(await serialize(note, { parseFrontmatter: true }))
      ),
      slug,
    },
  };
};

export default NotePage;
