import Link from "next/link";
import styled from "styled-components";

const ContainerNavBar = styled.header`
  width: 100%;
  height: 60px;
  background-color: #f4f4f4;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
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
  return (
    <ContainerNavBar>
      <Link href="/">
        <Title>Ricknedy</Title>
      </Link>
      <ContainerNav>
        <Link href="/characters">
          <a>Characters</a>
        </Link>

        <Link href="/locations">
          <a>Locations</a>
        </Link>

        <Link href="/episodes">
          <a>Episodes</a>
        </Link>
      </ContainerNav>
    </ContainerNavBar>
  );
}
