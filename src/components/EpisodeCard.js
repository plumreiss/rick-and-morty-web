import Link from "next/link";
import styled from "styled-components";

const CardEpisode = styled.article`
  display: flex;
  width: 220px;
  height: 300px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb(60, 62, 68, 1);
  text-align: center;
  border-radius: 0.7rem;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: rgb(158, 158, 158);
  }

  h3 {
    color: #f4f4f4;
  }
`;

const Title = styled.a`
  color: #f4f4f4;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: underline;

  &:hover {
    color: orange;
  }
`;

export function EpisodeCard({ id, name, air_date, episode }) {
  return (
    <CardEpisode>
      <ContainerInfo>
        <Link href={`/episodes/${id}`}>
          <Title>{name}</Title>
        </Link>
      </ContainerInfo>
      <ContainerInfo>
        <span>Air Date: </span>
        <h3>{air_date}</h3>
      </ContainerInfo>
      <ContainerInfo>
        <span>Season and Episode: </span>
        <h3>{episode}</h3>
      </ContainerInfo>
    </CardEpisode>
  );
}
