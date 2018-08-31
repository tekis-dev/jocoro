import { InstituteViewModule } from './institute-view.module';

describe('InstituteViewModule', () => {
  let instituteViewModule: InstituteViewModule;

  beforeEach(() => {
    instituteViewModule = new InstituteViewModule();
  });

  it('should create an instance', () => {
    expect(instituteViewModule).toBeTruthy();
  });
});
