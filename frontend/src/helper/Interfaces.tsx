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

export interface CredentialWithFunctionInterface{
    index:number,
    website:string,
    usernameOrEmailOrPhone:string,
    password:string,
    openCredentialModel:(n:number)=>void
}