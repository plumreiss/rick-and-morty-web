import Link from "next/link";

export default function Main() {
  return (
    //Landing
    <div>
      <h1>Rick and morty Informations</h1>
      <ul>
        <li>
          <Link href="/characters">
            <a>Characters</a>
          </Link>
          <Link href="/locations">
            <a>Locations</a>
          </Link>
          <Link href="/episodes">
            <a>Episodes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
