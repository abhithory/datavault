
import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox");


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    shardeumSphinx:{
        url: "https://liberty20.shardeum.org",
        "chainId":8081,
        accounts: ["695852bea31a5ea016ed48145d87b51bbefbd639609a3a77188253abf5938ff9"]
    }
  }
};

export default config;