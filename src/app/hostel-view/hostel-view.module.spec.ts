import { HostelViewModule } from './hostel-view.module';

describe('HostelViewModule', () => {
  let hostelViewModule: HostelViewModule;

  beforeEach(() => {
    hostelViewModule = new HostelViewModule();
  });

  it('should create an instance', () => {
    expect(hostelViewModule).toBeTruthy();
  });
});
