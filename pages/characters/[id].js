import Image from "next/image";

export default function Character({ character }) {
  return (
    <div>
      <Image
        src={character.image}
        width={200}
        height={200}
        alt={character.name}
      />
      <div>
        <p>{character.name}</p>
        <p>{character.status}</p>
        <p>{character.species}</p>
        <p>{character.gender}</p>
        <p>{character.origin.name}</p>
        <p>{character.location.name}</p>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const API = "https://rickandmortyapi.com/api";

  const res = await fetch(`${API}/character`);
  const data = await res.json();
  const pages = Array.from({ length: data.info.pages }, (v, i) => i + 1);

  const pagesRes = await Promise.all(
    pages.map((page) => {
      const resCharacters = fetch(`${API}/character/?page=${page}`);
      return resCharacters;
    })
  );

  const characters = await Promise.all(
    pagesRes.map((pageCharacters) => {
      return pageCharacters.json();
    })
  );

  const charactersID = characters.map((charactersPage) =>
    charactersPage.results.map((character) => character.id)
  );

  const paths = charactersID.flat().map((characterID) => {
    return {
      params: { id: `${characterID}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  );
  const character = await res.json();

  return {
    props: {
      character,
    },
  };
}
