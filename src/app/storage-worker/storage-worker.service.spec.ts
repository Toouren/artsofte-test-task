import { TestBed } from '@angular/core/testing';

import { StorageWorkerService } from './storage-worker.service';

describe('StorageWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StorageWorkerService = TestBed.get(StorageWorkerService);
    expect(service).toBeTruthy();
  });
});
