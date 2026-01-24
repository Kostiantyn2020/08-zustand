import Link from "next/link";
import css from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"] as const;

function SidebarSlot() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link className={css.menuLink} href="/notes/filter/all">
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link className={css.menuLink} href={`/notes/filter/${tag}`}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SidebarSlot;
