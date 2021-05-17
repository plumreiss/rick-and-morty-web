import Link from "next/link";

export default function Locations({ locations }) {
  return (
    <div>
      {locations.map(({ id, name, type, dimension }) => (
        <div>
          <h2>{name}</h2>
          <p>{type}</p>
          <p>{dimension}</p>
          <Link href={`locations/${id}`}>
            <a>View residents</a>
          </Link>
        </div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const API = "https://rickandmortyapi.com/api";

  const res = await fetch(`${API}/location`);
  const data = await res.json();

  const pagesLocation = Array.from(
    { length: data.info.pages },
    (v, i) => i + 1
  );

  const locationsRes = await Promise.all(
    pagesLocation.map((page) => {
      const locationRes = fetch(`${API}/location/?page=${page}`);
      return locationRes;
    })
  );

  const locationsPages = await Promise.all(
    locationsRes.map((location) => location.json())
  );

  const locations = locationsPages
    .map((locationPage) => locationPage.results.map((location) => location))
    .flat();

  return {
    props: {
      locations,
    },
  };
}
