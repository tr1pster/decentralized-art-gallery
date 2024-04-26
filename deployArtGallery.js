require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
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
const hre = require("hardhat");
async function main() {
  await hre.run('compile');
  const ArtGallery = await hre.ethers.getContractFactory("ArtGallery");
  console.log("Deploying ArtGallery...");
  const artGallery = await ArtGallery.deploy();
  await artGallery.deployed();
  console.log("ArtGallery deployed to:", artGallery.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });