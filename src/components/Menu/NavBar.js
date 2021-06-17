import Link from "next/link";
import styled from "styled-components";

const ContainerNavBar = styled.header`
  width: 100%;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(51, 51, 51);
`;

const Title = styled.h1`
  color: rgb(32, 35, 41);
  cursor: pointer;
  transition: 0.2s ease-out;

  &:hover {
    color: orange;
  }
`;

const ContainerNav = styled.nav`
  a {
    margin-right: 10px;
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
