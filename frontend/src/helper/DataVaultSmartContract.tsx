import { Contract, ethers } from 'ethers'
import DataVaultABI from '../consts/DataVaultABI.json'
import { Provider } from '@ethersproject/providers';
import { ExternalProvider } from '@ethersproject/providers';

export const dataVaultContractAddr = "0x4648A7025bb42DF0e3D2e26a3263e29321a03660";

export function getWeb3Provider(ethereumProvider:ExternalProvider):Provider{
    return new ethers.providers.Web3Provider(ethereumProvider);
}
export function getDataVaultContract():Contract {
    const contract = new ethers.Contract(dataVaultContractAddr, DataVaultABI, getWeb3Provider(window.ethereum as ExternalProvider));
    return contract;
}