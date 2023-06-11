import { type Components } from "@mdx-js/react/lib";
import { Unbounded } from "@/lib/fonts";

export const components: Components = {
  HeroHeading: (props) => (
    <h1
      className={`text-3xl sm:text-4xl font-bold ${Unbounded.className} ${
        props.isCentered ? "text-center" : ""
      }`}
    >
      {props.children}
    </h1>
  ),
  h1: (props) => <h1 className="text-3xl font-bold">{props.children}</h1>,
  h2: (props) => <h2 className="text-2xl font-bold">{props.children}</h2>,
  h3: (props) => <h3 className="text-xl font-bold">{props.children}</h3>,
};
