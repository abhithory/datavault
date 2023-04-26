import React, { useEffect, useState } from 'react'
import {ethers} from "ethers";
// const ethers = require("ethers")


export default function ConnectWallet() {

    const [walletAddr, setWalletAddr] = useState<string>("")
    const [error, setError] = useState<string>("");


    async function connectToWallet() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // @ts-ignore: Unreachable code error
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(accounts);

            setWalletAddr(accounts[0]);


            const { name, chainId } = await provider.getNetwork();
            console.log(name, chainId);
            
        } else {
            setError("Please install metamask wallet")
        }
    }

    return (
        <div>
            <button onClick={connectToWallet}>Connect wallet</button>
            {walletAddr !== "" &&
            <p>address: {walletAddr}</p>
            }
            {error !== "" &&
            <p>error: {error}</p>
            }
        </div>
    )
}
