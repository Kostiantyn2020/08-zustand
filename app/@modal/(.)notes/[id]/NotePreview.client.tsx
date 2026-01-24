"use client";
import css from "./NotePreview.module.css";
import { useParams, useRouter } from "next/navigation";
import Modal from "@/components/Modal/Modal";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

function NotePreview() {
  const router = useRouter();
  const close = () => router.back();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={close}>
        <div className={css.container}>Loading, please wait...</div>
      </Modal>
    );
  }

  if (error || !note) {
    return (
      <Modal onClose={close}>
        <div className={css.container}>Something went wrong.</div>
      </Modal>
    );
  }

  const formattedDate = `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={close}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{formattedDate}</p>
        </div>
      </div>
    </Modal>
  );
}

export default NotePreview;
