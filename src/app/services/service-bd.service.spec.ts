import { TestBed } from '@angular/core/testing';

import { ServiceBDService } from './service-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('ServiceBDService', () => {
  let service: ServiceBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ServiceBDService, { provide: SQLite}] });
    service = TestBed.inject(ServiceBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
