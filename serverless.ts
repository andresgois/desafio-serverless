import type { AWS } from "@serverless/typescript";

//import hello from '@functions/hello';

const serverlessConfiguration: AWS = {
  service: "desafio-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["dynamodb:*"],
        Resource: ["*"],
      },
    ],
  },
  // import the function via paths
  functions: {
    //hello
    createTodo: {
      handler: "src/functions/createTodo.handler",
      events: [
        {
          http: {
            path: "todos/{userid}",
            method: "post",
            cors: true,
          },
        },
      ],
    },
    todoGetById: {
      handler: "src/functions/todoGetById.handler",
      events: [
        {
          http: {
            path: "todos/{userid}",
            method: "get",
            cors: true,
          },
        },
      ],
    },
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      stages: ["dev", "local"],
      start: {
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
  },
  //para o banco dynamoDB
  resources: {
    Resources: {
      dbCertificateUsers: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "todo",
          ProvisionedThroughput: {
            ReadCapacityUnits: 5, //requisições por segundo
            WriteCapacityUnits: 5,
          },
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
