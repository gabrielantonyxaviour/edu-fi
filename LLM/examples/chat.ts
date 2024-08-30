import { Contract, ethers, TransactionReceipt, Wallet } from "ethers";
import express from "express";
import cors from "cors";
import ABI from "./abis/ChatGpt.json";

require("dotenv").config();

interface Message {
  role: string;
  content: string;
}

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Set up the provider, wallet, and contract instance
const rpcUrl = process.env.RPC_URL;
if (!rpcUrl) throw Error("Missing RPC_URL in .env");
const privateKey = process.env.PRIVATE_KEY;
if (!privateKey) throw Error("Missing PRIVATE_KEY in .env");
const contractAddress = process.env.CHAT_CONTRACT_ADDRESS;
if (!contractAddress) throw Error("Missing CHAT_CONTRACT_ADDRESS in .env");

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);
const contract = new Contract(contractAddress, ABI, wallet);

// Function to handle chat interactions
async function handleChat(message: string, res: any) {
  try {
    const transactionResponse = await contract.startChat(message);
    const receipt = await transactionResponse.wait();
    console.log(`Message sent, tx hash: ${receipt.hash}`);
    console.log(`Chat started with message: "${message}"`);

    // Get the chat ID from transaction receipt logs
    let chatId = getChatId(receipt, contract);
    console.log(`Created chat ID: ${chatId}`);
    if (!chatId && chatId !== 0) {
      return res.status(400).send("Chat ID not found.");
    }

    let allMessages: Message[] = [];

    // Run the chat loop: read messages and send messages
    while (true) {
      const newMessages: Message[] = await getNewMessages(contract, chatId, allMessages.length);
      if (newMessages) {
        for (let message of newMessages) {
          console.log(`${message.role}: ${message.content}`);
          allMessages.push(message);
          // Only respond when the assistant provides an output
          if (allMessages.at(-1)?.role === "assistant") {
            const assistantResponse: string | undefined = allMessages.at(-1)?.content;
            if (assistantResponse) {
              try {
                // Parse the response string to extract action, params, and response
                const parsedResponse = JSON.parse(assistantResponse);
                // Ensure response structure
                const action = parsedResponse.action || "";
                const params = parsedResponse.params || "";
                const response = parsedResponse.response || "";

                // Send structured response to Postman
                res.json({ action, params, response });
              } catch (error) {
                console.error("Error parsing assistant response:", error);
                res.status(500).send("Error parsing assistant response.");
              }
            } else {
              // Handle the case where assistantResponse is undefined
              console.error("Assistant response is undefined.");
              res.status(500).send("Assistant response is undefined.");
            }
            return; // Exit the function after sending response
          }
        }
      }
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error("Error interacting with the contract:", error);
    res.status(500).send("An error occurred while interacting with the contract.");
  }
}

// POST endpoint to receive inputs from Postman
app.post("/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("Message is required.");
  }
  await handleChat(message, res);
});

function getChatId(receipt: TransactionReceipt, contract: Contract) {
  let chatId;
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "ChatCreated") {
        // Second event argument
        chatId = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log);
    }
  }
  return chatId;
}

async function getNewMessages(
  contract: Contract,
  chatId: number,
  currentMessagesCount: number
): Promise<Message[]> {
  const messages = await contract.getMessageHistory(chatId);

  const newMessages: Message[] = [];
  messages.forEach((message: any, i: number) => {
    if (i >= currentMessagesCount) {
      newMessages.push({
        role: message[0],
        content: message.content[0].value,
      });
    }
  });
  return newMessages;
}

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
