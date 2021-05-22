import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const initialForm = {
  name: "",
  status: "",
  species: "",
  type: "",
  gender: "",
};

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pagination, setPagination] = useState(1);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    const getCharacters = async () => {
      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${pagination}`
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
  }, [pagination]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => ++prevPagination);
  };

  const prevPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => --prevPagination);
  };

  return (
    <div>
      <form>
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
