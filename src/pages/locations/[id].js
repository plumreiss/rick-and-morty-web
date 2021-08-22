import { Character } from "../../components/Character";
import { LocationCard } from "../../components/LocationCard";
import styled from "styled-components";

const API = "https://rickandmortyapi.com/api";

const ContainerCards = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3.5rem 0;
  max-width: 70%;
  margin: 0 auto;

  h2 {
    text-align: center;
    color: #f4f4f4;
  }
`;

export default function Location({ location, residents }) {
  const { id, name, type, dimension } = location;

  return (
    <>
      <ContainerCards>
        <LocationCard id={id} name={name} type={type} dimension={dimension} />
      </ContainerCards>
      <ContainerCards>
        <h2>Residents</h2>
      </ContainerCards>
      <ContainerCards>
        {residents.map(
          ({
            id,
            name,
            status,
            species,
            image,
            locationName,
            locationId,
            episodeId,
            episodeName,
          }) => (
            <Character
              key={id}
              id={id}
              name={name}
              status={status}
              species={species}
              image={image}
              locationName={locationName}
              locationId={locationId}
              episodeId={episodeId}
              episodeName={episodeName}
            />
          )
        )}
      </ContainerCards>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/location`);
  const data = await res.json();
  const locationsId = Array.from({ length: data.info.count }, (v, i) => i + 1);

  const paths = locationsId.map((locationId) => {
    return {
      params: { id: `${locationId}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locationRes = await fetch(`${API}/location/${params.id}`);
  const location = await locationRes.json();

  const residentsRes = await Promise.all(
    location.residents.map((resident) => {
      return fetch(resident);
    })
  );

  const residentsData = await Promise.all(
    residentsRes.map((resident) => resident.json())
  );

  const residents = await Promise.all(
    residentsData.map(async (character) => {
      const firstEpisode = character.episode[0];

      const episodeId = firstEpisode.substr(firstEpisode.lastIndexOf("/") + 1);
      const resEpisode = await fetch(firstEpisode);
      const episodeJson = await resEpisode.json();
      const episodeName = episodeJson.name;

      const locationName = character.location.name;
      const urlLocation = character.location.url;
      const locationId = urlLocation.substr(urlLocation.lastIndexOf("/") + 1);
      return {
        id: character.id,
        name: character.name,
        status: character.status,
        species: character.species,
        image: character.image,
        locationName,
        locationId,
        episodeId,
        episodeName,
      };
    })
  );

  return {
    props: {
      location,
      residents,
    },
  };
}
