const { networks } = require("../networks");

const { BigNumber, ethers } = require("ethers");

function calculateY(X, A, B) {
  const twoToThePower96 = BigNumber.from(2).pow(96);
  console.log(twoToThePower96);
  const scalingFactor = BigNumber.from(10)
    .pow(B)
    .pow(B)
    .div(BigNumber.from(10).pow(A));
  console.log(scalingFactor);

  const intermediateValue = X.mul(twoToThePower96)
    .mul(twoToThePower96)
    .div(scalingFactor)
    .div(B);
  console.log(intermediateValue);
  const Y = sqrt(intermediateValue);
  console.log(Y);
  return Y;
}
function sqrt(value) {
  if (value.isZero()) return BigNumber.from(0);

  let z = value.add(BigNumber.from(1)).div(BigNumber.from(2));
  let y = value;

  while (z.lt(y)) {
    y = z;
    z = value.div(z).add(z).div(BigNumber.from(2));
  }

  return y;
}

task("create-pool", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // CHANGE THIS
  const poolFactory = networks[network.name].poolFactory;
  const tokenA = networks[network.name].weth;
  const tokenB = networks[network.name].usdc;
  const tokenAPriceInTokenB = BigNumber.from("2500");
  const fee = 3000;

  // Calculate sqrtPriceX96
  const sqrtPriceX96 = calculateY(tokenAPriceInTokenB, 18, 6);
  console.log("sqrtPriceX96", sqrtPriceX96.toString());
  const core = new ethers.Contract(
    poolFactory,
    [
      {
        constant: false,
        inputs: [
          {
            name: "tokenA",
            type: "address",
          },
          {
            name: "tokenB",
            type: "address",
          },
          {
            name: "fee",
            type: "uint24",
          },
          {
            name: "sqrtPriceX96",
            type: "uint160",
          },
        ],
        name: "createPool",
        outputs: [
          {
            name: "pool",
            type: "address",
          },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    signer
  );
  const response = await core.createPool(tokenA, tokenB, fee, sqrtPriceX96);
  const receipt = await response.wait();
  console.log(receipt);
});
