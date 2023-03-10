import { useEffect } from "react";
import {Routes, Route, Navigate } from "react-router-dom";
import { useMetamask } from "use-metamask";
import { ethers } from "ethers";

import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import BuyToken from "./components/BuyToken";
import Donate from "./components/Donate";
import CreateProposal from "./components/CreateProposal";


function App() {
  const { connect, getAccounts, metaState } = useMetamask();
 
  useEffect(() => {
    const connectAccount = async () => {
      const accounts = await getAccounts();
      if (!metaState.isConnected && accounts.length > 0) {
        (async () => {
          try {
            await connect(ethers.providers.Web3Provider, "any");
          } catch (error) {
            console.log(error);
          }
        })();
      }
    };
    connectAccount();
   
  }, []);

  return (
    <Routes>
      <Route path="/*" element={<Navigate to='/'/>}/>
      <Route path="/" element={<Home />}/>
      <Route path="/buy-tokens" element={<BuyToken />}/>
      <Route path="/donate" element={<Donate />}/>
      <Route path="/create-proposal" element={<CreateProposal />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
    </Routes>
  );
}

export default App;
