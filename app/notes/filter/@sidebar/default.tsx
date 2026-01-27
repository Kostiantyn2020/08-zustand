import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { NoteTag } from "@/types/note";

const SideBarNotes = () => {
  const tags: NoteTag[] = ["Work", "Todo", "Personal", "Meeting", "Shopping"];

  return (
    <>
     
      <ul className={css.menuList}>
        <li><Link href="/notes/action/create">Create note</Link></li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All Notes
          </Link>
        </li>

        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SideBarNotes;
