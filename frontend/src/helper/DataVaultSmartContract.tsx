import { Contract, ethers } from 'ethers'
import DataVaultABI from '../consts/DataVaultABI.json'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers';
import { dataVaultContractAddr } from '../consts/NetworkDetails';





export function getWeb3Provider(): Web3Provider {
    const provider = new ethers.providers.Web3Provider(window.ethereum as ExternalProvider);
    return provider
}


export function getWeb3Signer(): JsonRpcSigner {
    const provider: Web3Provider = getWeb3Provider();
    const signer: JsonRpcSigner = provider.getSigner();
    return signer
}

export function getDataVaultContract(): Contract {
    const contract = new ethers.Contract(dataVaultContractAddr, DataVaultABI, getWeb3Signer());
    return contract;
}