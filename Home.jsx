import React, { useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";

import Header from "./Header";
const Home = () => {
  const [isOpen, setIsOpen] = useState(true);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const provider = window.ethereum;
  const { connect, metaState } = useMetamask();
  const { account } = metaState;

  const connectMetamask = async () => {
    try {
      if (metaState.isAvailable) {
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
            <div className="home-container">
              <h1>Aid, Charity and Donation Tracking System Using Blockchain</h1>
              <p>
              The Decentralized Donation Tracking System based on Smart Contract on blockchain technology helps record the transactions of individual(s) making donations and gather information of where the donations are being spent. Smart contracts using blockchain implemented helps in controlling the transfer of tokens or digital currencies between the ends parties involved in the transaction directly without the need to depend on a trusted third party. The system allows donations and receives donations in the form of cryptocurrency. Each cryptocurrency transaction is unique, making it easy to track it through the blockchain.A high level of clarity and social accountability can calm donor minds and encourage them to donate while also strengthening the reputation of giving generously.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
