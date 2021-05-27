import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const API = "https://rickandmortyapi.com/api";

const initialForm = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

export default function Characters({ types, species }) {
  const [characters, setCharacters] = useState([]);
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
      data.results.forEach((character) => {
        const newCharacter = {
          id: character.id,
          name: character.name,
          img: character.image,
          status: character.status,
        };
        setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
      });
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
    console.log(tagKey);
    return tagKey;
  };

  const searchCharacters = (e) => {
    e.preventDefault();
    setCharacters([]);
    setSearch((prevSearch) => ++prevSearch);
  };

  return (
    <div>
      <form onSubmit={searchCharacters}>
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
          <option value="">---</option>
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
          <option value="unknow">Unknow</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
        </select>
        <input type="submit" value="Search" />
      </form>

      {characters.map(({ id, name, img, status }) => (
        <div key={id}>
          <Image src={img} alt={name} width={200} height={200} />
          <h2>{name}</h2>
          <h2>{status}</h2>
          <Link href={`characters/${id}`}>
            <a>View Information</a>
          </Link>
        </div>
      ))}

      <div>
        {pagination > 1 ? (
          <button onClick={prevPage}>←</button>
        ) : (
          <Link href="/">
            <a>← Back Home</a>
          </Link>
        )}
        {pagination < 34 && <button onClick={nextPage}>→</button>}
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

  console.log(newRes);

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

  console.log(types);
  console.log(species);
  return {
    props: { types, species },
  };
}