"use server";
import axios from "axios";
import { NextRequest } from "next/server";
const url = "https://defi-genie.onrender.com/start-chat";
export async function POST(req: NextRequest, res: Response) {
  try {
    const body = await req.json();
    console.log(body);

    const response = await axios.post(url, body);
    const data = response.data;
    console.log(data);
    return Response.json({
      success: true,
      response: data,
    });
  } catch (error) {
    console.error(error);
    return Response.json({ success: false, error: error });
  }
}
