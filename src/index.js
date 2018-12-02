import React from "react";
import ReactDOM from "react-dom";
import Web3Provider, { Web3Consumer } from "web3-react";
import {
  useWeb3Context,
  useNetworkName,
  useAccountBalance,
  useSignPersonalManager
} from "web3-react/hooks";

// only necessary because React.lazy doesn't support SSR yet!
import screens from "./defaultScreens";
import "./styles.css";

function MyHooksComponent() {
  const networkName = useNetworkName();
  const context = useWeb3Context();
  const balance = useAccountBalance();

  return (
    <>
      <p>
        {networkName} ({context.networkId})
      </p>
      <p>{balance} ETH</p>
    </>
  );
}

function HooksSigner() {
  const message = "Testing out Web3 React!";
  const [
    signatureState,
    signatureData,
    signPersonal,
    resetSignature
  ] = useSignPersonalManager(message, { success: signature => console.log });

  if (signatureState === "ready")
    return <button onClick={signPersonal}>Sign message!</button>;

  if (signatureState === "pending") return <p>Waiting...</p>;

  if (signatureState === "success")
    return (
      <p>
        Success! <span>{signatureData.signature.signature}</span>
      </p>
    );

  return <button onClick={resetSignature}>Error</button>;
}

function App() {
  return (
    <div className="App">
      <Web3Provider screens={screens}>
        <MyHooksComponent />
        <Web3Consumer>{context => <p>{context.account}</p>}</Web3Consumer>
        <HooksSigner />
      </Web3Provider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
