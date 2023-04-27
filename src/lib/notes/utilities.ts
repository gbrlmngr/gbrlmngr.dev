import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export const getNotesPaths = async (
  trimExtension: boolean = true
): Promise<string[]> => {
  try {
    return (
      await readdir(join(process.cwd(), "src", "lib", "notes", "markdown"))
    )?.map(trimMdxExtension);
  } catch {
    return [];
  }
};

export const getNote = async (slug: string): Promise<string> => {
  try {
    return await readFile(
      join(process.cwd(), "src", "lib", "notes", "markdown", `${slug}.mdx`),
      "utf8"
    );
  } catch {
    return "";
  }
};

const trimMdxExtension = (path: string): string => {
  return path.replace(/\.mdx?$/i, "");
};
