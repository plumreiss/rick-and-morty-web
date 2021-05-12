import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [pagination, setPagination] = useState(1);

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

  const nextPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => ++prevPagination);
  };

  const prevPage = () => {
    setCharacters([]);
    setPagination((prevPagination) => --prevPagination);
  };
  console.log(characters);

  return (
    <div>
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
        <button onClick={prevPage}>←</button>
        <button onClick={nextPage}>→</button>
      </div>
    </div>
  );
}
