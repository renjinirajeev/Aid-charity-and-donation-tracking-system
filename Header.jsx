import React, { useState, useEffect } from "react";

import { TbSun } from "react-icons/tb";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";

import { useMetamask } from "use-metamask";
import { ethers } from "ethers";
import { useLocation, Link } from "react-router-dom";

import zendogeLogo from "../assets/images/zendoge_logo.png";
import { formatWalletHash } from "../utils/transformers";

const Header = () => {
  const provider = window.ethereum;
  const { connect, metaState } = useMetamask();
  const { account } = metaState;

  const [activeTab, setActiveTab] = useState("Gardens");
  const location = useLocation();

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

  const switchNetwork = async () => {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x5" }], // chainId must be in hexadecimal numbers
    });
  };

  useEffect(() => {
    if (account.length > 0) {
      window.ethereum.on("chainChanged", (chainId) => {
        if (chainId !== "0x5") window.location.reload();
      });
    }
  }, [account]);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("Home");
    } else if (location.pathname === "/buy-tokens") {
      setActiveTab("Buy Token");
    } else if (location.pathname === "/donate") {
      setActiveTab("Donate");
    } else if (location.pathname === "/create-proposal") {
      setActiveTab("Create Proposal");
    } else if (location.pathname === "/dashboard") {
      setActiveTab("Dashboard");
    }
  }, [location]);

  //Menu Toggle Functions
  const showMenu = () => {
    let headerItems = document.getElementById("navLinks");
    headerItems.style.left = "0";
  };

  const hideMenu = () => {
    let headerItems = document.getElementById("navLinks");
    headerItems.style.left = "-158%";
  };

  return (
    <div className="header-container">
      <div className="nav-container">
        <div className="nav-items-left">
          <div className="logo-container">
            <img src={zendogeLogo} alt="yuzu-logo" />
          </div>
          <div className="nav-links" id="navLinks">
            <div className="links-logo">
              <img src={zendogeLogo} alt="yuzu-logo" />
              <IoCloseSharp
                color="#777E90"
                size={35}
                className="menu-toggler-close"
                onClick={hideMenu}
              />
            </div>
            <Link
              to="/"
              className={activeTab === "Home" ? "active-tab" : "tab"}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </Link>
            <Link
              to="/buy-tokens"
              className={activeTab === "Buy Token" ? "active-tab" : "tab"}
              onClick={() => setActiveTab("Buy Token")}
            >
              Buy Tokens
            </Link>
            <Link
              to="/donate"
              className={activeTab === "Donate" ? "active-tab" : "tab"}
              onClick={() => setActiveTab("Donate")}
            >
              Donate
            </Link>
            <Link
              to="/create-proposal"
              className={activeTab === "Create Proposal" ? "active-tab" : "tab"}
              onClick={() => setActiveTab("Create Proposal")}
            >
              Create Proposal
            </Link>
              {/* //change admin address */}
            {account[0] === "0xE75bCFD0EF223D06e32456eC8f2ade401483e8BA".toLowerCase() && (
              <Link
                to="/dashboard"
                className={activeTab === "Dashboard" ? "active-tab" : "tab"}
                onClick={() => setActiveTab("Dashboard")}
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
        <div className="nav-items-right">
          <div className="menu-toggler-open">
            <HiMenuAlt4 size={30} color="#000" onClick={showMenu} />
          </div>
          {!account?.length > 0 ? (
            <div className="wallet-btn" onClick={connectMetamask}>
              <span>Connect</span>
            </div>
          ) : provider?.chainId !== "0x5" ? (
            <div className="wallet-btn" onClick={switchNetwork}>
              <span>Wrong Network</span>
            </div>
          ) : (
            <div className="wallet-btn">
              <span>{account?.length && formatWalletHash(account[0])}</span>
            </div>
          )}
          <div className="darkmode-toggler">
            <TbSun size={25} color="#000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
