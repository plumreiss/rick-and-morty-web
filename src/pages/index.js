import { useState, useEffect } from "react";
import { API } from "@/constants/constants";
import { getNumberRandom } from "@/utils/getNumberRandom";
import { TitleMain } from "@/components/TitleMain/TitleMain";
import { Character } from "@/components/Cards/Character";
import { LoaderSpinner } from "@/components/LoaderSpinner/LoaderSpinner";
import { WrapperLoader } from "@/components/LoaderSpinner/WrapperLoader";
import { ContainerCards } from "@/components/Cards/ContainerCards";
import { ErrorMessage } from "@/components/Cards/ErrorMessage";

export default function Main() {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCharacters = async () => {
      setIsLoading(true);

      try {
        const res = await fetch(`${API}/character`);
        const data = await res.json();
        const numberCharacters = data.info.count;
        const numbers = Array.from({ length: 6 }, () =>
          getNumberRandom(1, numberCharacters)
        );

        const resCharacters = await Promise.all(
          numbers.map((number) => fetch(`${API}/character/${number}`))
        );

        const dataCharacters = await Promise.all(
          resCharacters.map((resCharacter) => resCharacter.json())
        );

        dataCharacters.forEach(
          async ({ id, name, image, status, species, location, episode }) => {
            const firstEpisode = episode[0];

            const episodeId = firstEpisode.substr(
              firstEpisode.lastIndexOf("/") + 1
            );
            const resEpisode = await fetch(firstEpisode);
            const episodeJson = await resEpisode.json();
            const episodeName = episodeJson.name;

            const locationName = location.name;
            const urlLocation = location.url;
            const locationId = urlLocation.substr(
              urlLocation.lastIndexOf("/") + 1
            );

            const newCharacter = {
              id,
              name,
              image,
              status,
              species,
              locationName,
              locationId,
              episodeId,
              episodeName,
            };
            setCharacters((prevCharacters) => [
              ...prevCharacters,
              newCharacter,
            ]);
          }
        );

        setIsLoading(false);
      } catch (err) {
        setError(true);
      }
    };
    getCharacters();
  }, []);

  return (
    <>
      <TitleMain title="Ricknedy" />
      <ContainerCards takeViewportHeight="307.88">
        {isLoading && (
          <WrapperLoader>
            <LoaderSpinner />
          </WrapperLoader>
        )}

        {error && (
          <WrapperLoader>
            <ErrorMessage />
          </WrapperLoader>
        )}
        {characters.map(
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
