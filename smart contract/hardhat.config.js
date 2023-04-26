require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    shardeumSphinx:{
        url: "https://sphinx.shardeum.org/",
        "chainId":8082,
        accounts: ["695852bea31a5ea016ed48145d87b51bbefbd639609a3a77188253abf5938ff9"]
    }
  }
};
