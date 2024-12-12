import { config } from "dotenv";
config();

import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const llm = new BedrockChat({
  model: process.env.LLM_MODEL_ID,
  region: process.env.AWS_REGION
});

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  answer: "answer to the user's question",
});
const formatInstructions = parser.getFormatInstructions();
const  template = "Be very funny when answering questions\n{format_instructions}\n Question: {question}";
const prompt = ChatPromptTemplate.fromTemplate(template);

const partialedPrompt = await prompt.partial({
  format_instructions: formatInstructions,
});

const chain = partialedPrompt.pipe(llm).pipe(parser)

const response = await chain.invoke({
  question: "What is the capital of France?"
})

console.log(response);
