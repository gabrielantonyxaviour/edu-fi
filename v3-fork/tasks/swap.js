const { networks } = require("../networks");

task("swap", "Create a pool").setAction(async (taskArgs) => {
  const { ethers } = hre;
  const [signer] = await ethers.getSigners();

  // // CHANGE THIS
  // const poolAddress = "";
  // const recipient = "";
  // const zeroForOne = "";
  // const amountSpecified = "";
  // const sqrtPriceLimitX96 = "";

  // const core = new ethers.Contract(
  //   poolAddress,
  //   [
  //     {
  //       constant: false,
  //       inputs: [
  //         {
  //           name: "recipient",
  //           type: "address",
  //         },
  //         {
  //           name: "zeroForOne",
  //           type: "bool",
  //         },
  //         {
  //           name: "amountSpecified",
  //           type: "int256",
  //         },
  //         {
  //           name: "sqrtPriceLimitX96",
  //           type: "uint160",
  //         },
  //       ],
  //       name: "swap",
  //       outputs: [
  //         {
  //           name: "amount0",
  //           type: "int256",
  //         },
  //         {
  //           name: "amount1",
  //           type: "int256",
  //         },
  //       ],
  //       payable: false,
  //       stateMutability: "nonpayable",
  //       type: "function",
  //     },
  //   ],
  //   signer
  // );
  // const response = await core.swap(
  //   recipient,
  //   zeroForOne,
  //   amountSpecified,
  //   sqrtPriceLimitX96
  // );
  // const receipt = await response.wait();
  // console.log(receipt);
});
