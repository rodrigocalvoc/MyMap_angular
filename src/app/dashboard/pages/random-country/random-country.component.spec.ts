import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomCountryComponent } from './random-country.component';

describe('RandomCountryComponent', () => {
  let component: RandomCountryComponent;
  let fixture: ComponentFixture<RandomCountryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomCountryComponent]
    });
    fixture = TestBed.createComponent(RandomCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
