require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
const hre = require("hardhat");

const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const RPC_URL = process.env.RPC_URL || "";

module.exports = {
  solidity: "0.8.4",
  networks: {
    ropsten: {
      url: RPC_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

async function main() {
  await compileContracts();
  const artGallery = await deployArtGallery();
  await logDeploymentDetails(artGallery);
}

async function compileContracts() {
  console.log("Compiling contracts...");
  await hre.run('compile');
  console.log("Compilation finished.");
}

async function deployArtGallery() {
  console.log("Deploying ArtGallery...");
  const ArtGallery = await hre.ethers.getContractFactory("ArtGallery");
  const artGallery = await ArtGallery.deploy();
  await artGallery.deployed();
  return artGallery;
}

async function logDeploymentDetails(artGallery) {
  console.log("ArtGallery deployed to:", artGallery.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });