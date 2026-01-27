"use client";

import { useId, useEffect } from "react";
import type { NewNote, NoteTag } from "../../types/note";
import css from "./NoteForm.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/store/noteStore";

type NoteFormProps = {
  onClose?: () => void;
};

export default function NoteForm({ onClose }: NoteFormProps) {
  const fieldId = useId();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  useEffect(() => {
    if (!draft) {
      setDraft({ title: "", content: "", tag: "Todo" });
    }
  }, [draft, setDraft]);

  const handleChange = (
    evnt: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [evnt.target.name]: evnt.target.value,
    });
  };

  const createTaskMutation = useMutation({
    mutationFn: (newNote: NewNote) => createNote(newNote),
    onSuccess() {
      clearDraft();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      router.back();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values: NewNote = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as NoteTag,
    };
    createTaskMutation.mutate(values);
  };

  const handleCancel = () => router.back();

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton}>
          Create note
        </button>
      </div>
    </form>
  );
}
