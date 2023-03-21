import * as cdk from 'aws-cdk-lib';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';
import path = require('path');
import { EventConstruct } from '../events/event-rule';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as events from 'aws-cdk-lib/aws-events';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myLambda = new NodejsFunction(this, 'MyLambdaHandler', {
      runtime: Runtime.NODEJS_18_X,
      entry: path.join(__dirname, `/../functions/my-handler.ts`),
      handler: 'handler',
    });

    const myFunctionUrl = myLambda.addFunctionUrl({
      authType: FunctionUrlAuthType.NONE,
      cors: {
        allowedOrigins: ['*'],
      },
    });

    new cdk.CfnOutput(this, 'FunctionUrl', {
      value: myFunctionUrl.url,
    });

    const eventRule = new EventConstruct(this, 'EventConstruct');

    // add the Lambda function as a target for the Event Rule
    eventRule.eventRule.addTarget(
      new targets.LambdaFunction(myLambda, {
        event: events.RuleTargetInput.fromObject({ message: 'Hello Lambda' }),
      })
    );

    // allow the Event Rule to invoke the Lambda function
    targets.addLambdaPermission(eventRule.eventRule, myLambda);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkAppQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
