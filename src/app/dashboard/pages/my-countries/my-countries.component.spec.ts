import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCountriesComponent } from './my-countries.component';

describe('MyCountriesComponent', () => {
  let component: MyCountriesComponent;
  let fixture: ComponentFixture<MyCountriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyCountriesComponent]
    });
    fixture = TestBed.createComponent(MyCountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
