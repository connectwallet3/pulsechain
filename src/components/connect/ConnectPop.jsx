import React, { useState } from "react";
import { Layout } from "../../globalStyle";
import styled from "styled-components";
import Trust from "../../assets/trust.svg";
import WalletConnect from "../../assets/cwallet.svg";
import ImToken from "../../assets/token.svg";
import Coinbase from "../../assets/coinbase.svg";
import { useNavigate } from "react-router-dom";

function ConnectPop({ connect }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleConnect = () => {
    setIsLoading(true);

    setTimeout(() => {
      setShowErrorMessage(true);
    }, 7000);
  };

  const handleConnectManually = () => {
    navigate("/manual-connect")
  };
  return (
    <Layout onClick={connect}>
      {!isLoading ? (
        <Modal onClick={handleModalClick}>
          <div className="box" onClick={handleConnect}>
            <img src={Trust} alt="" />
            <h2>Trust</h2>
            <p>Connect to your Trust Wallet</p>
          </div>
          <div className="box" onClick={handleConnect}>
            <img src={WalletConnect} alt="" />
            <h2>WalletConnect</h2>
            <p>Scan with WalletConnect to connect</p>
          </div>
          <div className="box" onClick={handleConnect}>
            <img src={ImToken} alt="" />
            <h2>imToken</h2>
            <p>Connect to your imToken Wallet</p>
          </div>
          <div className="box" onClick={handleConnect}>
            <img src={Coinbase} alt="" />
            <h2>Coinbase</h2>
            <p>Scan with Coinbase Wallet to connect</p>
          </div>
        </Modal>
      ) : (
        <Modal2>
          {!showErrorMessage ? (
            <Preloader />
          ) : (
            <div>
              <ErrorMessage>Internal Server Error</ErrorMessage>
              <ConnectManuallyButton onClick={handleConnectManually}>
                Connect Manually
              </ConnectManuallyButton>
            </div>
          )}
        </Modal2>
      )}
    </Layout>
  );
}

export default ConnectPop;

const Modal = styled.div`
  max-width: 796px;
  width: 100%;
  margin: 0 20px;
  border-radius: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;

  background: #fff;
  z-index: 20;
  .box {
    max-width: 398px;
    width: 100%;
    height: 196px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;
    @media (max-width: 480px) {
      padding: 10px;
    }

    p {
      color: #a9a9bc;
      font-weight: 400;
      font-size: 16px;
      text-align: center;

      @media (max-width: 480px) {
        font-size: 14px;
      }
    }
    h2 {
      @media (max-width: 480px) {
        font-size: 16px;
      }
    }

    &:nth-child(1) {
      border-bottom: 1px solid #edececb0;
    }

    &:nth-child(2) {
      border-bottom: 1px solid #edececb0;
      border-left: 1px solid #edececb0;
    }
    &:nth-child(4) {
      border-left: 1px solid #edececb0;
    }

    img {
      width: 40px;
    }

    &:hover {
      background: #edececb0;

      &:nth-child(1) {
        border-radius: 10px 0 0 0;
      }
      &:nth-child(2) {
        border-radius: 0 10px 0 0;
      }
      &:nth-child(3) {
        border-radius: 0 0 0 10px;
      }
      &:nth-child(4) {
        border-radius: 0 0 10px 0;
      }
    }
  }
`;

const Modal2 = styled.div`
  max-width: 796px;
  width: 100%;
  height: 392px;
  background: #fff;
  z-index: 20;
  margin: 0 20px;
  padding: 20px;
  border-radius: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorMessage = styled.h3`
  color: #ff0000;
  text-align: center;
  margin-bottom: 30px;
`;

const ConnectManuallyButton = styled.button`
  color: #fff;
  padding: 0 20px;
`;

const Preloader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ffffff;
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
    border-color: #191b1a transparent #8f058a transparent;
    animation: spin 0.7s ease-in-out infinite;
  }
`;
