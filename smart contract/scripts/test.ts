const hre = require("hardhat");
const DataVaultABI = require("../artifacts/contracts/DataVault.sol/DataVault.json")
const dataVaultContractAddr = "0xf320819f7D6F133835322Eb76488531E4be367E0";
async function main() {

  
  const customHttpProvider = new hre.ethers.providers.JsonRpcProvider("https://liberty20.shardeum.org");
  const contract = new hre.ethers.Contract(dataVaultContractAddr, DataVaultABI.abi, customHttpProvider);

  console.log(await contract.getAllFilesOfUser());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
