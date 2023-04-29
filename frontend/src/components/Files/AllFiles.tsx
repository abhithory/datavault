import { useEffect, useState } from 'react';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { FileInterface } from '../../helper/Interfaces';
import OneFileItem from './OneFileItem';

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
            <h2>All Files of User</h2>
            <div className="itemContainer">
                {allFiles && allFiles.map((file, key) => <OneFileItem key={key} fileName={file.fileName} fileHash={file.fileHash} />)}
            </div>
        </div>
    )
}

