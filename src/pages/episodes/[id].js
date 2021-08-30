import { Character } from "@/components/Cards/Character";
import { EpisodeCard } from "@/components/Cards/EpisodeCard";
import { WrapperCenterCard } from "@/components/Cards/WrapperCenterCard";
import { Subtitle } from "@/components/Subtitle";
import { WrapperCenterTitle } from "@/components/WrapperCenterTitle";
import { ContainerCards } from "@/components/Cards/ContainerCards";

const API = "https://rickandmortyapi.com/api";

export default function episode({ _episode, characters }) {
  const { id, name, air_date, episode } = _episode;

  return (
    <>
      <WrapperCenterCard>
        <EpisodeCard
          id={id}
          name={name}
          air_date={air_date}
          episode={episode}
        />
      </WrapperCenterCard>
      <WrapperCenterTitle>
        <Subtitle>Characters that appear in {episode}</Subtitle>
      </WrapperCenterTitle>
      <ContainerCards>
        {characters.map(
          ({
            id,
            name,
            image,
            status,
            species,
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
  const res = await fetch(`${API}/episode`);
  const data = await res.json();

  const pagesId = Array.from({ length: data.info.count }, (v, i) => i + 1);

  const paths = pagesId.map((pageId) => {
    return {
      params: { id: `${pageId}` },
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

  const everyCharacter = await Promise.all(
    charactersRes.map((character) => character.json())
  );

  const characters = await Promise.all(
    everyCharacter.map(async (character) => {
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
      _episode,
      characters,
    },
  };
}
