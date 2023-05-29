import React, { useState } from "react";
import { PageLayout } from "../../globalStyle";
import { HeaderStyle, MobileMenuContainer, MobileMenuContent } from "./styled";
import { BiWallet } from "react-icons/bi";
import Logo from "../../assets/logo.png";
import Menu from "../../assets/menu.svg";
import Close from "../../assets/close.svg";
import { Link, useNavigate } from "react-router-dom";

function Header({ connect }) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <PageLayout>
        <HeaderStyle>
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="" />
            </Link>

            <span onClick={() => navigate("/")}>PulseChain Bridge</span>
          </div>
          <button onClick={connect}>
            <BiWallet className="icon" /> Connect Wallet
          </button>

          <div className="mobile">
            {!menu ? (
              <img src={Menu} alt="" onClick={() => setMenu(true)} />
            ) : (
              <img src={Close} alt="" onClick={() => setMenu(false)} />
            )}
          </div>
        </HeaderStyle>
      </PageLayout>

      <MobileMenuContainer open={menu}>
        <MobileMenuContent>
          <li>
            <button
              onClick={() => {
                setMenu(false);
                connect();
              }}
            >
              <BiWallet className="icon" /> Connect Wallet
            </button>
          </li>
        </MobileMenuContent>
      </MobileMenuContainer>
    </>
  );
}

export default Header;
