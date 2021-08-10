import { EpisodeCard } from "../../components/EpisodeCard";

const API = "https://rickandmortyapi.com/api";

export default function Episodes({ episodes }) {
  return (
    <div>
      {episodes.map(({ id, name, air_date, episode }) => (
        <EpisodeCard
          key={id}
          id={id}
          name={name}
          air_date={air_date}
          episode={episode}
        />
      ))}
    </div>
  );
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

  return {
    props: {
      episodes,
    },
  };
}
