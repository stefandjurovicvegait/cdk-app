import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';

type CronLoggerEventbridgeProps = {
    lambda: NodejsFunction,
    options?: events.CronOptions
}

const defaultOptions : events.CronOptions = {
    minute: '0/5'
}

export class CronLoggerEventbridge extends Construct{
    constructor(scope: Construct, id:string, props: CronLoggerEventbridgeProps) {
        super(scope, id);

        const rule = new events.Rule(scope, 'fiveMinuteRule', {
        schedule: events.Schedule.cron(props.options || defaultOptions),
        });

        rule.addTarget(
            new targets.LambdaFunction(props.lambda)
        )

        targets.addLambdaPermission(rule, props.lambda);
    }
}