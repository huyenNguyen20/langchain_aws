import { config } from "dotenv";
config();

import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { BedrockEmbeddings } from "@langchain/aws";

const embeddings = new BedrockEmbeddings({
  region: process.env.AWS_REGION,
  model: process.env.EMBEDDING_MODEL_ID,
});

const pinecone = new PineconeClient();
// Will automatically read the PINECONE_API_KEY and PINECONE_ENVIRONMENT env vars
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX);

const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  maxConcurrency: 5,
  // You can pass a namespace here too
  // namespace: "foo",
});

const retriever = vectorStore.asRetriever({
  // Optional filter
  // filter: filter,
  k: 2,
});

const response = await retriever.invoke("When does the restaurant open on Friday?");
console.log(response);

