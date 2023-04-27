import { useEffect, useState } from 'react';
import { web3ConnectionAtom } from '../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../helper/DataVaultSmartContract';
import { FileInterface } from '../helper/Interfaces';

export default function AllFiles() {
    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);

    const [allFiles, setAllFiles] = useState<FileInterface[]>([])


    useEffect(() => {        
        if (web3ConnectionData.connected) {
            loadAllFiles();
        }
    }, [web3ConnectionData])

    async function loadAllFiles() {
        try {            
            const dataVault = getDataVaultContract();
            const allFiles = await dataVault.getAllFilesOfUser();
            setAllFiles(allFiles);
        } catch (error: any) {
            console.log("error", error?.message);
        }
    }

    return (
        <div>
            <h1>All Files of User</h1>
            {allFiles&& allFiles.map((file, key) => {
                return (
                    <div key={key}>
                        <p>{file.fileName}</p>
                        <p>{file.fileHash}</p>
                    </div>
                )
            })}
        </div>
    )
}

