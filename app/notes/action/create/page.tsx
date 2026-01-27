import css from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm/NoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Note",
  description: "Create a new note easily in Note Hub",
  openGraph: {
    title: "Create Note",
    description: "Create a new note easily in Note Hub",
    url: "https://notehub.com/notes/action/create",
    siteName: "Note Hub",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Note Hub",
      },
    ],
    type: "website",
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
