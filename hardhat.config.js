require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "";
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL || "";
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "";
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "";
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "YOUR_PRIVATE_KEY";

module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: MAINNET_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    ropsten: {
      url: ROPSTEN_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    kovan: {
      url: KOVAN_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    rinkeby: {
      url: RINKEBY_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};