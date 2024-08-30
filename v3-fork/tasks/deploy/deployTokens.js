const { networks } = require("../../networks");

task("deploy-tokens", "Deploys the Tokens")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs, hre) => {
    console.log("\n__Compiling Contracts__");
    await run("compile");

    console.log(`Deploying DAIMock contract to ${network.name}`);
    const daiContractFactory = await ethers.getContractFactory("DAIMock");
    const daiContract = await daiContractFactory.deploy();
    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        daiContract.deployTransaction.hash
      } to be confirmed...`
    );
    await daiContract.deployTransaction.wait(
      networks[network.name].confirmations
    );
    console.log(
      `\n DAIMock contract deployed to ${daiContract.address} on ${network.name}`
    );
    if (network.name === "localFunctionsTestnet") {
      return;
    }
    const verifyContract = taskArgs.verify;
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: daiContract.address,
          contract: "contracts/tokens/DAIMock.sol:DAIMock",
          constructorArguments: [],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(`Deploying USDCMock contract to ${network.name}`);
    const usdcContractFactory = await ethers.getContractFactory("USDCMock");
    const usdcContract = await usdcContractFactory.deploy();
    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        usdcContract.deployTransaction.hash
      } to be confirmed...`
    );
    await usdcContract.deployTransaction.wait(
      networks[network.name].confirmations
    );
    console.log(
      `\n USDCMock contract deployed to ${usdcContract.address} on ${network.name}`
    );
    if (network.name === "localFunctionsTestnet") {
      return;
    }
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: usdcContract.address,
          contract: "contracts/tokens/USDCMock.sol:USDCMock",
          constructorArguments: [],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(`Deploying WETHMock contract to ${network.name}`);
    const wethContractFactory = await ethers.getContractFactory("WETHMock");
    const wethContract = await wethContractFactory.deploy();
    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        wethContract.deployTransaction.hash
      } to be confirmed...`
    );
    await wethContract.deployTransaction.wait(
      networks[network.name].confirmations
    );
    console.log(
      `\n WETHMock contract deployed to ${wethContract.address} on ${network.name}`
    );
    if (network.name === "localFunctionsTestnet") {
      return;
    }
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          contract: "contracts/tokens/WETHMock.sol:WETHMock",
          address: wethContract.address,
          constructorArguments: [],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(`Deploying LINKMock contract to ${network.name}`);
    const linkContractFactory = await ethers.getContractFactory("LINKMock");
    const linkContract = await linkContractFactory.deploy();
    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        linkContract.deployTransaction.hash
      } to be confirmed...`
    );
    await linkContract.deployTransaction.wait(
      networks[network.name].confirmations
    );
    console.log(
      `\n LINKMock contract deployed to ${linkContract.address} on ${network.name}`
    );
    if (network.name === "localFunctionsTestnet") {
      return;
    }
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: linkContract.address,
          contract: "contracts/tokens/LINKMock.sol:LINKMock",
          constructorArguments: [],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }

    console.log(`Deploying USDTMock contract to ${network.name}`);
    const usdtContractFactory = await ethers.getContractFactory("USDTMock");
    const usdtContract = await usdtContractFactory.deploy();
    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        usdtContract.deployTransaction.hash
      } to be confirmed...`
    );
    await usdtContract.deployTransaction.wait(
      networks[network.name].confirmations
    );
    console.log(
      `\n USDTMock contract deployed to ${usdtContract.address} on ${network.name}`
    );
    if (network.name === "localFunctionsTestnet") {
      return;
    }
    if (
      network.name !== "localFunctionsTestnet" &&
      verifyContract &&
      !!networks[network.name].verifyApiKey &&
      networks[network.name].verifyApiKey !== "UNSET"
    ) {
      try {
        console.log("\nVerifying contract...");
        await run("verify:verify", {
          address: usdtContract.address,
          contract: "contracts/tokens/USDTMock.sol:USDTMock",
          constructorArguments: [],
        });
        console.log("Contract verified");
      } catch (error) {
        if (!error.message.includes("Already Verified")) {
          console.log(
            "Error verifying contract.  Ensure you are waiting for enough confirmation blocks, delete the build folder and try again."
          );
          console.log(error);
        } else {
          console.log("Contract already verified");
        }
      }
    } else if (verifyContract && network.name !== "localFunctionsTestnet") {
      console.log(
        "\nPOLYGONSCAN_API_KEY, ETHERSCAN_API_KEY or FUJI_SNOWTRACE_API_KEY is missing. Skipping contract verification..."
      );
    }
  });
