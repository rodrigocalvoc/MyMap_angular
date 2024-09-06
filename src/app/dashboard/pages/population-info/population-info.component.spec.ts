import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationInfoComponent } from './population-info.component';

describe('PopulationInfoComponent', () => {
  let component: PopulationInfoComponent;
  let fixture: ComponentFixture<PopulationInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopulationInfoComponent]
    });
    fixture = TestBed.createComponent(PopulationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
