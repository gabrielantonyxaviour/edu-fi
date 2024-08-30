const { networks } = require("../networks");

task("create-pool", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // CHANGE THIS
  const poolAddress = "";
  const recipient = "";
  const zeroForOne = "";
  const amountSpecified = "";
  const sqrtPriceLimitX96 = "";

  const core = new ethers.Contract(poolAddress, [], signer);
  const response = await core.swap(
    recipient,
    zeroForOne,
    amountSpecified,
    sqrtPriceLimitX96
  );
  const receipt = await response.wait();
  console.log(receipt);
});
