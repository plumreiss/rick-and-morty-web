import { EpisodeCard } from "@/components/Cards/EpisodeCard";
import styled from "styled-components";

const API = "https://rickandmortyapi.com/api";

const ContainerCards = styled.main`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3.5rem 0;

  article {
    margin-top: 1.3rem;
  }
`;

export default function Episodes({ episodes }) {
  return (
    <ContainerCards>
      {episodes.map(({ id, name, air_date, episode }) => (
        <EpisodeCard
          key={id}
          id={id}
          name={name}
          air_date={air_date}
          episode={episode}
        />
      ))}
    </ContainerCards>
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
