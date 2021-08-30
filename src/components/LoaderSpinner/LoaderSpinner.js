import styled, { keyframes } from "styled-components";

const SkChaseAnimation = keyframes`
100% { transform: rotate(360deg) }
`;

const SkChaseDotAnimation = keyframes`
80%, 100% { transform: rotate(360deg); } 
`;
const SkChaseDotBeforeAnimation = keyframes`
50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
`;
const SkChaseDot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${SkChaseDotAnimation} 2s infinite ease-in-out both;

  &:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: ${SkChaseDotBeforeAnimation} 2s infinite ease-in-out both;
  }
`;

const SkChase = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  animation: ${SkChaseAnimation} 2.5s infinite linear both;

  & ${SkChaseDot}:nth-child(1) {
    animation-delay: -1.1s;
  }
  & ${SkChaseDot}:nth-child(2) {
    animation-delay: -1s;
  }
  & ${SkChaseDot}:nth-child(3) {
    animation-delay: -0.9s;
  }
  & ${SkChaseDot}:nth-child(4) {
    animation-delay: -0.8s;
  }
  & ${SkChaseDot}:nth-child(5) {
    animation-delay: -0.7s;
  }
  & ${SkChaseDot}:nth-child(6) {
    animation-delay: -0.6s;
  }

  & ${SkChaseDot}:nth-child(1):before {
    animation-delay: -1.1s;
  }
  & ${SkChaseDot}:nth-child(2):before {
    animation-delay: -1s;
  }
  & ${SkChaseDot}:nth-child(3):before {
    animation-delay: -0.9s;
  }
  & ${SkChaseDot}:nth-child(4):before {
    animation-delay: -0.8s;
  }
  & ${SkChaseDot}:nth-child(5):before {
    animation-delay: -0.7s;
  }
  & ${SkChaseDot}:nth-child(6):before {
    animation-delay: -0.6s;
  }
`;

export function LoaderSpinner() {
  return (
    <SkChase>
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
    </SkChase>
  );
}
