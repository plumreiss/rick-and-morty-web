import Link from "next/link";

export function EpisodeCard({ id, name, air_date, episode }) {
  return (
    <article>
      <h2>{name}</h2>
      <span>{air_date}</span>
      <h3>{episode}</h3>
      <Link href={`/episodes/${id}`}>
        <a>View characters</a>
      </Link>
    </article>
  );
}
