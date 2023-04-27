import { useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getNote, getNotesPaths } from "@/lib/notes/utilities";
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

interface NotesPageProps {
  note: MDXRemoteSerializeResult<unknown, Partial<NoteFrontmatter>>;
}

const NotesPage: NextPage<NotesPageProps> = ({ note }) => {
  const { frontmatter } = note ?? {};
  const { author = "", title = "", date = "", tags = [] } = frontmatter;
  const [isRendered, setIsRendered] = useState<boolean>(false);

  useEffect(() => {
    setIsRendered(true);
  }, [setIsRendered]);

  if (!isRendered) return null;

  return (
    <NotesLayout
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

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: (await getNotesPaths()).map((path) => ({
      params: { slug: path },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<NotesPageProps> = async (
  context
) => {
  const { params, locale } = context;
  const slug = Array.isArray(params?.slug)
    ? params!.slug[0]
    : params!.slug ?? "";
  const note = await getNote(slug);

  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
      note: JSON.parse(
        JSON.stringify(await serialize(note, { parseFrontmatter: true }))
      ),
    },
  };
};

export default NotesPage;
