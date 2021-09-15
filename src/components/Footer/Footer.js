import styled from "styled-components";
import { URLS } from "@/constants/constants";

const ContainerFooter = styled.footer`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  background-color: rgb(32, 35, 41, 1);
`;

const MadeBy = styled.span`
  color: rgb(158, 158, 158);

  a {
    color: #f4f4f4;
    text-decoration: none;
  }
`;

export function Footer() {
  const { myGithub } = URLS;
  return (
    <>
      <ContainerFooter>
        <MadeBy>
          Made by
          <a href={myGithub} target="_blank">
            {" "}
            Angel Padrino
          </a>
        </MadeBy>
      </ContainerFooter>
    </>
  );
}
