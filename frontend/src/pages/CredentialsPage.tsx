import React from 'react'
import AllCredentials from '../components/Credentials/AllCredentials'
import CredentialsUpload from '../components/Credentials/CredentialsUpload'

export default function CredentialsPage() {
  return (
    <div className='pageContainer'>
      <div className="uploadContainer">
        <CredentialsUpload />
      </div>
      <div className='alltemsContainer'>
        <AllCredentials />
      </div>
    </div>
  )
}
