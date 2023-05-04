
import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox");


const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    shardeumSphinx:{
        url: "https://liberty20.shardeum.org",
        "chainId":8081,
        accounts: ["695852bea31a5ea016ed48145d87b51bbefbd639609a3a77188253abf5938ff9"]
    },
    local:{
      url: "HTTP://127.0.0.1:7545",
      "chainId":1337,
      accounts: ["3cc98460e522d56a1ad883c9b9413a341f294e5eaad4061056f7bb8fb8f03231"]
  }
  }
};

// npx hardhat run .\scripts\deploy.ts --network local
export default config;