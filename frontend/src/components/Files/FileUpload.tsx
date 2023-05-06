import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../../atoms/web3Connection';
import { useAtom } from 'jotai';
import { FileInput } from './FileInput';
import { Modal, Group, Box, Button, LoadingOverlay, TextInput, Badge, Switch } from '@mantine/core';
import { IconCheck, IconDatabase, IconX } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { FileUploadProcessModel } from './FileUploadProcessModel';
import { refeshDataAtom } from '../../atoms/refreshData';
import { getEncryptedMsg, getFileUploadToken } from '../../helper/ApiCalls';
import { decryptFile, advanceEncryptFile, getEncryptionPublicKey, zipFile } from '../../helper/Utils';



export default function FileUpload() {

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);
    const [web3ConnectionData, setWeb3ConnectionData] = useAtom(web3ConnectionAtom);
    const [opened, { open, close }] = useDisclosure(false);
    const [refreshData, setRefreshData] = useAtom(refeshDataAtom);
    const [fileName, setFileName] = useState<string>("")
    const [uploadingProcessCount, setUploadingProcessCount] = useState<number>(0)
    const [checkedAdvanceEncryption, setCheckedAdvanceEncryption] = useState(false);


    interface FileType {
        lastModified: number,
        lastModifiedDate: string,
        name: string,
        size: number,
        type: string,
        webkitRelativePath: string
    }
    const [fileUploaded, setFileUploaded] = useState<File | null | FileType>({
        lastModified: 0,
        lastModifiedDate: "",
        name: "",
        size: 0,
        type: "",
        webkitRelativePath: ""
    });


    async function uploadFileOnIPFS(file: File,fileName:string) {
        const token = await getFileUploadToken();
        const _file = new File([file], fileName);                
        let currentlyUploaded = 0;
        return await upload([_file], {
            token, onChunkUploaded: (uploadedSize, totalSize) => {
                currentlyUploaded += uploadedSize;
            },
        });
    }

    async function handleUploadFile() {
        if (!fileUploaded) return
        open()
        setUploadingFile(true)
        try {
            setUploadingProcessCount(0)
            let _file: File | FileType = fileUploaded;
            let fileUploadName:string = fileName + "." + _file.name.split(".").at(-1);
            let fileIPFSHash: string;
            let decryptKey: string;
            let advanceEncryptionStatus: boolean = checkedAdvanceEncryption;
            
            const _pEK: string = web3ConnectionData.encryptionPublicKey.length > 0 ? web3ConnectionData.encryptionPublicKey : await getEncryptionPublicKey(web3ConnectionData.walletAddress);
            setWeb3ConnectionData({ ...web3ConnectionData, encryptionPublicKey: _pEK })
         
            if (advanceEncryptionStatus) {
                const { key, encryptedFile } = await advanceEncryptFile(_file as Blob);
                setUploadingProcessCount(1);
                const uploadResult = await uploadFileOnIPFS(encryptedFile as File,fileUploadName);
                decryptKey = await getEncryptedMsg(key, _pEK);;
                fileIPFSHash = uploadResult.protocolLink;
            } else {
                const uploadResult = await uploadFileOnIPFS(_file as File,fileUploadName);
                decryptKey = "";
                setUploadingProcessCount(1);
                console.log(uploadResult.protocolLink);
                fileIPFSHash = await getEncryptedMsg(uploadResult.protocolLink, _pEK);;
            }
            setUploadingProcessCount(2)
            await uploadFileOnSmartContract(advanceEncryptionStatus,fileUploadName, fileIPFSHash,decryptKey);

        } catch (error) {
            console.log(error);
            
        } finally {
            setUploadingFile(false)
            close()
        }
        // ------------- for uploading file in backend--------------
        // const formData = new FormData()
        // formData.append('userfile', _file)
        // const responseUpload = await fetch(`http://localhost:8000/api/v1/uploadFileToIPFS`, { method: "POST", body: formData }); // from step 1
        // const dataRes = await responseUpload.json();
    }


    async function uploadFileOnSmartContract(advanceEncryptionStatus:boolean,_name: string, fileHash: string,decryptKey:string) {

        try {
            const dataVault: Contract = getDataVaultContract();
            const _addFileOfUser = await dataVault.addFileOfUser({ advanceEncryptionStatus,fileName: _name, fileHash, decryptKey});
            setUploadingProcessCount(3)

            const addedfile = await _addFileOfUser.wait()
            setUploadingProcessCount(4)
            setRefreshData({ ...refreshData, fileStatus: !refreshData.fileStatus })

        } catch (error: any) {
            console.log(error);
            console.log(error?.message);

        }

    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let _file: File | null = e.target.files && e.target.files[0]
        setFileUploaded(_file)
        setFileName(_file?.name?.split(".").slice(0, -1).join(".") as string);

        // encriptDecrypt(_file as File);

        // let reader = new FileReader();
        // reader.onloadend = () => {
        //   console.log("url",reader.result);          
        // }
        // reader.readAsDataURL(file);
        // show basic details of file to user
        // name, size, type
    }

    function convertInMb(inByte: number): string {
        return (inByte / 1000).toFixed(3) + " KB"
    }


    return (
        <>

            <Modal size="xl" ta="center" opened={opened} onClose={close} title="Uploading Process" centered>
                <FileUploadProcessModel uploadingProcessCount={uploadingProcessCount} checkedAdvanceEncryption={checkedAdvanceEncryption} />
            </Modal>

            <h1>Upload file</h1>

            <Group position="center">
                <Switch
                    checked={checkedAdvanceEncryption}
                    onChange={(event) => setCheckedAdvanceEncryption(event.currentTarget.checked)}
                    color="customPrimary"
                    size="md"
                    label="Advance Encryption"
                    thumbIcon={
                        checkedAdvanceEncryption ? (
                            <IconCheck size="0.8rem" color="indigo" stroke={3} />
                        ) : (
                            <IconX size="0.8rem" color="black" stroke={3} />
                        )
                    }
                />
            </Group>
            <div>
                {checkedAdvanceEncryption ?
                    <p>Encrypt the file and hash both</p>
                    :
                    <p>Encrypt the hash only</p>
                }
            </div>

            <FileInput handleFileUpload={handleFileUpload} />
            {fileUploaded && fileUploaded?.size > 0 &&
                <>
                    <TextInput
                        type='text'
                        placeholder="Your name"
                        label="File Name"
                        withAsterisk
                        disabled={uploadingFile}
                        value={fileName} onChange={(e) => {
                            setFileName(e.target.value);
                        }}
                    />
                    <Badge mt="sm" radius="sm" color='violet'>Size: {convertInMb(fileUploaded?.size)}</Badge>
                </>
            }
            <br />
            <Button loading={uploadingFile} rightIcon={<IconDatabase />} onClick={handleUploadFile} disabled={!web3ConnectionData.connected || !Boolean(fileUploaded?.size)} variant="outline">
                Upload File
            </Button>

            {!web3ConnectionData.connected &&
                <p>Please connect wallet first</p>
            }

        </>
    )
}
