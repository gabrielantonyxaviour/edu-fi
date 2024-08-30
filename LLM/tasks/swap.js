const { networks } = require("../networks");
const coreAbi = require("../build/artifacts/contracts/DefiGenie.sol/DefiGenie.json");
task("swap", "Swaps tokens").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const core = new ethers.Contract(
    "0x48ca4C272Ed60751aA0E4d9835BCa1Bb1a91f749",
    coreAbi.abi,
    signer
  );
  const response = await core.swap(
    "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    "0x0000000000000000000000000000000000000000",
    "100000000000000000"
  );
  const receipt = await response.wait();
  console.log(receipt);
});
