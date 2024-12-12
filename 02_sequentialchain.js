import { config } from "dotenv";
config();

import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new BedrockChat({
  model: process.env.LLM_MODEL_ID,
  region: process.env.AWS_REGION
});

let template =
  "You ordered {dish_name} and your experience was {experience}. Write a review: ";
let promptTemplate = ChatPromptTemplate.fromTemplate(template);

const reviewChain = promptTemplate.pipe(llm);

template = "Given the restaurant review: {review}, write a follow-up comment: ";
promptTemplate = ChatPromptTemplate.fromTemplate(template);

const commentChain = promptTemplate.pipe(llm);

template = "Summarise the review in one short sentence: \n\n {review}";
promptTemplate = ChatPromptTemplate.fromTemplate(template);

const summaryChain = promptTemplate.pipe(llm);

template = "Translate the summary to german: \n\n {summary}";
promptTemplate = ChatPromptTemplate.fromTemplate(template);

const translationChain = promptTemplate.pipe(llm);

const overallChain = RunnableSequence.from([
  reviewChain,
  (input) => ({
    review: input.content,
  }),
  commentChain,
  (input) => ({
    review: input.content,
  }),
  summaryChain,
  (input) => ({
    summary: input.content,
  }),
  translationChain,
  (input) => ({
    summary: input.content,
  }),
]);

const result = await overallChain.invoke({
  dish_name: "Pizza Salami",
  experience: "It was awful!",
});
console.log(result);
