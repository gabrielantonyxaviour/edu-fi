const { networks } = require("../../networks");

task("deploy-defi", "Deploys the DefiGenie contract")
  .addOptionalParam(
    "verify",
    "Set to true to verify contract",
    false,
    types.boolean
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying DefiGenie contract to ${network.name}`);

    console.log("\n__Compiling Contracts__");
    await run("compile");

    const defiGenieContractFactory = await ethers.getContractFactory(
      "DefiGenie"
    );

    const args = [
      "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // Wrapped
      "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45", // Swap router
    ];

    const defiGenieContract = await defiGenieContractFactory.deploy(...args);

    console.log(
      `\nWaiting ${
        networks[network.name].confirmations
      } blocks for transaction ${
        defiGenieContract.deployTransaction.hash
      } to be confirmed...`
    );

    await defiGenieContract.deployTransaction.wait(
      networks[network.name].confirmations
    );

    console.log("\nDeployed DefiGenie contract to:", defiGenieContract.address);

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
          address: defiGenieContract.address,
          constructorArguments: args,
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

    console.log(
      `\n DefiGenie contract deployed to ${defiGenieContract.address} on ${network.name}`
    );
  });
