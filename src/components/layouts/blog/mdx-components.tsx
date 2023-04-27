import { Components } from "@mdx-js/react/lib";

export const mdxComponents: Components = {
  h1: (props) => <h1 className="text-2xl font-bold" {...props} />,
  h2: (props) => <h1 className="text-xl font-bold" {...props} />,
  h3: (props) => <h1 className="text-lg font-bold" {...props} />,
};
