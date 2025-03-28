import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertigationComponent } from './fertigation.component';

describe('FertigationComponent', () => {
  let component: FertigationComponent;
  let fixture: ComponentFixture<FertigationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FertigationComponent]
    });
    fixture = TestBed.createComponent(FertigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
