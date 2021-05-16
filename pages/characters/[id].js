import Image from "next/image";

export default function Character({ character }) {
  return (
    <div>
      <Image src={character.image} width={200} height={200} />
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
  let page = 1;
  let paths = [];
  let next = null;
  do {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    const data = await res.json();
    next = data.info.next;

    paths.push(
      ...data.results.map(({ id }) => {
        return { params: { id: `${id}` } };
      })
    );
    ++page;
  } while (next !== null);

  console.log(paths);

  return {
    paths: paths,
    fallback: false, // See the "fallback" section below
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
