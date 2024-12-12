# LangChain-AWS

## What

This repository contains a series of example scripts showcasing the usage of Langchain with AWS Bedrock

- `01_chatModel.js`: How to invoke a bedrock model using Langchain.
- `02_runnableSequence.js`: How to run the chains sequentially.
- `03_parsers.js`: How to use parsers to process response in a sepecific format.
- `04_embeddings.js`: How to load, chunk, and embed a document and store it in a vector store using AWS Bedrock Embeddings and PineCone Vector Store.
- `05_similaritySearch.js`: How to do vector similarity search using  AWS Bedrock Embeddings and PineCone Vector Store.
- `06_knowledgeBase.js`: How to connect and get information from AWS Knowledge Base.
- `07_chatMemory.js`: How to store the chat memory in the AWS DynamoDB.

## How to run
- Configure AWS CLI on local machine
- Set up an Index in PineCone Vector Store
- Request model access to a anthropic and titan text embedding model in AWS Bedrock
- Create a AWS Bedrock Knowledge Base and DynamoDB
- Run `npm run install`
- Run `node 01_chatModel.js` and similar to other scripts

## Sources
The code is based on tutorial: https://www.youtube.com/watch?v=mAYS4d0hrek&list=PLNVqeXDm5tIp_WDhE46ApaJRubuDJcxu4&index=3
Other sources:
- Integration of Langchain with AWS Bedrock: https://js.langchain.com/v0.2/docs/integrations/platforms/aws
- Langchain How-to Guides: https://js.langchain.com/docs/how_to/
  
