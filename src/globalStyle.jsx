import styled from "styled-components";

export const PageLayout = styled.div`
  width: 100%;
  max-width: 1136px;
  margin: 0 auto;

  @media (max-width: 1120px){
    padding: 0 20px;
  }
`;

export const Layout = styled.div`
  background: rgba(0, 0, 0, 0.486);
  /* backdrop-filter: blur(15px); */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  display: flex;
  justify-content: center;
  align-items: center;
`;
