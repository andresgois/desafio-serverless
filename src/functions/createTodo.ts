import { APIGatewayProxyHandler } from "aws-lambda";
import { document } from "src/utils/dynamodbClient";
import { v4 as uuid } from "uuid";

interface ITodo {
  id?: string; // id gerado para garantir um único todo com o mesmo id
  user_id?: string; // id do usuário recebido no pathParameters
  title: string;
  done?: boolean; // inicie sempre como false
  deadline: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const { title, deadline } = JSON.parse(event.body) as ITodo;

  const response = await document
    .query({
      TableName: "todo",
      KeyConditionExpression: "id = :userid",
      ExpressionAttributeValues: {
        ":userid": userid,
      },
    })
    .promise();

  const todoAlreadyExists = response.Items[0];
  console.log(todoAlreadyExists);

  if (!todoAlreadyExists) {
    await document
      .put({
        TableName: "todo",
        Item: {
          id: uuid(),
          user_id: userid,
          title,
          done: false,
          deadline,
        },
      })
      .promise();
  }
  console.log(todoAlreadyExists);
  return {
    statusCode: 201,
    body: JSON.stringify(response.Items[0]),
  };
};
