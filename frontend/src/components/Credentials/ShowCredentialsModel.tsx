import React from 'react'
import { CredentialInterface } from '../../helper/Interfaces'

export default function ShowCredentialsModel(credentialData:CredentialInterface) {
  return (
    <div>
      <h1>{credentialData.website}</h1>
      <h1>{credentialData.usernameOrEmailOrPhone}</h1>
      <h1>{credentialData.password}</h1>
    </div>
  )
}
