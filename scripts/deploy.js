// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() 

{
  //NFT Market Contract deploy
  const Market = await ethers.getContractFactory("NFTMarket");
  const market = await Market.deploy();
  await market.deployed();
  const marketAddress  = market.address;
  console.log("NFT Market Address ",market.address);

  //NFT contract deploy

  const NFT = await ethers.getContractFactory("NFT");
  
  const nft = await NFT.deploy(marketAddress)
  await nft.deployed();
  const nftAddress = nft.address;
  console.log("NFT deployed address",nftAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
