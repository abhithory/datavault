// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract DataVault {
    // structure of file data
    struct FileStruct{
        string name;
    }
    
    // structure of Credential data
    struct Credential{
        string name;
    }

    // event FileAddedByUser(string name,address indexed user);
    // event CredentialAddedByUser(string name,address indexed user);

    // mapping of all files of user
    mapping(address=>FileStruct[]) private _allFilesOfUser; // addressOfUser => files[]

    //  mapping of all credentials of user
    mapping(address=>Credential[]) private _allCredentialsOfUser; //addressOfUser => credentials[]


    function addFileOfUser(FileStruct memory _fileData) external {
        _allFilesOfUser[msg.sender][userTotalFilesCount()] = _fileData; 
    }

    function addCredentialOfUser(Credential memory _credentialData) external {
        _allCredentialsOfUser[msg.sender][userTotalCredentialCount()] = _credentialData; 
    }


    // get total files count that user added
    function userTotalFilesCount() internal view returns (uint256){
        return _allFilesOfUser[msg.sender].length;
    }

    // get total credentials count that user added
    function userTotalCredentialCount() internal view returns (uint256){
        return _allCredentialsOfUser[msg.sender].length;
    }

}
