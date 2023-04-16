import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const Modals = styled.div`
  position: fixed;
  top: 30%;
  width: 46rem;
  padding: 2rem;
  height: width;
  background: #1e222d;
  border-radius: 4px;
  z-index: 2;
  img {
    position: fixed;
    top: 10px;
    left: 98%;
    width: 2rem;
    cursor: pointer;
  }
  h1 {
    margin: 3rem 0;
    text-align: center;
    font-weight: 400;
    font-size: 22px;
    line-height: 27px;
    color: #2ec4b6;
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(1px);
  z-index: 1;
`;
