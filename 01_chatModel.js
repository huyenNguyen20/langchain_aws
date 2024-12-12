import { config } from "dotenv";
config();

import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new BedrockChat({
  model: process.env.LLM_MODEL_ID,
  region: process.env.AWS_REGION
});

const template =
  "Be very funny when answering questions\n Question: {question}";
const prompt = ChatPromptTemplate.fromMessages([
    [
      "system",
      template
    ],
    ["human", "{input}"],
  ]);

const chain = prompt.pipe(llm);

const result = await chain.invoke({
  question: "What is the capital of France?",
  input: "I love french fries.",
});
console.log(result);
