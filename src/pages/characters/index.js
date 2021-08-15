import { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { Character } from "../../components/Character";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Form/Input";
import { Label } from "../../components/Form/Label";
import { Select } from "../../components/Form/Select";
import { Option } from "../../components/Form/Option";
import { Modal } from "../../components/Modal/Modal";
import { useModal } from "../../hooks/useModal";

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
  const { isOpen, openModal, closeModal } = useModal(false);

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
      <button onClick={openModal}>Filter</button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Form handleSubmit={searchCharacters}>
          <div>
            <Label labelName="Name" />
            <Input
              inputType="text"
              inputName="name"
              inputPlaceholder="Name"
              handleChange={handleChange}
              inputValue={form.name}
            />
          </div>

          <div>
            <Label labelName="Status" />
            <Select
              selectName="status"
              handleChange={handleChange}
              defaultValue=""
            >
              <Option optionValue="" nameValue="" />
              <Option optionValue="alive" nameValue="Alive" />
              <Option optionValue="dead" nameValue="Dead" />
              <Option optionValue="unknow" nameValue="Unknow" />
            </Select>
          </div>
          <div>
            <Label labelName="Types" />
            <Select
              selectName="type"
              handleChange={handleChange}
              defaultValue=""
            >
              {types.map((type, index) => (
                <Option
                  key={index}
                  optionValue={getTagKey(type)}
                  nameValue={type}
                />
              ))}
            </Select>
          </div>

          <div>
            <Label labelName="Species" />
            <Select
              selectName="species"
              handleChange={handleChange}
              defaultValue=""
            >
              <Option optionValue="" nameValue="" />
              {species.map((specie, index) => (
                <Option
                  key={index}
                  optionValue={getTagKey(specie)}
                  nameValue={specie}
                />
              ))}
            </Select>
          </div>

          <div>
            <Label labelName="Gender" />
            <Select
              selectName="gender"
              handleChange={handleChange}
              defaultValue=""
            >
              <Option optionValue="" nameValue="" />
              <Option optionValue="unknow" nameValue="Unknow" />
              <Option optionValue="female" nameValue="Female" />
              <Option optionValue="male" nameValue="Male" />
              <Option optionValue="genderless" nameValue="Genderless" />
            </Select>
          </div>
          <Input inputType="submit" inputValue="Search" />
        </Form>
      </Modal>

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
