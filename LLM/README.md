# Dropify Contracts

Contracts for Dropify.

## Tech

1. Chainlink and Hyperlane
   a. Cross Chain Transactions
2. EAS
   a. On-chain verifiable attestations.
3. Worldcoin
   a. Proof of humaness
4. Optimism, Base, Metal L2, Ethereum, Arbitrum, Avalanche, Polygon
   a. Deployments
5. Goldsky
   a. Indexing
6. Farcaster
   a. Social verification
   b. Composer Actions
   c. Frames

## Contract Specification

1. Create airdrop (should be done on the respective chain)
   1. Send native value to our EOA to sponsor gas
   2. Transfer tokens of the airdrop (needs to verify if the tokens are already approved)
   3. Tasks (These are structured data stored in IPFS)
      1. Own Token (NFT or ERC20)
      2. Follow Farcaster account
      3. Have minimum Farcaster followers criteria
   4. Send crosschain transaction to base (only for chains other than base)
   5. Send funds to a vault
2. Claim airdrop (give required signatures, and world id proof)
   1. Verify world id proof
   2. Make other verifications off-chain and allow call to this function only by an authorized EOA
   3. Makes on chain attestation
   4. If cross chain, send a cross chain transaction

## Deploy Order

1. Deploy Vault Implementation on all chains
2. Deploy Crosschain contracts on all chains (except base)
3. Deploy Core (on base)
4. Initialize Core with crosschain contracts

## Deployments

1. Vault Implementation (Base) - 0xf3Dfb114CFAe91FC391e3E76f208eBbF595dCA82
2. Vault Implementation (Arbitrum) - 0x81692a7278869Bb5bf98A1adD937fdB7EEfFe09c
3. Core Mock (Base) - 0xB08aDb11A45284b96155F63009758014b1eb698C
4. Crosschain Mock (Arbitrum) - 0x4a0DC91781A116e83770A17AD09b63fa3E50d7Ce

## Contributors

- Gabriel - Blockchain Engineer & Architect

## License

This monorepo is licensed under the [MIT License](LICENSE).
