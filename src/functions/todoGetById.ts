import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const response = await document
    .query({
      TableName: "todo",
      KeyConditionExpression: "userid = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
    })
    .promise();

  const todoAlreadyExists = response.Items[0];
  console.log(todoAlreadyExists);

  if (!todoAlreadyExists) {
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Todo not found!",
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(response.Items[0]),
  };
};
