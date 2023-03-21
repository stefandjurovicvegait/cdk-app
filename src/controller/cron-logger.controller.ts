import { Handler } from 'aws-cdk-lib/aws-lambda';

export const handler: Handler = async () => {
  console.log(`Lambda log at ${new Date()}`);
  return {
    statusCode: 200,
    headers: { 'Content-Type': 'text/plain' },
    body: 'Hello World',
  };
};
