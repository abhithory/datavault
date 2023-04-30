import { atom } from "jotai";

export interface web3ConnectionInterface{
    connected:boolean,
    walletAddress:string,
    encryptionPublicKey:string,
}

export const web3ConnectionAtom = atom<web3ConnectionInterface>({
    connected:false,
    walletAddress:"",
    encryptionPublicKey:"",
})