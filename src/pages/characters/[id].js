import { API } from "@/constants/constants";
import { Character } from "@/components/Cards/Character";
import { WrapperCenterCard } from "@/components/Cards/WrapperCenterCard";
import { HeadTag } from "components/HeadTag/HeadTag";

export default function CharacterPage({ characterProps }) {
  const {
    id,
    name,
    image,
    status,
    species,
    locationName,
    locationId,
    episodeId,
    episodeName,
  } = characterProps;

  return (
    <>
      <HeadTag title={name} />
      <WrapperCenterCard>
        <Character
          id={id}
          name={name}
          status={status}
          species={species}
          image={image}
          locationName={locationName}
          locationId={locationId}
          episodeId={episodeId}
          episodeName={episodeName}
        ></Character>
      </WrapperCenterCard>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/character`);
  const data = await res.json();
  const numberCharacters = data.info.count;
  const charactersId = Array.from(
    { length: numberCharacters },
    (v, i) => i + 1
  );

  const paths = charactersId.map((characterId) => {
    return {
      params: { id: `${characterId}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${API}/character/${params.id}`);
  const characterJson = await res.json();

  const firstEpisode = characterJson.episode[0];
  const episodeId = firstEpisode.substr(firstEpisode.lastIndexOf("/") + 1);
  const resEpisode = await fetch(firstEpisode);
  const episodeJson = await resEpisode.json();
  const episodeName = episodeJson.name;

  const locationName = characterJson.location.name;
  const urlLocation = characterJson.location.url;
  const locationId = urlLocation.substr(urlLocation.lastIndexOf("/") + 1);

  const characterProps = {
    id: characterJson.id,
    name: characterJson.name,
    status: characterJson.status,
    species: characterJson.species,
    image: characterJson.image,
    locationName,
    locationId,
    episodeId,
    episodeName,
  };

  return {
    props: {
      characterProps,
    },
  };
}
