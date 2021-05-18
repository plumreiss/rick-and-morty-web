import Image from "next/image";
import Link from "next/link";

const API = "https://rickandmortyapi.com/api";

export default function Location({ location, residents }) {
  const { name, type, dimension } = location;

  return (
    <div>
      <div>
        <h2>{name}</h2>
        <p>{type}</p>
        <p>{dimension}</p>
      </div>

      <h2>Residents</h2>
      {residents.map(({ id, name, status, image }) => (
        <div key={id}>
          <Image src={image} width={200} height={200} />
          <h2>{name}</h2>
          <p>{status}</p>
          <Link
            href={`
          /characters/${id}`}
          >
            <a>View information</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/location`);
  const data = await res.json();
  const pages = Array.from({ length: data.info.pages }, (v, i) => i + 1);

  const pagesRes = await Promise.all(
    pages.map((page) => fetch(`${API}/location/?page=${page}`))
  );

  const locationsPage = await Promise.all(
    pagesRes.map((location) => location.json())
  );

  const locationsID = locationsPage.map((locationPage) =>
    locationPage.results.map((location) => location.id)
  );

  const paths = locationsID.flat().map((locationID) => {
    return {
      params: { id: `${locationID}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const locationRes = await fetch(`${API}/location/${params.id}`);
  const location = await locationRes.json();

  const residentsRes = await Promise.all(
    location.residents.map((resident) => {
      return fetch(resident);
    })
  );

  const residents = await Promise.all(
    residentsRes.map((resident) => resident.json())
  );

  return {
    props: {
      location,
      residents,
    },
  };
}
