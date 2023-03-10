import React, { useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../lib/constants";

import Header from "./Header";
const CreateProposal = () => {
  const { connect, metaState } = useMetamask();
  const { account } = metaState;
  const [subject, setSubject] = useState();
  const [description, setDescription] = useState();
  const [fund, setFund] = useState();

  const connectMetamask = async () => {
    try {
      if (metaState.isAvailable) {
        const  provider = window.ethereum;
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

  const handleCreateProposal = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const charityContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      const txn = await charityContract.set_requirement(
        subject,
        description,
        fund,
      );
      console.log(txn,'❎')
      console.log("proposal created successfully");
      setSubject(undefined)
      setDescription(undefined)
      setFund(undefined)
    } catch (error) {
      console.log(error);
    }
  };

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
                <span>Create Proposal</span>
                <input
                  type="text"
                  placeholder="Subject"
                  value={subject || ""}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <textarea
                  rows="10"
                  cols="50"
                  type="text"
                  placeholder="Description"
                  className="desc-input"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Fund Requirement"
                  value={fund || ""}
                  onChange={(e) => setFund(e.target.value)}
                />
                <button onClick={handleCreateProposal} className="card-btn">
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CreateProposal;
