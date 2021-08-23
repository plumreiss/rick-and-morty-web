import styled from "styled-components";

const FormContainer = styled.form`
  height: 100%;
  min-width: 80%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
`;

export function Form({ handleSubmit, children }) {
  return <FormContainer onSubmit={handleSubmit}>{children}</FormContainer>;
}
