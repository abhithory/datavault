import React, { useEffect, useState } from 'react'
import { Contract, ethers } from "ethers";
import { getDataVaultContract, getWeb3Provider } from '../helper/DataVaultSmartContract';
import { Web3Provider } from '@ethersproject/providers';
import { useAtom } from "jotai";
import { web3ConnectionAtom, web3ConnectionInterface } from '../atoms/web3Connection';
import { Button } from '@mantine/core';
import { currencySymbol, networkChainId, networkExplorer, networkName, networkRPCurl } from '../consts/NetworkDetails';


export default function ConnectWallet() {
    const [web3ConnectionData, setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [isNetworkWrong, setIsNetworkWrong] = useState(false);
    const [error, setError] = useState<string>("");



    async function connectToWallet() {
        if (window.ethereum) {
            const provider: Web3Provider = getWeb3Provider();
            const { chainId } = await provider.getNetwork();
            if (String(chainId) === String(networkChainId)) {
                setIsNetworkWrong(false)
                const accounts = await provider.send("eth_requestAccounts", []);
                setWeb3ConnectionData({ ...web3ConnectionData, connected: true, walletAddress: accounts[0] });
            } else {
                setIsNetworkWrong(true)
            }
        } else {
            setError("Please install metamask wallet")
        }
    }

    async function isConnected() {
        const provider: Web3Provider = getWeb3Provider();
        const addresses = await provider.listAccounts();
        return addresses.length > 0
    }

    useEffect(() => {
        (async function () {
            const _isconnected = await isConnected();

            if (_isconnected) {
                connectToWallet()
            }
        })()
    }, [])


    async function changeWrongNetwork() {
        const ether: any = window.ethereum as any;
        try {
            await ether.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexlify(networkChainId) }]
            });
        } catch (err: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (err.code === 4902) {
                try {
                    await ether.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: networkName,
                                chainId: ethers.utils.hexlify(networkChainId),
                                nativeCurrency: { name: currencySymbol, decimals: 18, symbol: currencySymbol },
                                rpcUrls: [networkRPCurl],
                                // networkExplorer:networkExplorer
                            }
                        ]
                    });
                } catch (error) {
                }
            }
        } finally {
            connectToWallet()
        }

    }

    return (
        <div>
            <Button color={isNetworkWrong ? "red" : "customWhite"} className={isNetworkWrong ? "" : 'textPrimary'} onClick={isNetworkWrong ? changeWrongNetwork : connectToWallet}>
                {isNetworkWrong ?
                    "Change Network"
                    :
                    web3ConnectionData.connected ? "Connected" :

                        (error === "" ?
                            "Connect wallet"
                            :
                            `Error: ${error}`
                        )
                }
            </Button>

        </div>
    )
}
