import { TestBed } from '@angular/core/testing';

import { FileFormService } from './asset-transfer.service';

describe('FileFormService', () => {
  let service: FileFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
