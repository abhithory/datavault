import { useEffect, useState } from 'react';
import { web3ConnectionAtom } from '../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../helper/DataVaultSmartContract';
import { CredentialInterface } from '../helper/Interfaces';

export default function AllCredentials() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [allCredentials, setAllCredentials] = useState<CredentialInterface[]>([])


    useEffect(() => {        
        if (web3ConnectionData.connected) {
            loadAllCredentials();
        }
    }, [web3ConnectionData])

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
            {allCredentials&& allCredentials.map((file, key) => {
                return (
                    <div key={key}>
                        <p>{file.website}</p>
                        <p>{file.usernameOrEmailOrPhone}</p>
                        <p>{file.password}</p>
                    </div>
                )
            })}
        </div>
    )
}

