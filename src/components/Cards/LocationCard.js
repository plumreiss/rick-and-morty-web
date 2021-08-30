import Link from "next/link";
import styled from "styled-components";

const CardLocation = styled.article`
  display: flex;
  width: 220px;
  height: 300px;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb(60, 62, 68, 1);
  text-align: center;
  border-radius: 0.7rem;
  margin: 10px;
`;

const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;

  span {
    color: rgb(158, 158, 158);
  }

  h3 {
    color: #f4f4f4;
  }
`;

const Title = styled.a`
  color: #f4f4f4;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: underline;

  &:hover {
    color: orange;
  }
`;

export function LocationCard({ id, name, type, dimension }) {
  return (
    <CardLocation>
      <ContainerInfo>
        <Link href={`/locations/${id}`} passHref>
          <Title>{name}</Title>
        </Link>
      </ContainerInfo>
      <ContainerInfo>
        <span>Type: </span>
        <h3>{type}</h3>
      </ContainerInfo>
      <ContainerInfo>
        <span>Dimension: </span>
        <h3>{dimension}</h3>
      </ContainerInfo>
    </CardLocation>
  );
}
