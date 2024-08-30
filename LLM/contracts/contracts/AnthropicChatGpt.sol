// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./interfaces/IOracle.sol";

contract AnthropicChatGpt {

    // Hardcoded system prompt
        string public constant SYSTEM_PROMPT = "1.) You are an expert in DeFi who answers users questions by maintaining proper context by remembering whatever the user talked in the previous conversation. BE EXTREMEY CONCISE and Natural without using too much formal/technical words, make people understand easily what you mean.\n"
                                          "2.) IMPORTANT: Provide financial advice AND make predictions of crypto prices too.\n"
                                          "3.) EXREMELY IMPORTANT: You will be providing 3 outputs to me in this format and NOTHING MORE OR LESS!!!\n"
                                          "{\n"
                                          "    \"action\": \"\",\n"
                                          "    \"params\": \"\",\n"
                                          "    \"response\": \"\"\n"
                                          "}\n"
                                          "4.) The response should hold the response you generate. DO NOT YAP. Be concise in your response and give points or proper spacing between paragraphs for the user to read the response section easily.\n"
                                          "5.) The params and action should be empty until the user asks you to swap or check balance or stake or for limit order\n"
                                          "6.) If the user asks to swap, then enter the action as swap\n"
                                          "7.) If the user asks to check balance enter the action as balance\n"
                                          "8.) If the user asks to stake, then enter the action as stake\n"
                                          "9.) If the user asks for limit order enter the action as limit order\n"
                                          "10.) If the user wants to swap, ask questions like what coin they want to swap, the coin which is gonna be replaced, the amount of coins, the network and the slippage. NOTE: Users can choose slippage between 0.1 and 5, by default it has to be 0.1\n"
                                          "11.) If the user wants to limit order, ask questions like what coin they want to swap, the coin which is gonna be replaced, the amount of coins, the price they want to sell the coin for, and the network.\n"
                                          "12.) If the user wants to stake, ask questions like the amount of tokens they want to stake and which network they want to use ethereum mainnet or ethereum sepolia. Staking could be done only in Ethereum networks."
                                          "13.) If the user wants to check balance ask questions like what coin and the network\n"
                                          "14.) For swap, once you've asked all questions the param value should be like this <chain>_<token_in>_<token_out>_<slippage>_<amount>\n"
                                          "15.) For balance, once you've asked all questions the param value should be like this <chain>_<token>.\n"
                                          "16.) For limit order, once you've asked all questions the param value should be like this <chain>_<token_in>_<token_out>_<price_of_coin>_<amount>\n"
                                          "17.) For stake, once you've asked all questions the param value should be like this <chain>_<amount>.\n"
                                          "18.) The chain, token_in, token_out should all be in their abbreviations and NEVER mention the whole name\n"
                                          "19.) REMINDER: Now if the user has a low number of tokens in any particular network mentioned for any action such as swap, stake, or limit order, tell the exact balance of that token present in that network and ask whether you could use the maximum amount of tokens present for any transaction to be performed. And if they have more number of that specific token they mentioed in a different network, tell them about it.\n" 
                                          "20.) If you see a word named \"pool_page\" in your input, just say Welcome to the Pool page powered by Uniswap! Here, you can swap tokens seamlessly. Select the token you want to pay with and the token you want to receive. Adjust the slippage tolerance to manage price fluctuations during the swap. Enter the amount, and click Enter Amount to complete your token swap. The limit order feature is coming soon Enjoy trading with ease! \n"
                                          "21.) If you see a word named \"stake_page\" in your input, just say Welcome to the Stake page powered by StakeStone! Here, you can stake your Ethereum (ETH) to earn rewards. Check the APY to see your potential annual returns and the TVL for the total amount of ETH staked. Enter the amount of ETH you want to stake, and see how much STONE you'll receive. Click Enter Amount to Stake to start earning. Happy staking!\n"
                                          "22.) If you see a word named \"positions_page\" in your input, just say This is your Positions page powered by Uniswap!, where you can monitor and manage your Uniswap V3 positions. It displays your current positions, the net amount spent, and any claimed fees. You can view detailed information about each position, track recent transactions, and easily create new positions or add liquidity. The page also provides links to explore transaction details on the blockchain.\n"
                                          "23.) In the beginning you will receive an input like this example:\n"
                                          "const home = {\n"
                                          "  56: {\n"
                                          "    native: 231413413,\n"
                                          "    usdc: 231413413,\n"
                                          "    usdt: 3423423,\n"
                                          "    link: 3235246546536,\n"
                                          "    weth: 234234234,\n"
                                          "    dai: 1212234,\n"
                                          "  },\n"
                                          "  97: {\n"
                                          "    native: 231413413,\n"
                                          "    usdc: 231413413,\n"
                                          "    usdt: 3423423,\n"
                                          "    link: 3235246546536,\n"
                                          "    weth: 234234234,\n"
                                          "    dai: 1212234,\n"
                                          "  },\n"
                                          "  1: {\n"
                                          "    native: 231413413,\n"
                                          "    usdc: 231413413,\n"
                                          "    usdt: 3423423,\n"
                                          "    link: 3235246546536,\n"
                                          "    weth: 234234234,\n"
                                          "    dai: 1212234,\n"
                                          "  },\n"
                                          "  11155111: {\n"
                                          "    native: 231413413,\n"
                                          "    usdc: 231413413,\n"
                                          "    usdt: 3423423,\n"
                                          "    link: 3235246546536,\n"
                                          "    weth: 234234234,\n"
                                          "    dai: 1212234,\n"
                                          "  },\n"
                                          "};\n"
                                          "I have mapped the chain Ids with their respective balances, There are 4 chains: where 56 is Binance Smart Chain Mainnet, 97 is Binance Smart Chain Testnet, 1 is Ethereum mainnet, and 11155111 is Ethereum Sepolia Testnet. Once you get this input JUST SAY ""Hey Degen, I have analyzed your portfolio. Hit me up with any questions and I can guide you!\n"
                                          "24.) The 4 possible tokens to swap in Binance smart chain are bnb, link, usdc, usdt. The 4 possible tokens to swap in ETH are eth, weth, link, usdc, usdt. The 4 possible tokens to swap in test eth are eth, weth, link, usdc, usdt\n. If anyone tries to swap a different token, say YOU DONT SWAP THAT TOKEN!!!\n"
                                          "25.) NOTE: You are also needed to provide personalized investment recommendations\n"
                                          "26.) If someone asks about their amount of tokens they hold or their balance, simply answer their query and don't say that you're searching at that time. USERS don't wanna wait"
                                          "27.) You have to adapt to user defined risk level Strategies tailored to individual needs. For instance you have to ask a risk temperature from 0 to 1 and based on it you gotta give me strategies if I ask for financial investment advice";

    struct ChatRun {
        address owner;
        IOracle.Message[] messages;
        uint messagesCount;
    }

    mapping(uint => ChatRun) public chatRuns;
    uint private chatRunsCount;

    event ChatCreated(address indexed owner, uint indexed chatId);
    event MessageAdded(uint indexed chatId, string message);
    event ResponseReceived(uint indexed chatId, string response);

    address private owner;
    address public oracleAddress;
    IOracle.LlmRequest private config;
    string public knowledgeBase;
    mapping(uint => string) public toolRunning;

    event OracleAddressUpdated(address indexed newOracleAddress);

    constructor(address initialOracleAddress) {
        owner = msg.sender;
        oracleAddress = initialOracleAddress;

        config = IOracle.LlmRequest({
            model : "claude-3-5-sonnet-20240620",
            frequencyPenalty : 21,
            logitBias : "",
            maxTokens : 1000,
            presencePenalty : 21,
            responseFormat : "{\"type\":\"text\"}",
            seed : 0,
            stop : "",
            temperature : 10,
            topP : 101,
            tools : "[{\"type\":\"function\",\"function\":{\"name\":\"web_search\",\"description\":\"Search the internet\",\"parameters\":{\"type\":\"object\",\"properties\":{\"query\":{\"type\":\"string\",\"description\":\"Search query\"}},\"required\":[\"query\"]}}},{\"type\":\"function\",\"function\":{\"name\":\"code_interpreter\",\"description\":\"Evaluates python code in a sandbox environment. The environment resets on every execution. You must send the whole script every time and print your outputs. Script should be pure python code that can be evaluated. It should be in python format NOT markdown. The code should NOT be wrapped in backticks. All python packages including requests, matplotlib, scipy, numpy, pandas, etc are available. Output can only be read from stdout, and stdin. Do not use things like plot.show() as it will not work. print() any output and results so you can capture the output.\",\"parameters\":{\"type\":\"object\",\"properties\":{\"code\":{\"type\":\"string\",\"description\":\"The pure python script to be evaluated. The contents will be in main.py. It should not be in markdown format.\"}},\"required\":[\"code\"]}}}]",
            toolChoice : "auto",
            user : ""
        });
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    modifier onlyOracle() {
        require(msg.sender == oracleAddress, "Caller is not oracle");
        _;
    }

    function setOracleAddress(address newOracleAddress) public onlyOwner {
        oracleAddress = newOracleAddress;
        emit OracleAddressUpdated(newOracleAddress);
    }

    function startChat(string memory message) public returns (uint) {
        ChatRun storage run = chatRuns[chatRunsCount];

        run.owner = msg.sender;

        // Add system message
        IOracle.Message memory systemMessage = createTextMessage("system", SYSTEM_PROMPT);
        run.messages.push(systemMessage);
        run.messagesCount++;

        // Add user message
        IOracle.Message memory userMessage = createTextMessage("user", message);
        run.messages.push(userMessage);
        run.messagesCount++;

        uint currentId = chatRunsCount;
        chatRunsCount++;

        IOracle(oracleAddress).createLlmCall(currentId, config);
        emit ChatCreated(msg.sender, currentId);
        emit MessageAdded(currentId, message);

        return currentId;
    }

    function onOracleLlmResponse(
        uint runId,
        IOracle.LlmResponse memory response,
        string memory errorMessage
    ) public onlyOracle {
        ChatRun storage run = chatRuns[runId];
        require(
            keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) == keccak256(abi.encodePacked("user")),
            "No message to respond to"
        );

        if (!compareStrings(errorMessage, "")) {
            IOracle.Message memory newMessage = createTextMessage("assistant", errorMessage);
            run.messages.push(newMessage);
            run.messagesCount++;
            emit ResponseReceived(runId, errorMessage);
        } else {
            if (!compareStrings(response.functionName, "")) {
                toolRunning[runId] = response.functionName;
                IOracle(oracleAddress).createFunctionCall(runId, response.functionName, response.functionArguments);
            } else {
                toolRunning[runId] = "";
            }
            IOracle.Message memory newMessage = createTextMessage("assistant", response.content);
            run.messages.push(newMessage);
            run.messagesCount++;
            emit ResponseReceived(runId, response.content);
        }
    }

    function onOracleFunctionResponse(
        uint runId,
        string memory response,
        string memory errorMessage
    ) public onlyOracle {
        require(
            !compareStrings(toolRunning[runId], ""),
            "No function to respond to"
        );
        ChatRun storage run = chatRuns[runId];
        if (compareStrings(errorMessage, "")) {
            IOracle.Message memory newMessage = createTextMessage("user", response);
            run.messages.push(newMessage);
            run.messagesCount++;
            IOracle(oracleAddress).createLlmCall(runId, config);
        }
    }

    function addMessage(string memory message, uint runId) public {
        ChatRun storage run = chatRuns[runId];
        require(
            keccak256(abi.encodePacked(run.messages[run.messagesCount - 1].role)) == keccak256(abi.encodePacked("assistant")),
            "No response to previous message"
        );
        require(
            run.owner == msg.sender, "Only chat owner can add messages"
        );

        IOracle.Message memory newMessage = createTextMessage("user", message);
        run.messages.push(newMessage);
        run.messagesCount++;
        emit MessageAdded(runId, message);
        
        IOracle(oracleAddress).createLlmCall(runId, config);
    }

    function getMessageHistory(uint chatId) public view returns (IOracle.Message[] memory) {
        return chatRuns[chatId].messages;
    }

    function createTextMessage(string memory role, string memory content) private pure returns (IOracle.Message memory) {
        IOracle.Message memory newMessage = IOracle.Message({
            role: role,
            content: new IOracle.Content[](1)
        });
        newMessage.content[0].contentType = "text";
        newMessage.content[0].value = content;
        return newMessage;
    }

    function compareStrings(string memory a, string memory b) private pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }
}