import {ethers} from "hardhat";


async function main() {
  if (!process.env.ORACLE_ADDRESS) {
    throw new Error("ORACLE_ADDRESS env variable is not set.");
  }
  const oracleAddress: string = process.env.ORACLE_ADDRESS;
  await deployImprovedOpenAiSimpleLLM(oracleAddress);
}


async function deployImprovedOpenAiSimpleLLM(oracleAddress: string) {
  const agent = await ethers.deployContract("ImprovedOpenAiSimpleLLM", [oracleAddress], {});

  await agent.waitForDeployment();

  console.log(`ImprovedOpenAiSimpleLLM contract deployed to ${agent.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
