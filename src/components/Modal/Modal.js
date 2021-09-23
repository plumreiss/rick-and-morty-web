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
  width: 50%;
  height: 50vh;
  padding: 20px;
  background-color: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ButtonCloseModal = styled.div`
  align-self: flex-end;
  text-align: center;
  height: 24px;
  width: 24px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 4px;
  border: 1px solid #000;
  cursor: pointer;

  &:hover {
    background: #f4f4f4;
    color: orange;
  }
`;

const WrapperModal = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export function Modal({ children, isOpen, closeModal }) {
  const handleClick = (e) => e.stopPropagation();

  return (
    <ModalContainer isOpen={isOpen} onClick={closeModal}>
      <ModalContent onClick={handleClick}>
        <WrapperModal>
          <ButtonCloseModal onClick={closeModal}>X</ButtonCloseModal>
          {children}
        </WrapperModal>
      </ModalContent>
    </ModalContainer>
  );
}
