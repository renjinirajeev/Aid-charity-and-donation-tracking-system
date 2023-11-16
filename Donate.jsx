import React, { useEffect, useState } from "react";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import { Oval } from "react-loader-spinner";
import DonateItem from "./DonateItem";

import {
  contractAbi,
  contractAddress,
  tokenAddress,
  tokenAbi,
} from "../lib/constants";

import Header from "./Header";
const Donate = () => {
  const [proposals, setProposals] = useState();
  const [isLoading, setIsLoading] = useState(false);



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

  useEffect(() => {
    const getAllProposals = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = await provider.getSigner();
        const charityContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        console.log(charityContract);
        const allProposals = [];

        for (let i = 0; i < 100; i++) {
          const data = await charityContract.requirements(i);
          if (data.subject !== "") {
            allProposals.push(data);
          } else {
            break;
          }
        }
        console.log(proposals);
        setProposals(allProposals);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProposals();
  }, []);

  const donateToProposal = async (id, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const charityContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await charityContract.donateToken(id, parseInt(amount, 16).toString());
      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const reportProposal = async (id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();
      const charityContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );

      const tx = await charityContract.report_NGO(id);
      console.log(tx);
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
              <div className="donate-card">
                <span>NGO's</span>
                {proposals && proposals.length > 0 ? (
                  proposals.map((item, index) => (
                    // <div className="donate-items" key={index}>
                    //   <div className="left-ctn">
                    //     <h3>{item.subject}</h3>
                    //     <p className="item">{item.description}</p>
                    //     <span className="item">{`${item.fund_delivered}/${item.fund_required}`}</span>
                    //   </div>
                    //   <div className="right-ctn">
                    //     {item.approved && (
                    //       <>
                    //         <input type="number" placeholder="Token amount" value={tokenAmount || ''} onChange={(e) => setTokenAmount(e.target.value)}/>
                    //         <button
                    //           className="donate-btn"
                    //           onClick={() => donateToProposal(index, 1)}
                    //         >
                    //           Donate
                    //         </button>
                    //       </>
                    //     )}
                    //     <button className="report-btn" onClick={() => reportProposal(item.ngo_address)}>report</button>
                    //   </div>
                    // </div>
                    <DonateItem data={item} key={index} donate={donateToProposal} report={reportProposal} indx={index}/>
                  ))
                ) : (
                  <Oval
                    height={80}
                    width={80}
                    color="#263159"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel="oval-loading"
                    secondaryColor="#495579"
                    strokeWidth={2}
                    strokeWidthSecondary={2}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Donate;