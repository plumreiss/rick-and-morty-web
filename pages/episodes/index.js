const API = "https://rickandmortyapi.com/api";

export default function Episodes() {
  return <h1>Desde episodes</h1>;
}

export async function getStaticProps() {
  const res = await fetch(`${API}/episode`);
  const data = await res.json();

  const episodesPages = Array.from(
    { length: data.info.pages },
    (v, i) => i + 1
  );

  const episodesRes = await Promise.all(
    episodesPages.map((page) => fetch(`${API}/episode/?page=${page}`))
  );

  const episodesJson = await Promise.all(
    episodesRes.map((episodeRes) => episodeRes.json())
  );

  const episodes = episodesJson.map((el) => el.results).flat();

  console.log(episodes);

  return {
    props: {
      episodes,
    },
  };
}
