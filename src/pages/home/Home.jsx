import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Bg from "../../assets/bg.jpeg";
import Header from "../../components/header/Header";
import { PageLayout } from "../../globalStyle";
import ConnectPop from "../../components/connect/ConnectPop";
import Settings from "../../assets/settings.svg";
import Eth from "../../assets/eth.png";
import Logo from "../../assets/logo.png";
import axios from "axios";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BsTwitter } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import Data from "../../data/Data";

function Home() {
  const [connect, setConnect] = useState(false);
  const [tokenModal, setTokenModal] = useState(false);
  // const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [amount, setAmount] = useState(null);
  const [price, setprice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(false);

  // useEffect(() => {
  //   const fetchTokenData = async () => {
  //     const options = {
  //       method: "GET",
  //       url: "https://api.coinranking.com/v2/coins",
  //       params: {
  //         limit: 10,
  //       },

  //       headers: {
  //         "x-access-token":
  //           "coinranking0ba0a98b9fd652a9629cbe19f53764b58ec4739a579a764a",
  //       },
  //     };

  //     axios
  //       .request(options)
  //       .then(function (response) {
  //         const tokensList = response.data.data.coins;
  //         const tokenDefault = tokensList.find(
  //           (token) => token.symbol === "HEX"
  //         );
  //         console.log(tokensList);
  //         setTokens(tokensList);
  //         setSelectedToken(tokenDefault);
  //       })
  //       .catch(function (error) {
  //         console.error(error);
  //       });
  //   };

  //   fetchTokenData();
  // }, []);

  useEffect(() => {
    const tokenDefault = Data.find((token) => token.symbol === "WPLS");
    setSelectedToken(tokenDefault);
  }, []);

  useEffect(() => {
    if (selectedToken) {
      const newPrice = amount * selectedToken.change;
      setprice(newPrice);
    }
  }, [amount, selectedToken]);

  const filteredTokens = Data.filter(
    (token) =>
      token.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Selected Token: ", selectedToken);
  return (
    <>
      <HomeStyle>
        <img src={Bg} alt="" className="bg" />
        <Header connect={() => setConnect(true)} />

        <PageLayout>
          <div className="page-content">
            {!selectedToken ? (
              <Preloader />
            ) : (
              <Content>
                <div className="head">
                  <p>From</p>
                  <img src={Settings} alt="" />
                </div>
                <BackgroundDiv>
                  <div className="left">
                    <img src={Eth} alt="" />
                    <p>Unknown Network</p>
                  </div>

                  {selectedToken ? (
                    <div className="right">
                      <p>Balance: 0.0 {selectedToken.symbol}</p>
                      <p className="max">MAX</p>
                    </div>
                  ) : (
                    <div className="right">
                      <p>Balance: 0.0</p>
                      <p className="max">MAX</p>
                    </div>
                  )}
                </BackgroundDiv>

                <BackgroundDiv2>
                  <div className="flex">
                    <div className="left">
                      <input
                        type="tel"
                        value={amount}
                        placeholder="0.0"
                        onChange={(e) => setAmount(e.target.value)}
                        inputMode="numeric"
                      />
                    </div>
                    <div className="right">
                      {selectedToken && (
                        <div
                          className="flex"
                          onClick={() => setTokenModal(true)}
                        >
                          <img src={selectedToken.iconUrl} alt="" />
                          <p>
                            {selectedToken.symbol} &nbsp;
                            <IoIosArrowDown />
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </BackgroundDiv2>

                <BackgroundDiv>
                  <div className="left">
                    <img src={Logo} alt="" />
                    <p>PulseChain</p>
                  </div>

                  <div className="right">
                    <p>
                      Balance: 0.0{" "}
                      {selectedToken && <>{selectedToken.symbol}</>}
                    </p>
                  </div>
                </BackgroundDiv>
                <BackgroundDiv2>
                  <ul>
                    <li>
                      <p>Bridge Fee</p>
                      <p>{selectedToken && <>{selectedToken.change}</>}%</p>
                    </li>
                    <li>
                      <p>Receive</p>
                      <p>
                        {selectedToken && (
                          <>
                            {price}&nbsp;{selectedToken.symbol}
                          </>
                        )}
                      </p>
                    </li>
                    <li onClick={() => setLimit(!limit)}>
                      <p>
                        Limits{" "}
                        {!limit ? (
                          <IoIosArrowDown className="icon" />
                        ) : (
                          <IoIosArrowUp className="icon" />
                        )}
                      </p>
                    </li>
                  </ul>

                  {limit && (
                    <LimitsStyle>
                      <ul>
                        <li>
                          <p>Daily Limit</p>
                          <p>
                            <span>{selectedToken.marketCap} </span> /
                            {selectedToken.price} {selectedToken.symbol}
                          </p>
                        </li>
                        <li>
                          <p>Max per Tx</p>
                          <p>
                            {selectedToken.btcPrice} {selectedToken.symbol}
                          </p>
                        </li>
                        <li>
                          <p>Min per Tx</p>{" "}
                          <p>
                            {selectedToken.price} {selectedToken.symbol}
                          </p>
                        </li>
                      </ul>
                    </LimitsStyle>
                  )}
                </BackgroundDiv2>

                <button onClick={() => setConnect(true)}>Connect Wallet</button>
                <br />
                <p className="estimate">
                  Estimated to completion is 30 minutes
                </p>
              </Content>
            )}

            <Socials>
              <a href="https://twitter.com">
                <BsTwitter />
              </a>
              <a href="https://telegram.com">
                <FaTelegramPlane />
              </a>
            </Socials>
          </div>
        </PageLayout>
      </HomeStyle>

      {connect && <ConnectPop connect={() => setConnect(false)} />}

      {tokenModal && (
        <Layout>
          <PageLayout>
            <PageContent>
              <Content2>
                <div className="head">
                  <p>Select an Asset</p>
                  <p className="close" onClick={() => setTokenModal(false)}>
                    x
                  </p>
                </div>
                <SearchBar>
                  <input
                    type="text"
                    placeholder="Search by name or symbol"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </SearchBar>
                <Modal>
                  {filteredTokens.map((token, index) => (
                    <ul key={token.uuid}>
                      <li
                        onClick={() => {
                          setSelectedToken(token);
                          setTokenModal(false);
                        }}
                      >
                        <div className="left">
                          <img src={token.iconUrl} alt="" />
                          <p>{token.symbol}</p>
                        </div>
                        <p>{token.name}</p>
                      </li>
                    </ul>
                  ))}
                </Modal>
              </Content2>
            </PageContent>
          </PageLayout>
        </Layout>
      )}
    </>
  );
}

export default Home;

export const HomeStyle = styled.div`
  width: 100%;
  position: relative;
  overflow-x: hidden;

  .bg {
    position: absolute;
    width: 100%;
    z-index: -1;
    height: 100%;
    object-fit: fill;
  }

  .page-content {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const PageContent = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Content = styled.div`
  background: #191b1a;
  /* box-shadow: 0px 0px 30px 5px rgba(143, 5, 138, 0.47); */
  box-shadow: 0px 0px 250px 10px rgba(237, 69, 237, 0.39);
  width: 100%;
  max-width: 412px;
  border-radius: 10px;
  padding: 20px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    p {
      color: #fff;
    }
  }

  .estimate {
    text-align: center;
    color: #ffffff60;
    font-size: 15px;
  }
`;

const BackgroundDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #232523;
  padding: 13px 10px;
  border-radius: 10px 10px 0 0;
  margin-bottom: 0.5px;

  .left {
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin-right: 10px;
    }
    p {
      color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    p {
      color: #fff;
      font-weight: 400;
      font-size: 14px;
    }
    .max {
      margin-left: 5px;
      font-weight: 700;
      color: #b305ad;
    }
  }
`;

const BackgroundDiv2 = styled.div`
  background: #232523;
  padding: 13px 10px;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    input {
      background: transparent;
      border: none;
      font-size: 30px;
      width: 100px;
      color: #fff;

      &::placeholder {
        color: #fff;
      }
      &:focus {
        outline: none;
      }
    }
  }

  .right {
    .flex {
      display: flex;
      align-items: center;
      cursor: pointer;

      p {
        color: #fff;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
      }
    }
    img {
      width: 30px;
      margin-right: 10px;
    }
  }

  ul {
    width: 100%;
    li {
      list-style: none;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;
      height: 50px;

      .icon {
        font-size: 12px;
        margin-left: 5px;
        margin-bottom: -2px;
      }

      p {
        display: flex;
        align-items: center;
      }
    }
  }
`;

const Layout = styled.div`
  background: rgba(0, 0, 0, 0.486);
  backdrop-filter: blur(15px);
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

const Content2 = styled.div`
  background: #191b1a;
  border: 2px solid rgb(35, 34, 34);
  width: 100%;
  max-width: 486px;
  border-radius: 10px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    padding: 20px;

    p {
      color: #fff;
    }

    .close {
      font-size: 25px;
      cursor: pointer;
    }
  }
`;

const Modal = styled.div`
  height: 70vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background: #191b1a;
  border-radius: 10px;

  ul {
    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60px;
      margin: 10px 0;
      color: #fff;
      padding: 20px;

      .left {
        display: flex;
        align-items: center;
      }

      img {
        width: 30px;
        margin-right: 10px;
      }

      &:hover {
        background: #282a29;
      }
    }
  }
`;

const SearchBar = styled.div`
  padding: 0 20px;

  input {
    width: 100%;
    height: 50px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    outline: none;
    background: #1d1e1e;
    color: #9c9d9d;
  }
`;
const Preloader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: transparent;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &::after {
    content: "";
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #8f058a;
    border-color: #fff transparent #8f058a transparent;
    animation: spin 0.7s ease-in-out infinite;
  }
`;

const Socials = styled.div`
  /* position: absolute; */
  /* bottom: 0; */
  margin-top: 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 10px;
  margin-bottom: 10px;

  a {
    color: #fff;
    font-size: 17px;

    &:hover {
      color: #fff;
    }
  }
`;

const LimitsStyle = styled.div`
  width: 100%;
  padding: 5px;
  background: #191b1a;
  border-radius: 10px;

  ul {
    li {
      list-style: none;
      font-size: 10px;
      height: 25px;
      color: #858586;

      span {
        color: rgba(204, 0, 197, 0.7);
      }
    }
  }
`;
