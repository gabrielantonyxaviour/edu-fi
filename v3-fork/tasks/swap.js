const { networks } = require("../networks");

task("swap", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // // CHANGE THIS
  const poolAddress = networks[network.name].wethUsdcPool;
  const recipient = signer.address;
  const zeroForOne = true;

  const core = new ethers.Contract(
    poolAddress,
    [
      {
        constant: false,
        inputs: [
          {
            name: "recipient",
            type: "address",
          },
          {
            name: "zeroForOne",
            type: "bool",
          },
          {
            name: "amount0",
            type: "uint256",
          },
          {
            name: "amount1",
            type: "uint256",
          },
        ],
        name: "swap",
        outputs: [
          {
            name: "",
            type: "uint256",
          },
          {
            name: "",
            type: "uint256",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer
  );
  const response = await core.swap(recipient, zeroForOne, "100000", "100000");
  const receipt = await response.wait();
  console.log(receipt);
});
