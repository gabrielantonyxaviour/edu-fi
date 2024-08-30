import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  blockConfirmation,
  developmentChains,
} from "../../helper-hardhat-config";
import { verify } from "../../scripts/utils/verify";

const deployUniswapV3Fork: DeployFunction = async function (
  hre: HardhatRuntimeEnvironment
) {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();

  log("----------------------------------------------------");
  log("Deploying UniswapV3Fork and waiting for confirmations...");
  const uniswapV3Factory = await deploy("UniswapV3Fork", {
    from: deployer,
    args: [],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: blockConfirmation[network.name] || 1,
  });

  // verify if not on a local chain
  if (!developmentChains.includes(network.name)) {
    console.log("Wait before verifying");
    await verify(uniswapV3Factory.address, []);
  }
};

export default deployUniswapV3Fork;
deployUniswapV3Fork.tags = ["all", "core", "Factory", "UniswapV3Factory"];
