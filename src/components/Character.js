import Image from "next/image";
import Link from "next/link";

export function Character({
  id,
  name,
  status,
  species,
  image,
  locationName,
  locationId,
  episodeId,
  episodeName,
}) {
  return (
    <article>
      <div>
        <Image src={image} alt={name} width={200} height={200} />
      </div>
      <div>
        <div>
          <Link href={`/characters/${id}`}>
            <a>
              <h2>{name}</h2>
            </a>
          </Link>
          <span>
            {status} - {species}
          </span>
        </div>
        <div>
          <span>Last known location:</span>
          <Link href={`/locations/${locationId}`}>
            <a>{locationName}</a>
          </Link>
        </div>
        <div>
          <span>First seen in:</span>
          <Link href={`/episodes/${episodeId}`}>
            <a>{episodeName}</a>
          </Link>
        </div>
      </div>
    </article>
  );
}
