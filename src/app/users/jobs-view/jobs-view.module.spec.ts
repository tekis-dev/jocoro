import { JobsViewModule } from './jobs-view.module';

describe('JobsViewModule', () => {
  let jobsViewModule: JobsViewModule;

  beforeEach(() => {
    jobsViewModule = new JobsViewModule();
  });

  it('should create an instance', () => {
    expect(jobsViewModule).toBeTruthy();
  });
});
