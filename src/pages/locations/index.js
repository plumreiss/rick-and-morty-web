import { API, SEO_TITLES } from "@/constants/constants";
import { LocationCard } from "@/components/Cards/LocationCard";
import { ContainerCards } from "@/components/Cards/ContainerCards";
import { HeadTag } from "@/components/HeadTag/HeadTag";

export default function Locations({ locations }) {
  return (
    <>
      <HeadTag title={SEO_TITLES["titleLocations"]} />
      <ContainerCards>
        {locations.map(({ id, name, type, dimension }) => (
          <LocationCard
            key={id}
            id={id}
            name={name}
            type={type}
            dimension={dimension}
          />
        ))}
      </ContainerCards>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API}/location`);
  const data = await res.json();

  const pagesLocation = Array.from(
    { length: data.info.pages },
    (v, i) => i + 1
  );

  const locationsRes = await Promise.all(
    pagesLocation.map((page) => fetch(`${API}/location/?page=${page}`))
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
