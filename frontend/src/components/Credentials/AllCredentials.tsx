import { useEffect, useState, useMemo, useCallback } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { CredentialInterface } from '../../helper/Interfaces';
import OneCredentialItem from './OneCredentialItem';

export default function AllCredentials() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [allCredentials, setAllCredentials] = useState<CredentialInterface[]>([])


    // useEffect(() => {        
    //     if (web3ConnectionData.connected) {
    //         loadAllCredentials();
    //     }
    // }, [web3ConnectionData])


    useEffect(() => {
        if (web3ConnectionData.connected) {
            loadAllCredentials();
        }
    }, [])
    async function loadAllCredentials() {
        try {
            const dataVault = getDataVaultContract();
            const allCredentials = await dataVault.getAllCredentialsOfUser();
            setAllCredentials(allCredentials);
        } catch (error: any) {
            console.log("error", error?.message);
        }
    }

    return (
        <div>
            <h1>All Credentials of User</h1>

            <div className="itemContainer">
                {allCredentials && allCredentials.map((file, key) =>  <OneCredentialItem key={key} website={file.website} usernameOrEmailOrPhone={file.usernameOrEmailOrPhone} password={file.password} />)}
            </div>
        </div>
    )
}

