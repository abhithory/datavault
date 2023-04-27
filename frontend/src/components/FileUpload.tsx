import React, { useEffect, useState } from 'react'
import { upload } from "@spheron/browser-upload";
import { getDataVaultContract } from '../helper/DataVaultSmartContract';
import { Contract } from 'ethers';
import { web3ConnectionAtom } from '../atoms/web3Connection';
import { useAtom } from 'jotai';


export default function FileUpload() {

    const [uploadingFile, setUploadingFile] = useState<boolean>(false);

    const [web3ConnectionData,] = useAtom(web3ConnectionAtom);


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

    const [fileName, setFileName] = useState<string>("")

    async function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!fileUploaded) return
        setUploadingFile(true)

        try {
            const _file: File = e.target.userfile.files[0];
            const response = await fetch(`http://localhost:8000/api/v1/getuploadtoken`);
            const resJson = await response.json();
            const token = resJson.uploadToken;
            let currentlyUploaded = 0;
            const uploadResult = await upload([_file], {
                token, onChunkUploaded: (uploadedSize, totalSize) => {
                    currentlyUploaded += uploadedSize;
                    // console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                },
            });
            await uploadFileOnSmartContract(fileName, uploadResult.protocolLink)
        } catch (error) {
            console.log(error);

        } finally {
            setUploadingFile(false)
        }
        // ------------- for uploading file in backend--------------
        // const formData = new FormData()
        // formData.append('userfile', _file)
        // const responseUpload = await fetch(`http://localhost:8000/api/v1/uploadFileToIPFS`, { method: "POST", body: formData }); // from step 1
        // const dataRes = await responseUpload.json();
        // console.log(dataRes);
    }


    async function uploadFileOnSmartContract(_name: string, _hash: string) {

        try {
            const dataVault: Contract = getDataVaultContract();
            const _addFileOfUser = await dataVault.addFileOfUser({ fileName: _name, fileHash: _hash });
            const addedfile = await _addFileOfUser.wait()
            console.log(addedfile);
        } catch (error: any) {
            console.log(error);
            console.log(error?.message);

        }

    }

    async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        let _file: File | null = e.target.files && e.target.files[0]
        setFileUploaded(_file)
        setFileName(_file?.name as string);
        // let reader = new FileReader();
        // reader.onloadend = () => {
        //   console.log("url",reader.result);          
        // }
        // reader.readAsDataURL(file);
        // show basic details of file to user
        // name, size, type
    }


    return (
        <div>
            <h1>Upload file</h1>

            {uploadingFile ?
                <h1>Uploading please wait</h1>
                :
                <form onSubmit={handleFormFile}>

                    <input type="name" value={fileName} onChange={(e) => {
                        setFileName(e.target.value);
                    }} name='fileName' id='fileName' />
                    <input type="file" name='userfile' id='userfile' onChange={handleFileUpload} />
                    {fileUploaded && fileUploaded?.size > 0 &&
                        <>
                            <br />
                            <p>size: {fileUploaded?.size}</p>
                            <p>name: {fileUploaded?.name}</p>
                            <p>type: {fileUploaded?.type}</p>
                        </>
                    }
                    <br />
                    <button type='submit' disabled={!web3ConnectionData.connected || !Boolean(fileUploaded?.size)} >Upload file</button>
                    {!web3ConnectionData.connected &&
                        <p>Please connect wallet first</p>
                    }
                </form>
            }

        </div>
    )
}
