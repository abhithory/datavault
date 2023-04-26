import React, { useEffect, useState } from 'react'
import {Contract, ethers} from "ethers";
import { getDataVaultContract, getWeb3Provider } from '../helper/DataVaultSmartContract';
import { Web3Provider } from '@ethersproject/providers';


export default function ConnectWallet() {

    const [walletAddr, setWalletAddr] = useState<string>("")
    const [error, setError] = useState<string>("");


    async function connectToWallet() {
        if (window.ethereum) {
            const provider:Web3Provider = getWeb3Provider();
            // @ts-ignore: Unreachable code error
            const accounts = await provider.send("eth_requestAccounts", []);
            console.log(accounts);
            setWalletAddr(accounts[0]);
            const { name, chainId } = await provider.getNetwork();
            console.log(name, chainId);
            callFunction();
            
        } else {
            setError("Please install metamask wallet")
        }
    }

    async function callFunction() {
        const dataVault:Contract = getDataVaultContract();
        const allFiles = await dataVault.getAllFilesOfUser();

        console.log("allFiles",allFiles);        
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
