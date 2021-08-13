import styled from "styled-components";

const ModalContainer = styled.article`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  overflow-y: auto;
`;
const ModalContent = styled.div`
  position: relative;
  width: 80%;
  height: 80vh;
  padding: 10px 20px;
  background-color: #f4f4f4;
`;

export function Modal({ children, isOpen, closeModal }) {
  const handleClick = (e) => e.stopPropagation();

  return (
    <ModalContainer isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={handleClick}>
        <button onClick={closeModal}>X</button>
        {children}
      </ModalContent>
    </ModalContainer>
  );
}
