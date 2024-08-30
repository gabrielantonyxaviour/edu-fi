const { networks } = require("../networks");
const coreAbi = require("../build/artifacts/contracts/DefiGenie.sol/DefiGenie.json");
task("deposit", "Deposits tokens").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const core = new ethers.Contract(
    "0xfbbe4d65bd61b778161ed71ec9416988ee21e911",
    [
      {
        type: "function",
        name: "deposit",
        inputs: [],
        outputs: [
          {
            name: "mintAmount",
            type: "uint256",
          },
        ],
        stateMutability: "payable",
        payable: true,
        constant: false,
        signature: "0xd0e30db0",
      },
    ],
    signer
  );
  const response = await core.deposit({
    value: ethers.utils.parseEther("0.01"),
  });
  const receipt = await response.wait();
  console.log(receipt);
});
