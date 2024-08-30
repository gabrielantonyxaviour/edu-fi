const { networks } = require("../networks");

task("add-liquidity", "Add liquidity to pool").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();

  // CHANGE THIS

  const poolAddress = "";
  const recipient = "";
  const tickLower = "";
  const tickUpper = "";
  const amount = "";

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
            name: "tickLower",
            type: "int24",
          },
          {
            name: "tickUpper",
            type: "int24",
          },
          {
            name: "amount",
            type: "uint128",
          },
        ],
        name: "mint",
        outputs: [
          {
            name: "amount0",
            type: "uint256",
          },
          {
            name: "amount1",
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
  const response = await core.mint(recipient, tickLower, tickUpper, amount);
  const receipt = await response.wait();
  console.log(receipt);
});
