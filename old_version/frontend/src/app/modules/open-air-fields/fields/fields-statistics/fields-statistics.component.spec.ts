import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldsStatisticsComponent } from './fields-statistics.component';

describe('FieldsStatisticsComponent', () => {
  let component: FieldsStatisticsComponent;
  let fixture: ComponentFixture<FieldsStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FieldsStatisticsComponent]
    });
    fixture = TestBed.createComponent(FieldsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
