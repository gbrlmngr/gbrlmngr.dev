import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { getArticle, getArticlesPaths } from "@/lib/blog/utilities";
import { BlogArticleLayout } from "@/components/layouts/blog-article";

interface BlogArticleFrontmatter {
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

interface BlogPageProps {
  article: MDXRemoteSerializeResult<unknown, Partial<BlogArticleFrontmatter>>;
}

const BlogPage: NextPage<BlogPageProps> = ({ article }) => {
  const { frontmatter } = article ?? {};
  const { author = "", title = "", date = "", tags = [] } = frontmatter;

  return (
    <BlogArticleLayout
      author={author}
      title={title}
      date={new Date(date)}
      tags={tags}
      content={article}
      previous={frontmatter.previous}
      next={frontmatter.next}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  return {
    paths: (await getArticlesPaths()).map((path) => ({
      params: { slug: path },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async (
  context
) => {
  const { params, locale } = context;
  const slug = Array.isArray(params?.slug)
    ? params!.slug[0]
    : params!.slug ?? "";
  const article = await getArticle(slug);

  return {
    props: {
      i18n: (await import(`../../lib/locales/${locale ?? "en"}.json`)).default,
      article: JSON.parse(
        JSON.stringify(await serialize(article, { parseFrontmatter: true }))
      ),
    },
  };
};

export default BlogPage;
