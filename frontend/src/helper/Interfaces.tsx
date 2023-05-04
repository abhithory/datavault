export interface FileInterface{
    fileName:string,
    fileHash:string,
    // decryptedStatus:boolean
}

export interface ExtendedFileInterface{
    fileName:string,
    fileHash:string,
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

