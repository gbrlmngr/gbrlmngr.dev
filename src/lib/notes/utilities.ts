import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { read } from "gray-matter";

export interface NoteFrontmatter {
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

export const getNotes = (shouldRemoveExtension: boolean = false): string[] => {
  try {
    const files = readdirSync(
      join(process.cwd(), "src", "lib", "notes", "markdown")
    );

    if (shouldRemoveExtension) {
      return files.map(trimMdxExtension);
    }

    return files;
  } catch {
    return [];
  }
};

export const getNote = (slug: string): string => {
  try {
    return readFileSync(
      join(process.cwd(), "src", "lib", "notes", "markdown", `${slug}.mdx`),
      "utf8"
    );
  } catch {
    return "";
  }
};

export const getNoteMetadata = (filename: string) => {
  try {
    const metadata = read(
      join(process.cwd(), "src", "lib", "notes", "markdown", filename)
    ).data;

    return {
      ...metadata,
      slug: trimMdxExtension(filename),
    } as NoteFrontmatter & { slug: string };
  } catch {
    return {} as NoteFrontmatter & { slug: string };
  }
};

export const getNotesMetadata = () => {
  try {
    return getNotes().map(getNoteMetadata);
  } catch {
    return [];
  }
};

const trimMdxExtension = (path: string): string => {
  return path.replace(/\.mdx?$/i, "");
};
