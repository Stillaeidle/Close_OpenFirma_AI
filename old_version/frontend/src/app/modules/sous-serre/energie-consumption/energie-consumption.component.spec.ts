import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergieConsumptionComponent } from './energie-consumption.component';

describe('EnergieConsumptionComponent', () => {
  let component: EnergieConsumptionComponent;
  let fixture: ComponentFixture<EnergieConsumptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnergieConsumptionComponent]
    });
    fixture = TestBed.createComponent(EnergieConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
