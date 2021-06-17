import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const ContainerLanding = styled.main`
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;

const ContainerInfo = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;
const TitlePrincipal = styled.h2`
  font-size: 3.625rem;
`;

const ContainerLinks = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
`;

const ButtonLink = styled.li`
  margin-right: 30px;

  a {
    font-size: 1.5rem;
    padding: 20px;
    border-radius: 50%;
    background: orange;
    color: rgb(51, 51, 51);
    text-decoration: none;

    &:hover {
      background: rgb(51, 51, 51);
      color: orange;
    }
  }
`;
export function LandingPage() {
  return (
    <ContainerLanding>
      <ContainerInfo>
        <TitlePrincipal>Take at look at to every page</TitlePrincipal>
        <ContainerLinks>
          <ButtonLink>
            <Link href="/characters">
              <a>Characters</a>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link href="/locations">
              <a>Locations</a>
            </Link>
          </ButtonLink>
          <ButtonLink>
            <Link href="/episodes">
              <a>Episodes</a>
            </Link>
          </ButtonLink>
        </ContainerLinks>
      </ContainerInfo>

      <Image
        src="/landingHome.png"
        alt="Landing Page"
        width={400}
        height={400}
      />
    </ContainerLanding>
  );
}
