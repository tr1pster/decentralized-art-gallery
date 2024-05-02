require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const hardhatRuntimeEnvironment = require("hardhat");

const WALLET_PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const BLOCKCHAIN_RPC_URL = process.env.RPC_URL || "";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: BLOCKCHAIN_RPC_URL,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: ETHERSCAN_API_KEY,
  },
};

async function main() {
  await compileSmartContracts();
  const deployedArtGalleryContract = await deployArtGalleryContract();
  await displayContractDeploymentDetails(deployedArtGalleryContract);
  await verifyContractOnEtherscan(deployedArtGalleryContract.address);
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
  console.log("Deployment completed. Contract address:", deployedContract.address);
  return deployedContract;
}

async function displayContractDeploymentDetails(deployedContract) {
  console.log("ArtGallery Smart Contract deployed to:", deployedContract.address);
}

async function verifyContractOnEtherscan(contractAddress) {
  console.log(`Verifying contract on Etherscan...`);
  try {
    await hardhatRuntimeEnvironment.run("verify:verify", {
      address: contractAddress,
      network: "ropsten",
    });
    console.log("Verification successful!");
  } catch (error) {
    console.error("Verification failed:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });