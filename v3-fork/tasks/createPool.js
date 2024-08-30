const { networks } = require("../networks");

task("create-pool", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // CHANGE THIS
  const poolFactory = "";
  const tokenA = "";
  const tokenB = "";
  const fee = "";
  const sqrtPriceX96 = "";

  const core = new ethers.Contract(poolFactory, [], signer);
  const response = await core.createPool(tokenA, tokenB, fee, sqrtPriceX96);
  const receipt = await response.wait();
  console.log(receipt);
});
