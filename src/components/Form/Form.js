import styled from "styled-components";

const FormContainer = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export function Form({ handleSubmit, children }) {
  return <FormContainer onSubmit={handleSubmit}>{children}</FormContainer>;
}
