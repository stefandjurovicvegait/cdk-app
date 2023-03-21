import { Construct } from 'constructs';
import * as events from 'aws-cdk-lib/aws-events';

export class EventConstruct extends Construct {
  public eventRule: events.Rule;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.eventRule = new events.Rule(scope, 'fiveMinuteRule', {
      schedule: events.Schedule.cron({ minute: '0/5' }),
    });
  }
}
