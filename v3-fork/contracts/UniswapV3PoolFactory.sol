// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;


import "./UniswapV3Pool.sol";

import "./interfaces/IERC20.sol";


contract UniswapV3PoolFactory {

    address public  owner;
    mapping(uint24 => int24) public  feeAmountTickSpacing;
    mapping(address => mapping(address => mapping(uint24 => address))) public  getPool;

    event OwnerChanged(address indexed oldOwner, address indexed newOwner); 
    event FeeAmountEnabled(uint24 indexed fee, int24 indexed tickSpacing);
    event PoolCreated(address indexed token0, address indexed token1, uint24 indexed fee, int24 tickSpacing, address pool);

    constructor() {
        owner = msg.sender;
        emit OwnerChanged(address(0), msg.sender);

        feeAmountTickSpacing[500] = 10;
        emit FeeAmountEnabled(500, 10);
        feeAmountTickSpacing[3000] = 60;
        emit FeeAmountEnabled(3000, 60);
        feeAmountTickSpacing[10000] = 200;
        emit FeeAmountEnabled(10000, 200);
    }

    function createPool(
        address tokenA,
        address tokenB,
        uint24 fee,
        uint160 sqrtPriceX96
    ) external returns (address pool) {
        require(tokenA != tokenB);
        (address token0, address token1) = tokenA < tokenB ? (tokenA, tokenB) : (tokenB, tokenA);

        require(token0 != address(0));
        int24 tickSpacing = feeAmountTickSpacing[fee];

        require(tickSpacing != 0);
        require(getPool[token0][token1][fee] == address(0));

        UniswapV3Pool _pool =new UniswapV3Pool(token0, token1, fee, tickSpacing);
        _pool.initialize(sqrtPriceX96);
        
        pool = address(_pool);
        getPool[token0][token1][fee] = pool;
        getPool[token1][token0][fee] = pool;

        emit PoolCreated(token0, token1, fee, tickSpacing, pool);
    }

    
    function setOwner(address _owner) external  {
        require(msg.sender == owner);
        emit OwnerChanged(owner, _owner);
        owner = _owner;
    }

    
    function enableFeeAmount(uint24 fee, int24 tickSpacing) public  {
        require(msg.sender == owner);
        require(fee < 1000000);
        require(tickSpacing > 0 && tickSpacing < 16384);
        require(feeAmountTickSpacing[fee] == 0);

        feeAmountTickSpacing[fee] = tickSpacing;
        emit FeeAmountEnabled(fee, tickSpacing);
    }


}