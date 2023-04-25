import React from 'react'



// import { SpheronClient, ProtocolEnum, UploadStatusEnum } from "@spheron/storage";
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJiYTdmYzNkOGQ4N2M1ZmEyNWNlMDI4YmYyNTQyNzBmMjJlZmEzZDFjZGExNDFmZDk2NTRiOWU0NTJkZmNmNzlhZTUwNWZjNTA1NmNmMDVmODYxYzRmNzFkYTcwZWU4N2ZjNDJjZDA5NTAzN2E3ZmExNGNjODFiNmU4YmJhMjQ5OSIsImlhdCI6MTY4MjQ1MjQ2NSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.kU60B94qXvWQ8JzHhuZ2H4x7QtSGpKCpIpybhf2fwSo"
// const client = new SpheronClient({ token });

export default function Home() {

    // interface Upload {
    //     id: string;
    //     protocolLink: string;
    //     buildDirectory: string[];
    //     status: UploadStatusEnum;
    //     memoryUsed: number;
    //     bucketId: string;
    //     protocol: string;
    //   }


    // async function uploadFile(filePath:string, name:string) {
    //     console.log("uploading file");
        
    //     // const filePath = "";
    //     // const name = ""
    //     let currentlyUploaded:number = 0;
    //     const { uploadId, bucketId, protocolLink, dynamicLinks } = await client.upload(
    //         filePath,
    //         {
    //             protocol: ProtocolEnum.IPFS,
    //             name,
    //             onUploadInitiated: (uploadId) => {
    //                 console.log(`Upload with id ${uploadId} started...`);
    //             },
    //             onChunkUploaded: (uploadedSize, totalSize) => {
    //                 currentlyUploaded += uploadedSize;
    //                 console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
    //             },
    //         }
    //     );

    //     console.log('=================uploadedFile===================');
    //     console.log("uploadId",uploadId);
    //     console.log("bucketId",bucketId);
    //     console.log("protocolLink",protocolLink);
    //     console.log("dynamicLinks",dynamicLinks);
    //     console.log('====================================');

    //     // const upload: Upload = await client.getUpload(uploadId);
    //     // console.log(upload);
    // }

    function handleFormFile(e: React.ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('===============handleFormFile=====================');
        // console.log(e.target.userfile.files);
        // const firstName = event.target.firstName.value;

        // here upload file on ipfs

        console.log('====================================');
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('============handleFileUpload========================');
        
        let file: any = e.target.files && e.target.files[0]
        console.log(file);

        let reader = new FileReader();

        reader.onloadend = () => {
          console.log("url",reader.result);          
        }
        reader.readAsDataURL(file);


        // show basic details of file to user
        // name, size, type
        console.log('====================================');
    }
    return (
        <div>
            <button>Connect wallet</button>
            <p>address: { }</p>

            <h1>upload file</h1>
            <form onSubmit={handleFormFile}>
                <input type="file" name='userfile' id='userfile' onChange={handleFileUpload} />
                <br />
                <button type='submit'>Upload file</button>
            </form>

        </div>
    )
}
