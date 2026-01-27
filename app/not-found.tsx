import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://notehub.com"),
  title: "404 - Page Not Found | Note Hub",
  description: "The page not exist on Note Hub.",
  alternates: {
    canonical: "/not-found",
  },
  openGraph: {
    title: "404 - Page Not Found | Note Hub",
    description: "The page not exist on Note Hub.",
    url: "https://notehub.com/not-found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub - Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
