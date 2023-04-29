import { atom } from "jotai";

export interface refreshDataInterface{
    fileStatus:boolean,
    credentialsStatus:boolean,
}


export const refeshDataAtom = atom<refreshDataInterface>({
    fileStatus:false,
    credentialsStatus:false,
})