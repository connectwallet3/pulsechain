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
import { IoIosArrowDown } from "react-icons/io";

function Home() {
  const [connect, setConnect] = useState(false);
  const [tokenModal, setTokenModal] = useState(false);
  const [tokens, setTokens] = useState([]);
  const [selectedToken, setSelectedToken] = useState();
  const [amount, setAmount] = useState(0.0);
  const [price, setprice] = useState(0.0);
  const [searchTerm, setSearchTerm] = useState("");

  //   useEffect(() => {
  //     const fetchTokenData = async () => {
  //       try {
  //         const response = await axios.get(
  //           "https://api.coingecko.com/api/v3/coins/markets",
  //           {
  //             params: {
  //               vs_currency: "usd",
  //               per_page: 250,
  //             },
  //           }
  //         );

  //         const tokensList = response.data;
  //         console.log(tokensList);
  //         setTokens(tokensList);
  //       } catch (error) {
  //         console.error("Error fetching token data:", error.message);
  //       }
  //     };

  //     fetchTokenData();
  //   }, []);

  useEffect(() => {
    const fetchTokenData = async () => {
      const options = {
        method: "GET",
        url: "https://api.coinranking.com/v2/coins",
        params: {
          limit: 5000,
        },

        headers: {
          "x-access-token":
            "coinranking0ba0a98b9fd652a9629cbe19f53764b58ec4739a579a764a",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          const tokensList = response.data.data.coins;
          const tokenDeafult = response.data.data.coins[0];
          console.log(tokensList);
          setTokens(tokensList);
          setSelectedToken(tokenDeafult);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    fetchTokenData();
  }, []);

  useEffect(() => {
    if (selectedToken) {
      const newPrice = amount * selectedToken.change;
      setprice(newPrice);
    }
  }, [amount, selectedToken]);

  const filteredTokens = tokens.filter(
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
                <div className="left">
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
                <div className="right">
                  {selectedToken && (
                    <div className="flex" onClick={() => setTokenModal(true)}>
                      <img src={selectedToken.iconUrl} alt="" />
                      <p>
                        {selectedToken.symbol} &nbsp;
                        <IoIosArrowDown />
                      </p>
                    </div>
                  )}
                </div>
              </BackgroundDiv2>

              <br />

              <BackgroundDiv>
                <div className="left">
                  <img src={Logo} alt="" />
                  <p>PulseChain</p>
                </div>

                <div className="right">
                  <p>
                    Balance: 0.0 {selectedToken && <>{selectedToken.symbol}</>}
                  </p>
                </div>
              </BackgroundDiv>
              <BackgroundDiv2>
                <ul>
                  <li>
                    <p>Bridge Fee</p>
                    <p>
                      {selectedToken && (
                        <>{selectedToken.change}</>
                      )}
                      %
                    </p>
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
                </ul>
              </BackgroundDiv2>
              <br />
              <button onClick={() => setConnect(true)}>Connect Wallet</button>
              <br />
              <p className="estimate">Estimated to completion is 30 minutes</p>
            </Content>
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
                  {filteredTokens.map((token, key) => (
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
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;

  .bg {
    position: absolute;
    width: 100%;
    z-index: -1;
    height: 100vh;
    object-fit: cover;
  }

  .page-content {
    width: 100%;
    height: 70vh;
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
  box-shadow: 0px 0px 30px 5px rgba(143, 5, 138, 0.47);
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
  }
`;

const BackgroundDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #232523;
  padding: 20px 10px;
  border-radius: 10px 10px 0 0;
  margin-bottom: 1px;

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
      font-size: 15px;
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
  padding: 20px 10px;
  border-radius: 0 0 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    input {
      background: transparent;
      border: none;
      font-size: 30px;
      width: 100px;
      color: #fff;
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
