"use server";
import { COINMARKETCAP_IDS } from "@/lib/constants";
import axios from "axios";
import { NextRequest } from "next/server";
const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`;
const COINMARKETCAP_API_KEY =
  process.env.NEXT_PUBLIC_COINMARKETCAP_API_KEY || "<your-key-here>";

const getExchangeRate = async (id: number): Promise<number> => {
  const response = await axios.get(url, {
    params: {
      id: id,
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
    },
  });

  const data = response.data;
  const priceInUSD = data.data[id].quote.USD.price;
  return priceInUSD;
};
export async function GET(req: NextRequest, res: Response) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const bnbAmount = searchParams.get("amount") || "0";
    const bnbToUsd = await getExchangeRate(COINMARKETCAP_IDS.bnb);
    const bnbInUSD =
      (parseFloat(bnbAmount) * bnbToUsd) / parseFloat("1000000000000000000");
    return Response.json({
      success: true,
      amount: bnbInUSD,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error });
  }
}
