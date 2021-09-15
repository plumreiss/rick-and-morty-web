import Link from "next/link";
import styled from "styled-components";
import { URLS } from "@/constants/constants";

const ContainerNavBar = styled.header`
  width: 100%;
  min-height: 60px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
  }

  a {
    text-decoration: none;
  }
`;

const Title = styled.h1`
  color: rgb(51, 51, 51);
  cursor: pointer;
  transition: 0.2s ease-out;

  &:hover {
    color: orange;
  }
`;

const ContainerNav = styled.nav`
  a {
    margin-right: 12px;
    text-decoration: none;
    color: rgb(51, 51, 51);
    font-weight: 700;

    &:hover {
      color: orange;
    }
  }
`;

export function NavBar() {
  const { homePage, charactersPage, locationsPage, episodesPage } = URLS;

  return (
    <ContainerNavBar>
      <Link href={homePage}>
        <a>
          <Title>Ricknedy</Title>
        </a>
      </Link>
      <ContainerNav>
        <Link href={`/${charactersPage}`}>
          <a>Characters</a>
        </Link>

        <Link href={`/${locationsPage}`}>
          <a>Locations</a>
        </Link>

        <Link href={`/${episodesPage}`}>
          <a>Episodes</a>
        </Link>
      </ContainerNav>
    </ContainerNavBar>
  );
}
