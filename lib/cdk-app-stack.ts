import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CronLoggerLambda } from './cron-logger/lambda/cron-logger-lambda';
import { CronLoggerEventbridge } from './cron-logger/eventbridge/cron-logger-eventbridge';

export class CdkAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const cronLambda = new CronLoggerLambda(this, 'CronLogger');

    new CronLoggerEventbridge(this, 'CronJobEventBridgeRule', {
      lambda: cronLambda.lambda
    });

    new CronLoggerEventbridge(this, 'CronJobEventBridgeRule', {
      lambda: cronLambda.lambda,
      options: {
        day: '1'
      }
    })
  }
}
