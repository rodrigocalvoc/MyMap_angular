import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapitalInfoComponent } from './capital-info.component';

describe('CapitalInfoComponent', () => {
  let component: CapitalInfoComponent;
  let fixture: ComponentFixture<CapitalInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalInfoComponent]
    });
    fixture = TestBed.createComponent(CapitalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
