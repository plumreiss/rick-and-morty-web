import { useState, useEffect } from "react";
import { API, CHARACTER_FORM } from "@/constants/constants";
import { URLS } from "@/constants/constants";
import { Character } from "@/components/Cards/Character";
import { Form } from "@/components/Form/Form";
import { Input } from "@/components/Form/Input";
import { Label } from "@/components/Form/Label";
import { Select } from "@/components/Form/Select";
import { Option } from "@/components/Form/Option";
import { Modal } from "@/components/Modal/Modal";
import { useModal } from "hooks/useModal";
import { ContainerInputs } from "@/components/Form/ContainerInputs";
import { Button } from "@/components/Button/Button";
import { ContainerButton } from "@/components/Button/ContainerButton";
import { BackHome } from "@/components/BackHome";
import { LoaderSpinner } from "@/components/LoaderSpinner/LoaderSpinner";
import { WrapperLoader } from "components/LoaderSpinner/WrapperLoader";
import { ContainerCards } from "@/components/Cards/ContainerCards";
import { ErrorMessage } from "@/components/Cards/ErrorMessage";

export default function Characters({ types, species }) {
  const [characters, setCharacters] = useState([]);
  const [pages, setPages] = useState(0);
  const [pagination, setPagination] = useState(1);
  const [form, setForm] = useState(CHARACTER_FORM);
  const [search, setSearch] = useState(0);
  const { isOpen, openModal, closeModal } = useModal(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const { homePage } = URLS;

  useEffect(() => {
    const { name, status, type, species, gender } = form;

    const getCharacters = async () => {
      setIsLoading(true);

      try {
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
    setPagination(1);
    setSearch((prevSearch) => ++prevSearch);
    setError(false);
  };

  return (
    <>
      <ContainerButton>
        <Button handleOnClick={openModal} value="Filter" />
      </ContainerButton>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Form handleSubmit={searchCharacters}>
          <ContainerInputs>
            <Label labelName="Name:" />
            <Input
              inputType="text"
              inputName="name"
              inputPlaceholder="Name"
              handleChange={handleChange}
              inputValue={form.name}
            />
          </ContainerInputs>

          <ContainerInputs>
            <Label labelName="Status:" />
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
          </ContainerInputs>

          <ContainerInputs>
            <Label labelName="Types:" />
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
          </ContainerInputs>

          <ContainerInputs>
            <Label labelName="Species:" />
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
          </ContainerInputs>

          <ContainerInputs>
            <Label labelName="Gender:" />
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
          </ContainerInputs>
          <ContainerInputs>
            <Input inputType="submit" inputValue="Search" />
          </ContainerInputs>
        </Form>
      </Modal>

      <ContainerCards takeViewportHeight="299.88">
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

      <ContainerButton>
        {pagination > 1 ? (
          <Button handleOnClick={prevPage} value="Previous" />
        ) : (
          <BackHome url={homePage} value="Back Home" />
        )}
        {pagination < pages && <Button handleOnClick={nextPage} value="Next" />}
      </ContainerButton>
    </>
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
