import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Character } from "../../components/Character";
import { Form } from "../../components/Form/Form";

const API = "https://rickandmortyapi.com/api";

const ContainerCharacters = styled.main`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3.5rem 0;

  article {
    margin-top: 1.3rem;
  }
`;

const initialForm = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

export default function Characters({ types, species }) {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [search, setSearch] = useState(0);

  useEffect(() => {
    const { name, status, type, species, gender } = form;

    const getCharacters = async () => {
      const res = await fetch(
        `${API}/character/?page=${pagination}&name=${name}&status=${status}&type=${type}&species=${species}&gender=${gender}`
      );
      const data = await res.json();
      setPages(data.info.pages);
      data.results.forEach(
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
  }, [pagination, search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trim() });
  };

  const nextPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => ++prevPagination);
  };

  const prevPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => --prevPagination);
  };

  const convertToLowerCase = (str) => {
    return str.toLowerCase();
  };

  const getTagKey = (str) => {
    const tagKey = convertToLowerCase(str.replace(/\s+/g, "%20"));
    return tagKey;
  };

  const searchCharacters = (e) => {
    e.preventDefault();
    setCharacters([]);
    setSearch((prevSearch) => ++prevSearch);
  };

  return (
    <div>
      <Form handleSubmit={searchCharacters}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={form.name}
        />
        <label>Status</label>
        <select name="status" onChange={handleChange} defaultValue="">
          <option value=""></option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknow">Unknow</option>
        </select>
        <label>Types</label>
        <select name="type" onChange={handleChange}>
          {types.map((type, index) => (
            <option value={getTagKey(type)} key={index}>
              {type}
            </option>
          ))}
        </select>
        <label>Species</label>
        <select name="species" onChange={handleChange}>
          <option value=""></option>
          {species.map((specie, index) => (
            <option value={getTagKey(specie)} key={index}>
              {specie}
            </option>
          ))}
        </select>

        <label>Gender</label>
        <select name="gender" onChange={handleChange}>
          <option value=""></option>
          <option value="unknow">Unknow</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
        </select>
        <input type="submit" value="Search" />
      </Form>

      <ContainerCharacters>
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
      </ContainerCharacters>

      <div>
        {pagination > 1 ? (
          <button onClick={prevPage}>←</button>
        ) : (
          <Link href="/">
            <a>← Back Home</a>
          </Link>
        )}
        {pagination < pages && <button onClick={nextPage}>→</button>}
      </div>
    </div>
  );
}

const deleteDuplicate = (arr) => {
  return arr.filter((value, index) => {
    return arr.indexOf(value) === index;
  });
};

export async function getStaticProps() {
  const res = await fetch(`${API}/character`);
  const data = await res.json();
  const pages = Array.from({ length: data.info.pages }, (v, i) => i + 1);

  const newRes = await Promise.all(
    pages.map((page) => {
      const resCharacters = fetch(`${API}/character/?page=${page}`);

      return resCharacters;
    })
  );

  const characters = await Promise.all(
    newRes.map((character) => {
      return character.json();
    })
  );

  const allTypes = characters
    .map((el) => el.results.map((character) => character.type))
    .flat();

  const allSpecies = characters
    .map((el) => el.results.map((character) => character.species))
    .flat();

  const types = deleteDuplicate(allTypes);
  const species = deleteDuplicate(allSpecies);

  return {
    props: { types, species },
  };
}
