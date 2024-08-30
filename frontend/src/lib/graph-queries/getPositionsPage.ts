import request, { gql } from "graphql-request";
import { Action, Address, Position } from "../type";
export default async function getPositionsPage({
  address,
}: {
  address: Address;
}): Promise<{
  actions: Action[];
  positions: Position[];
}> {
  const THEGRAPH_API_KEY = process.env.NEXT_PUBLIC_THEGRAPH_API_KEY;
  const {
    mints,
    burns,
    positions,
  }: { mints: any[]; burns: any[]; positions: any[] } = await request(
    `https://gateway.thegraph.com/api/${THEGRAPH_API_KEY}/subgraphs/id/G5MUbSBM7Nsrm9tH2tGQUiAF4SZDGf2qeo1xPLYjKr7K`,
    gql`
              query MyQuery {
  mints(where: {origin: "${address}"}) {
    id
    timestamp
    transaction {
      id
    }
  }
  burns(where: {origin: "${address}"}) {
    id
    timestamp
    transaction {
      id
    }
  }
  positions(where: {owner: "${address}"}) {
    id
    collectedFeesToken0
    collectedFeesToken1
    depositedToken0
    depositedToken1
    transaction {
      id
    }
    token1 {
      symbol
    }
    token0 {
      symbol
    }
    tickUpper {
      price1
    }
    tickLower {
      price1
    }
    pool {
      feeTier
    }
  }
}
            `
  );

  const positionTxs = positions.map((position) => position.transaction.id);

  return {
    actions: mints
      .map((action) => {
        return {
          txId: action.transaction.id,
          actionId: positionTxs.includes(action.transaction.id) ? "1" : "2",
          timeStamp: action.timestamp,
        };
      })
      .concat(
        burns.map((action) => {
          return {
            txId: action.transaction.id,
            actionId: "3",
            timeStamp: action.timestamp,
          };
        })
      ),
    positions: positions.map((position) => {
      return {
        id: position.id,
        token0: position.token0.symbol,
        token1: position.token1.symbol,
        feeTier: (parseFloat(position.pool.feeTier) / 10000)
          .toFixed(2)
          .toString(),
        minThreshold: parseFloat(position.tickUpper.price1)
          .toFixed(2)
          .toString(),
        maxThreshold: parseFloat(position.tickLower.price1)
          .toFixed(2)
          .toString(),
        depositedToken0: position.depositedToken0,
        depositedToken1: position.depositedToken1,
        collectedFeesToken0: position.collectedFeesToken0,
        collectedFeesToken1: position.collectedFeesToken1,
        status: "In range",
      };
    }),
  };
}
