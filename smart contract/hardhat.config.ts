
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
      accounts: ["ddda13a3964b9f9ebe4dff462e137519ef1f4b2914032a23e389db7e452e650e"]
  }
  }
};

// npx hardhat run .\scripts\deploy.ts --network local
export default config;