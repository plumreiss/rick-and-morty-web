import { LocationCard } from "@/components/Cards/LocationCard";
import styled from "styled-components";

const ContainerElements = styled.main`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3.5rem 0;

  article {
    margin-top: 1.3rem;
  }
`;

export default function Locations({ locations }) {
  return (
    <ContainerElements>
      {locations.map(({ id, name, type, dimension }) => (
        <LocationCard
          key={id}
          id={id}
          name={name}
          type={type}
          dimension={dimension}
        />
      ))}
    </ContainerElements>
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
