import { config } from "dotenv";
config();

import { BedrockChat } from "@langchain/community/chat_models/bedrock";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { AmazonKnowledgeBaseRetriever } from "@langchain/aws";
import { StringOutputParser } from "@langchain/core/output_parsers";

const retriever = new AmazonKnowledgeBaseRetriever({
  topK: 10,
  knowledgeBaseId: process.env.AWS_KNOWLEDGE_BASE_ID,
  region: process.env.AWS_REGION,
});

const llm = new BedrockChat({
  model: process.env.LLM_MODEL_ID,
  region: process.env.AWS_REGION
});

const prompt = ChatPromptTemplate.fromTemplate(`
    Answer the question based only on the context provided.

    Context: {context}

    Question: {question}
`);

const formatDocs = (docs) => {
  return docs.map((doc) => doc.pageContent).join("\n\n");
};

// See https://js.langchain.com/v0.2/docs/tutorials/rag
const ragChain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocs),
    question: new RunnablePassthrough(),
  },
  prompt,
  llm,
  new StringOutputParser(),
]);

const response = await ragChain.invoke(
  "How many paid-leave days do I have in a year?"
);

console.log(response)