import { TitleMain } from "@/components/TitleMain/TitleMain";
import { Character } from "@/components/Cards/Character";
import { useState, useEffect } from "react";
import styled from "styled-components";

const ContainerCards = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3.5rem 0;
  max-width: 70%;
  margin: 0 auto;
`;

const API = "https://rickandmortyapi.com/api";

export default function Main() {
  const [characters, setCharacters] = useState([]);

  const getNumberRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  useEffect(() => {
    const getCharacters = async () => {
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
          setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
        }
      );
    };
    getCharacters();
  }, []);

  return (
    <>
      <TitleMain title="Ricknedy" />
      <ContainerCards>
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
