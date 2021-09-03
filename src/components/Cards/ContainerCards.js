import styled from "styled-components";

const WrapperCards = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 3.5rem 0;
  max-width: 70%;
  margin: 0 auto;
`;

export function ContainerCards({ children }) {
  return <WrapperCards>{children}</WrapperCards>;
}
