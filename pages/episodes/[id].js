import Image from "next/image";
import Link from "next/link";

const API = "https://rickandmortyapi.com/api";
export default function episode({ _episode, characters }) {
  const { name, air_date, episode } = _episode;

  return (
    <div>
      <h2>{name}</h2>
      <p>{episode}</p>
      <p>{air_date}</p>
      <h2>Characters appear in {episode}</h2>
      {characters.map(({ id, name, status, image }) => (
        <div key={id}>
          <Image src={image} width={200} height={200} />
          <h2>{name}</h2>
          <p>{status}</p>
          <Link href={`/characters/${id}`}>
            <a>View character</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/episode`);
  const data = await res.json();

  const pages = Array.from({ length: data.info.pages }, (v, i) => i + 1);

  const episodesRes = await Promise.all(
    pages.map((page) => fetch(`${API}/episode/?page=${page}`))
  );

  const episodesPage = await Promise.all(
    episodesRes.map((episodesPage) => episodesPage.json())
  );

  const episodesID = episodesPage.map((episodePage) =>
    episodePage.results.map((episode) => episode.id)
  );

  const paths = episodesID.flat().map((episodeID) => {
    return {
      params: { id: `${episodeID}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API}/episode/${params.id}`);
  const _episode = await res.json();

  const charactersRes = await Promise.all(
    _episode.characters.map((character) => fetch(character))
  );

  const characters = await Promise.all(
    charactersRes.map((character) => character.json())
  );

  return {
    props: {
      _episode,
      characters,
    },
  };
}
