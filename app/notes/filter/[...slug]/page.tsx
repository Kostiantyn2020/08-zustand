import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

const URL_TAG_MAP: Record<string, NoteTag> = {
  todo: "Todo",
  work: "Work",
  personal: "Personal",
  meeting: "Meeting",
  shopping: "Shopping",
};

export default async function Notes({ params }: PageProps) {
  const { slug } = await params;

  const queryClient = new QueryClient();

  const page = 1;
  const search = "";

  const rawTag = slug?.[0];

  const tag: NoteTag | undefined = rawTag ? URL_TAG_MAP[rawTag] : undefined;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "all"} tag={tag} />
    </HydrationBoundary>
  );
}
