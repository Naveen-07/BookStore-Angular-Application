import { TestBed } from '@angular/core/testing';

import { SellerService } from './seller.service';

describe('VendorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellerService = TestBed.get(SellerService);
    expect(service).toBeTruthy();
  });
});
