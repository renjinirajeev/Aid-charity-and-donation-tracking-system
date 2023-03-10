import React, { useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";

import {
  contractAbi,
  contractAddress,
  tokenAddress,
  tokenAbi,
} from "../lib/constants";

import Header from "./Header";
const BuyToken = () => {
  const [isOpen, setIsOpen] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // const provider = window.ethereum;
  const { connect, metaState } = useMetamask();
  const { account } = metaState;
  // const provider = new ethers.providers.Web3Provider(window.ethereum);
  const [tokenBalance, setTokenBalance] = useState();
  const [tokenAmount, settokenAmount] = useState();



  const connectMetamask = async () => {
    try {
      if (metaState.isAvailable) {
        let provider = window.ethereum
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }],
        });
        await connect(ethers.providers.Web3Provider, "any");
      } else {
        console.log("Please Kindly install Metamask Chorme extrension");
        window.open("https://metamask.io/download.html", "_blank");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account.length > 0) {
      window.ethereum.on("chainChanged", (chainId) => {
        if (chainId !== "0x5") window.location.reload();
      });
    }
  }, [account]);

  //handleBuyTokens

  const handleBuyToken = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const charityContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await charityContract.buyDonateToken({ value: ethers.utils.parseEther(tokenAmount) });
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTokenBalance = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tokenContract = new ethers.Contract(
          tokenAddress,
          tokenAbi,
          provider
        );
        const balance = await tokenContract.balanceOf(account[0]);
        setTokenBalance(Number(balance));
      } catch (error) {
        console.log(error);
      }
    };
    getTokenBalance()
  }, [account]);

  return (
    <>
      <Header />
      <section className="section-container">
        <div className="garden-container">
          {!account?.length > 0 ? (
            <div className="wallet-container" onClick={connectMetamask}>
              <span>Please connect wallet to continue.</span>
            </div>
          ) : (
            <div className="cards-container">
              <div className="card">
                <span>Buy Token</span>
                <input type="number" placeholder="value > 0.001" value={tokenAmount || ''} onChange={(e) => settokenAmount(e.target.value)}/>
                <button className="card-btn" onClick={handleBuyToken}> Buy</button>
                <div>Token Balance : {tokenBalance}</div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BuyToken;
