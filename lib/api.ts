import axios from "axios";
import type { CreateNote, Note, NoteTag } from "../types/note";

export interface NotesHttpResponse {
  notes: Note[];
  totalPages: number;
}

const MY_KEY = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number,
  searchText?: string,
  tag?: NoteTag,
): Promise<NotesHttpResponse> => {
  const options = {
    params: {
      page,
      perPage: 12,
      ...(searchText && { search: searchText }),
      ...(tag && { tag }),
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  };

  const response = await axios.get<NotesHttpResponse>("/notes", options);
  return response.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const response = await axios.post<Note>("/notes", newNote, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: Note["id"]): Promise<Note> => {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return response.data;
};

export const fetchNoteById = async (id: Note["id"]): Promise<Note> => {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${MY_KEY}`,
    },
  });
  return response.data;
};
