require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const hardhatRuntimeEnvironment = require("hardhat");

const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BLOCKCHAIN_RPC_URL = process.env.RPC_URL || "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: BLOCKCHAIN_RPC_URL,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
};

async function main() {
  await compileSmartContracts();
  const deployedArtGalleryContract = await deployArtGalleryContract();
  await displayContractDeploymentDetails(deployedArtGalleryContract);
}

async function compileSmartContracts() {
  console.log("Compiling smart contracts...");
  await hardhatRuntimeEnvironment.run('compile');
  console.log("Smart contract compilation completed.");
}

async function deployArtGalleryContract() {
  console.log("Deploying ArtGallery Smart Contract...");
  const ArtGalleryContract = await hardhatRuntimeEnvironment.ethers.getContractFactory("ArtGallery");
  const deployedContract = await ArtGalleryContract.deploy();
  await deployedContract.deployed();
  return deployedContract;
}

async function displayContractDeploymentDetails(deployedContract) {
  console.log("ArtGallery Smart Contract deployed to:", deployedContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });