import { config } from "dotenv";
config();

import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { 
  ChatPromptTemplate
} from "@langchain/core/prompts";
import { BufferMemory } from "langchain/memory";
import { DynamoDBChatMessageHistory } from "@langchain/community/stores/message/dynamodb";
import { ConversationChain } from "langchain/chains";

const memory = new BufferMemory({
  chatHistory: new DynamoDBChatMessageHistory({
    tableName: "chatbot-memory",
    partitionKey: "id",
    sessionId: new Date().toISOString(), // Or some other unique identifier for the conversation
    config: {
      region: process.env.AWS_REGION
    },
  }),
});


const llm = new BedrockChat({
  model: process.env.LLM_MODEL_ID,
  region: process.env.AWS_REGION
});

const prompt = ChatPromptTemplate.fromTemplate("The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.");

const chain = new ConversationChain({
  //prompt, NOTE: the response doesn't work as expected with the propt, so comment it out => Need to find the way to attach system prompt to the Conversation Chain
  memory,
  llm,
});


const response = await chain.invoke({
  input: "What is the capital of France?"
   
});

const response2 = await chain.invoke({
  input:  "What is a great place to see there?"
});

console.log(response2);
