const API = "https://rickandmortyapi.com/api";

export default function Location({ location, residents }) {
  return <div>location</div>;
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
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
