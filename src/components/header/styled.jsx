import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;

  .mobile {
    display: none;
    z-index: 10;
    img {
      width: 30px;
    }

    @media screen and (max-width: 480px) {
      display: block;
    }
  }

  .logo {
    display: flex;
    align-items: center;
    z-index: 10;
    span {
      font-weight: 700;
      font-size: 16px;
      color: #dfe4ed;
      margin-left: 13px;
      cursor: pointer;
    }
    img {
      width: 50px;
    }
  }

  button {
    width: 234.977px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    .icon {
      font-size: 1.3rem;
      margin-right: 6px;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }
`;

export const MobileMenuContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #191b1a;
  z-index: 8;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};
`;

export const MobileMenuContent = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  list-style: none;

  li {
    margin-bottom: 20px;

    button {
      padding: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        font-size: 1.3rem;
        margin-right: 6px;
      }
    }
  }
`;
