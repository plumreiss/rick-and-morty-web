const API = "https://rickandmortyapi.com/api";
export default function episode() {
  return <h1>Hello</h1>;
}

export async function getStaticPaths() {
  const res = await fetch(`${API}/episode`);
  const data = await res.json();

  const pages = Array.from({ length: data.info.pages }, (v, i) => i + 1);

  const episodesRes = await Promise.all(
    pages.map((page) => fetch(`${API}/episode/?page=${page}`))
  );

  const episodesPage = await Promise.all(
    episodesRes.map((episodesPage) => episodesPage.json())
  );

  const episodesID = episodesPage.map((episodePage) =>
    episodePage.results.map((episode) => episode.id)
  );

  const paths = episodesID.flat().map((episodeID) => {
    return {
      params: { id: `${episodeID}` },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
