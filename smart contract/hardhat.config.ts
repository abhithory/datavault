
import { HardhatUserConfig } from "hardhat/config";
require("@nomicfoundation/hardhat-toolbox");
import { config as dotEnvConfig } from "dotenv";
dotEnvConfig();



const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks:{
    shardeumLiberty:{
        url: "https://liberty20.shardeum.org",
        "chainId":8081,
        accounts: [process.env.PRIVATE_KEY as string]
    },
    shardeumSphinx:{
      url: "https://sphinx.shardeum.org/",
      "chainId":8082,
      accounts: [process.env.PRIVATE_KEY as string]
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