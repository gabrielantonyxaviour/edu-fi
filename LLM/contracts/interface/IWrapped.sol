// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.7.6;


interface IWrapped{
    function deposit() external payable;
    function withdraw(uint wad) external;
}