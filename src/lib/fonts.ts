import {
  Inconsolata as Inconsolata_NextFont,
  Unbounded as Unbounded_NextFond,
} from "next/font/google";

export const Unbounded = Unbounded_NextFond({
  weight: ["700"],
  subsets: ["latin"],
  display: "swap",
});

export const Inconsolata = Inconsolata_NextFont({
  weight: ["400", "600"],
  subsets: ["latin"],
  display: "swap",
});
