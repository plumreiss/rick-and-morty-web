import styles from "./NavBar.module.css";
import Link from "next/link";

export function NavBar() {
  return (
    <header className={styles.container__nav}>
      <Link href="/">
        <h2>Rick and Morty</h2>
      </Link>
      <nav className={styles.nav__links}>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/characters">
          <a>Characters</a>
        </Link>

        <Link href="/locations">
          <a>Locations</a>
        </Link>

        <Link href="/episodes">
          <a>Episodes</a>
        </Link>
      </nav>
    </header>
  );
}
