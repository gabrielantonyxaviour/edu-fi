const { BigNumber } = require("ethers");
const { networks } = require("../networks");

task("add-liquidity", "Add liquidity to pool").setAction(async (taskArgs) => {
  const { ethers, deployments } = hre;
  const [signer] = await ethers.getSigners();
  const erc20Abi = [
    {
      constant: false,
      inputs: [
        {
          name: "user",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      constant: false,
      inputs: [
        {
          name: "spender",
          type: "address",
        },
        {
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          name: "",
          type: "bool",
        },
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const poolAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_token0",
          type: "address",
        },
        {
          internalType: "address",
          name: "_token1",
          type: "address",
        },
        {
          internalType: "uint24",
          name: "_fee",
          type: "uint24",
        },
        {
          internalType: "int24",
          name: "_tickSpacing",
          type: "int24",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "int24",
          name: "tickLower",
          type: "int24",
        },
        {
          internalType: "int24",
          name: "tickUpper",
          type: "int24",
        },
        {
          internalType: "uint128",
          name: "amount",
          type: "uint128",
        },
      ],
      name: "burn",
      outputs: [
        {
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "int24",
          name: "tickLower",
          type: "int24",
        },
        {
          internalType: "int24",
          name: "tickUpper",
          type: "int24",
        },
        {
          internalType: "uint128",
          name: "amount0Requested",
          type: "uint128",
        },
        {
          internalType: "uint128",
          name: "amount1Requested",
          type: "uint128",
        },
      ],
      name: "collect",
      outputs: [
        {
          internalType: "uint128",
          name: "amount0",
          type: "uint128",
        },
        {
          internalType: "uint128",
          name: "amount1",
          type: "uint128",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "fee",
      outputs: [
        {
          internalType: "uint24",
          name: "",
          type: "uint24",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feeGrowthGlobal0X128",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "feeGrowthGlobal1X128",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint160",
          name: "sqrtRatioX96",
          type: "uint160",
        },
        {
          internalType: "int24",
          name: "tickLower",
          type: "int24",
        },
        {
          internalType: "int24",
          name: "tickUpper",
          type: "int24",
        },
        {
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
      ],
      name: "getLiquidityForAmounts",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "int24",
          name: "tickLower",
          type: "int24",
        },
        {
          internalType: "int24",
          name: "tickUpper",
          type: "int24",
        },
      ],
      name: "getPosition",
      outputs: [
        {
          components: [
            {
              internalType: "uint128",
              name: "liquidity",
              type: "uint128",
            },
            {
              internalType: "uint256",
              name: "feeGrowthInside0LastX128",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "feeGrowthInside1LastX128",
              type: "uint256",
            },
            {
              internalType: "uint128",
              name: "tokensOwed0",
              type: "uint128",
            },
            {
              internalType: "uint128",
              name: "tokensOwed1",
              type: "uint128",
            },
          ],
          internalType: "struct Position.Info",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getSlot0",
      outputs: [
        {
          components: [
            {
              internalType: "uint160",
              name: "sqrtPriceX96",
              type: "uint160",
            },
            {
              internalType: "int24",
              name: "tick",
              type: "int24",
            },
            {
              internalType: "bool",
              name: "unlocked",
              type: "bool",
            },
          ],
          internalType: "struct Slot0",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int24",
          name: "tick",
          type: "int24",
        },
      ],
      name: "getSqrtRatioAtTick",
      outputs: [
        {
          internalType: "uint160",
          name: "",
          type: "uint160",
        },
      ],
      stateMutability: "pure",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint160",
          name: "sqrtPriceX96",
          type: "uint160",
        },
      ],
      name: "initialize",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "liquidity",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxLiquidityPerTick",
      outputs: [
        {
          internalType: "uint128",
          name: "",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "int24",
          name: "tickLower",
          type: "int24",
        },
        {
          internalType: "int24",
          name: "tickUpper",
          type: "int24",
        },
        {
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "bytes32",
          name: "",
          type: "bytes32",
        },
      ],
      name: "positions",
      outputs: [
        {
          internalType: "uint128",
          name: "liquidity",
          type: "uint128",
        },
        {
          internalType: "uint256",
          name: "feeGrowthInside0LastX128",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "feeGrowthInside1LastX128",
          type: "uint256",
        },
        {
          internalType: "uint128",
          name: "tokensOwed0",
          type: "uint128",
        },
        {
          internalType: "uint128",
          name: "tokensOwed1",
          type: "uint128",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "slot0",
      outputs: [
        {
          internalType: "uint160",
          name: "sqrtPriceX96",
          type: "uint160",
        },
        {
          internalType: "int24",
          name: "tick",
          type: "int24",
        },
        {
          internalType: "bool",
          name: "unlocked",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "bool",
          name: "zeroForOne",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "amount0",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "amount1",
          type: "uint256",
        },
      ],
      name: "swap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int16",
          name: "",
          type: "int16",
        },
      ],
      name: "tickBitmap",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tickSpacing",
      outputs: [
        {
          internalType: "int24",
          name: "",
          type: "int24",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "int24",
          name: "",
          type: "int24",
        },
      ],
      name: "ticks",
      outputs: [
        {
          internalType: "uint128",
          name: "liquidityGross",
          type: "uint128",
        },
        {
          internalType: "int128",
          name: "liquidityNet",
          type: "int128",
        },
        {
          internalType: "uint256",
          name: "feeGrowthOutside0X128",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "feeGrowthOutside1X128",
          type: "uint256",
        },
        {
          internalType: "bool",
          name: "initialized",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token0",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "token1",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // Approve and Mint Tokens
  const tokenA = networks[network.name].weth;
  const tokenAContract = new ethers.Contract(tokenA, erc20Abi, signer);
  console.log("Minting Token A...");
  const mintAConfirmation = await tokenAContract.mint(
    signer.address,
    BigNumber.from(10).pow(24).toString()
  );
  await mintAConfirmation.wait();

  console.log("Token A minted");
  console.log("Approving Token A...");
  const tokenAApproval = await tokenAContract.approve(
    networks[network.name].wethUsdcPool,
    ethers.constants.MaxUint256
  );
  await tokenAApproval.wait();
  console.log("tokenA approved");

  console.log("Minting Token B...");
  const tokenB = networks[network.name].usdc;
  const tokenBContract = new ethers.Contract(tokenB, erc20Abi, signer);
  const mintBConfirmation = await tokenBContract.mint(
    signer.address,
    BigNumber.from(10).pow(12).toString()
  );
  await mintBConfirmation.wait();
  console.log("Token B minted");
  console.log("Approving Token B...");
  const tokenBApproval = await tokenBContract.approve(
    networks[network.name].wethUsdcPool,
    ethers.constants.MaxUint256
  );
  await tokenBApproval.wait();
  console.log("tokenB approved");

  const poolAddress = networks[network.name].wethUsdcPool;
  const TICK_SPACING = 10;
  const poolContract = new ethers.Contract(poolAddress, poolAbi, signer);
  const slot = await poolContract.getSlot0();

  // CHANGE THIS
  const amountA = BigNumber.from(10).pow(24);
  const amountB = BigNumber.from(10).pow(12);
  // END CHANGE THIS

  const recipient = signer.address;
  const tickLower = ((slot.tick - TICK_SPACING) / TICK_SPACING) * TICK_SPACING;
  const tickUpper = ((slot.tick + TICK_SPACING) / TICK_SPACING) * TICK_SPACING;
  console.log("sqrtPriceX96", slot.sqrtPriceX96.toString());
  console.log("tickLower", tickLower);
  console.log("tickUpper", tickUpper);
  console.log("amountA", amountA.toString());
  console.log("amountB", amountB.toString());
  const liquidity = await poolContract.getLiquidityForAmounts(
    slot.sqrtPriceX96.toString(),
    tickLower,
    tickUpper,
    amountA.toString(),
    amountB.toString()
  );

  console.log("liquidity", liquidity.toString());
  const response = await poolContract.mint(
    recipient,
    tickLower,
    tickUpper,
    amountB,
    amountA
  );

  const receipt = await response.wait();
  console.log(receipt);
});
