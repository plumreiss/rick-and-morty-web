import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const CardContainer = styled.article`
  display: flex;
  height: 220px;
  width: 600px;
  border-radius: 0.7rem;
  background-color: rgb(60, 62, 68, 1);
  margin: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
    height: 400px;
    width: 220px;
  }
`;

const ContainerInformation = styled.div`
  flex: 3 1 0%;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContainerImg = styled.div`
  flex: 2 1 0%;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    border-radius: 0.7rem 0 0 0.7rem;
  }

  @media (max-width: 600px) {
    img {
      border-radius: 0.7rem 0.7rem 0 0;
    }
  }
`;

const NameCharacter = styled.a`
  h2 {
    font-size: 1.5rem;
    color: #f4f4f4;
    margin: 0;
    transition: 0.2s ease-out;

    &:hover {
      color: orange;
      cursor: pointer;
    }
  }
`;

const SubtitleInfo = styled.span`
  color: rgb(158, 158, 158);
`;

const InfoLink = styled.a`
  color: #f4f4f4;

  &:hover {
    color: orange;
    cursor: pointer;
  }
`;

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
    <CardContainer>
      <ContainerImg>
        <Image src={image} alt={name} layout="fill" />
      </ContainerImg>
      <ContainerInformation>
        <Container>
          <Link href={`/characters/${id}`}>
            <NameCharacter>
              <h2>{name}</h2>
            </NameCharacter>
          </Link>
          <SubtitleInfo>
            {status} - {species}
          </SubtitleInfo>
        </Container>
        <Container>
          <SubtitleInfo>Last known location:</SubtitleInfo>
          <Link href={`/locations/${locationId}`}>
            <InfoLink>{locationName}</InfoLink>
          </Link>
        </Container>
        <Container>
          <SubtitleInfo>First seen in:</SubtitleInfo>
          <Link href={`/episodes/${episodeId}`}>
            <InfoLink>{episodeName}</InfoLink>
          </Link>
        </Container>
      </ContainerInformation>
    </CardContainer>
  );
}
