export interface FileInterface{
    advanceEncryptionStatus: boolean,
    fileName:string,
    fileHash:string,
    decryptKey:string
}

export interface ExtendedFileInterface{
    advanceEncryptionStatus: boolean,
    fileName:string,
    fileHash:string,
    decryptKey:string
    decryptedStatus:boolean
}

export interface CredentialInterface{
    website:string,
    usernameOrEmailOrPhone:string,
    password:string,
}

export interface ExtendedCredentialInterface{
    website:string,
    usernameOrEmailOrPhone:string,
    password:string,
    decryptedStatus:boolean

}

