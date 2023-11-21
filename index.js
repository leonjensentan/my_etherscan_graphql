// Import ApolloServer and schema import from apollo-server
const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");

// Import the data source module  
const EtherDataSource = require("./datasource/ethDatasource");

// Import the GraphQL schema
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Define GraphQL resolvers
const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      // Call etherBalanceByAddress method on the data source
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      // Call totalSupplyOfEther method on the data source
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>
      // Call getLatestEthereumPrice method on the data source
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>
      // Call getBlockConfirmationTime method on the data source
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // Instantiate EtherDataSource 
    ethDataSource: new EtherDataSource(),
  }), 
});

// Set timeout to 0
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});