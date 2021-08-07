import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  background: #f4f4f4 ;
  justify-content: center;
`;

const Title = styled.h2`
  color: rgb(51, 51, 51);
  font-size: 3.125rem;
`;

export function TitleMain({ title }) {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
