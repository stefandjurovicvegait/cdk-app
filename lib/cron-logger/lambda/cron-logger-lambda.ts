import {Construct} from 'constructs';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';

export class CronLoggerLambda extends Construct{
  lambda: NodejsFunction;
    constructor(scope: Construct, id: string){
      super(scope, id);
        this.lambda = new NodejsFunction(this, `${id}-lambda`, {
          runtime: Runtime.NODEJS_18_X,
          entry: path.join(__dirname, `../../src/controller/cron-logger.controller.ts`),
        });

        const myFunctionUrl = this.lambda.addFunctionUrl({
          authType: FunctionUrlAuthType.NONE,
          cors: {
            allowedOrigins: ['*'],
          },
        });

        new cdk.CfnOutput(this, 'FunctionUrl', {
          value: myFunctionUrl.url,
        });
    }
}