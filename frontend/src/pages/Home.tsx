import React from 'react'

export default function Home() {

    function handleFormFile(e: React.ChangeEvent<HTMLFormElement>){
        e.preventDefault();
        console.log('===============handleFormFile=====================');
        // console.log(e.target.userfile.files);
        // const firstName = event.target.firstName.value;

        // here upload file on ipfs

        console.log('====================================');
    }

    function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>){
        console.log('============handleFileUpload========================');
        console.log(e.target.files);

        // show basic details of file to user
        // name, size, type
        console.log('====================================');
    }
  return (
    <div>
        <button>Connect wallet</button>
        <p>address: {}</p>

        <h1>upload file</h1>
        <form onSubmit={handleFormFile}>
            <input type="file" name='userfile' id='userfile' onChange={handleFileUpload} />
            <br />
            <button type='submit'>Upload file</button>
        </form>

    </div>
  )
}
