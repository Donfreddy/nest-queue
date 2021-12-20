import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('message-queue')
export class MessageConsumer {
  // Read the jobs

  @Process('message-job')
  async readOperationJob(job: Job<unknown>): Promise<void> {
    console.log(job.data);
  }
}
